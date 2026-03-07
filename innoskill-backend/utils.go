package main

import (
	"fmt"
	"strings"

	"google.golang.org/api/sheets/v4"
)

// checkDuplicateTransactionID checks all vertical sheets for an existing transaction ID
func checkDuplicateTransactionID(srv *sheets.Service, transactionID string) (bool, error) {
	// Skip duplicate check for free registrations
	if strings.ToUpper(transactionID) == "FREE" {
		return false, nil
	}

	// Transaction ID is in column J (10th column)
	for i := 1; i <= 8; i++ {
		readRange := fmt.Sprintf("vertical%d!J:J", i)
		resp, err := srv.Spreadsheets.Values.Get(spreadsheetID, readRange).Do()
		if err != nil {
			// If sheet doesn't exist or is empty, continue to next
			continue
		}

		for _, row := range resp.Values {
			if len(row) > 0 {
				existingID, ok := row[0].(string)
				if ok && strings.EqualFold(strings.TrimSpace(existingID), strings.TrimSpace(transactionID)) {
					return true, nil // Duplicate found
				}
			}
		}
	}

	return false, nil // No duplicate found
}

// checkDuplicatePhoneNumber checks all vertical sheets for an existing phone number
func checkDuplicatePhoneNumber(srv *sheets.Service, phoneNumber string) (bool, error) {
	// Phone number is in column F (6th column)
	for i := 1; i <= 8; i++ {
		readRange := fmt.Sprintf("vertical%d!F:F", i)
		resp, err := srv.Spreadsheets.Values.Get(spreadsheetID, readRange).Do()
		if err != nil {
			// If sheet doesn't exist or is empty, continue to next
			continue
		}

		for _, row := range resp.Values {
			if len(row) > 0 {
				existingPhone, ok := row[0].(string)
				if ok && strings.TrimSpace(existingPhone) == strings.TrimSpace(phoneNumber) {
					return true, nil // Duplicate found
				}
			}
		}
	}

	return false, nil // No duplicate found
}

func appendToSheet(
	srv *sheets.Service, 
	verticals []Vertical, 
	baseRow []interface{}, 
	sheetIndex string,
) error {

	if(len(verticals) == 0) {
		return nil
	}

	var rows [][]interface{}
	for _, v := range verticals {
		if v.Members != nil {
			row := append([]interface{}{}, baseRow...) // copy baseRow so we dont modify original
			row = append(row, v.EventName, *v.Members, v.Price)
			rows = append(rows, row)
		}
	}

	if len(rows) > 0 {
		valRange := &sheets.ValueRange{
			Values: rows,	
		}	
		_, err := srv.Spreadsheets.Values.Append(
			spreadsheetID, 
			"vertical"+sheetIndex+"!A2", // Just specify the starting cell
			valRange,
		).ValueInputOption("RAW").Do()

		if err != nil {
			fmt.Printf("Failed to append data to sheet vertical%s: %v\n", sheetIndex, err)
			return err
		}

	}

	return nil
}
