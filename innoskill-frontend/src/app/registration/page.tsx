"use client";

import BankForm from "@/components/bank-form";
import DocumentForm from "@/components/document-form";
import EventForm from "@/components/event-form";
import FormFooter from "@/components/form-footer";
import FormHeader from "@/components/form-header";
import ParentForm from "@/components/parent-form";
import { PaymentForm } from "@/components/payment-form";
import ProgressBar from "@/components/progress-bar";
import UserForm from "@/components/user-form";
import { useMultiForm } from "@/hooks/useMultiForm";
import { userFormSchema, parentFormSchema, bankFormSchema } from "@/schemas/userFormSchema";
import { FormData } from "@/types";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useMemo, Fragment } from "react";
import toast from "react-hot-toast";
import { User, Shield, Landmark, FolderOpen, CalendarDays, CreditCard } from "lucide-react";

const initialData: FormData = {
    // Personal Details
    name: "",
    email: "",
    dateOfBirth: "",
    scOrUni: "University",
    institutionName: "",
    institutionOtherName: "",
    intOrExt: "Internal",
    roll: "",
    phoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pinCode: "",
    feeType: "Registration",
    teamName: "",
    isTeamLeader: true,
    aadhaarNumber: "",
    
    // Parent Details
    parentType: "Father",
    parentName: "",
    parentPhone: "",
    parentAadhaar: "",
    
    // Bank Details
    accountHolderName: "",
    accountNumber: "",
    confirmAccountNumber: "",
    bankName: "",
    branchName: "",
    ifscCode: "",
    accountType: "Savings",
    isParentAccount: false,
    
    // Document Uploads
    cancelledCheque: null,
    cancelledChequePreview: "",
    passbookPhoto: null,
    passbookPhotoPreview: "",
    aadhaarPhoto: null,
    aadhaarPhotoPreview: "",
    
    // Payment Details
    transactionID: "",
    transactionDate: "",
    paymentReceipt: null,
    paymentReceiptPreview: "",
    totalAmount: 0,
    
    // Submission
    submittedAt: null,
    
    // Event Verticals
    vertical1: [
        { eventName: "Theme Based Model Demo (Srijan)", members: null, price: 0, free: false, closed: false },
        { eventName: "Best out of Waste (Nav Srijan)", members: null, price: 0, free: false, closed: false },
        { eventName: "Code Debugging", members: null, price: 0, free: false, closed: false },
        { eventName: "LAN Gaming", members: null, price: 0, free: false, closed: false },
        { eventName: "BioGenius", members: null, price: 0, free: false, closed: false },
        { eventName: "Vista Vibes- Video Blog", members: null, price: 0, free: false, closed: false },
        { eventName: "Technical Memes", members: null, price: 0, free: false, closed: false },
        { eventName: "Build a Circuit", members: null, price: 0, free: false, closed: false },
        { eventName: "Workshop on Laser Cutting and Design", members: null, price: 0, free: false, closed: false },
        { eventName: "Workshop on 3D Printing", members: null, price: 0, free: false, closed: false },
        { eventName: "Capture the Flag (CTF)", members: null, price: 0, free: false, closed: false },
    ],
    vertical2: [
        { eventName: "Pro Launch Series 3", members: null, price: 0, free: false, closed: false },
        { eventName: "Ideattrackt Series 4", members: null, price: 0, free: false, closed: false },
        { eventName: "Poster Making Series 4", members: null, price: 0, free: false, closed: false },
        { eventName: "Finance Ki Pathshala Series 3", members: null, price: 0, free: false, closed: false },
    ],
    vertical3: [
        { eventName: "Workshop on Body Composition Analysis: Principles & Hands-on Training", members: null, price: 0, free: true, closed: false },
        { eventName: "Prototype development from farm to fork challege", members: null, price: 0, free: false, closed: false },
        { eventName: "Food Waste to Wonder Challenge", members: null, price: 0, free: false, closed: false },
        { eventName: "Oral Hygiene & Hand Hygiene", members: null, price: 0, free: true, closed: false },
        { eventName: "Basic life Support", members: null, price: 0, free: true, closed: false },
        { eventName: "YuvaFit", members: null, price: 0, free: false, closed: false },
    ],
    vertical4: [
        { eventName: "Sustainathon ( Idea Pitching)", members: null, price: 0, free: false, closed: false },
        { eventName: "Eco-reel", members: null, price: 0, free: false, closed: false },
        { eventName: "My community My Ad", members: null, price: 0, free: false, closed: false },
        { eventName: "Ecothon - Model making", members: null, price: 0, free: false, closed: false },
    ],
    vertical5: [
        { eventName: "Flavours of India, Culinary Competition", members: null, price: 0, free: false, closed: false },
        { eventName: "Demonstration on Tropical Mocktails", members: null, price: 0, free: true, closed: false },
    ],
    vertical6: [
        { eventName: "Character On Trial", members: null, price: 0, free: false, closed: false },
        { eventName: "Ink of Freedom (Poetry, Shayari , Story-telling competition", members: null, price: 0, free: false, closed: false },
        { eventName: "Legal Escape Room", members: null, price: 0, free: false, closed: false },
        { eventName: "Reel and Appeal", members: null, price: 0, free: false, closed: false },
    ],
    vertical7: [
        { eventName: "Techno- Vogue \"Technology Fashion Walk\"", members: null, price: 0, free: false, closed: false },
        { eventName: "Green Policy Debate", members: null, price: 0, free: false, closed: false },
        { eventName: "Terrahack", members: null, price: 0, free: false, closed: false },
        { eventName: "SnapFlickShowdown: \"Reel Making Competition\"", members: null, price: 0, free: false, closed: false },
    ],
    vertical8: [
        { eventName: "BGMI Tourney", members: null, price: 0, free: false, closed: false },
        { eventName: "Tekken 8 Tournament", members: null, price: 0, free: false, closed: false },
        { eventName: "EBRU Marbel Painting", members: null, price: 0, free: false, closed: false },
        { eventName: "DECO Page", members: null, price: 0, free: false, closed: false },
    ],
};

