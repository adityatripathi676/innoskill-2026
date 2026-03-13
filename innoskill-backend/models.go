package main

type UserFormData struct {
	Name                 string `json:"name" binding:"required"`
	Email                string `json:"email"`
	DateOfBirth          string `json:"dateOfBirth"`
	ScOrUni              string `json:"scOrUni" binding:"required"`
	InstitutionName      string `json:"institutionName" binding:"required"`
	InstitutionOtherName string `json:"institutionOtherName"`
	IntOrExt             string `json:"intOrExt" binding:"required"`
	Roll                 string `json:"roll" binding:"required"`
	PhoneNumber          string `json:"phoneNumber" binding:"required"`
	AddressLine1         string `json:"addressLine1"`
	AddressLine2         string `json:"addressLine2"`
	City                 string `json:"city"`
	State                string `json:"state"`
	PinCode              string `json:"pinCode"`
	FeeType              string `json:"feeType" binding:"required"`
	TeamName             string `json:"teamName" binding:"required"`
	IsTeamLeader         bool   `json:"isTeamLeader"`
	ParentType           string `json:"parentType"`
	ParentName           string `json:"parentName"`
	ParentPhone          string `json:"parentPhone"`
	ParentAadhaar        string `json:"parentAadhaar"`
	AccountHolderName    string `json:"accountHolderName"`
	AccountNumber        string `json:"accountNumber"`
	ConfirmAccountNumber string `json:"confirmAccountNumber"`
	BankName             string `json:"bankName"`
	BranchName           string `json:"branchName"`
	IFSCCode             string `json:"ifscCode"`
	AccountType          string `json:"accountType"`
	IsParentAccount      bool   `json:"isParentAccount"`
}

type Vertical struct {
	EventName string  `json:"eventName" binding:"required"`
	Members   *string `json:"members"`
	Price     int     `json:"price"`
	Free      bool    `json:"free"`
	Closed    bool    `json:"closed"`
}

type VerticalData struct {
	Vertical1 []Vertical `json:"vertical1"`
	Vertical2 []Vertical `json:"vertical2"`
	Vertical3 []Vertical `json:"vertical3"`
	Vertical4 []Vertical `json:"vertical4"`
	Vertical5 []Vertical `json:"vertical5"`
	Vertical6 []Vertical `json:"vertical6"`
	Vertical7 []Vertical `json:"vertical7"`
	Vertical8 []Vertical `json:"vertical8"`
}

type PhotoPreviewData struct {
	CancelledChequePreview string `json:"cancelledChequePreview"`
	PassbookPhotoPreview   string `json:"passbookPhotoPreview"`
	AadhaarPhotoPreview    string `json:"aadhaarPhotoPreview"`
	PaymentReceiptPreview  string `json:"paymentReceiptPreview"`
	TransactionDate        string `json:"transactionDate"`
	TotalAmount            int    `json:"totalAmount"`
}

type DocumentFileData struct {
	CancelledCheque interface{} `json:"cancelledCheque"`
	PassbookPhoto   interface{} `json:"passbookPhoto"`
	AadhaarPhoto    interface{} `json:"aadhaarPhoto"`
	PaymentReceipt  interface{} `json:"paymentReceipt"`
}

type UploadedPhotoURLs struct {
	CancelledChequeURL string
	PassbookPhotoURL   string
	AadhaarPhotoURL    string
	PaymentReceiptURL  string
}
