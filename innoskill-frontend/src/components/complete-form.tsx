import FormFooter from "./form-footer";
import SiteNav from "./site-nav";
import { CheckCircle, Home, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CompleteForm() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30 overflow-hidden">
            <SiteNav />
            
            <section className="relative min-h-[calc(100vh-200px)] flex items-center justify-center overflow-hidden py-20">
                {/* Background orbs */}
                <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-gradient-to-r from-emerald-200/40 to-teal-200/40 rounded-full blur-3xl" style={{ animation: 'morphBlob 12s ease-in-out infinite' }} />
                <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-gradient-to-r from-green-200/30 to-emerald-200/30 rounded-full blur-3xl" style={{ animation: 'morphBlob 15s ease-in-out infinite', animationDelay: '-4s' }} />
                
                {/* Content */}
                <div className="relative z-10 mx-auto max-w-xl px-6 text-center">
                    <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-emerald-100 p-10 md:p-14 shadow-2xl shadow-emerald-100/50">
                        {/* Success Icon with animation */}
                        <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center mb-8 shadow-xl shadow-emerald-500/30 animate-bounce">
                            <CheckCircle className="text-white" size={48} />
                        </div>
                        
                        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">
                            Registration <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Complete!</span>
                        </h1>
                        
                        <p className="mt-6 text-slate-600 leading-relaxed">
                            Your submission has been successfully recorded. We will review it shortly and reach out via the contact information provided.
                        </p>

                        <div className="mt-8 p-4 rounded-xl bg-orange-50 border border-orange-200">
                            <p className="text-orange-600 text-sm font-medium">
                                Please save your transaction ID for future reference. A confirmation email will be sent shortly.
                            </p>
                        </div>

                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link 
                                href="/"
                                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] transition-all"
                            >
                                <Home size={18} />
                                Back to Home
                            </Link>
                            <Link 
                                href="/contact"
                                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all"
                            >
                                Need Help?
                                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            
            <FormFooter />
        </main>
    )
}