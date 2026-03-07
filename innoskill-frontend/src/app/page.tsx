"use client";

import Link from "next/link";
import FloatingDownload from "@/components/floating-download";
import FormFooter from "@/components/form-footer";
import SiteNav from "@/components/site-nav";
import { useEffect, useState } from "react";
import Image from "next/image";
import mrlogo from "@/assets/mrlogo.png";
import { Award, BriefcaseBusiness, ChevronRight, Cpu, Globe, MapPin, Rocket, ShieldCheck, Sparkles, Trophy, Users } from "lucide-react";

export default function Page() {
    const [mounted, setMounted] = useState(false);

    const sponsors = [
        { name: "TechNova Labs", role: "Title Sponsor" },
        { name: "FutureStack", role: "Gold Partner" },
        { name: "InnoCircuit", role: "Innovation Partner" },
        { name: "CodeSphere", role: "Tech Partner" },
        { name: "Astra Robotics", role: "Robotics Partner" },
        { name: "BlueGrid", role: "Infrastructure Partner" },
        { name: "CloudForge", role: "Cloud Partner" },
        { name: "Vertex AI", role: "AI Partner" },
    ];

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900" />;
    }

    return (
        <main className="min-h-screen bg-slate-950 text-white overflow-hidden">
            <SiteNav dark />
            <FloatingDownload />

            {/* HERO - Minimal centered design */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Hero Image */}
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?q=80&w=2500&auto=format&fit=crop')` }}
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-900/40 to-slate-950" />

                {/* Centered Content - Just heading and tagline */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
                    <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight">
                        <span className="bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent">INNO</span>
                        <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">SKILL</span>
                    </h1>

                    <p className="mt-4 text-base sm:text-lg md:text-xl text-slate-300">
                        Annual Technical Festival of Manav Rachna
                    </p>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                    <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
                        <div className="w-1.5 h-3 bg-white/50 rounded-full animate-bounce" />
                    </div>
                </div>
            </section>

            {/* VERTICALS - Profile Card Style with Image Backgrounds */}
            <section className="relative min-h-screen py-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-indigo-950/50 to-slate-950" />
                
                <div className="relative z-10 mx-auto max-w-7xl px-6">
                    <div className="text-center mb-16">
                        <p className="inline-flex items-center gap-2 text-red-400 text-sm font-semibold uppercase tracking-widest mb-4">
                            <span className="w-8 h-px bg-gradient-to-r from-red-500 to-orange-500" />
                            Explore
                            <span className="w-8 h-px bg-gradient-to-r from-orange-500 to-yellow-500" />
                        </p>
                        <h2 className="text-4xl md:text-6xl font-black text-white">
                            Event <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">Verticals</span>
                        </h2>
                        <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
                            8 specialized tracks covering 50+ events across engineering, business, healthcare, design, and more
                        </p>
                    </div>

                    {/* All 8 Verticals Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            { 
                                title: "SRIJAN", 
                                subtitle: "Technical & Engineering",
                                desc: "Model demos, coding, circuits, CTF & workshops",
                                image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80", 
                                events: 12,
                                gradient: "from-red-600 to-orange-600",
                                eventList: ["Theme Based Model Demo", "Nav Shrijan", "Code Debugging", "LAN Gaming", "CTF", "Build a Circuit", "3D Printing Workshop"]
                            },
                            { 
                                title: "UDYAM", 
                                subtitle: "Business & Entrepreneurship",
                                desc: "Startup pitching, ideation, finance challenges",
                                image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80", 
                                events: 4,
                                gradient: "from-orange-500 to-yellow-500",
                                eventList: ["Pro Launch Series 3", "Ideattrakt Series 4", "Poster Making", "Finance Ki Pathshala"]
                            },
                            { 
                                title: "AROGYA", 
                                subtitle: "Healthcare & Allied Sciences",
                                desc: "Nutrition, fitness, life support & wellness",
                                image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80", 
                                events: 6,
                                gradient: "from-emerald-500 to-teal-500",
                                eventList: ["Body Composition Workshop", "Food Waste to Wonder", "YuvaFit", "Basic Life Support"]
                            },
                            { 
                                title: "PRITHVI", 
                                subtitle: "Sustainability & Environment",
                                desc: "Eco-innovation, green solutions, awareness",
                                image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80", 
                                events: 5,
                                gradient: "from-green-500 to-lime-500",
                                eventList: ["Sustainathon", "Eco-reel", "My Community My Ad", "Eco-Corner", "Waste Wizards"]
                            },
                            { 
                                title: "AATITHYA", 
                                subtitle: "Hospitality & Culinary",
                                desc: "Culinary arts & mixology demonstrations",
                                image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", 
                                events: 2,
                                gradient: "from-orange-500 to-yellow-500",
                                eventList: ["Ramen Cook Off Challenge", "Tropical Mocktails Demo"]
                            },
                            { 
                                title: "NYAYA", 
                                subtitle: "Law & Legal Tech",
                                desc: "Mock trials, legal startups, AI in law",
                                image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80", 
                                events: 5,
                                gradient: "from-indigo-500 to-purple-500",
                                eventList: ["LexPrenuer", "Trial-by-Fire", "Law through Art", "Legally Bollywood"]
                            },
                            { 
                                title: "SANCHAR", 
                                subtitle: "Media & Communication",
                                desc: "RJ hunt, reels, fashion tech, spell bee",
                                image: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=800&q=80", 
                                events: 4,
                                gradient: "from-pink-500 to-rose-500",
                                eventList: ["Techno-Vogue", "Spell Bee", "Innovoice RJ Hunt", "SnapFlickShowdown"]
                            },
                            { 
                                title: "KALA", 
                                subtitle: "Design & Creative Arts",
                                desc: "Product design, AR, claymation, gaming",
                                image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80", 
                                events: 7,
                                gradient: "from-violet-500 to-fuchsia-500",
                                eventList: ["Claymation", "Tekken 8", "AR Storytelling", "Think & Design", "Recycled Artistry"]
                            },
                        ].map((vertical) => (
                            <div
                                key={vertical.title}
                                className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-500/10"
                            >
                                {/* Background Image */}
                                <div 
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{ backgroundImage: `url('${vertical.image}')` }}
                                />
                                {/* Gradient Overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90`} />
                                <div className={`absolute inset-0 bg-gradient-to-br ${vertical.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                                
                                {/* Content */}
                                <div className="relative z-10 h-full flex flex-col justify-end p-5">
                                    <div className={`inline-flex items-center gap-2 w-fit px-3 py-1 rounded-full bg-gradient-to-r ${vertical.gradient} text-white text-xs font-bold mb-3 shadow-lg`}>
                                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                        {vertical.events} Events
                                    </div>
                                    <h3 className={`text-2xl font-black bg-gradient-to-r ${vertical.gradient} bg-clip-text text-transparent`}>
                                        {vertical.title}
                                    </h3>
                                    <p className="text-zinc-400 text-xs font-medium uppercase tracking-wider mt-1">
                                        {vertical.subtitle}
                                    </p>
                                    <p className="text-zinc-300 text-sm leading-relaxed mt-2 mb-3">
                                        {vertical.desc}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {vertical.eventList.slice(0, 2).map((event) => (
                                            <span key={event} className="text-[10px] px-2 py-1 rounded-full bg-white/10 text-zinc-300 border border-white/10 backdrop-blur-sm">
                                                {event}
                                            </span>
                                        ))}
                                        {vertical.eventList.length > 2 && (
                                            <span className={`text-[10px] px-2 py-1 rounded-full bg-gradient-to-r ${vertical.gradient} text-white font-medium`}>
                                                +{vertical.events - 2} more
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Featured workshop cards */}
                    <div className="mt-12 grid md:grid-cols-2 gap-6">
                        <div 
                            className="group relative h-[260px] rounded-2xl overflow-hidden cursor-pointer"
                        >
                            <div 
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80')` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-red-900/95 via-red-900/80 to-transparent" />
                            <div className="relative z-10 h-full flex flex-col justify-end p-8 max-w-md">
                                <span className="inline-flex items-center gap-2 w-fit px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3 border border-emerald-500/30">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                    Free Workshops
                                </span>
                                <h3 className="text-2xl font-bold text-white mb-2">Hands-on Learning</h3>
                                <p className="text-red-200 leading-relaxed text-sm">
                                    3D Printing, Laser Cutting, Body Composition Analysis, AI in Law, Basic Life Support—free workshops for all participants.
                                </p>
                            </div>
                        </div>
                        <div 
                            className="group relative h-[260px] rounded-2xl overflow-hidden cursor-pointer"
                        >
                            <div 
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80')` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-900/95 via-orange-900/80 to-transparent" />
                            <div className="relative z-10 h-full flex flex-col justify-end p-8 max-w-md">
                                <span className="inline-flex items-center gap-2 w-fit px-3 py-1 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-semibold mb-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                    50+ Events
                                </span>
                                <h3 className="text-2xl font-bold text-white mb-2">Compete & Collaborate</h3>
                                <p className="text-orange-200 leading-relaxed text-sm">
                                    Team up with brilliant minds from across institutions. Individual and team events across all verticals.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHY INNOSKILLS - Clean Image Design */}
            <section className="relative py-24 bg-white overflow-hidden text-slate-900 border-t border-slate-200">
                <div className="relative z-10 mx-auto max-w-7xl px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <p className="text-orange-600 text-sm font-bold uppercase tracking-widest mb-4">Founder Visionary</p>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                                Dr. O.P. Bhalla
                            </h2>
                            <p className="text-slate-500 font-medium mb-6">Manav Rachna (1947 – 2013)</p>
                            
                            <p className="mt-6 text-slate-600 text-lg leading-relaxed">
                                INNOSKILL is annual technical festival of Manav Rachna and is celebrated every year in the memories of our beloved Founder Visionary Dr. O.P Bhalla.
                            </p>

                            <div className="mt-10 space-y-4">
                                {[
                                    { icon: Trophy, title: "Cash Prizes", desc: "Winners awarded with amazing Gift Vouchers and prizes" },
                                    { icon: Award, title: "Certificates", desc: "Certificate of Participation for all participants" },
                                    { icon: Globe, title: "Networking", desc: "Incubation support from MR New Gen-IEDC" },
                                ].map((item) => (
                                    <div key={item.title} className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all duration-300">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                                            <item.icon className="text-orange-600" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800">{item.title}</h4>
                                            <p className="text-slate-500 text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Simple Premium Image */}
                        <div className="relative">
                            <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-2xl">
                                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?q=80&w=2400&auto=format&fit=crop')" }} />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                                            25
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">INNOSKILL 2025</h4>
                                            <p className="text-sm text-slate-600">Celebrating Innovation</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Decorative dot pattern */}
                            <div className="absolute -z-10 -bottom-8 -right-8 w-64 h-64" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fdbba7 2px, transparent 0)', backgroundSize: '24px 24px' }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* JOURNEY - Timeline with 3D effects */}
            <section className="relative min-h-screen py-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
                
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

                <div className="relative z-10 mx-auto max-w-7xl px-6">
                    <div className="text-center mb-16">
                        <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest mb-4">Your Path</p>
                        <h2 className="text-4xl md:text-6xl font-black text-white">
                            The <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">Journey</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6 mt-12">
                        {[
                            { step: "01", title: "Choose Event", desc: "Choose the event of your choice", icon: Cpu, gradient: "from-red-500 to-rose-600" },
                            { step: "02", title: "Form filling", desc: "Fill in the registration form", icon: Users, gradient: "from-orange-500 to-red-600" },
                            { step: "03", title: "Documents", desc: "Upload all your necessary documents", icon: ShieldCheck, gradient: "from-yellow-500 to-orange-600" },
                            { step: "04", title: "Payment", desc: "Pay the participation fee", icon: Trophy, gradient: "from-rose-500 to-red-600" },
                        ].map((item, index) => (
                            <div key={item.step} className="perspective-container">
                                <div className="tilt-card group h-full">
                                    <div className="relative rounded-3xl bg-white/5 border border-white/10 p-8 h-full overflow-hidden hover:border-orange-500/30 transition-colors">
                                        {/* Gradient background on hover */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                                        
                                        <div className="relative z-10">
                                            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${item.gradient} mb-6 pulse-glow`}>
                                                <item.icon className="text-white" size={28} />
                                            </div>
                                            <span className="text-5xl font-black text-white/10 absolute top-4 right-4">{item.step}</span>
                                            <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                            <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                                        </div>

                                        {/* Connection line */}
                                        {index < 3 && (
                                            <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-white/20 to-transparent" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-16 text-center">
                        <Link
                            href="/registration"
                            className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 px-10 py-5 text-xl font-bold text-white shadow-lg shadow-red-500/25 transition-all duration-300 hover:shadow-orange-500/40 hover:scale-105"
                        >
                            Start Your Journey
                            <Rocket className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" size={24} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* SPONSORS - Premium Showcase */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 bg-slate-950" />
                
                <div className="relative z-10 mx-auto max-w-7xl px-6">
                    <div className="text-center mb-16">
                        <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest mb-4">Partners</p>
                        <h2 className="text-4xl md:text-5xl font-black text-white">
                            Powered by <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">Leaders</span>
                        </h2>
                    </div>

                    {/* Sponsor marquee with glass cards */}
                    <div 
                        className="overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm"
                        style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
                    >
                        <div className="sponsor-track">
                            {[...sponsors, ...sponsors].map((sponsor, index) => (
                                <div 
                                    key={`${sponsor.name}-${index}`} 
                                    className="flex-shrink-0 w-[280px] rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-6 hover:border-orange-500/30 hover:bg-white/15 transition-all duration-300 cursor-pointer group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg shadow-red-500/20 group-hover:scale-110 transition-transform">
                                            <Sparkles className="text-white" size={24} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-white group-hover:text-orange-400 transition-colors">{sponsor.name}</p>
                                            <p className="text-xs text-slate-400">{sponsor.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Partnership CTA */}
                    <div className="mt-12 flex items-center justify-center gap-4">
                        <BriefcaseBusiness className="text-slate-400" size={20} />
                        <span className="text-slate-400">Interested in partnering?</span>
                        <Link href="/contact" className="text-orange-400 font-semibold hover:text-orange-300 transition-colors flex items-center gap-1">
                            Get in touch <ChevronRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* FINAL CTA - Immersive Full Screen */}
            <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900" />
                
                {/* Animated pattern */}
                <div className="absolute inset-0 opacity-20 hover:opacity-30 transition-opacity duration-1000" style={{ backgroundImage: 'linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 60%)', backgroundSize: '30px 30px' }} />
                
                {/* Floating elements */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/20 rounded-full blur-3xl float-3d" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl float-3d" style={{ animationDelay: '-4s' }} />

                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 mb-8 backdrop-blur-sm">
                        <MapPin className="text-orange-400" size={18} />
                        <span className="text-white/90">MRIIRS, Faridabad • 3rd - 4th April, 2025</span>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-black text-white leading-tight">
                        Ready to <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">Innovate</span>?
                    </h2>

                    <p className="mt-6 text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                        Join the movement. Register now and be part of the biggest technical festival of 2026.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/registration"
                            className="group relative inline-flex items-center gap-3 rounded-2xl bg-white px-10 py-5 text-xl font-bold text-slate-900 shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
                        >
                            <span className="relative z-10">Register Now</span>
                            <ChevronRight className="relative z-10 transition-transform group-hover:translate-x-1" size={24} />
                            <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                    </div>

                    {/* MRIIRS Logo */}
                    <div className="mt-16 flex flex-col items-center gap-4">
                        <Image src={mrlogo} alt="MRIIRS" width={140} className="h-auto opacity-80 hover:opacity-100 transition-opacity" />
                        <p className="text-white/50 text-sm">Manav Rachna International Institute of Research and Studies</p>
                    </div>
                </div>
            </section>

            <FormFooter dark />
        </main>
    );
}