package main

import (
	"bufio"
	"context"
	"crypto/hmac"
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/drive/v3"
	"google.golang.org/api/option"
	"google.golang.org/api/sheets/v4"
)

type FormData struct {
	UserFormData  `json:",inline"`
	PhotoPreviewData `json:",inline"`
	DocumentFileData `json:",inline"`
	SubmittedAt   string `json:"submittedAt"`
	TransactionID string `json:"transactionID" binding:"required"`
	VerticalData  `json:",inline"`
}

var spreadsheetID = getEnv("SPREADSHEET_ID", "1e4ivJIoPODZZ-zVGAUF0jE_K_4W-suw79c1qxSL0To4")

func getEnv(key, fallback string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return fallback
}

func getEnvInt(key string, fallback int) int {
	if value := strings.TrimSpace(os.Getenv(key)); value != "" {
		if parsed, err := strconv.Atoi(value); err == nil {
			return parsed
		}
	}
	return fallback
}

func getEnvInt64(key string, fallback int64) int64 {
	if value := strings.TrimSpace(os.Getenv(key)); value != "" {
		if parsed, err := strconv.ParseInt(value, 10, 64); err == nil {
			return parsed
		}
	}
	return fallback
}

func getEnvDuration(key string, fallback time.Duration) time.Duration {
	if value := strings.TrimSpace(os.Getenv(key)); value != "" {
		if parsed, err := time.ParseDuration(value); err == nil {
			return parsed
		}
	}
	return fallback
}

