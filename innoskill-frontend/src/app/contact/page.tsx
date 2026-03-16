"use client";

import FormFooter from "@/components/form-footer";
import { Mail, MapPin, Phone, Clock, Building, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function ContactPage() {
    const heroSection = useScrollReveal();
    const contentSection = useScrollReveal();

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-rose-50/30 overflow-hidden pt-24">
            {/* Hero Section */}
            <section ref={heroSection.ref} className="relative py-20 overflow-hidden">
                {/* Background image with overlay */}
                <div 
                    className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-multiply"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1521737451536-00a86f630f3e?q=80&w=2670&auto=format&fit=crop')` }}
                />
                <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-gradient-to-r from-orange-200/40 to-rose-200/40 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-gradient-to-r from-red-200/30 to-orange-200/30 rounded-full blur-3xl" />
                
                <div className={`relative z-10 mx-auto max-w-7xl px-6 text-center transition-all duration-700 ${heroSection.isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <span className="inline-flex items-center gap-2 rounded-full border border-orange-300 bg-orange-50 px-5 py-2 text-sm font-semibold text-orange-600 mb-6">
                        Get in Touch
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-800">
                        Contact <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Us</span>
                    </h1>
                    <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-lg">
                        For registration support, event queries, or institutional coordination, reach out to the INNOSKILLS team at MRIIRS.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section ref={contentSection.ref} className="relative py-16">
                <div className={`mx-auto max-w-7xl px-6 transition-all duration-700 ${contentSection.isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="grid gap-8 lg:grid-cols-2">
                        {/* Contact Cards */}
                        <div className="space-y-6">
                            {/* Main Contact Card */}
                            <div className="rounded-3xl border border-slate-200 bg-white/80 p-8 backdrop-blur-xl shadow-xl shadow-slate-100 hover-lift">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/25">
                                        <Building className="text-white" size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-800">MRIIRS</h2>
                                        <p className="text-slate-500 text-sm">Manav Rachna International Institute of Research and Studies</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-orange-50 hover:border-orange-200 transition-all duration-300 group">
                                        <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-500 transition-colors duration-300">
                                            <MapPin className="text-indigo-500 group-hover:text-white transition-colors duration-300" size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-slate-800">Address</h3>
                                            <p className="text-slate-500 text-sm mt-1">Sector 43, Aravalli Hills, Delhi-Surajkund Road, Faridabad, Haryana 121004</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-orange-50 hover:border-orange-200 transition-all duration-300 group">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500 transition-colors duration-300">
                                            <Mail className="text-emerald-500 group-hover:text-white transition-colors duration-300" size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-slate-800">Email</h3>
                                            <a href="mailto:innoskills@mriirs.edu.in" className="text-orange-500 text-sm mt-1 hover:text-orange-600 transition-colors flex items-center gap-1">
                                                innoskills@mriirs.edu.in <ExternalLink size={12} />
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-orange-50 hover:border-orange-200 transition-all duration-300 group">
                                        <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center flex-shrink-0 group-hover:bg-rose-500 transition-colors duration-300">
                                            <Phone className="text-rose-500 group-hover:text-white transition-colors duration-300" size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-slate-800">Helpdesk</h3>
                                            <p className="text-slate-500 text-sm mt-1">+91 99999 99999</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-orange-50 hover:border-orange-200 transition-all duration-300 group">
                                        <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500 transition-colors duration-300">
                                            <Clock className="text-cyan-500 group-hover:text-white transition-colors duration-300" size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-slate-800">Event Dates</h3>
                                            <p className="text-slate-500 text-sm mt-1">March 2026 • 2 Days Festival</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="grid grid-cols-2 gap-4">
                                <Link href="/registration" className="group rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 p-6 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] transition-all duration-300 btn-press">
                                    <h3 className="text-lg font-bold text-white">Register Now</h3>
                                    <p className="text-orange-100 text-sm mt-1">Join INNOSKILLS 2026</p>
                                </Link>
                                <Link href="/" className="group rounded-2xl border border-slate-200 bg-white p-6 hover:bg-slate-50 hover:border-orange-300 transition-all shadow-sm">
                                    <h3 className="text-lg font-bold text-slate-800">Explore Events</h3>
                                    <p className="text-slate-500 text-sm mt-1">50+ events across 8 verticals</p>
                                </Link>
                            </div>
                        </div>

                        {/* Map */}
                        <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-100 overflow-hidden">
                            <div className="h-[500px] md:h-full min-h-[400px] overflow-hidden rounded-2xl border border-slate-100">
                                <iframe
                                    title="MRIIRS Location Map"
                                    src="https://www.google.com/maps?q=Manav%20Rachna%20International%20Institute%20of%20Research%20and%20Studies%20Faridabad&output=embed"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <FormFooter />
        </main>
    );
}
