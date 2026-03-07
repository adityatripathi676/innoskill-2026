"use client";

import EventForm from "@/components/event-form";
import FloatingDownload from "@/components/floating-download";
import FormFooter from "@/components/form-footer";
import FormHeader from "@/components/form-header";
import { PaymentForm } from "@/components/payment-form";
import ProgressBar from "@/components/progress-bar";
import SiteNav from "@/components/site-nav";
import UserForm from "@/components/user-form";
import { useMultiForm } from "@/hooks/useMultiForm";
import { userFormSchema } from "@/schemas/userFormSchema";
import { FormData } from "@/types";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const initialData: FormData = {
    name: "",
    scOrUni: "School",
    institutionName: "",
    intOrExt: "Internal",
    roll: "",
    phoneNumber: "",
    feeType: "Registration",
    teamName: "",
    submittedAt: null,
    transactionID: "",
    vertical1: [
        { eventName: "Theme Based Model Demo (Srijan)", members: null, price: 0, free: false },
        { eventName: "Best out of Waste (Nav Shrijan)", members: null, price: 0, free: false },
        { eventName: "Code Debugging", members: null, price: 0, free: false },
        { eventName: "LAN Gaming", members: null, price: 0, free: false },
        { eventName: "BioGenius", members: null, price: 0, free: false },
        { eventName: "Vista Vibes- Video Blog", members: null, price: 0, free: false },
        { eventName: "Technical Memes", members: null, price: 0, free: false },
        { eventName: "Build a Circuit", members: null, price: 0, free: false },
        { eventName: "Workshop on 3D Printing", members: null, price: 0, free: true },
        { eventName: "Workshop on Laser Cutting and Design", members: null, price: 0, free: true },
        { eventName: "Capture the Flag (CTF)", members: null, price: 0, free: false },
        { eventName: "I4C MHA Activity: Awareness against Cybercrime", members: null, price: 0, free: true },
    ],
    vertical2: [
        { eventName: "Pro Launch Series 3", members: null, price: 0, free: false },
        { eventName: "Ideattrakt Series 4", members: null, price: 0, free: false },
        { eventName: "Poster Making Series 4", members: null, price: 0, free: false },
        { eventName: "Finance Ki Pathshala Series 2", members: null, price: 0, free: false },
    ],
    vertical3: [
        { eventName: "Workshop on Body Composition Analysis: Principles & Hands-on Training", members: null, price: 0, free: true },
        { eventName: "Food Waste to wonder challenge", members: null, price: 0, free: false },
        { eventName: "Oral Hygiene & Hand Hygiene", members: null, price: 0, free: false },
        { eventName: "Prototype development from farm to fork challege", members: null, price: 0, free: false },
        { eventName: "YuvaFit", members: null, price: 0, free: false },
        { eventName: "Basic Life Support", members: null, price: 0, free: true },
    ],
    vertical4: [
        { eventName: "Sustainathon ( Idea Pitching)", members: null, price: 0, free: false },
        { eventName: "Eco-reel", members: null, price: 0, free: false },
        { eventName: "My community My Ad", members: null, price: 0, free: false },
        { eventName: "Designing Eco-Corner ", members: null, price: 0, free: false },
        { eventName: "Waste Wizards ", members: null, price: 0, free: false },
    ],
    vertical5: [
        { eventName: "Ramen Cook Off Challenge", members: null, price: 0, free: false },
        { eventName: "Demonstartion on Tropical Mocktails - entry closed", members: null, price: 0, free: true },
    ],
    vertical6: [
        { eventName: "LexPrenuer- (the legal-tech start-up challenge)", members: null, price: 0, free: false },
        { eventName: "Trial-by-Fire- (speed moot)", members: null, price: 0, free: false },
        { eventName: "Law through Art (Legal awareness through poster and memes)", members: null, price: 0, free: false },
        { eventName: "Legally Bollywood (Mock trial of movie characters)", members: null, price: 0, free: false },
        { eventName: "WORKSHOP: Seeing is Deceiving: the power of AI generated content", members: null, price: 0, free: true },
    ],
    vertical7: [
        { eventName: "Techno- Vogue 'Technology Fashion Walk'", members: null, price: 0, free: false },
        { eventName: "Spell Bee Competition 'Who will be the Spell Bee Champion'", members: null, price: 0, free: false },
        { eventName: "Innovoice 'RJ Hunt'", members: null, price: 0, free: false },
        { eventName: "SnapFlickShowdown: 'Reel Making Competition'", members: null, price: 0, free: false },
    ],
    vertical8: [
        { eventName: "From Inside out - 'Elevate your style and persona'", members: null, price: 0, free: false },
        { eventName: "Claymation: Bringing Clay to Life Using a Smartphone", members: null, price: 0, free: false },
        { eventName: "Tekken 8 Tournament", members: null, price: 0, free: false },
        { eventName: "Recycled Artistry", members: null, price: 0, free: false },
        { eventName: "Think & Design - (Product Design Competition)", members: null, price: 0, free: false },
        { eventName: "AR Storytelling Challenge", members: null, price: 0, free: false },
        { eventName: "Miniature Marvel: Designing a lifestyle product", members: null, price: 0, free: false },
    ],
};