func main() {
	loadDotEnv(".env")
	printServiceAccountEmail()
	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()

	maxRequestBytes := getEnvInt64("MAX_REQUEST_BYTES", 40<<20) // 40 MB default
	if maxRequestBytes > 0 {
		r.Use(func(c *gin.Context) {
			c.Request.Body = http.MaxBytesReader(c.Writer, c.Request.Body, maxRequestBytes)
			c.Next()
		})
	}

	allowedOrigins := map[string]bool{
		"http://localhost:3000":               true,
		"http://localhost:3001":               true,
		"https://innoskill-2026.vercel.app":   true,
		"https://innoskill-2026-eight.vercel.app": true,
		"https://innoskill-2026.onrender.com": true,
	}

	r.Use(cors.New(cors.Config{
		AllowOriginFunc: func(origin string) bool {
			if allowedOrigins[origin] {
				return true
			}
			if strings.HasPrefix(origin, "https://innoskill-2026-") && strings.HasSuffix(origin, ".onrender.com") {
				return true
			}
			if strings.HasPrefix(origin, "https://innoskill-2026-") && strings.HasSuffix(origin, ".vercel.app") {
				return true
			}
			return false
		},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	requestTimeout := getEnvDuration("REQUEST_TIMEOUT", 60*time.Second)
	maxConcurrent := getEnvInt("MAX_CONCURRENT_REQUESTS", 50)
	var requestSem chan struct{}
	if maxConcurrent > 0 {
		requestSem = make(chan struct{}, maxConcurrent)
	}

	r.POST("/send", func(c *gin.Context) {
		if requestSem != nil {
			select {
			case requestSem <- struct{}{}:
				defer func() { <-requestSem }()
			default:
				c.JSON(http.StatusTooManyRequests, gin.H{"message": "server busy, please retry"})
				return
			}
		}

		ctx, cancel := context.WithTimeout(c.Request.Context(), requestTimeout)
		defer cancel()
		var formData FormData

		if err := c.ShouldBindJSON(&formData); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": "invalid request", "error": err.Error()})
			return
		}

		// Use GOOGLE_CREDENTIALS env var or fall back to secrets.json file
		var srv *sheets.Service
		var err error
		if creds := os.Getenv("GOOGLE_CREDENTIALS"); creds != "" {
			srv, err = sheets.NewService(ctx, option.WithCredentialsJSON([]byte(creds)))
		} else {
			srv, err = sheets.NewService(ctx, option.WithCredentialsFile("secrets.json"))
		}
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "internal server error"})
			return
		}

		// Check for duplicate transaction ID
		isDuplicate, err := checkDuplicateTransactionID(ctx, srv, formData.TransactionID)
		if err != nil {
			fmt.Printf("failed to check duplicate transaction ID: %v\n", err)
			c.JSON(http.StatusInternalServerError, gin.H{"message": "internal server error"})
			return
		}
		if isDuplicate {
			c.JSON(http.StatusBadRequest, gin.H{"message": "Transaction ID already used. Please enter a unique transaction ID."})
			return
		}

		// Check for duplicate phone number
		isPhoneDuplicate, err := checkDuplicatePhoneNumber(ctx, srv, formData.PhoneNumber)
		if err != nil {
			fmt.Printf("failed to check duplicate phone number: %v\n", err)
			c.JSON(http.StatusInternalServerError, gin.H{"message": "internal server error"})
			return
		}
		if isPhoneDuplicate {
			c.JSON(http.StatusBadRequest, gin.H{"message": "This phone number has already been registered. Each participant can only register once."})
			return
		}

		// Check for duplicate Aadhaar number
		isAadhaarDuplicate, err := checkDuplicateAadhaarNumber(ctx, srv, formData.AadhaarNumber)
		if err != nil {
			fmt.Printf("failed to check duplicate Aadhaar number: %v\n", err)
			c.JSON(http.StatusInternalServerError, gin.H{"message": "internal server error"})
			return
		}
		if isAadhaarDuplicate {
			c.JSON(http.StatusBadRequest, gin.H{"message": "This Aadhaar number has already been registered. Each participant can only register once."})
			return
		}

		driveSrv, err := createDriveService(ctx)
		if err != nil {
			fmt.Printf("failed to initialize drive service: %v\n", err)
			c.JSON(http.StatusInternalServerError, gin.H{"message": "internal server error"})
			return
		}

		uploadedPhotoURLs, err := uploadParticipantPhotos(ctx, driveSrv, formData)
		if err != nil {
			fmt.Printf("failed to upload participant photos: %v\n", err)
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}

		guardianBankDocJSON, _ := json.Marshal(gin.H{
			"guardian": gin.H{
				"parentType":    formData.ParentType,
				"parentName":    formData.ParentName,
				"parentPhone":   formData.ParentPhone,
				"parentAadhaar": formData.ParentAadhaar,
			},
			"bank": gin.H{
				"accountHolderName":    formData.AccountHolderName,
				"accountNumber":        formData.AccountNumber,
				"confirmAccountNumber": formData.ConfirmAccountNumber,
				"bankName":             formData.BankName,
				"branchName":           formData.BranchName,
				"ifscCode":             formData.IFSCCode,
				"accountType":          formData.AccountType,
				"isParentAccount":      formData.IsParentAccount,
			},
			"documents": gin.H{
				"cancelledChequePreview": strings.TrimSpace(formData.CancelledChequePreview) != "",
				"passbookPhotoPreview":   strings.TrimSpace(formData.PassbookPhotoPreview) != "",
				"aadhaarPhotoPreview":    strings.TrimSpace(formData.AadhaarPhotoPreview) != "",
				"paymentReceiptPreview":  strings.TrimSpace(formData.PaymentReceiptPreview) != "",
				"cancelledChequeURL":     uploadedPhotoURLs.CancelledChequeURL,
				"passbookPhotoURL":       uploadedPhotoURLs.PassbookPhotoURL,
				"aadhaarPhotoURL":        uploadedPhotoURLs.AadhaarPhotoURL,
				"paymentReceiptURL":      uploadedPhotoURLs.PaymentReceiptURL,
			},
		})

		baseRow := []interface{}{ // this is like any in ts
			formData.Name, formData.ScOrUni, resolvedInstitutionName(formData), formData.IntOrExt, formData.Roll, formData.AadhaarNumber,
			formData.PhoneNumber, formData.FeeType, formData.TeamName, formData.SubmittedAt, formData.TransactionID,
			uploadedPhotoURLs.CancelledChequeURL, uploadedPhotoURLs.PassbookPhotoURL,
			uploadedPhotoURLs.AadhaarPhotoURL, uploadedPhotoURLs.PaymentReceiptURL,
			formData.InstitutionName, formData.InstitutionOtherName,
			formData.Email, formData.DateOfBirth,
			formData.AddressLine1, formData.AddressLine2, formData.City, formData.State, formData.PinCode,
			boolToYesNo(formData.IsTeamLeader),
			formData.ParentType, formData.ParentName, formData.ParentPhone, formData.ParentAadhaar,
			formData.AccountHolderName, formData.AccountNumber, formData.ConfirmAccountNumber,
			formData.BankName, formData.BranchName, formData.IFSCCode, formData.AccountType,
			boolToYesNo(formData.IsParentAccount), formData.TransactionDate, formData.TotalAmount,
			boolToYesNo(strings.TrimSpace(formData.CancelledChequePreview) != ""), boolToYesNo(strings.TrimSpace(formData.PassbookPhotoPreview) != ""),
			boolToYesNo(strings.TrimSpace(formData.AadhaarPhotoPreview) != ""), boolToYesNo(strings.TrimSpace(formData.PaymentReceiptPreview) != ""),
			string(guardianBankDocJSON),
		}

		verticals := [][]Vertical{
			formData.Vertical1,
			formData.Vertical2,
			formData.Vertical3,
			formData.Vertical4,
			formData.Vertical5,
			formData.Vertical6,
			formData.Vertical7,
			formData.Vertical8,
		}

		for i, vertical := range verticals {
			if err := appendToSheet(ctx, srv, vertical, baseRow, strconv.Itoa(i+1)); err != nil {
				fmt.Printf("failed to append to sheet %d: %v\n", i, err)
				c.JSON(http.StatusInternalServerError, gin.H{"message": "failed to append"})
				return
			}
		}

		c.JSON(http.StatusOK, gin.H{"message": "form submitted", "data": formData})
	})

	// OAuth helpers (use once locally to fetch refresh token)
	r.GET("/oauth/start", func(c *gin.Context) {
		conf, err := oauthConfig()
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
			return
		}
		stateSecret, err := oauthStateSecret()
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
			return
		}
		nonce := generateOAuthState()
		state := signOAuthState(nonce, stateSecret)
		c.SetSameSite(http.SameSiteLaxMode)
		c.SetCookie("oauth_state", state, 600, "/", "", isHTTPS(c), false)
		authURL := conf.AuthCodeURL(state, oauth2.AccessTypeOffline, oauth2.ApprovalForce)
		c.Redirect(http.StatusFound, authURL)
	})

	r.GET("/oauth/callback", func(c *gin.Context) {
		stateSecret, err := oauthStateSecret()
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
			return
		}
		queryState := c.Query("state")
		if queryState == "" || !validateOAuthState(queryState, stateSecret) {
			c.JSON(http.StatusBadRequest, gin.H{"message": "invalid oauth state. restart from /oauth/start on the same backend domain and finish login in the same browser session"})
			return
		}

		conf, err := oauthConfig()
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
			return
		}

		code := c.Query("code")
		if code == "" {
			c.JSON(http.StatusBadRequest, gin.H{"message": "missing oauth code"})
			return
		}

		token, err := conf.Exchange(context.Background(), code)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": fmt.Sprintf("token exchange failed: %v", err)})
			return
		}

		if strings.TrimSpace(token.RefreshToken) == "" {
			c.JSON(http.StatusBadRequest, gin.H{"message": "no refresh token returned; ensure access_type=offline and prompt=consent"})
			return
		}

		c.String(http.StatusOK, "Refresh token:\n%s\n\nAdd this to GOOGLE_REFRESH_TOKEN in your backend env.\n", token.RefreshToken)
	})

	// GET /closed-events - returns list of closed events from config sheet
	r.GET("/closed-events", func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(c.Request.Context(), requestTimeout)
		defer cancel()

		var srv *sheets.Service
		var err error
		if creds := os.Getenv("GOOGLE_CREDENTIALS"); creds != "" {
			srv, err = sheets.NewService(ctx, option.WithCredentialsJSON([]byte(creds)))
		} else {
			srv, err = sheets.NewService(ctx, option.WithCredentialsFile("secrets.json"))
		}
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "internal server error"})
			return
		}

		closedEvents, err := getClosedEvents(ctx, srv)
		if err != nil {
			fmt.Printf("failed to get closed events: %v\n", err)
			c.JSON(http.StatusInternalServerError, gin.H{"message": "internal server error"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"closedEvents": closedEvents})
	})

	// Health check
	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})
	r.HEAD("/health", func(c *gin.Context) {
		c.Status(http.StatusOK)
	})

	// Use PORT env var (required by Railway/Render) or default to 8080
	port := getEnv("PORT", "8080")
	server := &http.Server{
		Addr:              ":" + port,
		Handler:           r,
		ReadTimeout:       getEnvDuration("READ_TIMEOUT", 20*time.Second),
		ReadHeaderTimeout: getEnvDuration("READ_HEADER_TIMEOUT", 10*time.Second),
		WriteTimeout:      getEnvDuration("WRITE_TIMEOUT", 90*time.Second),
		IdleTimeout:       getEnvDuration("IDLE_TIMEOUT", 120*time.Second),
		MaxHeaderBytes:    1 << 20,
	}
	server.ListenAndServe()
}

