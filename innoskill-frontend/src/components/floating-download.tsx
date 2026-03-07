"use client";

import { useState, useEffect, useRef } from "react";
import { Download, X, Calendar, Map, ChevronDown, BookOpen } from "lucide-react";
import { downloadPaths } from "@/config/images";

type DownloadItem = {
    id: string;
    label: string;
    description?: string;
    icon: React.ElementType;
    url: string;
    filename?: string;
    isExternal?: boolean;
};

const downloadItems: DownloadItem[] = [
    {
        id: "brochure",
        label: "Event Brochure",
        description: "Complete festival details",
        icon: BookOpen,
        url: downloadPaths.brochure,
        filename: "INNOSKILLS-2026-Brochure.pdf"
    },
    {
        id: "schedule",
        label: "Event Schedule",
        description: "Day-wise event timings",
        icon: Calendar,
        url: downloadPaths.schedule,
        filename: "INNOSKILLS-2026-Schedule.pdf"
    },
    {
        id: "venue",
        label: "Venue Map",
        description: "Campus navigation guide",
        icon: Map,
        url: downloadPaths.venueMap,
        filename: "INNOSKILLS-2026-Venue-Map.pdf"
    },
];

export default function FloatingDownload() {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Show button after scrolling down a bit
    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 200);
        };
        
        // Initial check
        handleScroll();
        
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isOpen]);

    const handleDownload = (item: DownloadItem) => {
        // Create a temp link and trigger download
        const link = document.createElement("a");
        link.href = item.url;
        link.download = item.filename || item.label;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div 
            ref={menuRef}
            className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
            }`}
        >
            {/* Popup Menu */}
            <div 
                className={`absolute bottom-full right-0 mb-3 w-64 sm:w-72 bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transition-all duration-300 origin-bottom-right ${
                    isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
                }`}
            >
                {/* Header */}
                <div className="px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Download className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            <span className="text-white font-bold text-sm sm:text-base">Downloads</span>
                        </div>
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="p-1 hover:bg-white/20 rounded-lg transition-colors touch-manipulation"
                            aria-label="Close downloads"
                        >
                            <X className="w-4 h-4 text-white" />
                        </button>
                    </div>
                </div>

                {/* Download Items */}
                <div className="p-2 max-h-[280px] overflow-y-auto">
                    {downloadItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleDownload(item)}
                                className="w-full p-2.5 sm:p-3 rounded-lg sm:rounded-xl flex items-center gap-2.5 sm:gap-3 hover:bg-orange-50 active:bg-orange-100 transition-colors text-left touch-manipulation group"
                            >
                                <div className="p-2 sm:p-2.5 bg-gradient-to-br from-slate-100 to-slate-50 rounded-lg sm:rounded-xl group-hover:from-orange-100 group-hover:to-rose-50 transition-colors flex-shrink-0">
                                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 group-hover:text-orange-600 transition-colors" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-xs sm:text-sm text-slate-800 group-hover:text-orange-700 transition-colors">{item.label}</p>
                                    {item.description && (
                                        <p className="text-[10px] sm:text-xs text-slate-500 truncate">{item.description}</p>
                                    )}
                                </div>
                                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-orange-500 -rotate-90 flex-shrink-0" />
                            </button>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="px-4 py-2 bg-slate-50 border-t border-slate-100">
                    <p className="text-[10px] sm:text-xs text-slate-500 text-center">
                        Click to download PDF files
                    </p>
                </div>
            </div>

            {/* Main Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 touch-manipulation ${
                    isOpen 
                        ? 'bg-slate-700 hover:bg-slate-800 shadow-slate-500/30' 
                        : 'bg-gradient-to-r from-red-500 to-orange-500 hover:shadow-orange-500/50 hover:scale-110 active:scale-95'
                }`}
                aria-label={isOpen ? "Close downloads menu" : "Open downloads menu"}
            >
                {/* Pulse animation ring */}
                {!isOpen && (
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-orange-500 animate-ping opacity-20" />
                )}
                
                {/* Icon */}
                <div className={`transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                    {isOpen ? (
                        <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    ) : (
                        <Download className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    )}
                </div>
            </button>

            {/* Tooltip (only on desktop, when closed) */}
            {!isOpen && (
                <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-slate-800 text-white text-xs rounded-lg opacity-0 hover:opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap hidden sm:block transition-opacity">
                    Download Brochure
                </div>
            )}
        </div>
    );
}
