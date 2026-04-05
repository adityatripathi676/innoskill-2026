"use client";

import FormFooter from "@/components/form-footer";
import { Mail, Phone, ShieldCheck, Zap, Sparkles, Heart, Leaf, ChefHat, Scale, Mic, Palette, ChevronRight, GraduationCap, Building2, UserCircle2, X, Stars, Database, Globe, Quote, Info, Terminal, LayoutDashboard, Cpu, Network, UserCheck, Briefcase, ArrowUpRight, Award, Command } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

export default function CoordinatorsPage() {
    const heroSection = useScrollReveal();
    const [activeVerticalId, setActiveVerticalId] = useState<string | null>(null);
    const [selectedCoordinator, setSelectedCoordinator] = useState<{ name: string; role: string; email?: string; context?: string } | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setSelectedCoordinator(null);
                setActiveVerticalId(null);
            }
        };
        window.addEventListener('keydown', handleEsc);
        
        if (selectedCoordinator || activeVerticalId) {
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none';
        } else {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        }
        
        return () => { 
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = ''; 
            document.body.style.touchAction = '';
        };
    }, [selectedCoordinator, activeVerticalId]);

    const overallCoordinators = [
        { name: "Dr. Abhilasha", role: "Overall Convener", email: "abhilasha.set@mriu.edu.in", info: "Strategic Operations Lead", icon: ShieldCheck, accent: "border-orange-500/50" },
        { name: "Dr. Nitasha", role: "Overall Convener", email: "nitasha.set@mriu.edu.in", info: "Liaison & Logistics Lead", icon: Database, accent: "border-blue-500/50" }
    ];

    const verticalData = [
        { id: "v1", title: "Engineering", subtitle: "Innovation Matrix", icon: Cpu, accent: "bg-red-500", leads: ["Dr. Senthil", "Dr. Savita Sindhu", "Dr. Ashwini Kumar", "Dr. Arvind Dangi", "Dr. Priyanka Bansal", "Dr. Meenakshi Gupta"], spoc: { name: "Dr. Savita Sindhu", phone: "9971697482", email: "savita.set@mriu.edu.in" }, events: 11, eventList: [ { name: "Srijan", coordinators: "Dr. Sudhanshu Maurya, Dr. Pronika, Dr. Shobha Tyagi, Mr. Vaibhav Singh, Ashok Madaan, Ms. Swati Hans, Ms. Shaveta Jain, Ms. Arushi, Dr. Tanvi Chawla, Dr. Priyanka Rastogi, Dr. Anisha Nagpal, Mr. Vijay Gill, Mr. Bhanu Pratap" }, { name: "Nav Srijan", coordinators: "Dr. Anjali Gupta/Dr. Sunita Joshi, Ms. Anupriya Sharma" }, { name: "Code Debugging", coordinators: "Dr. R.C. Sahoo, Dr. Sourabh Katoch, Ms. Esha Khanna" }, { name: "LAN Gaming", coordinators: "Dr. Monika Garg, Dr. Awwab Mohammad, Ms. Shobha Tyagi" }, { name: "BioGenius", coordinators: "Dr. Vineeta Sharma, Dr. Charu Pathak" }, { name: "Vista Vibes", coordinators: "Dr. Vimlesh Singh, Dr. Piyush Charan" }, { name: "Technical Memes", coordinators: "Dr Nidhi Bansal, Dr. Nitika Yadav" }, { name: "Build a Circuit", coordinators: "Dr. Amana Yadav, Dr. Nitu Chauhan" }, { name: "Laser cutting", coordinators: "Mr. Pankaj Shakkarwal, Mr. Sushant, Dr. Gianender Kajal" }, { name: "3D Printing", coordinators: "Mr. Pankaj Shakkarwal, Mr. Sushant, Dr. J P Sharma" }, { name: "CTF Challenge", coordinators: "Mr. Sijo Joseph, Mr. Agha Imran" } ] },
        { id: "v2", title: "Business", subtitle: "Strategic Hub", icon: Briefcase, accent: "bg-orange-500", leads: ["Mr. M. K. Koul", "Dr. Priyanka Srivastava"], spoc: { name: "Dr. Priyanka Srivastava", phone: "8750415261", email: "priyankasrivastava.slm@mriu.edu.in" }, events: 4, eventList: [ { name: "Pro Launch", coordinators: "Dr. Anjali Singh, Dr. Isha Chhabra, Dr. Priyanka Singh, Dr. Vandana, Dr. Shagun Chahal, CS Jyoti Pandey" }, { name: "Ideattrackt", coordinators: "Dr. Mani Tyagi, Dr. Bhakti Panwar, Dr. Sahiba Sharma" }, { name: "Poster Making", coordinators: "Dr. Shilpa Singh, Dr. Swati Punjani, Dr. Minakshi Sharma, Dr. Ashwarya Kapoor, Dr. Gurpreet Singh, Dr. Suchi" }, { name: "Finance Pathshala", coordinators: "Dr. Anjani Srivastava, Dr. Poonam Singh, Dr. Gurpreet Kaur" } ] },
        { id: "v3", title: "Healthcare", subtitle: "Vital Excellence", icon: Heart, accent: "bg-emerald-500", leads: ["Dr Priya Mishra", "Dr. Priyanka Sethi", "Dr. Monika Tandan"], spoc: { name: "Dr. Priyanka Sethi", phone: "7042637002", email: "priyankasethi.sahs@mriu.edu.in" }, events: 6, eventList: [ { name: "Body Composition", coordinators: "Ms. Vandana Garg" }, { name: "Farm to Fork", coordinators: "Dr. Sarushi Rastogi" }, { name: "Food Waste", coordinators: "Ms. Divya Puri" }, { name: "Oral Hygiene", coordinators: "Dr. Nitin Bhagat" }, { name: "Life Support", coordinators: "Dr. Sunita" }, { name: "YuvaFit", coordinators: "Dr. Mohd. Asif" } ] },
        { id: "v4", title: "Sustainability", subtitle: "Eco-Hub", icon: Leaf, accent: "bg-green-500", leads: ["Dr. Shagufta Jabin", "Dr. Anupma Chadha", "Dr. Priti Gupta", "Ms. Nitu Chauhan"], spoc: { name: "Dr. Shagufta Jabin", phone: "9911007816", email: "shagufta.set@mriu.edu.in" }, events: 4, eventList: [ { name: "Idea Pitching", coordinators: "Dr. Rajeev Kumar, Dr. Vinay Vandan Pathak" }, { name: "Eco-reel", coordinators: "Ms. Usha Chahal / Dr. Mansi Sharma / Ms. Meenal Rawat" }, { name: "Community Ad", coordinators: "Dr. Aarti Saxena, Dr. Riya Chugh / Dr. Babita Yadav" }, { name: "Model Making", coordinators: "Dr. Priti Gupta / Dr. Meenu Khatkar" } ] },
    ];

    const currentVertical = verticalData.find(v => v.id === activeVerticalId);

    const showCeleb = useCallback((name: string, role: string, email?: string, context?: string) => {
        const cleanName = name.split("(")[0].trim();
        setSelectedCoordinator({ name: cleanName, role, email, context });
    }, []);

    const renderModals = () => {
        if (!mounted || !(selectedCoordinator || activeVerticalId)) return null;

        return createPortal(
            <div className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-6 md:p-12 overflow-hidden w-full h-[100dvh]">
                <div className="absolute inset-0 bg-black/95 backdrop-blur-sm animate-fade-in" onClick={() => { setSelectedCoordinator(null); setActiveVerticalId(null); }} />

                <div className="relative z-[10001] w-full max-w-5xl h-auto max-h-[92dvh] flex items-center justify-center pointer-events-none">
                    
                    {/* 1. GRATITUDE CRYSTAL */}
                    {selectedCoordinator && (
                        <div className="relative w-[95%] sm:w-full max-w-xl bg-[#0A0A0A] border border-white/5 rounded-2xl p-8 sm:p-16 md:p-20 text-center animate-celeb-pop-in shadow-2xl pointer-events-auto overflow-y-auto max-h-[90dvh]">
                            <button onClick={() => setSelectedCoordinator(null)} className="absolute top-6 right-6 text-white/30 hover:text-white transition-all">
                                <X size={24} />
                            </button>
                            <div className="space-y-8 sm:space-y-12">
                                <Award className="w-10 h-10 sm:w-16 sm:h-16 text-orange-500 mx-auto opacity-80" />
                                <div className="space-y-4">
                                    <p className="text-orange-500 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] sm:tracking-[0.6em]">Recognition</p>
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tighter leading-none">{selectedCoordinator.name}</h2>
                                    <p className="text-slate-500 text-xs sm:text-sm font-medium uppercase tracking-[0.2em]">{selectedCoordinator.role}</p>
                                </div>
                                <div className="h-px w-10 sm:w-16 bg-white/10 mx-auto" />
                                <div className="space-y-6 sm:space-y-10">
                                    <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed font-light">
                                        "Professionalism and leadership are the cornerstones of INNOSKILLS. Your dedication has been invaluable to our collective success."
                                    </p>
                                    <p className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] pt-6 border-t border-white/5">
                                        Innoskills Committee • 2026
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 2. OPERATIONAL HUB */}
                    {currentVertical && (
                        <div className="relative w-[95%] sm:w-full bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden animate-celeb-pop-in flex flex-col shadow-2xl pointer-events-auto overflow-y-auto max-h-[90dvh]">
                            <div className="relative p-6 sm:p-10 md:p-14">
                                <button onClick={() => setActiveVerticalId(null)} className="absolute top-6 right-6 text-white/30 hover:text-white transition-all z-20"><X size={24} /></button>
                                
                                <div className="mb-10 sm:mb-14 border-b border-white/5 pb-8 sm:pb-12">
                                    <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                                        <div className={`w-8 h-8 rounded-lg ${currentVertical.accent} flex items-center justify-center text-white`}><currentVertical.icon size={16} /></div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Operational Vertical</p>
                                    </div>
                                    <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white tracking-tighter leading-none uppercase">{currentVertical.title}</h2>
                                </div>

                                <div className="grid lg:grid-cols-2 gap-12 sm:gap-20 items-start">
                                    <div className="space-y-10 sm:space-y-16">
                                        <section className="bg-white/5 border border-white/5 rounded-xl p-6 sm:p-10 hover:bg-white/[0.08] transition-all">
                                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-3 opacity-50 uppercase">Vertical SPOC</p>
                                            <h4 className="text-xl sm:text-2xl font-bold text-white uppercase cursor-pointer hover:text-orange-500" onClick={() => showCeleb(currentVertical.spoc.name, "Track Strategist", currentVertical.spoc.email, currentVertical.title)}>{currentVertical.spoc.name}</h4>
                                            <div className="mt-8 space-y-4">
                                                <a href={`tel:${currentVertical.spoc.phone}`} className="text-xs sm:text-sm font-medium text-slate-400 hover:text-white flex items-center gap-3 transition-colors uppercase tracking-widest">
                                                    <Phone size={14} className="text-orange-500/50" /> {currentVertical.spoc.phone}
                                                </a>
                                                <a href={`mailto:${currentVertical.spoc.email}`} className="text-xs sm:text-sm font-medium text-slate-400 hover:text-white flex items-center gap-3 transition-colors uppercase tracking-widest truncate max-w-full">
                                                    <Mail size={14} className="text-orange-500/50" /> {currentVertical.spoc.email}
                                                </a>
                                            </div>
                                        </section>
                                        
                                        <section className="space-y-6 sm:space-y-8">
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] px-1">Management</p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                                                {currentVertical.leads.map((lead, idx) => (
                                                    <button key={idx} onClick={() => showCeleb(lead, "Operation Lead", undefined, currentVertical.title)} className="flex items-center justify-between p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all text-left text-[9px] sm:text-[10px] font-black uppercase text-slate-400 group tracking-widest leading-none">
                                                        {lead} <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all text-orange-500" />
                                                    </button>
                                                ))}
                                            </div>
                                        </section>
                                    </div>

                                    <section className="space-y-8 sm:space-y-12">
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] px-1">Track Units</p>
                                        <div className="grid gap-4 sm:gap-6">
                                            {currentVertical.eventList.map((event, idx) => (
                                                <div key={idx} className="bg-white/5 border border-white/5 rounded-2xl p-6 sm:p-8 hover:border-white/10 transition-all shadow-inner">
                                                    <h6 className="text-[11px] sm:text-[13px] font-black text-white uppercase tracking-tighter mb-5 underline underline-offset-8 decoration-orange-500/20">{event.name}</h6>
                                                    <div className="flex flex-wrap gap-2">
                                                        {event.coordinators.split(",").map((c, iIdx) => (
                                                            <button key={iIdx} onClick={() => showCeleb(c, `Event Coordinator`, undefined, event.name)} className="text-[9px] font-bold text-slate-500 hover:text-white uppercase tracking-widest bg-white/5 px-4 py-2 hover:bg-white/15 transition-all border border-white/5 rounded-sm">{c.trim()}</button>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>,
            document.body
        );
    };

    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-orange-500/20 overflow-x-hidden font-sans antialiased">
            
            {renderModals()}

            <div className="fixed inset-0 z-0 pointer-events-none opacity-10">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            </div>

            <div className="relative z-10 w-full px-5 sm:px-10 md:px-14 lg:px-20 max-w-[1600px] mx-auto">
                
                {/* 1. HERO PRESTIGE (Responsive Sizing) */}
                <header ref={heroSection.ref} className="min-h-[80vh] sm:h-screen flex flex-col justify-center items-start pt-20 sm:pt-0">
                    <div className={`space-y-6 sm:space-y-8 transition-all duration-1000 ${heroSection.isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="flex items-center gap-3 sm:gap-4 text-orange-500 translate-x-1">
                            <Command size={14} className="sm:w-[18px] sm:h-[18px]" />
                            <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.5em] sm:tracking-[0.8em]">ADMINISTRATIVE CORE</p>
                        </div>
                        <h1 className="text-[15vw] sm:text-[12vw] lg:text-[10rem] font-bold text-white tracking-tighter leading-[0.9] uppercase selection:bg-white selection:text-black">
                            COMMAND<span className="text-orange-500">.</span>
                        </h1>
                        <p className="text-slate-500 text-base sm:text-xl md:text-2xl font-medium tracking-tight max-w-2xl leading-snug sm:leading-relaxed">
                            The strategic leadership group orchestrating the <span className="text-white">INNOSKILLS 2026</span> institutional ecosystem.
                        </p>
                    </div>
                </header>

                {/* 2. OVERALL COMMANDERS */}
                <section className="py-20 sm:py-32 border-t border-white/5">
                    <div className="flex flex-col lg:flex-row gap-10 sm:gap-14 lg:gap-8 items-start mb-16 sm:mb-24">
                        <div className="lg:w-1/3"><p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">EXECUTIVE CONVENERS</p></div>
                        <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                            {overallCoordinators.map((lead, i) => (
                                <button key={i} onClick={() => showCeleb(lead.name, lead.role, lead.email, lead.info)} className={`group relative bg-[#0A0A0A] border ${lead.accent} p-8 sm:p-12 text-left hover:bg-white/[0.04] transition-all rounded-sm flex flex-col justify-between min-h-[280px] sm:h-[340px]`}>
                                    <div><lead.icon size={20} className="text-white/20 mb-10 group-hover:text-white transition-all" /></div>
                                    <div className="space-y-6">
                                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tighter leading-none group-hover:translate-x-2 transition-transform uppercase">{lead.name}</h2>
                                        <div className="pt-6 sm:pt-8 border-t border-white/5">
                                            <p className="text-orange-500 text-[10px] font-black uppercase tracking-[0.4em] mb-2">{lead.role}</p>
                                            <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest leading-loose max-w-[200px]">{lead.info}</p>
                                        </div>
                                    </div>
                                    <div className="absolute top-6 right-6 p-2 sm:p-3 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-all"><ArrowUpRight size={14} className="sm:w-4 sm:h-4" /></div>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3. VERTICAL MATRIX */}
                <section className="py-24 sm:py-40 border-t border-white/5">
                    <div className="flex flex-col lg:flex-row gap-10 lg:gap-8 mb-16 sm:mb-24 items-start lg:items-end">
                        <div className="lg:w-1/3">
                            <h2 className="text-[14vw] sm:text-8xl lg:text-9xl font-bold text-white tracking-tighter leading-[0.8] uppercase">CORE MODULES<span className="text-orange-500">.</span></h2>
                        </div>
                        <div className="lg:w-2/3 pb-2 sm:pb-4"><p className="text-slate-600 text-[10px] sm:text-xs uppercase tracking-[0.5em] font-black">Strategic Operations Units</p></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-px bg-transparent sm:bg-white/5 border-none sm:border border-white/5">
                        {verticalData.map((vertical, i) => (
                            <button key={vertical.id} onClick={() => setActiveVerticalId(vertical.id)} className="group relative min-h-[360px] sm:h-[480px] bg-[#0A0A0A] sm:bg-[#050505] p-10 sm:p-12 lg:p-14 overflow-hidden hover:bg-[#0F0F0F] transition-all text-left flex flex-col justify-between border border-white/5 sm:border-none rounded-xl sm:rounded-none shadow-xl sm:shadow-none">
                                <div className="flex items-center justify-between pointer-events-none">
                                    <div className="text-slate-700 text-[10px] sm:text-xs font-black mono tracking-widest uppercase">ID: 0{i+1}</div>
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-600 group-hover:text-white group-hover:border-white transition-all"><vertical.icon size={16} className="sm:w-5 sm:h-5" /></div>
                                </div>
                                <div className="space-y-6 sm:space-y-8 pointer-events-none">
                                    <h3 className="text-3xl sm:text-4xl font-bold text-white uppercase tracking-tighter leading-tight">{vertical.title}</h3>
                                    <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.4em] leading-relaxed max-w-[150px]">{vertical.subtitle}</p>
                                    <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                                        <p className="text-[9px] font-black text-white uppercase tracking-widest opacity-30">{vertical.events} Tracks</p>
                                        <ArrowUpRight size={14} className="text-orange-500 opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0" />
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>

                {/* 4. PLATFORM FORGE */}
                <section className="py-32 sm:py-48 border-t border-white/5">
                    <div className="flex flex-col lg:flex-row gap-20 sm:gap-24 items-center lg:items-start text-center lg:text-left">
                        <div className="lg:w-1/2 space-y-10 sm:space-y-12">
                            <h2 className="text-[15vw] sm:text-8xl lg:text-9xl font-bold text-white tracking-tighter leading-[0.8] uppercase">CORE FORGE<span className="text-orange-500">.</span></h2>
                            <p className="text-slate-600 text-lg sm:text-xl font-medium tracking-tight max-w-md mx-auto lg:mx-0 leading-relaxed uppercase tracking-[0.1em]">Technical Architects of Innoskills Platform</p>
                        </div>
                        <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                            {[
                                { name: "Aditya Tripathi", role: "UI/UX Architect", icon: LayoutDashboard },
                                { name: "Saurav Kumar", role: "Systems Infrastructure", icon: Terminal }
                            ].map((dev, i) => (
                                <button key={i} onClick={() => showCeleb(dev.name, dev.role, undefined, "Operational Forge")} className="group bg-[#0A0A0A] border border-white/5 p-12 sm:p-14 md:p-16 text-left hover:border-white/20 hover:bg-white/[0.04] transition-all rounded-sm relative overflow-hidden h-[260px] sm:h-[300px]">
                                    <dev.icon size={24} className="text-slate-800 mb-10 sm:mb-12 group-hover:text-orange-500 transition-all" />
                                    <h4 className="text-2xl sm:text-3xl font-bold text-white uppercase mb-2 leading-none whitespace-nowrap">{dev.name}</h4>
                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em]">{dev.role}</span>
                                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all"><ArrowUpRight size={16} className="text-orange-500" /></div>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                <FormFooter dark />
            </div>
        </main>
    );
}