// loadDotEnv reads KEY=VALUE lines from a .env file and sets unset env vars.
// Lines starting with # and blank lines are ignored. Already-set env vars
// are NOT overwritten (same behaviour as dotenv libraries).
func loadDotEnv(filename string) {
	f, err := os.Open(filename)
	if err != nil {
		return // .env is optional
	}
	defer f.Close()
	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}
		idx := strings.IndexByte(line, '=')
		if idx < 1 {
			continue
		}
		key := strings.TrimSpace(line[:idx])
		val := strings.TrimSpace(line[idx+1:])
		// Strip optional surrounding quotes
		if len(val) >= 2 && ((val[0] == '"' && val[len(val)-1] == '"') || (val[0] == '\'' && val[len(val)-1] == '\'')) {
			val = val[1 : len(val)-1]
		}
		if os.Getenv(key) == "" {
			os.Setenv(key, val)
		}
	}
}

func printServiceAccountEmail() {
	type saKey struct {
		ClientEmail string `json:"client_email"`
		ProjectID   string `json:"project_id"`
	}
	var sa saKey
	if creds := os.Getenv("GOOGLE_CREDENTIALS"); creds != "" {
		if err := json.Unmarshal([]byte(creds), &sa); err == nil {
			fmt.Printf("[startup] Service account: %s (project: %s)\n", sa.ClientEmail, sa.ProjectID)
			fmt.Printf("[startup] Share your Drive upload folder with: %s\n", sa.ClientEmail)
		}
	} else {
		data, err := os.ReadFile("secrets.json")
		if err == nil {
			if err := json.Unmarshal(data, &sa); err == nil {
				fmt.Printf("[startup] Service account: %s (project: %s)\n", sa.ClientEmail, sa.ProjectID)
				fmt.Printf("[startup] Share your Drive upload folder with: %s\n", sa.ClientEmail)
			}
		}
	}
}

