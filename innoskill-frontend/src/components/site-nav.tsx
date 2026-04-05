"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Home, Phone, Sparkles, ChevronRight, ExternalLink } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import mrlogo from "@/assets/mrlogo.png";

export default function SiteNav({
    dark: _dark = false
}: {
    dark?: boolean
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMenuOpen]);

    const navLinks = [
        { href: "/", label: "Home", icon: Home, external: false },
        { href: "/coordinators", label: "Coordinators", icon: Sparkles, external: false },
        { href: "/contact", label: "Contact", icon: Phone, external: false },
        { href: "https://innoskill.mriic.tech/", label: "Official Page", icon: ExternalLink, external: true },
    ];

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    return (
        <>
            {/* Floating Navbar */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}>
                <div className={`mx-auto max-w-6xl px-4 transition-all duration-500 ${scrolled ? "px-4" : "px-6"}`}>
                    <div className={`flex items-center justify-between rounded-2xl transition-all duration-500 ${
                        scrolled 
                            ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 border border-slate-200/60 px-4 py-2" 
                            : "bg-black/30 backdrop-blur-md border border-white/10 px-6 py-3"
                    }`}>
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className={`relative rounded-xl overflow-hidden transition-all duration-300 ${scrolled ? "p-1" : "p-1.5"} ${scrolled ? "bg-gradient-to-br from-orange-50 to-rose-50" : "bg-white/10"}`}>
                                <Image 
                                    src={mrlogo} 
                                    alt="MRIIRS Logo" 
                                    width={scrolled ? 48 : 56} 
                                    height={scrolled ? 48 : 56} 
                                    className="w-auto transition-all duration-300 group-hover:scale-105" 
                                    style={{ height: 'auto' }}
                                />
                            </div>
                            <div className={`hidden sm:block transition-all duration-300 ${scrolled ? "text-slate-800" : "text-white"}`}>
                                <div className="text-xs font-medium opacity-70">MRIIRS presents</div>
                                <div className="text-lg font-black tracking-tight flex items-center gap-1">
                                    INNOSKILL
                                    <span className="text-orange-500 text-xs">2026</span>
                                </div>
                            </div>
                        </Link>

                        {/* Desktop Navigation - Pill Style */}
                        <nav className={`hidden md:flex items-center gap-1 rounded-full p-1.5 transition-all duration-300 ${
                            scrolled ? "bg-slate-100" : "bg-white/10"
                        }`}>
                            {navLinks.map((link) => {
                                const Icon = link.icon;
                                const active = !link.external && isActive(link.href);
                                return link.external ? (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                                            scrolled
                                                ? "text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-sm"
                                                : "text-white/80 hover:bg-white/20 hover:text-white"
                                        }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span>{link.label}</span>
                                    </a>
                                ) : (
                                    <Link 
                                        key={link.href}
                                        href={link.href} 
                                        className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                                            active
                                                ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-lg shadow-orange-500/25"
                                                : scrolled 
                                                    ? "text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-sm"
                                                    : "text-white/80 hover:bg-white/20 hover:text-white"
                                        }`}
                                    >
                                        <Icon className={`w-4 h-4 transition-transform duration-300 ${active ? "scale-110" : ""}`} />
                                        <span>{link.label}</span>
                                        {active && (
                                            <Sparkles className="w-3 h-3 ml-0.5 animate-pulse" />
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* CTA Button - Desktop */}
                        <Link 
                            href="/registration" 
                            className={`hidden lg:flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300 group ${
                                scrolled 
                                    ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 hover:scale-105"
                                    : "bg-white text-slate-900 hover:bg-orange-50 hover:scale-105"
                            }`}
                        >
                            <span>Register Now</span>
                            <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            type="button"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`md:hidden relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                                scrolled 
                                    ? "bg-slate-100 hover:bg-slate-200"
                                    : "bg-white/10 hover:bg-white/20"
                            }`}
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={isMenuOpen}
                        >
                            <div className="relative w-5 h-4 flex flex-col justify-between">
                                <span className={`block w-full h-0.5 rounded-full transition-all duration-300 origin-center ${scrolled ? "bg-slate-800" : "bg-white"} ${isMenuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
                                <span className={`block w-3/4 h-0.5 rounded-full transition-all duration-300 ml-auto ${scrolled ? "bg-slate-800" : "bg-white"} ${isMenuOpen ? "opacity-0 translate-x-2" : ""}`} />
                                <span className={`block w-full h-0.5 rounded-full transition-all duration-300 origin-center ${scrolled ? "bg-slate-800" : "bg-white"} ${isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu - Full Screen */}
            <div 
                className={`fixed inset-0 z-[60] md:hidden transition-all duration-500 ${
                    isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            >
                {/* Backdrop */}
                <div 
                    className={`absolute inset-0 bg-gradient-to-br from-orange-600/95 via-rose-600/95 to-purple-700/95 backdrop-blur-xl transition-all duration-500 ${
                        isMenuOpen ? "opacity-100" : "opacity-0"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                />
                
                {/* Content */}
                <div className={`relative h-full flex flex-col transition-all duration-500 delay-100 ${
                    isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
                }`}>
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-5">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/20 rounded-xl backdrop-blur">
                                <Image src={mrlogo} alt="MRIIRS Logo" width={40} height={40} className="w-auto" style={{ height: 'auto' }} />
                            </div>
                            <div className="text-white">
                                <div className="text-xs font-medium opacity-80">MRIIRS presents</div>
                                <div className="text-lg font-black">INNOSKILL 2026</div>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsMenuOpen(false)} 
                            className="w-11 h-11 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
                        >
                            <div className="relative w-5 h-5">
                                <span className="absolute top-1/2 left-0 w-5 h-0.5 bg-white rounded-full -translate-y-1/2 rotate-45" />
                                <span className="absolute top-1/2 left-0 w-5 h-0.5 bg-white rounded-full -translate-y-1/2 -rotate-45" />
                            </div>
                        </button>
                    </div>

                    {/* Nav Links */}
                    <nav className="flex-1 flex flex-col justify-center px-6 -mt-16">
                        {navLinks.map((link, index) => {
                            const Icon = link.icon;
                            const active = !link.external && isActive(link.href);
                            return link.external ? (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`group flex items-center gap-4 py-5 border-b border-white/10 transition-all duration-300 ${
                                        isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                                    }`}
                                    style={{ transitionDelay: `${150 + index * 75}ms` }}
                                >
                                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/10 text-white group-hover:bg-white/20 transition-all duration-300">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <span className="text-2xl font-bold text-white/90">{link.label}</span>
                                    </div>
                                    <ExternalLink className="w-5 h-5 text-white/40 group-hover:text-white transition-all duration-300" />
                                </a>
                            ) : (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`group flex items-center gap-4 py-5 border-b border-white/10 transition-all duration-300 ${
                                        isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                                    }`}
                                    style={{ transitionDelay: `${150 + index * 75}ms` }}
                                >
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                                        active 
                                            ? "bg-white text-orange-600" 
                                            : "bg-white/10 text-white group-hover:bg-white/20"
                                    }`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <span className={`text-2xl font-bold ${active ? "text-white" : "text-white/90"}`}>
                                            {link.label}
                                        </span>
                                        {active && (
                                            <div className="flex items-center gap-1 mt-0.5">
                                                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                                <span className="text-xs text-white/70 font-medium">Current page</span>
                                            </div>
                                        )}
                                    </div>
                                    <ChevronRight className={`w-6 h-6 text-white/50 transition-all duration-300 ${active ? "text-white" : "group-hover:text-white group-hover:translate-x-1"}`} />
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer CTA */}
                    <div className={`px-6 pb-8 transition-all duration-500 ${
                        isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`} style={{ transitionDelay: "400ms" }}>
                        <Link 
                            href="/registration"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-white text-orange-600 font-bold text-lg shadow-xl hover:scale-[1.02] transition-transform"
                        >
                            <Sparkles className="w-5 h-5" />
                            <span>Register Now</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
