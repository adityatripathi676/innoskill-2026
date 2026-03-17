type Vertical = {
    eventName: string,
    members: string | null,
    price: number,
    free: boolean,
    closed?: boolean
}

// Step 1: Personal Details
export type UserFormData = {
    name: string,
    email: string,
    dateOfBirth: string,
    scOrUni: "School" | "University",
    institutionName: "MRIS" | "MRIIRS" | "MRU" | "Others" | string,
    institutionOtherName: string,
    intOrExt: "Internal" | "External",
    roll: string,
    phoneNumber: string,
    addressLine1: string,
    addressLine2: string,
    city: string,
    state: string,
    pinCode: string,
    feeType: "Registration" | "Accomodation",
    teamName: string,
    isTeamLeader: boolean, // For team events, only leader fills details
    aadhaarNumber: string,
}

// Step 2: Parent/Guardian Details (required for minors/school students)
export type ParentFormData = {
    parentType: "Father" | "Mother" | "Guardian",
    parentName: string,
    parentPhone: string,
    parentAadhaar: string, // For verification
}

// Step 3: Bank/NEFT Details (parent's details for minors)
export type BankFormData = {
    accountHolderName: string,
    accountNumber: string,
    confirmAccountNumber: string,
    bankName: string,
    branchName: string,
    ifscCode: string,
    accountType: "Savings" | "Current",
    isParentAccount: boolean, // True if using parent's account (for minors)
}

// Step 4: Document Uploads
export type DocumentFormData = {
    cancelledCheque: File | null,
    cancelledChequePreview: string,
    passbookPhoto: File | null,
    passbookPhotoPreview: string,
    aadhaarPhoto: File | null, // Required for minors to verify relation
    aadhaarPhotoPreview: string,
}

// Step 5: Event vertical data
export type VerticalData = {
    vertical1: Vertical[]
    vertical2: Vertical[]
    vertical3: Vertical[]
    vertical4: Vertical[]
    vertical5: Vertical[]
    vertical6: Vertical[]
    vertical7: Vertical[]
    vertical8: Vertical[]
}

// Step 6: Payment Details
export type PaymentFormData = {
    transactionID: string,
    transactionDate: string,
    paymentReceipt: File | null,
    paymentReceiptPreview: string,
    totalAmount: number,
}

// Complete Form Data
export type FormData = UserFormData & ParentFormData & BankFormData & DocumentFormData & PaymentFormData & {
    submittedAt: Date | null,
} & VerticalData

export type ProgressBarProps = {
    currentStepIdx: number;
    totalSteps: number;
}