// RegistrationPage component start

export default function RegistrationPage() {
    const [data, setData] = useState<FormData>(initialData);
    const [prices, setPrices] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();
    const fromUni = data.scOrUni === "University";

    const calculateAge = (dob: string): number | null => {
        if (!dob) return null;
        const birth = new Date(dob);
        if (Number.isNaN(birth.getTime())) return null;
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age -= 1;
        }
        return age;
    };

    // Minor is derived from DOB; fallback to School when DOB is not selected yet
    const age = calculateAge(data.dateOfBirth);
    const isMinor = age !== null ? age < 18 : data.scOrUni === "School";

    // Detect if Techno-Vogue is selected to route to the right QR
    const hasTechnoVogue = data.vertical7?.some(
        (e) => e.eventName.startsWith("Techno- Vogue") && e.members !== null
    ) ?? false;
    const paymentInstitution = hasTechnoVogue ? "TECHNOVOGUE" : data.institutionName;

    const updateFields = (fields: Partial<FormData>) => {
        setData((prev) => ({ ...prev, ...fields }));
    };

    // Build dynamic step configuration
    const stepConfigs = useMemo(() => {
        const configs = [
            { id: "personal", label: "Personal", Icon: User, component: <UserForm {...data} updateFields={updateFields} key="user" /> },
        ];

        if (isMinor) {
            configs.push({ 
                id: "guardian",
                label: "Guardian", 
                Icon: Shield, 
                component: <ParentForm 
                                parentType={data.parentType}
                                parentName={data.parentName}
                                parentPhone={data.parentPhone}
                                parentAadhaar={data.parentAadhaar}
                                updateFields={updateFields}
                                isMinor={isMinor}
                                key="parent"
                            /> 
            });
        }

        configs.push(
            { id: "bank", label: "Bank", Icon: Landmark, component: <BankForm 
                accountHolderName={data.accountHolderName}
                accountNumber={data.accountNumber}
                confirmAccountNumber={data.confirmAccountNumber}
                bankName={data.bankName}
                branchName={data.branchName}
                ifscCode={data.ifscCode}
                accountType={data.accountType}
                isParentAccount={data.isParentAccount}
                updateFields={updateFields}
                isMinor={isMinor}
                parentName={data.parentName}
                key="bank"
            /> },
            { id: "documents", label: "Documents", Icon: FolderOpen, component: <DocumentForm 
                cancelledCheque={data.cancelledCheque}
                cancelledChequePreview={data.cancelledChequePreview}
                passbookPhoto={data.passbookPhoto}
                passbookPhotoPreview={data.passbookPhotoPreview}
                aadhaarPhoto={data.aadhaarPhoto}
                aadhaarPhotoPreview={data.aadhaarPhotoPreview}
                updateFields={updateFields}
                isMinor={isMinor}
                key="documents"
            /> },
            { id: "events", label: "Events", Icon: CalendarDays, component: <EventForm {...data} updateFields={updateFields} setPrices={setPrices} fromUni={fromUni} key="events" /> },
            { id: "payment", label: "Payment", Icon: CreditCard, component: <PaymentForm 
                transactionID={data.transactionID}
                transactionDate={data.transactionDate}
                paymentReceipt={data.paymentReceipt}
                paymentReceiptPreview={data.paymentReceiptPreview}
                totalAmount={prices}
                updateFields={updateFields}
                prices={prices}
                fromUni={fromUni}
                institutionName={paymentInstitution}
                key="payment"
            /> },
        );

        return configs;
    }, [data, isMinor, prices, fromUni, paymentInstitution]);

    const formSteps = useMemo(() => stepConfigs.map(s => s.component), [stepConfigs]);
    const { currentStepIndex, step, FirstStep, LastStep, back, next, isTransitioning, direction } = useMultiForm(formSteps);
    
    const totalSteps = formSteps.length;

    const showError = (message: string) => {
        toast.error(message, {
            position: "top-right",
            style: { backgroundColor: "#1e2939", color: "white" },
        });
    };

    const validateCurrentStep = (): boolean => {
        const currentStepId = stepConfigs[currentStepIndex]?.id;

        // Step: Personal Details
        if (currentStepId === "personal") {
            const {
                name,
                email,
                dateOfBirth,
                scOrUni,
                intOrExt,
                roll,
                feeType,
                teamName,
                institutionName,
                institutionOtherName,
                phoneNumber,
                addressLine1,
                addressLine2,
                city,
                state,
                pinCode,
                isTeamLeader,
                aadhaarNumber,
            } = data;

            if (institutionName === "MRIS" && scOrUni !== "School") {
                showError("MRIS participants must be School category");
                return false;
            }

            if ((institutionName === "MRU" || institutionName === "MRIIRS") && scOrUni !== "University") {
                showError("MRU/MRIIRS participants must be University category");
                return false;
            }

            if (institutionName === "Others" && intOrExt !== "External") {
                showError("Other institutions are External by default");
                return false;
            }

            const validated = userFormSchema.safeParse({
                name,
                email,
                dateOfBirth,
                scOrUni,
                intOrExt,
                roll,
                feeType,
                teamName,
                institutionName,
                institutionOtherName,
                phoneNumber,
                addressLine1,
                addressLine2,
                city,
                state,
                pinCode,
                isTeamLeader,
                aadhaarNumber,
            });
            
            if (!validated.success) {
                showError(validated.error.issues[0].message);
                return false;
            }
        }

        // Step: Parent/Guardian Details (Only validated if shown)
        if (currentStepId === "guardian") {
            const { parentType, parentName, parentPhone, parentAadhaar } = data;
            
            const validated = parentFormSchema.safeParse({ parentType, parentName, parentPhone, parentAadhaar });
            
            if (!validated.success) {
                showError(validated.error.issues[0].message);
                return false;
            }
        }

        // Step: Bank Details
        if (currentStepId === "bank") {
            const { accountHolderName, accountNumber, confirmAccountNumber, bankName, branchName, ifscCode, accountType, isParentAccount } = data;
            
            const validated = bankFormSchema.safeParse({
                accountHolderName, accountNumber, confirmAccountNumber, bankName, branchName, ifscCode, accountType, isParentAccount
            });
            
            if (!validated.success) {
                showError(validated.error.issues[0].message);
                return false;
            }
        }

        // Step: Document Upload
        if (currentStepId === "documents") {
            const { cancelledChequePreview, passbookPhotoPreview, aadhaarPhotoPreview } = data;
            
            if (!aadhaarPhotoPreview) {
                showError("Aadhaar card is required for identity verification");
                return false;
            }

            if (!cancelledChequePreview && !passbookPhotoPreview) {
                showError("Please upload either a cancelled cheque or passbook front page");
                return false;
            }
        }

        // Step: Event Selection - at least one event is required before payment
        if (currentStepId === "events") {
            const hasSelectedEvent = [
                ...data.vertical1,
                 ...data.vertical2,
                ...data.vertical3,
                ...data.vertical4,
                ...data.vertical5,
                ...data.vertical6,
                ...data.vertical7,
                ...data.vertical8,
            ].some((event) => event.members !== null);

            if (!hasSelectedEvent) {
                showError("Please select at least one event to continue");
                return false;
            }
        }

        // Step: Payment Details
        if (currentStepId === "payment") {
            if (prices > 0) {
                if (!data.transactionID) {
                    showError("Please enter the Transaction ID");
                    return false;
                }
                if (!data.transactionDate) {
                    showError("Please enter the Transaction Date");
                    return false;
                }
                if (!data.paymentReceiptPreview) {
                    showError("Please upload payment screenshot/receipt");
                    return false;
                }
            }
        }

        return true;
    };

    const handleNext = () => {
        if (!validateCurrentStep()) return;
        next();
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        if (!LastStep) {
            handleNext();
            return;
        }
        
        if (!validateCurrentStep()) return;

        setIsSubmitting(true);
        
        // Format timestamp in IST
        const submittedAt = new Date().toLocaleString("en-IN", { 
            timeZone: "Asia/Kolkata",
            day: "2-digit",
            month: "2-digit", 
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true
        });

        // Prepare submission data (without File objects)
        const submissionData = {
            ...data,
            submittedAt,
            totalAmount: prices,
            transactionID: prices === 0 ? "FREE" : data.transactionID,
            // Remove File objects (just keep previews for reference)
            cancelledCheque: null,
            passbookPhoto: null,
            aadhaarPhoto: null,
            paymentReceipt: null,
        };

        try {
            const res = await fetch("/api/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(submissionData),
            });

            const contentType = res.headers.get("Content-Type") || "";
            const rawBody = await res.text();
            let resData: { message?: string } | null = null;
            if (contentType.includes("application/json")) {
                try {
                    resData = JSON.parse(rawBody);
                } catch {
                    resData = null;
                }
            }

            if (!res.ok) {
                showError(resData?.message || rawBody || "Submission failed");
                return;
            }
            
            toast.success("Registration submitted successfully!", {
                position: "top-right",
                style: { backgroundColor: "#1e2939", color: "white" },
            });
            
            router.push("/recorded");
        } catch (error) {
            console.error(error);
            showError("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Determine form width based on current step
    const getFormWidth = () => {
        if (currentStepIndex === 4) return 'max-w-6xl'; // Events step - full width
        return 'max-w-4xl'; // Professional wide layout
    };

    return (
        <main className="min-h-screen bg-slate-50 pt-24">
            <section className="relative min-h-[calc(100vh-72px)] flex items-start justify-center py-8 sm:py-14">
                {/* Subtle warm gradient background */}
                <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-orange-50/80 via-orange-50/20 to-transparent pointer-events-none" />

                <div className={`relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8 ${getFormWidth()}`}>
                    <ProgressBar currentStepIdx={currentStepIndex} totalSteps={totalSteps} />

                    {/* Main Form Card */}
                    <div className="bg-white rounded-3xl shadow-2xl shadow-slate-300/20 border border-slate-100 overflow-hidden transition-shadow duration-500 hover:shadow-slate-300/35">
                        {/* Orange–red top accent bar */}
                        <div className="h-1.5 bg-gradient-to-r from-orange-500 via-red-500 to-orange-400" />

                        <div className="p-6 sm:p-8 md:p-10 lg:p-12">
                            <FormHeader />

                            {/* Icon Step Indicator */}
                            <div className="flex items-center mt-7 mb-8 sm:mb-10">
                                {stepConfigs.map(({ label, Icon }, idx) => (
                                    <Fragment key={idx}>
                                        <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                                            <div className={`
                                                w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border-2 transition-all duration-300
                                                ${currentStepIndex === idx
                                                    ? 'bg-orange-500 border-orange-500 shadow-lg shadow-orange-200/70 scale-110'
                                                    : currentStepIndex > idx
                                                        ? 'bg-blue-500 border-blue-500 shadow-sm shadow-blue-200/50'
                                                        : 'bg-white border-slate-200'
                                                }
                                            `}>
                                                {currentStepIndex > idx ? (
                                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                ) : (
                                                    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${currentStepIndex === idx ? 'text-white' : 'text-slate-300'}`} />
                                                )}
                                            </div>
                                            <span className={`text-[9px] sm:text-[10px] font-bold whitespace-nowrap tracking-wide uppercase transition-colors duration-300 ${
                                                currentStepIndex === idx ? 'text-orange-500' : currentStepIndex > idx ? 'text-blue-500' : 'text-slate-300'
                                            }`}>{label}</span>
                                        </div>
                                        {idx < stepConfigs.length - 1 && (
                                            <div className={`flex-1 h-0.5 mx-1.5 sm:mx-2.5 mb-5 rounded-full transition-all duration-500 ${currentStepIndex > idx ? 'bg-blue-400' : 'bg-slate-200'}`} />
                                        )}
                                    </Fragment>
                                ))}
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className={`transition-all duration-300 ease-out ${
                                    isTransitioning
                                        ? direction === 'forward' ? 'opacity-0 translate-x-8' : 'opacity-0 -translate-x-8'
                                        : 'opacity-100 translate-x-0'
                                }`}>
                                    {step}
                                </div>

                                {/* Navigation Buttons */}
                                <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
                                    <div>
                                        {!FirstStep && (
                                            <button
                                                type="button"
                                                onClick={back}
                                                disabled={isTransitioning}
                                                className="group flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl border-2 border-blue-200 text-blue-600 font-semibold text-sm sm:text-base bg-white hover:bg-blue-50 hover:border-blue-400 active:scale-95 transition-all duration-200 disabled:opacity-50 shadow-sm hover:shadow-md"
                                            >
                                                <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                </svg>
                                                Back
                                            </button>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || isTransitioning}
                                        className="group flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-orange-300/40 hover:shadow-orange-400/60 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    >
                                        <span>{!LastStep ? "Continue" : isSubmitting ? "Submitting..." : "Submit Registration"}</span>
                                        {!isSubmitting ? (
                                            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        ) : (
                                            <span className="loading loading-spinner loading-xs sm:loading-sm" />
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <p className="text-center mt-5 text-slate-400 text-xs sm:text-sm">
                        Need help? <a href="mailto:abhilasha.set@mriu.edu.in" className="text-orange-500 hover:text-orange-600 font-medium transition-colors">abhilasha.set@mriu.edu.in</a>
                    </p>
                </div>
            </section>

            <FormFooter />
        </main>
    );
}
