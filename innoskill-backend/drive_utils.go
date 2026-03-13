package main

import (
	"bytes"
	"context"
	"encoding/base64"
	"fmt"
	"log"
	"mime"
	"net/http"
	"os"
	"path/filepath"
	"regexp"
	"strings"

	"google.golang.org/api/drive/v3"
	"google.golang.org/api/option"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

var dataURLPattern = regexp.MustCompile(`(?s)^data:([^;]+)(?:;[^;]+)*;base64,(.+)$`)

func createDriveService(ctx context.Context) (*drive.Service, error) {
	if refreshToken := os.Getenv("GOOGLE_REFRESH_TOKEN"); refreshToken != "" {
		clientID := os.Getenv("GOOGLE_CLIENT_ID")
		clientSecret := os.Getenv("GOOGLE_CLIENT_SECRET")
		if clientID == "" || clientSecret == "" {
			return nil, fmt.Errorf("GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are required when GOOGLE_REFRESH_TOKEN is set")
		}

		conf := &oauth2.Config{
			ClientID:     clientID,
			ClientSecret: clientSecret,
			Scopes:       []string{drive.DriveScope},
			Endpoint:     google.Endpoint,
		}
		token := &oauth2.Token{RefreshToken: refreshToken}
		client := conf.Client(ctx, token)

		return drive.NewService(ctx, option.WithHTTPClient(client))
	}

	if creds := os.Getenv("GOOGLE_CREDENTIALS"); creds != "" {
		return drive.NewService(ctx,
			option.WithCredentialsJSON([]byte(creds)),
			option.WithScopes(drive.DriveScope),
		)
	}

	return drive.NewService(ctx,
		option.WithCredentialsFile("secrets.json"),
		option.WithScopes(drive.DriveScope),
	)
}

func uploadParticipantPhotos(srv *drive.Service, formData FormData) (UploadedPhotoURLs, error) {
	urls := UploadedPhotoURLs{}
	rootFolderID := getEnv("DRIVE_UPLOAD_ROOT_FOLDER_ID", "1_vFdDU6WNfmBn3C-kwfeJEZ-HsMQRc2X")
	hasImagePreview := isDataURL(formData.CancelledChequePreview) ||
		isDataURL(formData.PassbookPhotoPreview) ||
		isDataURL(formData.AadhaarPhotoPreview) ||
		isDataURL(formData.PaymentReceiptPreview)

	if !hasImagePreview {
		log.Printf("drive: no image previews to upload for %s (previews may be PDFs or empty)", formData.PhoneNumber)
		return urls, nil
	}

	if err := validateUploadRootFolder(srv, rootFolderID); err != nil {
		return urls, err
	}

	participantFolderID, err := createParticipantFolder(srv, rootFolderID, formData)
	if err != nil {
		log.Printf("drive: failed to create participant folder for %s: %v", formData.PhoneNumber, err)
		return urls, err
	}
	log.Printf("drive: created participant folder %s for %s", participantFolderID, formData.PhoneNumber)

	var failedUploads []string
	var failedDetails []string

	if isDataURL(formData.CancelledChequePreview) {
		urls.CancelledChequeURL, err = uploadDataURLToDrive(srv, participantFolderID, formData.CancelledChequePreview, "cancelled-cheque")
		if err != nil {
			log.Printf("upload error (cancelled cheque): %v", err)
			failedUploads = append(failedUploads, "cancelled cheque")
			failedDetails = append(failedDetails, fmt.Sprintf("cancelled cheque: %v", err))
		}
	}

	if isDataURL(formData.PassbookPhotoPreview) {
		urls.PassbookPhotoURL, err = uploadDataURLToDrive(srv, participantFolderID, formData.PassbookPhotoPreview, "passbook-photo")
		if err != nil {
			log.Printf("upload error (passbook photo): %v", err)
			failedUploads = append(failedUploads, "passbook photo")
			failedDetails = append(failedDetails, fmt.Sprintf("passbook photo: %v", err))
		}
	}

	if isDataURL(formData.AadhaarPhotoPreview) {
		urls.AadhaarPhotoURL, err = uploadDataURLToDrive(srv, participantFolderID, formData.AadhaarPhotoPreview, "aadhaar-photo")
		if err != nil {
			log.Printf("upload error (aadhaar photo): %v", err)
			failedUploads = append(failedUploads, "aadhaar photo")
			failedDetails = append(failedDetails, fmt.Sprintf("aadhaar photo: %v", err))
		}
	}

	if isDataURL(formData.PaymentReceiptPreview) {
		urls.PaymentReceiptURL, err = uploadDataURLToDrive(srv, participantFolderID, formData.PaymentReceiptPreview, "payment-receipt")
		if err != nil {
			log.Printf("upload error (payment receipt): %v", err)
			failedUploads = append(failedUploads, "payment receipt")
			failedDetails = append(failedDetails, fmt.Sprintf("payment receipt: %v", err))
		}
	}

	if len(failedUploads) > 0 {
		if cleanupErr := deleteDriveFile(srv, participantFolderID); cleanupErr != nil {
			log.Printf("drive: failed to clean up participant folder %s after upload failure: %v", participantFolderID, cleanupErr)
		}

		if len(failedDetails) > 0 {
			return UploadedPhotoURLs{}, fmt.Errorf("upload failed: %s", strings.Join(failedDetails, "; "))
		}
		return UploadedPhotoURLs{}, fmt.Errorf("upload failed for %s", strings.Join(failedUploads, ", "))
	}

	return urls, nil
}

func isDataURL(preview string) bool {
	return strings.HasPrefix(strings.TrimSpace(preview), "data:")
}

func createParticipantFolder(srv *drive.Service, rootFolderID string, formData FormData) (string, error) {
	folderName := sanitizeDriveName(fmt.Sprintf("%s-%s-%s", formData.Name, formData.PhoneNumber, strings.ReplaceAll(formData.SubmittedAt, " ", "-")))

	folderMeta := &drive.File{
		Name:     folderName,
		MimeType: "application/vnd.google-apps.folder",
		Parents:  []string{rootFolderID},
	}

	created, err := srv.Files.Create(folderMeta).SupportsAllDrives(true).Fields("id").Do()
	if err != nil {
		return "", fmt.Errorf("failed to create participant folder: %w", err)
	}

	return created.Id, nil
}

func validateUploadRootFolder(srv *drive.Service, rootFolderID string) error {
	rootFolder, err := srv.Files.Get(rootFolderID).
		SupportsAllDrives(true).
		Fields("id,name,mimeType,driveId,capabilities/canAddChildren").
		Do()
	if err != nil {
		return fmt.Errorf("failed to access DRIVE_UPLOAD_ROOT_FOLDER_ID %s: %w", rootFolderID, err)
	}

	if rootFolder.MimeType != "application/vnd.google-apps.folder" {
		return fmt.Errorf("DRIVE_UPLOAD_ROOT_FOLDER_ID %s is not a folder (mimeType: %s)", rootFolderID, rootFolder.MimeType)
	}

	// Service accounts have no storage quota in My Drive; allow My Drive only when using OAuth user flow.
	if strings.TrimSpace(rootFolder.DriveId) == "" && strings.TrimSpace(os.Getenv("GOOGLE_REFRESH_TOKEN")) == "" {
		return fmt.Errorf("DRIVE_UPLOAD_ROOT_FOLDER_ID %s is in My Drive. Use OAuth user flow (set GOOGLE_REFRESH_TOKEN) or move this folder into a Shared Drive and add the service account as a member", rootFolderID)
	}

	if rootFolder.Capabilities != nil && !rootFolder.Capabilities.CanAddChildren {
		return fmt.Errorf("service account cannot upload into folder %q", rootFolder.Name)
	}

	return nil
}

func deleteDriveFile(srv *drive.Service, fileID string) error {
	return srv.Files.Delete(fileID).SupportsAllDrives(true).Do()
}

func uploadDataURLToDrive(srv *drive.Service, parentFolderID, dataURL, filePrefix string) (string, error) {
	matches := dataURLPattern.FindStringSubmatch(strings.TrimSpace(dataURL))
	if len(matches) != 3 {
		return "", fmt.Errorf("invalid data URL format")
	}

	mimeType := matches[1]
	encoded := matches[2]

	rawBytes, err := decodeBase64Data(encoded)
	if err != nil {
		return "", fmt.Errorf("failed to decode base64 image: %w", err)
	}

	effectiveMime, err := normalizeUploadMime(mimeType, rawBytes)
	if err != nil {
		return "", err
	}

	ext := extensionFromMimeType(effectiveMime)
	fileName := fmt.Sprintf("%s%s", filePrefix, ext)

	fileMeta := &drive.File{
		Name:     fileName,
		MimeType: effectiveMime,
		Parents:  []string{parentFolderID},
	}

	createdFile, err := srv.Files.Create(fileMeta).
		Media(bytes.NewReader(rawBytes)).
		SupportsAllDrives(true).
		Fields("id,parents").
		Do()
	if err != nil {
		return "", fmt.Errorf("failed to upload file %s: %w", fileName, err)
	}

	_, _ = srv.Permissions.Create(createdFile.Id, &drive.Permission{Type: "anyone", Role: "reader"}).SupportsAllDrives(true).Do()
	return fmt.Sprintf("https://drive.google.com/file/d/%s/view?usp=sharing", createdFile.Id), nil
}

func extensionFromMimeType(mimeType string) string {
	extensions, err := mime.ExtensionsByType(mimeType)
	if err == nil && len(extensions) > 0 {
		return extensions[0]
	}

	if strings.Contains(mimeType, "pdf") {
		return ".pdf"
	}
	if strings.Contains(mimeType, "jpeg") {
		return ".jpg"
	}
	if strings.Contains(mimeType, "png") {
		return ".png"
	}
	if strings.Contains(mimeType, "webp") {
		return ".webp"
	}

	return filepath.Ext(mimeType)
}

func isAllowedUploadMime(mimeType string) bool {
	lower := strings.ToLower(strings.TrimSpace(mimeType))
	if strings.HasPrefix(lower, "image/") {
		return true
	}
	if lower == "application/pdf" {
		return true
	}
	return false
}

func normalizeUploadMime(original string, raw []byte) (string, error) {
	trimmed := strings.ToLower(strings.TrimSpace(original))
	if isAllowedUploadMime(trimmed) {
		return trimmed, nil
	}

	detected := strings.ToLower(strings.TrimSpace(http.DetectContentType(raw)))
	if isAllowedUploadMime(detected) {
		return detected, nil
	}

	return "", fmt.Errorf("unsupported file type: %s", original)
}

func decodeBase64Data(encoded string) ([]byte, error) {
	cleaned := strings.TrimSpace(encoded)
	cleaned = strings.ReplaceAll(cleaned, "\n", "")
	cleaned = strings.ReplaceAll(cleaned, "\r", "")
	cleaned = strings.ReplaceAll(cleaned, " ", "")

	if data, err := base64.StdEncoding.DecodeString(cleaned); err == nil {
		return data, nil
	}
	if data, err := base64.RawStdEncoding.DecodeString(cleaned); err == nil {
		return data, nil
	}
	if data, err := base64.URLEncoding.DecodeString(cleaned); err == nil {
		return data, nil
	}
	if data, err := base64.RawURLEncoding.DecodeString(cleaned); err == nil {
		return data, nil
	}

	return nil, fmt.Errorf("invalid base64 data")
}

func sanitizeDriveName(input string) string {
	sanitized := strings.ToLower(strings.TrimSpace(input))
	sanitized = strings.ReplaceAll(sanitized, " ", "-")
	sanitized = strings.ReplaceAll(sanitized, "/", "-")
	sanitized = strings.ReplaceAll(sanitized, "\\", "-")
	sanitized = strings.ReplaceAll(sanitized, ":", "-")
	return sanitized
}
