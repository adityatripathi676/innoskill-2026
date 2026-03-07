import { z } from "zod";

export const userFormSchema = z.object({
    name: z.string().nonempty({ message: "Name cannot be empty" }),
    scOrUni: z.enum(["School", "University"]),
    institutionName: z.enum(["MRIS", "MRIIRS", "MRU"], {message: "Institution name cannot be empty"}),
    intOrExt: z.enum(["Internal", "External"]),
    roll: z.string().nonempty({ message: "Roll number cannot be empty" }),
    phoneNumber: z.string().length(10, { message: "Phone number must be 10 digits" }),
    feeType: z.enum(["Registration", "Accomodation"]),
    teamName: z.string()
        .nonempty({ message: "Team name cannot be empty" })
        .regex(/^(?=.*[a-zA-Z])[a-zA-Z0-9 _-]+$/, { message: "Team name must contain at least one letter" })
})