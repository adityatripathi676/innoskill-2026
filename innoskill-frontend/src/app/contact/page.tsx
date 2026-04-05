"use client";

import FormFooter from "@/components/form-footer";
import { Mail, MapPin, Building, ExternalLink, Sparkles, Send, ChevronDown, Instagram, Facebook, Globe, MessageCircle, Twitter, ArrowRight, ShieldCheck, UserCircle } from "lucide-react";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";

export default function ContactPage() {
    const heroSection = useScrollReveal();
    const infoSection = useScrollReveal();
    const connectSection = useScrollReveal();
    const mapSection = useScrollReveal();
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const faqs = [
        {
            q: "How do I register for multiple events?",
            a: "You can add multiple events from different verticals into your cart. Once finished, proceed to checkout to complete the bulk registration."
        },
        {
            q: "Is there a registration fee for every event?",
            a: "Yes, each event has its own specific entry fee mentioned in the event selection panel. The final total will be calculated in your checkout summary."
        },
        {
            q: "Can I edit my team details after payment?",
            a: "Post-payment edits are restricted. For critical corrections, please reach out to the Event Support lead with your transaction ID."
        },
        {
            q: "Where is the event being held?",
            a: "The festival is hosted at the MRIIRS Aravalli Hills campus in Faridabad. Detailed venue maps for specific events will be shared closer to the date."
        }
    ];

    return (
        <main className="min-h-screen bg-slate-950 text-slate-200 overflow-x-hidden">
            {/* --- REFINED HERO --- */}
            <section ref={heroSection.ref} className="relative py-24 md:py-32 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20">
                    <img 
                        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000" 
                        alt="Network Grid" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />
                </div>

                <div className={`relative z-10 max-w-5xl mx-auto px-6 text-center transition-all duration-1000 ${heroSection.isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
                        <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-white/60 text-[10px] font-black tracking-widest uppercase">Innoskills 2026</span>
                    </div>
                    
                    <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-white uppercase leading-[0.9]">
                        Connect <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">Center.</span>
                    </h1>
                    
                    <p className="mt-8 text-slate-400 max-w-xl mx-auto text-sm md:text-lg font-light leading-relaxed">
                        Seamless coordination for INNOSKILL 2026 participants and institutional leads.
                    </p>

                    <div className="mt-10 flex justify-center">
                        <Link 
                            href="/coordinators"
                            className="group inline-flex items-center gap-3 px-8 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-orange-500 hover:text-white transition-all duration-300"
                        >
                            View All Coordinators
                            <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* --- COORDINATORS: COMPACT & ICONIC --- */}
            <section id="leads" ref={infoSection.ref} className="relative pb-24 md:pb-32">
                <div className={`max-w-6xl mx-auto px-6 transition-all duration-1000 ${infoSection.isRevealed ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { 
                                name: "Dr. Abhilasha", 
                                email: "abhilasha.set@mriu.edu.in", 
                                role: "Faculty Coordinator",
                                info: "Institutional Coordination"
                            },
                            { 
                                name: "Dr. Nitasha", 
                                email: "nitasha.set@mriu.edu.in", 
                                role: "Faculty Coordinator",
                                info: "Registration & Logistics"
                            }
                        ].map((contact, i) => (
                            <div key={i} className="group relative bg-white/[0.03] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.05] transition-all duration-500 overflow-hidden">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 group-hover:bg-orange-500 group-hover:scale-110 transition-all duration-500">
                                        <UserCircle className="text-orange-500 group-hover:text-white w-8 h-8" />
                                    </div>
                                    <div>
                                        <div className="text-orange-500 text-[10px] font-black uppercase tracking-widest mb-1">{contact.role}</div>
                                        <h3 className="text-2xl font-black text-white uppercase">{contact.name}</h3>
                                        <p className="text-slate-500 text-xs font-medium">{contact.info}</p>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <a 
                                        href={`mailto:${contact.email}`}
                                        className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-orange-400 transition-colors"
                                    >
                                        <Mail size={14} />
                                        {contact.email}
                                        <ArrowRight size={10} className="group-hover:translate-x-2 transition-transform" />
                                    </a>
                                </div>
                                {/* Subtle Background Decor */}
                                <div className="absolute top-0 right-0 p-4 opacity-10 font-bold text-white text-4xl select-none">/0{i+1}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- COMPACT SYNC SECTION: FAQ + SOCIAL DOCK --- */}
            <section ref={connectSection.ref} className="relative py-20 bg-slate-900/30">
                <div className={`max-w-6xl mx-auto px-6 transition-all duration-1000 ${connectSection.isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-start">
                        {/* FAQ Side */}
                        <div>
                             <h2 className="text-3xl font-black text-white uppercase mb-8">Intelligence <span className="text-orange-500">Hub.</span></h2>
                            <div className="space-y-4">
                                {faqs.map((faq, i) => (
                                    <div key={i} className="border-b border-white/5 pb-4">
                                        <button 
                                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                            className="w-full flex items-center justify-between text-left py-3 group"
                                        >
                                            <span className={`text-sm font-bold uppercase tracking-tight transition-colors ${openFaq === i ? 'text-orange-400' : 'text-slate-300 group-hover:text-white'}`}>
                                                {faq.q}
                                            </span>
                                            <ChevronDown size={14} className={`transition-transform duration-500 ${openFaq === i ? 'rotate-180 text-orange-400' : 'text-slate-600'}`} />
                                        </button>
                                        <div className={`transition-all duration-500 overflow-hidden ${openFaq === i ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                                            <p className="text-slate-500 text-xs leading-relaxed font-medium">
                                                {faq.a}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Social Dock Side */}
                        <div className="relative p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden">
                            <h3 className="text-2xl font-black text-white uppercase mb-4">Digital Matrix</h3>
                            <p className="text-slate-400 text-xs font-medium mb-10">Real-time synchronization across our engineering networks.</p>
                            
                            {/* Horizontal Social Dock */}
                            <div className="flex bg-slate-950/50 p-3 rounded-2xl border border-white/5 w-fit gap-2">
                                {[
                                    { icon: Instagram, href: 'https://www.instagram.com/manav_rachna/', color: 'hover:bg-rose-500' },
                                    { icon: Facebook, href: 'https://www.facebook.com/MRIIRSUniversityFaridabad/', color: 'hover:bg-blue-600' },
                                    { icon: Twitter, href: 'https://x.com/manav_rachna', color: 'hover:bg-sky-400' },
                                    { icon: Globe, href: 'https://innoskill.mriic.tech/', color: 'hover:bg-orange-500' }
                                ].map((social, i) => (
                                    <a 
                                        key={i} 
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 group/icon ${social.color}`}
                                    >
                                        <social.icon size={20} className="text-white group-hover/icon:scale-110 transition-transform" />
                                    </a>
                                ))}
                            </div>

                            <a 
                                href="https://innoskill.mriic.tech/index.php/contactor/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-12 flex items-center gap-4 group/chat cursor-pointer"
                            >
                                <div className="w-10 h-10 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center group-hover/chat:bg-orange-500 transition-colors">
                                    <MessageCircle size={16} className="text-orange-500 group-hover/chat:text-white" />
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Live Engineering Support</h4>
                                    <p className="text-[9px] text-slate-500 uppercase tracking-tighter">Est. Ping: 2-3 hrs</p>
                                </div>
                            </a>
                            
                            {/* Visual Decor */}
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- REFINED MAP --- */}
            <section id="venue" ref={mapSection.ref} className="relative py-24">
                <div className={`max-w-6xl mx-auto px-6 transition-all duration-1000 ${mapSection.isRevealed ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        <div className="lg:w-2/5 space-y-8">
                            <div>
                                <h2 className="text-4xl font-black text-white uppercase">The Center.</h2>
                                <p className="text-slate-500 text-sm mt-4 font-medium leading-relaxed">Sector 43, Aravalli Hills, Delhi-Surajkund Road, Faridabad, Haryana 121004</p>
                            </div>
                            
                            <Link 
                                href="https://www.google.com/maps/dir/?api=1&destination=Manav+Rachna+International+Institute+of+Research+and+Studies+Faridabad"
                                target="_blank"
                                className="group inline-flex items-center gap-4 px-8 py-4 bg-orange-500 text-slate-950 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white transition-all duration-500 shadow-xl shadow-orange-500/20"
                            >
                                Get Live Directions
                                <ExternalLink size={14} className="group-hover:rotate-12 transition-transform" />
                            </Link>
                        </div>

                        <div className="lg:w-3/5 w-full h-[400px] relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-3xl">
                             <iframe
                                title="MRIIRS Location Map"
                                src="https://www.google.com/maps?q=Manav%20Rachna%20International%20Institute%20of%20Research%20and%20Studies%20Faridabad&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <FormFooter />
        </main>
    );
}

<style jsx>{`
    @keyframes pulse-slow {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`}</style>