export default function RegistrationPage() {
    const [data, setData] = useState<FormData>(initialData);
    const [prices, setPrices] = useState(0);
    const [fromUni, setFromUni] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    const updateFields = (fields: any) => {
        setData((prev) => {
            return { ...prev, ...fields };
        });
    };

    const { currentStepIndex, step, FirstStep, LastStep, back, next } = useMultiForm([
        <UserForm {...data} updateFields={updateFields} setFromUni={setFromUni} key={1} />,
        <EventForm {...data} updateFields={updateFields} setPrices={setPrices} fromUni={fromUni} key={2} />,
        <PaymentForm {...data} updateFields={updateFields} prices={prices} fromUni={fromUni} key={3} />,
    ]);

    const handleNext = () => {
        if (currentStepIndex === 0) {
            const { name, scOrUni, intOrExt, roll, feeType, teamName, institutionName, phoneNumber } = data;

            if (fromUni && institutionName === "MRIS") {
                toast.error("University student cannot be from MRIS!", {
                    position: "top-right",
                    style: {
                        backgroundColor: "#1e2939",
                        color: "white",
                    },
                });
                return;
            }
            const validated = userFormSchema.safeParse({
                name,
                scOrUni,
                intOrExt,
                roll,
                feeType,
                teamName,
                institutionName,
                phoneNumber,
            });
            if (!validated.success) {
                toast.error(validated.error.issues[0].message, {
                    position: "top-right",
                    style: {
                        backgroundColor: "#1e2939",
                        color: "white",
                    },
                });
                return;
            }
            if (!fromUni && institutionName !== "MRIS") {
                toast.error("School student can only be from MRIS!", {
                    position: "top-right",
                    style: {
                        backgroundColor: "#1e2939",
                        color: "white",
                    },
                });
                return;
            }
        }
        next();
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!LastStep) return handleNext();
        if (currentStepIndex === 2 && prices > 0 && !data.transactionID) {
            toast.error("Please fill in the transactionID", {
                position: "top-right",
                style: {
                    backgroundColor: "#1e2939",
                    color: "white",
                },
            });
            return;
        }
        setIsSubmitting(true);
        data.submittedAt = new Date();
        // Set placeholder transaction ID for free registrations (backend requires it)
        if (prices === 0 && !data.transactionID) {
            data.transactionID = "FREE";
        }
        try {
            const res = await fetch(`https://innoskill-2026.onrender.com/send`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const resData = await res.json();
            if (!res.ok) {
                // Show specific error message from backend (e.g., duplicate transaction ID)
                toast.error(resData.message || "Submission failed", {
                    position: "top-right",
                    style: {
                        backgroundColor: "#1e2939",
                        color: "white",
                    },
                });
                return;
            }
            toast.success("Form submitted", {
                position: "top-right",
                style: {
                    backgroundColor: "#1e2939",
                    color: "white",
                },
            });
            router.push("/recorded");
        } catch (error) {
            console.log(error);
            toast.error("An error occurred", {
                position: "top-right",
                style: {
                    backgroundColor: "#1e2939",
                    color: "white",
                },
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-rose-50/30 overflow-hidden pt-24">
            <SiteNav />
            <FloatingDownload />
            <section id="registration-form" className="relative min-h-[calc(100vh-72px)] flex items-center justify-center overflow-hidden py-6 sm:py-12">
                {/* Background image with overlay */}
                <div 
                    className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-multiply"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80')` }}
                />
                
                {/* Animated gradient orbs */}
                <div className="absolute top-0 right-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-gradient-to-br from-orange-200/40 to-rose-200/40 rounded-full blur-3xl" style={{ animation: 'morphBlob 15s ease-in-out infinite' }} />
                <div className="absolute bottom-0 left-0 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-gradient-to-br from-yellow-200/30 to-orange-200/30 rounded-full blur-3xl" style={{ animation: 'morphBlob 18s ease-in-out infinite', animationDelay: '-6s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-gradient-to-br from-red-200/20 to-pink-200/20 rounded-full blur-3xl" style={{ animation: 'morphBlob 12s ease-in-out infinite', animationDelay: '-3s' }} />
                
                {/* Floating geometric shapes - hidden on mobile */}
                <div className="absolute top-20 left-20 w-16 h-16 border-2 border-orange-300/30 rounded-lg rotate-12 hidden sm:block" style={{ animation: 'float-3d 8s ease-in-out infinite' }} />
                <div className="absolute bottom-32 right-32 w-12 h-12 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full hidden sm:block" style={{ animation: 'float-3d 6s ease-in-out infinite', animationDelay: '-2s' }} />
                <div className="absolute top-1/3 right-20 w-8 h-8 border-2 border-rose-300/40 rotate-45 hidden sm:block" style={{ animation: 'float-3d 10s ease-in-out infinite', animationDelay: '-4s' }} />

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                <div className={`relative z-10 mx-auto w-full px-3 sm:px-4 md:px-8 transition-all duration-500 ${currentStepIndex === 1 ? 'max-w-6xl' : 'max-w-2xl'}`}>
                    <ProgressBar currentStepIdx={currentStepIndex} totalSteps={3} />
                    
                    {/* Step indicator pills */}
                    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                        {[1, 2, 3].map((stepNum) => (
                            <div key={stepNum} className="flex items-center gap-1.5 sm:gap-2">
                                <div className={`
                                    relative w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-500
                                    ${currentStepIndex + 1 >= stepNum 
                                        ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-orange-500/30 scale-105 sm:scale-110' 
                                        : 'bg-white/80 text-slate-400 border-2 border-slate-200'
                                    }
                                `}>
                                    {currentStepIndex + 1 > stepNum ? (
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : stepNum}
                                    {currentStepIndex + 1 === stepNum && (
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-orange-500 animate-ping opacity-30" />
                                    )}
                                </div>
                                {stepNum < 3 && (
                                    <div className={`w-8 sm:w-12 h-0.5 sm:h-1 rounded-full transition-all duration-500 ${currentStepIndex + 1 > stepNum ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-slate-200'}`} />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Main form card with glass effect */}
                    <div className="relative group">
                        {/* Glow effect behind card */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-red-500/20 to-rose-500/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        
                        <div className="relative rounded-2xl sm:rounded-3xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl shadow-slate-200/50 p-4 sm:p-6 md:p-10 overflow-hidden">
                            {/* Decorative corner accents */}
                            <div className="absolute top-0 left-0 w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-orange-500/10 to-transparent rounded-br-full" />
                            <div className="absolute bottom-0 right-0 w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-tl from-red-500/10 to-transparent rounded-tl-full" />
                            
                            <FormHeader />
                            
                            <form onSubmit={handleSubmit} className="mt-4 sm:mt-6">
                                <div className="form-step-content">
                                    {step}
                                </div>
                                
                                {/* Navigation buttons */}
                                <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-100">
                                    {!FirstStep && (
                                        <button 
                                            type="button" 
                                            className="group px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 font-semibold text-sm sm:text-base transition-all duration-300 flex items-center gap-1.5 sm:gap-2 touch-manipulation"
                                            onClick={back}
                                        >
                                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                            Back
                                        </button>
                                    )}
                                    <button 
                                        type="button" 
                                        className="group relative px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden flex items-center gap-1.5 sm:gap-2 touch-manipulation" 
                                        onClick={handleSubmit} 
                                        disabled={isSubmitting}
                                    >
                                        <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <span className="relative">{!LastStep ? "Continue" : isSubmitting ? "Submitting..." : "Submit"}</span>
                                        {!isSubmitting && (
                                            <svg className="relative w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        )}
                                        {isSubmitting && <span className="loading loading-spinner loading-xs sm:loading-sm" />}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    
                    {/* Help link */}
                    <p className="text-center mt-4 sm:mt-6 text-slate-500 text-xs sm:text-sm">
                        Need help? Contact <a href="mailto:innoskills@mriirs.edu.in" className="text-orange-500 hover:text-orange-600 font-medium transition-colors">innoskills@mriirs.edu.in</a>
                    </p>
                </div>
            </section>

            <FormFooter />
        </main>
    );
}
