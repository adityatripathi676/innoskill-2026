package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"google.golang.org/api/option"
	"google.golang.org/api/sheets/v4"
)

type FormData struct {
	UserFormData  `json:",inline"`
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

func main() {
	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "http://localhost:3001", "https://innoskill-2026.vercel.app", "https://innoskill-2026.onrender.com"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	r.POST("/send", func(c *gin.Context) {
		ctx := context.Background()
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
		isDuplicate, err := checkDuplicateTransactionID(srv, formData.TransactionID)
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
		isPhoneDuplicate, err := checkDuplicatePhoneNumber(srv, formData.PhoneNumber)
		if err != nil {
			fmt.Printf("failed to check duplicate phone number: %v\n", err)
			c.JSON(http.StatusInternalServerError, gin.H{"message": "internal server error"})
			return
		}
		if isPhoneDuplicate {
			c.JSON(http.StatusBadRequest, gin.H{"message": "This phone number has already been registered. Each participant can only register once."})
			return
		}

		baseRow := []interface{}{ // this is like any in ts
			formData.Name, formData.ScOrUni, formData.InstitutionName, formData.IntOrExt, formData.Roll,
			formData.PhoneNumber, formData.FeeType, formData.TeamName, formData.SubmittedAt, formData.TransactionID,
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
			if err := appendToSheet(srv, vertical, baseRow, strconv.Itoa(i+1)); err != nil {
				fmt.Printf("failed to append to sheet %d: %v\n", i, err)
				c.JSON(http.StatusInternalServerError, gin.H{"message": "failed to append"})
				return
			}
		}

		c.JSON(http.StatusOK, gin.H{"message": "form submitted", "data": formData})
	})

	// Use PORT env var (required by Railway/Render) or default to 8080
	port := getEnv("PORT", "8080")
	r.Run(":" + port)
}
