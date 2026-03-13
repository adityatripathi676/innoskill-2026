//go:build ignore

package main

import (
	"context"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"strings"

	"google.golang.org/api/drive/v3"
	"google.golang.org/api/option"
)

const folderID = "1_vFdDU6WNfmBn3C-kwfeJEZ-HsMQRc2X"

func main() {
    ctx := context.Background()

    srv, err := drive.NewService(
        ctx,
        option.WithCredentialsFile("secrets.json"),
        option.WithScopes(drive.DriveReadonlyScope),
    )
    if err != nil {
        panic(err)
    }

    folderMeta, err := srv.Files.Get(folderID).
        SupportsAllDrives(true).
        Fields("id,name,mimeType,driveId").
        Do()
    if err != nil {
        panic(fmt.Errorf("cannot access folder %s: %w", folderID, err))
    }
    fmt.Printf("folder: %s (%s)\n", folderMeta.Name, folderMeta.Id)

    files, err := listAllFilesRecursively(srv, folderID)
    if err != nil {
        panic(err)
    }

    if len(files) == 0 {
        fmt.Println("no files found in folder")
        return
    }

    outDir := filepath.Join("..", "innoskill-frontend", "public", "images", "drive-import")
    if err := os.MkdirAll(outDir, 0o755); err != nil {
        panic(err)
    }

    downloaded := 0
    for _, f := range files {
        if !strings.HasPrefix(f.MimeType, "image/") {
            continue
        }

        fileResp, err := srv.Files.Get(f.Id).Download()
        if err != nil {
            fmt.Printf("skip %s: %v\n", f.Name, err)
            continue
        }

        safeName := sanitizeFileName(f.Name)
        outPath := filepath.Join(outDir, safeName)

        outFile, err := os.Create(outPath)
        if err != nil {
            fileResp.Body.Close()
            fmt.Printf("skip %s: %v\n", f.Name, err)
            continue
        }

        _, copyErr := io.Copy(outFile, fileResp.Body)
        closeErr := outFile.Close()
        bodyCloseErr := fileResp.Body.Close()

        if copyErr != nil || closeErr != nil || bodyCloseErr != nil {
            fmt.Printf("skip %s: failed to save\n", f.Name)
            continue
        }

        downloaded++
        fmt.Printf("downloaded: %s -> %s\n", f.Name, outPath)
    }

    fmt.Printf("done, downloaded image files: %d\n", downloaded)
}

func listAllFilesRecursively(srv *drive.Service, rootFolderID string) ([]*drive.File, error) {
    var allFiles []*drive.File
    folderQueue := []string{rootFolderID}

    for len(folderQueue) > 0 {
        currentFolderID := folderQueue[0]
        folderQueue = folderQueue[1:]

        q := fmt.Sprintf("'%s' in parents and trashed = false", currentFolderID)
        pageToken := ""

        for {
            call := srv.Files.List().
                Q(q).
                SupportsAllDrives(true).
                IncludeItemsFromAllDrives(true).
                Fields("nextPageToken,files(id,name,mimeType)").
                PageSize(500)

            if pageToken != "" {
                call = call.PageToken(pageToken)
            }

            resp, err := call.Do()
            if err != nil {
                return nil, err
            }

            for _, f := range resp.Files {
                if f.MimeType == "application/vnd.google-apps.folder" {
                    folderQueue = append(folderQueue, f.Id)
                    continue
                }
                allFiles = append(allFiles, f)
            }

            if resp.NextPageToken == "" {
                break
            }
            pageToken = resp.NextPageToken
        }
    }

    return allFiles, nil
}

func sanitizeFileName(name string) string {
    lower := strings.ToLower(strings.TrimSpace(name))
    lower = strings.ReplaceAll(lower, " ", "-")
    lower = strings.ReplaceAll(lower, "/", "-")
    lower = strings.ReplaceAll(lower, "\\", "-")
    return lower
}
