type Vertical = {
    eventName: string,
    members: string | null,
    price: number,
    free: boolean
}

export type UserFormData = {
    name: string,
    scOrUni: "School" | "University",
    institutionName: "MRIS" | "MRIIRS" | "MRU" | string 
    intOrExt: "Internal" | "External",
    roll: string,
    phoneNumber: string
    feeType: "Registration" | "Accomodation",
    teamName: string,
}

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

export type FormData = UserFormData & {
    submittedAt: Date | null,
    transactionID: string,
} & VerticalData

export type ProgressBarProps = {
    currentStepIdx: number;
    totalSteps: number;
}