func oauthConfig() (*oauth2.Config, error) {
	clientID := os.Getenv("GOOGLE_CLIENT_ID")
	clientSecret := os.Getenv("GOOGLE_CLIENT_SECRET")
	redirectURL := getEnv("OAUTH_REDIRECT_URL", "https://innoskill-2026.onrender.com/oauth/callback")
	if clientID == "" || clientSecret == "" {
		return nil, fmt.Errorf("GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be set")
	}

	return &oauth2.Config{
		ClientID:     clientID,
		ClientSecret: clientSecret,
		RedirectURL:  redirectURL,
		Scopes:       []string{drive.DriveScope},
		Endpoint:     google.Endpoint,
	}, nil
}

func oauthStateSecret() ([]byte, error) {
	if secret := os.Getenv("OAUTH_STATE_SECRET"); secret != "" {
		return []byte(secret), nil
	}
	if secret := os.Getenv("GOOGLE_CLIENT_SECRET"); secret != "" {
		return []byte(secret), nil
	}
	return nil, fmt.Errorf("OAUTH_STATE_SECRET or GOOGLE_CLIENT_SECRET must be set")
}

func isHTTPS(c *gin.Context) bool {
	if c.Request.TLS != nil {
		return true
	}
	proto := strings.ToLower(strings.TrimSpace(c.GetHeader("X-Forwarded-Proto")))
	return proto == "https"
}

func generateOAuthState() string {
	b := make([]byte, 32)
	if _, err := rand.Read(b); err != nil {
		return strconv.FormatInt(time.Now().UnixNano(), 10)
	}
	return base64.RawURLEncoding.EncodeToString(b)
}

func signOAuthState(nonce string, secret []byte) string {
	mac := hmac.New(sha256.New, secret)
	mac.Write([]byte(nonce))
	sig := base64.RawURLEncoding.EncodeToString(mac.Sum(nil))
	return nonce + "." + sig
}

func validateOAuthState(state string, secret []byte) bool {
	parts := strings.Split(state, ".")
	if len(parts) != 2 {
		return false
	}
	nonce := parts[0]
	sig := parts[1]
	mac := hmac.New(sha256.New, secret)
	mac.Write([]byte(nonce))
	expected := mac.Sum(nil)
	got, err := base64.RawURLEncoding.DecodeString(sig)
	if err != nil {
		return false
	}
	return hmac.Equal(expected, got)
}

func resolvedInstitutionName(formData FormData) string {
	if strings.EqualFold(strings.TrimSpace(formData.InstitutionName), "Others") && strings.TrimSpace(formData.InstitutionOtherName) != "" {
		return strings.TrimSpace(formData.InstitutionOtherName)
	}
	return formData.InstitutionName
}

func boolToYesNo(value bool) string {
	if value {
		return "Yes"
	}
	return "No"
}
