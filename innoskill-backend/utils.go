package main

import (
	"context"
	"fmt"
	"strings"

	"google.golang.org/api/sheets/v4"
)

// checkDuplicateTransactionID checks all vertical sheets for an existing transaction ID
func checkDuplicateTransactionID(ctx context.Context, srv *sheets.Service, transactionID string) (bool, error) {
	// Skip duplicate check for free registrations
	if strings.ToUpper(transactionID) == "FREE" {
		return false, nil
	}

	// Transaction ID is in column J (10th column)
	for i := 1; i <= 8; i++ {
		readRange := fmt.Sprintf("vertical%d!J:J", i)
		resp, err := srv.Spreadsheets.Values.Get(spreadsheetID, readRange).Context(ctx).Do()
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
func checkDuplicatePhoneNumber(ctx context.Context, srv *sheets.Service, phoneNumber string) (bool, error) {
	// Phone number is in column F (6th column)
	for i := 1; i <= 8; i++ {
		readRange := fmt.Sprintf("vertical%d!F:F", i)
		resp, err := srv.Spreadsheets.Values.Get(spreadsheetID, readRange).Context(ctx).Do()
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
	ctx context.Context,
	srv *sheets.Service,
	verticals []Vertical,
	baseRow []interface{},
	sheetIndex string,
	aadhaar string,
) error {

	if len(verticals) == 0 {
		return nil
	}

	var rows [][]interface{}
	for _, v := range verticals {
		if v.Members != nil {
			row := append([]interface{}{}, baseRow...) // copy baseRow so we dont modify original
			row = append(row,
				v.EventName,            // 44. Event Name
				*v.Members,             // 45. Team Members
				v.Price,               // 46. Event Price
				boolToYesNo(v.Free),    // 47. Is Event Free
				boolToYesNo(v.Closed),  // 48. Is Event Closed
				boolToYesNo(v.Closed),  // 49. Is Event Closed (Repeated as requested)
				aadhaar,                // 50. Participant Aadhaar (Hidden at end for duplicate check)
			)
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
		).ValueInputOption("RAW").Context(ctx).Do()

		if err != nil {
			fmt.Printf("Failed to append data to sheet vertical%s: %v\n", sheetIndex, err)
			return err
		}

	}

	return nil
}

// getClosedEvents fetches the list of closed events from the config sheet
func getClosedEvents(ctx context.Context, srv *sheets.Service) ([]string, error) {
	var closedEvents []string

	readRange := "config!A:A"
	resp, err := srv.Spreadsheets.Values.Get(spreadsheetID, readRange).Context(ctx).Do()
	if err != nil {
		// If config sheet doesn't exist, no events are closed
		return closedEvents, nil
	}

	for i, row := range resp.Values {
		// Skip header row
		if i == 0 {
			continue
		}
		if len(row) > 0 {
			eventName, ok := row[0].(string)
			if ok && strings.TrimSpace(eventName) != "" {
				closedEvents = append(closedEvents, strings.TrimSpace(eventName))
			}
		}
	}

	return closedEvents, nil
}

// checkDuplicateAadhaarNumber checks all vertical sheets for an existing Aadhaar number in column AX (50th)
func checkDuplicateAadhaarNumber(ctx context.Context, srv *sheets.Service, aadhaar string) (bool, error) {
	// Aadhaar is in column AX (50th column)
	for i := 1; i <= 8; i++ {
		readRange := fmt.Sprintf("vertical%d!AX:AX", i)
		resp, err := srv.Spreadsheets.Values.Get(spreadsheetID, readRange).Context(ctx).Do()
		if err != nil {
			continue
		}

		for _, row := range resp.Values {
			if len(row) > 0 {
				existingAadhaar, ok := row[0].(string)
				if ok && strings.TrimSpace(existingAadhaar) == strings.TrimSpace(aadhaar) {
					return true, nil
				}
			}
		}
	}

	return false, nil
}

// checkDuplicateTeamName checks all vertical sheets for an existing team name
func checkDuplicateTeamName(ctx context.Context, srv *sheets.Service, teamName string) (bool, error) {
	// Skip check if team name is empty
	if strings.TrimSpace(teamName) == "" {
		return false, nil
	}

	// Team name is in column H (8th column)
	for i := 1; i <= 8; i++ {
		readRange := fmt.Sprintf("vertical%d!H:H", i)
		resp, err := srv.Spreadsheets.Values.Get(spreadsheetID, readRange).Context(ctx).Do()
		if err != nil {
			// If sheet doesn't exist or is empty, continue to next
			continue
		}

		for _, row := range resp.Values {
			if len(row) > 0 {
				existingName, ok := row[0].(string)
				if ok && strings.EqualFold(strings.TrimSpace(existingName), strings.TrimSpace(teamName)) {
					return true, nil // Duplicate found
				}
			}
		}
	}

	return false, nil // No duplicate found
}
