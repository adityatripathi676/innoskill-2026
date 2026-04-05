"use client";

import Link from "next/link";
import FormFooter from "@/components/form-footer";
import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import mrlogo from "@/assets/mrlogo.png";
import { Award, CalendarDays, ChevronRight, Cpu, Globe, MapPin, Rocket, ShieldCheck, Trophy, Users, X } from "lucide-react";

type VerticalCard = {
    title: string;
    subtitle: string;
    desc: string;
    image: string;
    events: number;
    gradient: string;
    eventList: string[];
};

// Custom hook for scroll reveal
function useScrollReveal(options: { threshold?: number; rootMargin?: string } = {}) {
    const { threshold = 0.1, rootMargin = "0px 0px -50px 0px" } = options;
    const ref = useRef<HTMLDivElement>(null);
    // Start as true to avoid flash of invisible content
    const [isRevealed, setIsRevealed] = useState(true);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Check if element is already in viewport on mount
        const rect = element.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInView) {
            setIsRevealed(true);
            return;
        }

        // Not in view - start hidden and observe
        setIsRevealed(false);

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsRevealed(true);
                    observer.unobserve(element);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [threshold, rootMargin]);

    return { ref, isRevealed };
}

export default function Page() {
    const [mounted, setMounted] = useState(false);
    const [activeVertical, setActiveVertical] = useState<VerticalCard | null>(null);
    
    // Scroll reveal hooks for different sections
    const verticalsSection = useScrollReveal();
    const founderSection = useScrollReveal();
    const journeySection = useScrollReveal();
    const ctaSection = useScrollReveal();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        function handleEscClose(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setActiveVertical(null);
            }
        }

        window.addEventListener("keydown", handleEscClose);
        return () => window.removeEventListener("keydown", handleEscClose);
    }, []);

    if (!mounted) {
        return <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900" />;
    }

    return (
        <main className="min-h-screen bg-slate-950 text-white overflow-hidden">
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
                        <div className="w-1.5 h-3 bg-white/50 rounded-full scroll-indicator" />
                    </div>
                </div>
            </section>

            {/* VERTICALS - Profile Card Style with Image Backgrounds */}
            <section ref={verticalsSection.ref} className="relative min-h-screen py-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-indigo-950/50 to-slate-950" />
                
                <div className={`relative z-10 mx-auto max-w-7xl px-6 transition-all duration-700 ${verticalsSection.isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
                            8 specialized tracks with updated INNOSKILL 2026 event verticals
                        </p>
                    </div>

                    {/* All 8 Verticals Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            { 
                                title: "Engineering Drift and Design", 
                                subtitle: "Vertical 1",
                                desc: "Engineering competitions, coding, gaming and workshops",
                                image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80", 
                                events: 11,
                                gradient: "from-red-600 to-orange-600",
                                eventList: ["Theme Based Model Demo (Srijan) (Closed)", "Best out of Waste (Nav Srijan) (Closed)", "Code Debugging (Closed)", "LAN Gaming (Closed)", "BioGenius (Closed)", "Vista Vibes- Video Blog (Closed)", "Technical Memes (Closed)", "Build a Circuit (Closed)", "Workshop on Laser Cutting and Design (Closed)", "Workshop on 3D Printing (Closed)", "Capture the Flag (CTF) (Closed)"]
                            },
                            { 
                                title: "Business and Management Conundrum", 
                                subtitle: "Vertical 2",
                                desc: "Business, management and finance competitions",
                                image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80", 
                                events: 4,
                                gradient: "from-orange-500 to-yellow-500",
                                eventList: ["Pro Launch Series 3 (Closed)", "Ideattrackt Series 4 (Closed)", "Poster Making Series 4 (Closed)", "Finance Ki Pathshala Series 3 (Closed)"]
                            },
                            { 
                                title: "Healthcare Mystery", 
                                subtitle: "Vertical 3",
                                desc: "Healthcare and wellness events",
                                image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80", 
                                events: 6,
                                gradient: "from-emerald-500 to-teal-500",
                                eventList: ["Workshop on Body Composition Analysis (Closed)", "Prototype development from farm to fork challege (Closed)", "Food Waste to Wonder Challenge (Closed)", "Oral Hygiene & Hand Hygiene (Closed)", "Basic life Support (Closed)", "YuvaFit (Closed)"]
                            },
                            { 
                                title: "Sustainathon", 
                                subtitle: "Vertical 4",
                                desc: "Sustainability and environment challenges",
                                image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80", 
                                events: 4,
                                gradient: "from-green-500 to-lime-500",
                                eventList: ["Sustainathon ( Idea Pitching) (Closed)", "Eco-reel (Closed)", "My community My Ad (Closed)", "Ecothon - Model making (Closed)"]
                            },
                            { 
                                title: "Culinary and Hospitality", 
                                subtitle: "Vertical 5",
                                desc: "Culinary competitions and demonstrations",
                                image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", 
                                events: 2,
                                gradient: "from-orange-500 to-yellow-500",
                                eventList: ["Flavours of India, Culinary Competition (Closed)", "Demonstration on Tropical Mocktails (Closed)"]
                            },
                            { 
                                title: "Law Knot", 
                                subtitle: "Vertical 6",
                                desc: "Law-based competitive and creative events",
                                image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80", 
                                events: 4,
                                gradient: "from-indigo-500 to-purple-500",
                                eventList: ["Character On Trial (Closed)", "Ink of Freedom (Closed)", "Legal Escape Room (Closed)", "Reel and Appeal (Closed)"]
                            },
                            { 
                                title: "Media and Literary Stumper", 
                                subtitle: "Vertical 7",
                                desc: "Media and literary competitions",
                                image: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=800&q=80", 
                                events: 4,
                                gradient: "from-pink-500 to-rose-500",
                                eventList: ["Techno- Vogue \"Technology Fashion Walk\" (Closed)", "Green Policy Debate (Closed)", "Terrahack (Closed)", "SnapFlickShowdown: \"Reel Making Competition\" (Closed)"]
                            },
                            { 
                                title: "Design Ignite", 
                                subtitle: "Vertical 8",
                                desc: "Design, gaming and creative events",
                                image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80", 
                                events: 4,
                                gradient: "from-violet-500 to-fuchsia-500",
                                eventList: ["BGMI Tourney (Closed)", "Tekken 8 Tournament (Closed)", "EBRU Marbel Painting (Closed)", "DECO Page (Closed)"]
                            },
                        ].map((vertical) => (
                            <div
                                key={vertical.title}
                                className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-500/10"
                                onClick={() => setActiveVertical(vertical)}
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
                                    <div className="mb-2">
                                        <span className="inline-flex items-center gap-1.5 text-[10px] px-2 py-1 rounded-full border border-white/20 bg-black/30 text-white/90 backdrop-blur-sm">
                                            Click to view all events
                                        </span>
                                    </div>
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
                                    Free of cost: Workshop on Body Composition Analysis, Oral Hygiene & Hand Hygiene, Basic life Support, and Demonstration on Tropical Mocktails.
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
                                    8 Event Verticals
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

            {activeVertical && createPortal(
                <div className="fixed inset-0 z-[100]" onClick={() => setActiveVertical(null)}>
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

                    <div
                        className="fixed left-1/2 top-1/2 z-10 w-[calc(100vw-1.5rem)] sm:w-[calc(100vw-3rem)] max-w-3xl max-h-[82vh] -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden border border-white/15 shadow-2xl shadow-black/50 bg-slate-900"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="relative h-48 sm:h-56">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url('${activeVertical.image}')` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/35" />
                            <div className={`absolute inset-0 bg-gradient-to-br ${activeVertical.gradient} opacity-20`} />

                            <div className="relative h-full p-5 sm:p-6 flex flex-col justify-end">
                                <div className="absolute top-4 right-4">
                                    <button
                                        type="button"
                                        onClick={() => setActiveVertical(null)}
                                        className="p-2 rounded-lg bg-black/40 hover:bg-black/60 border border-white/20 transition-colors"
                                    >
                                        <X className="w-5 h-5 text-white" />
                                    </button>
                                </div>

                                <div className="inline-flex items-center gap-2 w-fit px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-[11px] font-semibold text-white/90 mb-2">
                                    {activeVertical.subtitle}
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-black text-white">{activeVertical.title}</h3>
                                <p className="text-white/85 text-sm mt-1 max-w-2xl">{activeVertical.desc}</p>
                            </div>
                        </div>

                        <div className="p-5 sm:p-6 bg-slate-900 max-h-[50vh] sm:max-h-[52vh] overflow-y-auto">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-white font-bold text-lg">Events</h4>
                                <span className="text-xs px-2.5 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30 font-semibold">
                                    {activeVertical.eventList.length} Total
                                </span>
                            </div>

                            <div className="space-y-2">
                                {activeVertical.eventList.map((eventName, idx) => (
                                    <div key={eventName} className="flex items-start gap-3 p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                                        <span className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-300 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                                            {idx + 1}
                                        </span>
                                        <p className="text-sm sm:text-base text-slate-100 leading-relaxed">{eventName}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}

            {/* WHY INNOSKILLS - Clean Image Design */}
            <section ref={founderSection.ref} className="relative py-24 bg-white overflow-hidden text-slate-900 border-t border-slate-200">
                <div className={`relative z-10 mx-auto max-w-7xl px-6 transition-all duration-700 ${founderSection.isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
                                            <h4 className="font-bold text-slate-900">INNOSKILL 2026</h4>
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
            <section ref={journeySection.ref} className="relative min-h-screen py-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
                
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

                <div className={`relative z-10 mx-auto max-w-7xl px-6 transition-all duration-700 ${journeySection.isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
                            <div key={item.step} className="perspective-container" style={{ transitionDelay: `${index * 100}ms` }}>
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
                            className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-slate-600 to-slate-800 px-10 py-5 text-xl font-bold text-white shadow-lg transition-all duration-300 hover:scale-105"
                        >
                            Registrations Closed
                            <CalendarDays className="transition-transform group-hover:rotate-12" size={24} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* FINAL CTA - Immersive Full Screen */}
            <section ref={ctaSection.ref} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900" />
                
                {/* Animated pattern */}
                <div className="absolute inset-0 opacity-20 hover:opacity-30 transition-opacity duration-1000" style={{ backgroundImage: 'linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 60%)', backgroundSize: '30px 30px' }} />
                
                {/* Floating elements */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/20 rounded-full blur-3xl float-3d" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl float-3d" style={{ animationDelay: '-4s' }} />

                <div className={`relative z-10 text-center px-6 max-w-4xl mx-auto transition-all duration-700 ${ctaSection.isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 mb-8 backdrop-blur-sm">
                        <MapPin className="text-orange-400" size={18} />
                        <span className="text-white/90">MRIIRS, Faridabad • 3rd - 4th April, 2026</span>
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
                            className="group relative inline-flex items-center gap-3 rounded-2xl bg-white px-10 py-5 text-xl font-bold text-slate-900 shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden btn-press"
                        >
                            <span className="relative z-10">Registrations Closed</span>
                            <CalendarDays className="relative z-10 transition-transform group-hover:rotate-12" size={24} />
                        </Link>
                    </div>

                    {/* MRIIRS Logo */}
                    <div className="mt-16 flex flex-col items-center gap-4">
                        <Image src={mrlogo} alt="MRIIRS" width={140} className="h-auto opacity-80 hover:opacity-100 transition-opacity duration-300" />
                        <p className="text-white/50 text-sm">Manav Rachna International Institute of Research and Studies</p>
                    </div>
                </div>
            </section>

            <FormFooter dark />
        </main>
    );
}