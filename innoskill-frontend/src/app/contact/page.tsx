"use client";

import FormFooter from "@/components/form-footer";
import { Mail, MapPin, Building, ExternalLink, Sparkles, Send, ChevronDown, Instagram, Linkedin, Globe, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";

export default function ContactPage() {
    const heroSection = useScrollReveal();
    const infoSection = useScrollReveal();
    const faqSection = useScrollReveal();
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
        <main className="min-h-screen bg-white overflow-hidden">
            {/* Rich Hero Section with Image Background */}
            <section ref={heroSection.ref} className="relative pt-48 pb-32 bg-slate-950 overflow-hidden">
                {/* Background Image with Dark Overlay */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2000" 
                        alt="Campus Background" 
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950" />
                </div>
                
                <div className={`relative z-10 mx-auto max-w-7xl px-6 text-center transition-all duration-1000 ${heroSection.isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-8">
                        <Sparkles className="text-yellow-400 w-4 h-4" />
                        <span className="text-white/80 text-[10px] font-black tracking-widest uppercase">Official Support Center</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">
                        Connect With <span className="bg-gradient-to-r from-orange-400 via-rose-500 to-amber-400 bg-clip-text text-transparent">Us.</span>
                    </h1>
                    <p className="mt-6 text-slate-300 max-w-2xl mx-auto text-base md:text-xl font-light leading-relaxed">
                        Direct channels for institutional coordination, participant support, and event related inquiries for INNOSKILL 2026.
                    </p>
                </div>
            </section>

            {/* Contact Grid Section */}
            <section ref={infoSection.ref} className="relative -mt-16 pb-20 z-20">
                <div className={`mx-auto max-w-5xl px-6 transition-all duration-1000 delay-300 ${infoSection.isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <div className="grid gap-6 md:grid-cols-2">
                        {[
                            { 
                                name: "Dr. Abhilasha", 
                                email: "abhilasha.set@mriu.edu.in", 
                                role: "Institutional Coordination",
                                description: "Partnerships and university-level liaison."
                            },
                            { 
                                name: "Dr. Nitasha", 
                                email: "nitasha.set@mriu.edu.in", 
                                role: "Event & Registration Support",
                                description: "Participant support and event inquiries."
                            }
                        ].map((contact, i) => (
                            <div 
                                key={i} 
                                className="group relative bg-white/90 backdrop-blur-xl border border-slate-200 rounded-[2.5rem] p-10 hover:border-orange-200 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/50"
                            >
                                <div className="flex items-start gap-6">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-950 flex items-center justify-center text-white flex-shrink-0 group-hover:bg-orange-500 transition-colors duration-300 shadow-xl">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-black text-slate-900 mb-1">{contact.name}</h3>
                                        <div className="text-orange-600 text-xs font-black uppercase tracking-widest mb-4">
                                            {contact.role}
                                        </div>
                                        <p className="text-slate-500 text-sm leading-relaxed mb-8">
                                            {contact.description}
                                        </p>
                                        <a 
                                            href={`mailto:${contact.email}`} 
                                            className="inline-flex items-center gap-3 px-6 py-3 bg-slate-50 hover:bg-slate-900 hover:text-white rounded-xl text-slate-900 font-black text-xs tracking-tight transition-all border border-slate-100 uppercase"
                                        >
                                            Send Email
                                            <Send className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ with Subtle Background */}
            <section ref={faqSection.ref} className="relative py-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000" 
                        alt="Workspace Background" 
                        className="w-full h-full object-cover opacity-5"
                    />
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />
                </div>

                <div className={`relative z-10 mx-auto max-w-6xl px-6 transition-all duration-1000 ${faqSection.isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        {/* FAQ Side */}
                        <div>
                            <div className="mb-12">
                                <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none mb-4">Common Questions</h2>
                                <p className="text-slate-500 text-base">Quick answers to frequently asked coordination queries.</p>
                            </div>
                            <div className="space-y-4">
                                {faqs.map((faq, i) => (
                                    <div key={i} className="border border-slate-200 rounded-[1.5rem] overflow-hidden bg-white/50 group hover:border-orange-200 transition-all shadow-sm">
                                        <button 
                                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                            className="w-full flex items-center justify-between p-6 text-left"
                                        >
                                            <span className="font-bold text-slate-800 text-sm group-hover:text-orange-600 transition-colors">{faq.q}</span>
                                            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                                        </button>
                                        <div className={`transition-all duration-300 overflow-hidden ${openFaq === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <div className="p-6 pt-0 text-slate-500 text-sm leading-relaxed border-t border-slate-100 mt-1">
                                                {faq.a}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Social & Connect Side - Glassmorphic with Imagery */}
                        <div className="relative group rounded-[3.5rem] overflow-hidden p-1 shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
                            {/* Background Image Container */}
                            <div className="absolute inset-0 z-0">
                                <img 
                                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000" 
                                    alt="Innovation" 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-slate-900/60 transition-colors group-hover:bg-slate-900/70" />
                            </div>

                            {/* Glass Content Case */}
                            <div className="relative z-10 h-full flex flex-col justify-center bg-white/10 backdrop-blur-2xl p-12 border border-white/20 rounded-[3.25rem]">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none" />
                                
                                <div className="relative z-20">
                                    <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Stay Updated</h3>
                                    <p className="text-slate-200 text-base mb-10 font-light leading-relaxed">
                                        Join our vibrant digital community. Follow our social channels for live festival updates and behind-the-scenes engineering.
                                    </p>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-rose-400 hover:bg-rose-500/10' },
                                            { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-400 hover:bg-blue-500/10' },
                                            { name: 'Live Link', icon: Globe, href: 'https://innoskill.mriic.tech/', color: 'hover:text-orange-400 hover:bg-orange-500/10' },
                                            { name: 'Support', icon: MessageCircle, href: '#', color: 'hover:text-emerald-400 hover:bg-emerald-500/10' }
                                        ].map((social, i) => (
                                            <a key={i} href={social.href} className={`flex items-center gap-4 p-5 bg-white/10 border border-white/10 rounded-2xl text-white/80 backdrop-blur-md transition-all ${social.color} hover:border-white/30 group/link shadow-lg`}>
                                                <social.icon size={22} className="group-hover/link:scale-110 transition-transform" />
                                                <span className="text-xs font-black uppercase tracking-widest">{social.name}</span>
                                            </a>
                                        ))}
                                    </div>

                                    {/* Mini Image Preview Strip */}
                                    <div className="mt-10 pt-10 border-t border-white/10 flex items-center gap-4">
                                        <div className="flex -space-x-3">
                                            {[
                                                "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=100",
                                                "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=100",
                                                "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=100"
                                            ].map((img, idx) => (
                                                <div key={idx} className="w-10 h-10 rounded-full border-2 border-slate-900 overflow-hidden shadow-xl">
                                                    <img src={img} className="w-full h-full object-cover" alt="User" />
                                                </div>
                                            ))}
                                        </div>
                                        <span className="text-white/60 text-[10px] font-black uppercase tracking-tighter">
                                            +2.4k Innovations Tracked
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section with Simplified Style and subtle background */}
            <section ref={mapSection.ref} className="relative pb-32 pt-16 bg-white overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
                    <img 
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000" 
                        alt="City Architecture" 
                        className="w-full h-full object-cover"
                    />
                </div>
                
                <div className={`relative z-10 mx-auto max-w-7xl px-6 transition-all duration-1000 ${mapSection.isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <div className="grid lg:grid-cols-12 gap-16 items-start">
                        {/* Clean Location Info */}
                        <div className="lg:col-span-4 space-y-10">
                            <div>
                                <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none mb-4">Visit Our <span className="text-orange-500">Campus.</span></h2>
                                <p className="text-slate-500 text-base leading-relaxed">
                                    Join us at the MRIIRS tech hub in Faridabad. We welcome visitors for institutional and collaborative coordination.
                                </p>
                            </div>

                            <div className="space-y-8">
                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 flex-shrink-0 shadow-sm shadow-orange-100">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-900 text-sm uppercase tracking-tighter">Venue Address</h4>
                                        <p className="text-slate-500 text-sm mt-1 leading-relaxed italic">Sector 43, Aravalli Hills, Delhi-Surajkund Road, Faridabad, Haryana 121004</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                                        <Building size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-900 text-sm uppercase tracking-tighter">Reception Hub</h4>
                                        <p className="text-slate-500 text-sm mt-1 leading-relaxed">MRIIRS Main Block (Administrative Wing)</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6">
                                <Link 
                                    href="https://www.google.com/maps/dir/?api=1&destination=Manav+Rachna+International+Institute+of+Research+and+Studies+Faridabad"
                                    target="_blank"
                                    className="inline-flex items-center gap-3 px-10 py-5 bg-slate-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl hover:shadow-orange-200"
                                >
                                    GET LIVE DIRECTIONS
                                    <ExternalLink size={16} />
                                </Link>
                            </div>
                        </div>

                        {/* Professional Map Integration */}
                        <div className="lg:col-span-8 relative">
                            <div className="rounded-[3.5rem] overflow-hidden border-[12px] border-slate-50 shadow-2xl h-[550px]">
                                <iframe
                                    title="MRIIRS Location Map"
                                    src="https://www.google.com/maps?q=Manav%20Rachna%20International%20Institute%20of%20Research%20and%20Studies%20Faridabad&output=embed"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    className="w-full h-full"
                                    loading="lazy"
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
