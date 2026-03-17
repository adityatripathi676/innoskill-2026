import { z } from "zod";

// Step 1: Personal Details Schema
export const userFormSchema = z.object({
    name: z.string()
        .min(2, { message: "Name must be at least 2 characters" })
        .regex(/^[A-Za-z ]+$/, { message: "Name must contain only letters and spaces" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
    scOrUni: z.enum(["School", "University"]),
    institutionName: z.enum(["MRIS", "MRIIRS", "MRU", "Others"], { message: "Please select an institution" }),
    institutionOtherName: z.string().optional(),
    intOrExt: z.enum(["Internal", "External"]),
    roll: z.string().min(1, { message: "Roll number is required" }),
    phoneNumber: z.string().length(10, { message: "Phone number must be 10 digits" }),
    addressLine1: z.string().min(5, { message: "Address line 1 is required" }),
    addressLine2: z.string().optional(),
    city: z.string().min(2, { message: "City is required" }),
    state: z.string().min(2, { message: "State is required" }),
    pinCode: z.string().regex(/^\d{6}$/, { message: "Pin code must be 6 digits" }),
    feeType: z.enum(["Registration", "Accomodation"]),
    teamName: z.string()
        .min(2, { message: "Team name must be at least 2 characters" })
        .regex(/^(?=.*[a-zA-Z])[a-zA-Z0-9 _-]+$/, { message: "Team name must contain at least one letter" }),
    isTeamLeader: z.boolean(),
    aadhaarNumber: z.string()
        .length(12, { message: "Aadhaar number must be 12 digits" })
        .regex(/^\d{12}$/, { message: "Aadhaar must contain only digits" }),
}).refine((data) => data.institutionName !== "Others" || (data.institutionOtherName?.trim().length ?? 0) >= 2, {
    message: "Enter your school or university name",
    path: ["institutionOtherName"],
}).refine((data) => data.institutionName !== "Others" || data.intOrExt === "External", {
    message: "Other institutions must be External participants",
    path: ["intOrExt"],
});

// Step 2: Parent/Guardian Details Schema (required for School students)
export const parentFormSchema = z.object({
    parentType: z.enum(["Father", "Mother", "Guardian"], { message: "Please select parent type" }),
    parentName: z.string()
        .min(2, { message: "Parent name must be at least 2 characters" })
        .regex(/^[A-Za-z ]+$/, { message: "Parent name must contain only letters and spaces" }),
    parentPhone: z.string().length(10, { message: "Parent phone must be 10 digits" }),
    parentAadhaar: z.string()
        .length(12, { message: "Aadhaar must be exactly 12 digits" })
        .regex(/^\d{12}$/, { message: "Aadhaar must contain only digits" }),
});

// Step 3: Bank/NEFT Details Schema
export const bankFormSchema = z.object({
    accountHolderName: z.string().min(2, { message: "Account holder name is required" }),
    accountNumber: z.string()
        .min(9, { message: "Account number must be at least 9 digits" })
        .max(18, { message: "Account number must not exceed 18 digits" })
        .regex(/^\d+$/, { message: "Account number must contain only digits" }),
    confirmAccountNumber: z.string(),
    bankName: z.string().min(2, { message: "Bank name is required" }),
    branchName: z.string().min(2, { message: "Branch name is required" }),
    ifscCode: z.string()
        .length(11, { message: "IFSC code must be exactly 11 characters" })
        .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, { message: "Invalid IFSC code format" }),
    accountType: z.enum(["Savings", "Current"]),
    isParentAccount: z.boolean(),
}).refine((data) => data.accountNumber === data.confirmAccountNumber, {
    message: "Account numbers don't match",
    path: ["confirmAccountNumber"],
});

// Step 4: Document Upload Schema
export const documentFormSchema = z.object({
    cancelledChequePreview: z.string().min(1, { message: "Cancelled cheque is required" }),
    passbookPhotoPreview: z.string().min(1, { message: "Passbook photo is required" }),
    aadhaarPhotoPreview: z.string().optional(), // Required only for minors, validated separately
});

// Step 6: Payment Details Schema
export const paymentFormSchema = z.object({
    transactionID: z.string().min(1, { message: "Transaction ID is required" }),
    transactionDate: z.string().min(1, { message: "Transaction date is required" }),
    paymentReceiptPreview: z.string().min(1, { message: "Payment receipt/screenshot is required" }),
});