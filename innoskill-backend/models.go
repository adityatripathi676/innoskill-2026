package main

type UserFormData struct {
	Name            string `json:"name" binding:"required"`
	ScOrUni         string `json:"scOrUni" binding:"required"`
	InstitutionName string `json:"institutionName" binding:"required"`
	IntOrExt        string `json:"intOrExt" binding:"required"`
	Roll            string `json:"roll" binding:"required"`
	PhoneNumber     string `json:"phoneNumber" binding:"required"`
	FeeType         string `json:"feeType" binding:"required"`
	TeamName        string `json:"teamName" binding:"required"`
}

type Vertical struct {
	EventName string  `json:"eventName" binding:"required"`
	Members   *string `json:"members"`
	Price     int     `json:"price"`
	Free      bool    `json:"free"`
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
