"use client";
import { VerticalData } from "@/types";
import { useEffect, useState } from "react";
import {
    Check, Users, Sparkles, Zap, Heart, Leaf, ChefHat, Scale, Mic, Palette,
    IndianRupee, X, ExternalLink, ShoppingCart, Trash2, Info, CreditCard,
    Building2, QrCode, Copy, Receipt, ChevronDown, ChevronUp
} from "lucide-react";

type EventFormProps = VerticalData & {
    updateFields: any,
    fromUni: boolean,
    institutionName: string,
    setPrices: React.Dispatch<React.SetStateAction<number>>
}

type VerticalKey = "v1" | "v2" | "v3" | "v4" | "v5" | "v6" | "v7" | "v8"

function getOriginalVerticalKey(shortKey: VerticalKey) {
    const keyMap = { v1: "vertical1", v2: "vertical2", v3: "vertical3", v4: "vertical4", v5: "vertical5", v6: "vertical6", v7: "vertical7", v8: "vertical8" };
    return keyMap[shortKey];
}

const verticalInfo: Record<VerticalKey, { title: string; shortTitle: string; subtitle: string; icon: React.ElementType; gradient: string; bgGradient: string; borderColor: string; description: string }> = {
    v1: { title: "Innoskill Engineering Drift and Design", shortTitle: "Engineering", subtitle: "Vertical 1", icon: Zap, gradient: "from-red-500 to-orange-500", bgGradient: "from-red-50 to-orange-50", borderColor: "border-red-200", description: "Engineering competitions, workshops, and technical challenges." },
    v2: { title: "Innoskill Business and Management Conundrum", shortTitle: "Business", subtitle: "Vertical 2", icon: Sparkles, gradient: "from-orange-500 to-yellow-500", bgGradient: "from-orange-50 to-yellow-50", borderColor: "border-orange-200", description: "Business and management focused competitions." },
    v3: { title: "Innoskill Healthcare Mystery", shortTitle: "Healthcare", subtitle: "Vertical 3", icon: Heart, gradient: "from-emerald-500 to-teal-500", bgGradient: "from-emerald-50 to-teal-50", borderColor: "border-emerald-200", description: "Healthcare and wellness events with practical workshops." },
    v4: { title: "Innoskill Sustainathon", shortTitle: "Sustainathon", subtitle: "Vertical 4", icon: Leaf, gradient: "from-green-500 to-lime-500", bgGradient: "from-green-50 to-lime-50", borderColor: "border-green-200", description: "Sustainability, environment, and model-based challenges." },
    v5: { title: "Innoskill Culinary and Hospitality", shortTitle: "Culinary", subtitle: "Vertical 5", icon: ChefHat, gradient: "from-amber-500 to-orange-500", bgGradient: "from-amber-50 to-orange-50", borderColor: "border-amber-200", description: "Culinary and hospitality competitions." },
    v6: { title: "Innoskill Law Knot", shortTitle: "Law Knot", subtitle: "Vertical 6", icon: Scale, gradient: "from-indigo-500 to-purple-500", bgGradient: "from-indigo-50 to-purple-50", borderColor: "border-indigo-200", description: "Law-based challenges and creative legal events." },
    v7: { title: "Innoskill Media and Literary Stumper", shortTitle: "Media", subtitle: "Vertical 7", icon: Mic, gradient: "from-pink-500 to-rose-500", bgGradient: "from-pink-50 to-rose-50", borderColor: "border-pink-200", description: "Media, debate, and literary competitions." },
    v8: { title: "Innoskill Design Ignite", shortTitle: "Design", subtitle: "Vertical 8", icon: Palette, gradient: "from-violet-500 to-fuchsia-500", bgGradient: "from-violet-50 to-fuchsia-50", borderColor: "border-violet-200", description: "Design, gaming, and creative arts competitions." }
};

// Payment Modal
function PaymentModal({ isOpen, onClose, fromUni, totalPrice, institutionName, hasTechnoVogue }: { isOpen: boolean; onClose: () => void; fromUni: boolean; totalPrice: number; institutionName: string; hasTechnoVogue: boolean }) {
    const [copiedField, setCopiedField] = useState<string | null>(null);
    const bankDetails = { bankName: "Axis Bank", accountName: "MANAV RACHNA INTERNATIONAL INSTITUTE OF RESEARCH AND STUDIES GST", accountNo: "924020046485383", ifscCode: "UTIB0002693" };
    const copyToClipboard = (text: string, field: string) => { navigator.clipboard.writeText(text); setCopiedField(field); setTimeout(() => setCopiedField(null), 2000); };
    
    const getPaymentInfo = (): { url: string; label: string; color: string } => {
        const name = (hasTechnoVogue ? "TECHNOVOGUE" : institutionName || "").toUpperCase().trim();
        if (name === "TECHNOVOGUE") return { url: "https://p.ppsl.io/PYTMPS/1k3zfk", label: "TECHNOVOGUE", color: "from-violet-500 to-purple-600" };
        if (name === "OTHERS") return { url: "https://p.ppsl.io/PYTMPS/6M3zfk", label: "Other Institutions", color: "from-blue-500 to-cyan-600" };
        return { url: "https://p.ppsl.io/PYTMPS/5F3zfk", label: "MRIS / MRIIRS / MRU", color: "from-orange-500 to-red-500" };
    };

    const paymentInfo = getPaymentInfo();
    
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
            <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 bg-gradient-to-br ${paymentInfo.color} rounded-xl shadow-lg shadow-orange-500/10`}><CreditCard className="w-5 h-5 text-white" /></div>
                        <div><h3 className="font-bold text-slate-800 tracking-tight">Payment Options</h3><p className="text-xs font-semibold text-slate-500">Amount: ₹{totalPrice}</p></div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-colors"><X className="w-5 h-5 text-slate-500" /></button>
                </div>
                
                <div className="p-6 space-y-6">
                    {/* QR Code Section */}
                    <div className="bg-white rounded-2xl border-2 border-slate-100 shadow-sm overflow-hidden">
                        <div className="bg-slate-50/50 p-4 border-b border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <QrCode className={`w-4 h-4 text-slate-400`} />
                                <span className="text-xs font-bold text-slate-800 uppercase tracking-widest">Scan to Pay</span>
                            </div>
                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full">RECOMMENDED</span>
                        </div>
                        
                        <div className="p-8 flex flex-col items-center justify-center">
                            <div className="relative group p-4 border-2 border-slate-100 rounded-3xl shadow-inner bg-slate-50/30">
                                <img
                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(paymentInfo.url)}&margin=10`}
                                    alt="UPI QR Code"
                                    className="w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-xl"
                                />
                                <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r ${paymentInfo.color} text-white text-[10px] font-bold rounded-full shadow-lg border-2 border-white whitespace-nowrap`}>
                                    SCAN WITH ANY UPI APP
                                </div>
                            </div>
                            <p className="mt-8 text-[11px] text-slate-400 font-medium text-center uppercase tracking-widest leading-relaxed">
                                {paymentInfo.label}<br/>Secured by PayTM
                            </p>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100" /></div>
                        <div className="relative flex justify-center text-xs uppercase tracking-widest font-black text-slate-300"><span className="bg-white px-4">OR</span></div>
                    </div>

                    <div className="p-5 bg-gradient-to-br from-blue-50/80 to-cyan-50/80 rounded-2xl border-2 border-blue-100 shadow-sm hover:border-blue-200 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-4"><div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg shadow-blue-500/20"><Building2 className="w-5 h-5 text-white" /></div><span className="font-bold text-blue-900 tracking-tight">Bank Transfer</span></div>
                        <div className="space-y-2.5">
                            {Object.entries({ "Bank Name": bankDetails.bankName, "Account Name": bankDetails.accountName, "Account No": bankDetails.accountNo, "IFSC Code": bankDetails.ifscCode }).map(([label, value]) => (
                                <div key={label} className="flex items-center gap-3 p-3 bg-white/60 hover:bg-white rounded-xl transition-all border border-transparent hover:border-blue-100">
                                    <div className="flex-1 min-w-0"><p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">{label}</p><p className="text-sm font-semibold text-slate-700 truncate tracking-tight">{value}</p></div>
                                    <button type="button" onClick={() => copyToClipboard(value, label)} className="p-2 hover:bg-blue-50 rounded-lg transition-colors group">{copiedField === label ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-slate-300 group-hover:text-blue-500" />}</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="bg-amber-50 p-4 rounded-xl border-2 border-amber-100/50 flex items-start gap-3">
                        <Info className="w-4 h-4 text-amber-600 mt-0.5" />
                        <p className="text-[11px] text-amber-700 font-semibold leading-relaxed">Ensure to take a screenshot of your payment confirmation. You will need to upload it in the final step to finalize your registration.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Cart Drawer
function CartDrawer({
    isOpen, onClose, selectedEvents, removeEvent, price, institutionName, onPayment
}: {
    isOpen: boolean; onClose: () => void;
    selectedEvents: { eventName: string; members: string; price: number; free: boolean; verticalKey: VerticalKey }[];
    removeEvent: (vk: VerticalKey, name: string) => void;
    price: number; institutionName: string; onPayment: () => void;
}) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[150] flex justify-end">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white w-full max-w-md h-full flex flex-col shadow-2xl animate-slide-right">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-orange-50 to-rose-50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-orange-500 to-rose-500 rounded-xl">
                            <ShoppingCart className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800">Your Events</h3>
                            <p className="text-xs text-slate-500">{selectedEvents.length} event{selectedEvents.length !== 1 ? 's' : ''} selected</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition-colors"><X className="w-5 h-5 text-slate-500" /></button>
                </div>

                {/* Event list */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {selectedEvents.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center py-16">
                            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                                <ShoppingCart className="w-8 h-8 text-slate-300" />
                            </div>
                            <p className="text-slate-500 font-medium">No events selected yet</p>
                            <p className="text-slate-400 text-sm mt-1">Browse verticals and add events</p>
                        </div>
                    ) : (
                        selectedEvents.map((event) => {
                            const info = verticalInfo[event.verticalKey];
                            const Icon = info.icon;
                            return (
                                <div key={event.eventName} className="flex items-start gap-3 p-3 bg-slate-50 hover:bg-white border border-transparent hover:border-slate-200 rounded-xl transition-all group">
                                    <div className={`p-2 rounded-lg bg-gradient-to-r ${info.gradient} flex-shrink-0`}>
                                        <Icon className="w-3.5 h-3.5 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-slate-800 leading-snug">{event.eventName}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] text-slate-500 flex items-center gap-0.5"><Users className="w-2.5 h-2.5" />{event.members}</span>
                                            <span className={`text-[10px] font-semibold ${event.free ? 'text-emerald-600' : 'text-orange-600'}`}>{event.free ? 'Free' : `₹${event.price}`}</span>
                                        </div>
                                        <p className="text-[10px] text-slate-400 mt-0.5">{info.shortTitle} · {info.subtitle}</p>
                                    </div>
                                    <button type="button" onClick={() => removeEvent(event.verticalKey, event.eventName)} className="p-1.5 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100">
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Footer summary */}
                <div className="border-t border-slate-100 p-4 space-y-3 bg-white">
                    <div className="space-y-1.5">
                        <div className="flex justify-between text-sm"><span className="text-slate-500">Paid events ({selectedEvents.filter(e => !e.free).length})</span><span className="font-semibold text-slate-800">₹{price}</span></div>
                        <div className="flex justify-between text-sm"><span className="text-slate-500">Free events ({selectedEvents.filter(e => e.free).length})</span><span className="font-semibold text-emerald-600">₹0</span></div>
                        <div className="h-px bg-slate-100 my-1" />
                        <div className="flex justify-between items-center"><span className="font-bold text-slate-800">Total</span><span className="text-xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">₹{price}</span></div>
                    </div>
                    {/* Pricing info */}
                    <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-500 space-y-1">
                        <p className="font-semibold text-slate-600 mb-1">Pricing – {institutionName === "MRIS" ? "MRIS" : institutionName === "MRU" || institutionName === "MRIIRS" ? "MRIIRS/MRU" : "Other Institutions"}</p>
                        {[["Individual", institutionName === "MRIS" ? 200 : institutionName === "MRU" || institutionName === "MRIIRS" ? 300 : 400], ["Group (3-5)", institutionName === "MRIS" ? 300 : institutionName === "MRU" || institutionName === "MRIIRS" ? 500 : 650], ["Group (6-10)", institutionName === "MRIS" ? 500 : institutionName === "MRU" || institutionName === "MRIIRS" ? 750 : 1000], ["Group (11-15)", institutionName === "MRIS" ? 750 : institutionName === "MRU" || institutionName === "MRIIRS" ? 1200 : 1500]].map(([label, amt]) => (
                            <div key={label as string} className="flex justify-between"><span>{label}</span><span className="font-medium text-slate-700">₹{amt}</span></div>
                        ))}
                    </div>
                    <button type="button" onClick={onPayment} disabled={price === 0} className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-orange-500/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                        <CreditCard className="w-5 h-5" />Payment Options
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function EventForm({
    vertical1, vertical2, vertical3, vertical4, vertical5, vertical6, vertical7, vertical8,
    updateFields, fromUni, institutionName, setPrices
}: EventFormProps) {
    const [price, setPrice] = useState(0);
    const [expandedVertical, setExpandedVertical] = useState<VerticalKey | null>(null);
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [technoVogueConflict, setTechnoVogueConflict] = useState<string | null>(null);

    const [verticals, setVerticals] = useState({
        v1: vertical1, v2: vertical2, v3: vertical3, v4: vertical4,
        v5: vertical5, v6: vertical6, v7: vertical7, v8: vertical8
    });

    const getFeeTier = () => {
        if (institutionName === "MRIS") return { individual: 200, group3_5: 300, group6_10: 500, group11_15: 750, technoVogue: 1500 };
        if (institutionName === "MRU" || institutionName === "MRIIRS") return { individual: 300, group3_5: 500, group6_10: 750, group11_15: 1200, technoVogue: 2500 };
        return { individual: 400, group3_5: 650, group6_10: 1000, group11_15: 1500, technoVogue: 2500 };
    };

    const calculatePriceForEvent = (members: string, eventName: string) => {
        const fee = getFeeTier();
        if (eventName.startsWith("Techno- Vogue")) return fee.technoVogue;
        if (members === "1") return fee.individual;
        if (members === "3-5") return fee.group3_5;
        if (members === "6-10") return fee.group6_10;
        return fee.group11_15;
    };

    const calculateTotalPrice = () => {
        let total = 0;
        Object.values(verticals).forEach(v => v.forEach(e => { if (e.members !== null && !e.free) total += e.price; }));
        setPrices(total);
        return total;
    };

    // Check if Techno-Vogue is currently selected
    const isTechnoVogueSelected = verticals.v7.some(e => e.eventName.startsWith("Techno- Vogue") && e.members !== null);

    // Check if any non-Techno-Vogue events are selected
    const hasOtherEventsSelected = Object.entries(verticals).some(([key, events]) =>
        events.some(e => !e.eventName.startsWith("Techno- Vogue") && e.members !== null)
    );

    const getAllSelectedEvents = () => {
        const selected: { eventName: string; members: string; price: number; free: boolean; verticalKey: VerticalKey }[] = [];
        (Object.keys(verticals) as VerticalKey[]).forEach(key =>
            verticals[key].forEach(e => { if (e.members !== null) selected.push({ eventName: e.eventName, members: e.members, price: e.price, free: e.free, verticalKey: key }); })
        );
        return selected;
    };

    const handleTeamSizeChange = (vk: VerticalKey, idx: number, value: string) => {
        const updated = { ...verticals };
        const data = [...updated[vk]];
        data[idx].members = value;
        data[idx].price = data[idx].free ? 0 : calculatePriceForEvent(value, data[idx].eventName);
        updated[vk] = data;
        setVerticals(updated);
        updateFields({ [getOriginalVerticalKey(vk)]: data });
    };

    const handleCheckboxChange = (vk: VerticalKey, idx: number) => {
        const updated = { ...verticals };
        const data = [...updated[vk]];
        const eventName = data[idx].eventName;
        const isTechnoVogue = eventName.startsWith("Techno- Vogue");
        const isCurrentlySelected = data[idx].members !== null;

        setTechnoVogueConflict(null);

        if (!isCurrentlySelected) {
            // Trying to SELECT this event
            if (isTechnoVogue && hasOtherEventsSelected) {
                // Techno-Vogue selected while other events exist → clear all others, add Techno-Vogue
                const clearedVerticals: typeof verticals = {} as typeof verticals;
                (Object.keys(updated) as VerticalKey[]).forEach(key => {
                    clearedVerticals[key] = updated[key].map(e => ({ ...e, members: null, price: 0 }));
                });
                // Now select Techno-Vogue
                const tvData = [...clearedVerticals[vk]];
                tvData[idx].members = "1";
                tvData[idx].price = calculatePriceForEvent("1", eventName);
                clearedVerticals[vk] = tvData;
                setVerticals(clearedVerticals);
                (Object.keys(clearedVerticals) as VerticalKey[]).forEach(key => {
                    updateFields({ [getOriginalVerticalKey(key)]: clearedVerticals[key] });
                });
                setTechnoVogueConflict("Other events have been cleared. Techno-Vogue requires a separate registration.");
                return;
            } else if (!isTechnoVogue && isTechnoVogueSelected) {
                // Trying to select a regular event while Techno-Vogue is active → block it
                setTechnoVogueConflict("Techno-Vogue requires a separate registration. Deselect it first to register for other events, or submit this form for Techno-Vogue.");
                return;
            }
            data[idx].members = "1";
            data[idx].price = data[idx].free ? 0 : calculatePriceForEvent("1", eventName);
        } else {
            data[idx].members = null;
            data[idx].price = 0;
        }
        updated[vk] = data;
        setVerticals(updated);
        updateFields({ [getOriginalVerticalKey(vk)]: data });
    };

    const removeEvent = (vk: VerticalKey, eventName: string) => {
        const idx = verticals[vk].findIndex(e => e.eventName === eventName);
        if (idx !== -1) handleCheckboxChange(vk, idx);
    };

    useEffect(() => { const total = calculateTotalPrice(); setPrice(total); setPrices(total); }, [verticals, fromUni]);
    useEffect(() => { setVerticals({ v1: vertical1, v2: vertical2, v3: vertical3, v4: vertical4, v5: vertical5, v6: vertical6, v7: vertical7, v8: vertical8 }); }, [vertical1, vertical2, vertical3, vertical4, vertical5, vertical6, vertical7, vertical8]);

    const selectedEvents = getAllSelectedEvents();
    const totalSelected = selectedEvents.length;

    const toggleVertical = (key: VerticalKey) => {
        setExpandedVertical(prev => prev === key ? null : key);
    };

    return (
        <div className="w-full relative pb-20">
            {/* Header */}
            <div className="mb-5">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg sm:text-xl font-bold text-slate-800">Select Events</h2>
                        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Click on any vertical to browse and select events</p>
                    </div>
                    {/* Cart button - desktop top right */}
                    <button
                        type="button"
                        onClick={() => setCartOpen(true)}
                        className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-orange-200 hover:border-orange-400 rounded-xl transition-all group relative"
                    >
                        <ShoppingCart className="w-5 h-5 text-orange-500" />
                        <span className="text-sm font-semibold text-slate-700">Cart</span>
                        {totalSelected > 0 && (
                            <span className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow">
                                {totalSelected}
                            </span>
                        )}
                    </button>
                </div>

                {/* Techno-Vogue Active Banner */}
                {isTechnoVogueSelected && (
                    <div className="mt-3 p-3 bg-gradient-to-r from-violet-50 to-purple-50 border-2 border-violet-200 rounded-xl flex items-start gap-2">
                        <Info className="w-4 h-4 text-violet-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-xs font-bold text-violet-800">Techno-Vogue Mode Active</p>
                            <p className="text-xs text-violet-600 mt-0.5">You are registering for Techno-Vogue only. This event has a separate fee structure and QR code. To register for other events, please deselect Techno-Vogue and submit a new registration.</p>
                        </div>
                    </div>
                )}

                {/* Conflict Warning */}
                {technoVogueConflict && (
                    <div className="mt-3 p-3 bg-amber-50 border-2 border-amber-300 rounded-xl flex items-start gap-2">
                        <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-amber-700 font-medium">{technoVogueConflict}</p>
                    </div>
                )}
            </div>

            {/* Vertical Grid */}
            <div className="space-y-2">
                {(Object.keys(verticalInfo) as VerticalKey[]).map((key) => {
                    const info = verticalInfo[key];
                    const Icon = info.icon;
                    const isExpanded = expandedVertical === key;
                    const events = verticals[key].filter(e => !e.closed);
                    const selectedCount = verticals[key].filter(e => e.members !== null).length;

                    return (
                        <div key={key} className={`rounded-2xl border-2 overflow-hidden transition-all duration-300 ${isExpanded ? `border-opacity-100 ${info.borderColor} shadow-md` : 'border-slate-200 hover:border-slate-300'}`}>
                            {/* Vertical header / pill */}
                            <button
                                type="button"
                                onClick={() => toggleVertical(key)}
                                className={`w-full flex items-center gap-3 p-3 sm:p-4 transition-all text-left ${isExpanded ? `bg-gradient-to-r ${info.bgGradient}` : 'bg-white hover:bg-slate-50'}`}
                            >
                                <div className={`p-2 sm:p-2.5 rounded-xl bg-gradient-to-r ${info.gradient} flex-shrink-0`}>
                                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className={`font-bold text-sm sm:text-base bg-gradient-to-r ${info.gradient} bg-clip-text text-transparent`}>{info.shortTitle}</span>
                                        <span className="text-[10px] text-slate-400 font-medium">{info.subtitle}</span>
                                        {selectedCount > 0 && (
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold text-white bg-gradient-to-r ${info.gradient} shadow-sm`}>
                                                {selectedCount} selected
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 truncate">{info.description}</p>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <span className="hidden sm:block text-xs text-slate-400">{events.length} events</span>
                                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                                </div>
                            </button>

                            {/* Events list (expanded) */}
                            {isExpanded && (
                                <div className="border-t border-slate-100 bg-white p-3 sm:p-4 space-y-2">
                                    {events.map((event, index) => {
                                        const isSelected = event.members !== null;
                                        const hideTeamSize = key === 'v7' && event.eventName.startsWith("Techno- Vogue");
                                        const actualIndex = verticals[key].findIndex(e => e.eventName === event.eventName);
                                        return (
                                            <div
                                                key={event.eventName}
                                                className={`rounded-xl border-2 transition-all cursor-pointer touch-manipulation ${isSelected ? `bg-gradient-to-r ${info.bgGradient} ${info.borderColor} shadow-sm` : 'bg-slate-50 border-transparent hover:bg-white hover:border-slate-200'}`}
                                                onClick={() => handleCheckboxChange(key, actualIndex)}
                                            >
                                                <div className="flex items-start gap-3 p-3">
                                                    {/* Checkbox */}
                                                    <div className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${isSelected ? `bg-gradient-to-r ${info.gradient} border-transparent` : 'border-slate-300 bg-white'}`}>
                                                        {isSelected && <Check className="w-3 h-3 text-white" />}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-medium text-xs sm:text-sm text-slate-800 leading-snug">{event.eventName}</p>
                                                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                                                            {event.free ? (
                                                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold">Free</span>
                                                            ) : (
                                                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 font-semibold flex items-center gap-0.5">
                                                                    <IndianRupee className="w-2.5 h-2.5" />
                                                                    {event.eventName.startsWith("Techno- Vogue") ? (institutionName === "MRIS" ? '1500' : '2500') : (institutionName === "MRIS" ? '200-750' : institutionName === "MRU" || institutionName === "MRIIRS" ? '300-1200' : '400-1500')}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Team size selector */}
                                                {isSelected && !hideTeamSize && event.members && (
                                                    <div className="px-3 pb-3 pt-0 border-t border-white/60" onClick={e => e.stopPropagation()}>
                                                        <p className="text-[10px] text-slate-500 mb-2">Team Size</p>
                                                        <div className="flex gap-2 flex-wrap">
                                                            {["1", "3-5", "6-10", "11-15"].map(size => (
                                                                <button
                                                                    key={size}
                                                                    type="button"
                                                                    onClick={() => handleTeamSizeChange(key, actualIndex, size)}
                                                                    className={`px-3 h-8 rounded-lg text-xs font-bold transition-all touch-manipulation ${event.members === size ? `bg-gradient-to-r ${info.gradient} text-white shadow-md` : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-400'}`}
                                                                >{size}</button>
                                                            ))}
                                                        </div>
                                                        {!event.free && <p className="text-[10px] text-orange-600 mt-2 font-medium">Price: ₹{calculatePriceForEvent(event.members, event.eventName)}</p>}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Floating Cart Button - mobile */}
            <div className="fixed bottom-6 right-6 z-[100] sm:hidden">
                <button
                    type="button"
                    onClick={() => setCartOpen(true)}
                    className="relative w-14 h-14 bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-xl shadow-orange-500/40 flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
                >
                    <ShoppingCart className="w-6 h-6 text-white" />
                    {totalSelected > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-orange-600 text-[10px] font-black rounded-full flex items-center justify-center shadow border border-orange-200">
                            {totalSelected}
                        </span>
                    )}
                </button>
            </div>

            {/* Sticky bottom bar - desktop summary */}
            {totalSelected > 0 && (
                <div className="hidden sm:flex fixed bottom-0 left-0 right-0 z-[90] bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg px-6 py-3 items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-500">{totalSelected} event{totalSelected !== 1 ? 's' : ''} selected</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="text-sm font-bold text-slate-800">Total: ₹{price}</span>
                    </div>
                    <div className="ml-auto flex gap-3">
                        <button type="button" onClick={() => setCartOpen(true)} className="px-4 py-2 border-2 border-orange-200 text-orange-600 font-semibold rounded-xl text-sm hover:border-orange-400 transition-all flex items-center gap-2">
                            <ShoppingCart className="w-4 h-4" />View Cart
                        </button>
                        <button type="button" onClick={() => setPaymentModalOpen(true)} disabled={price === 0} className="px-5 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-xl text-sm hover:shadow-lg hover:shadow-orange-500/30 transition-all disabled:opacity-40 flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />Payment Options
                        </button>
                    </div>
                </div>
            )}

            {/* Cart Drawer */}
            <CartDrawer
                isOpen={cartOpen}
                onClose={() => setCartOpen(false)}
                selectedEvents={selectedEvents}
                removeEvent={removeEvent}
                price={price}
                institutionName={institutionName}
                onPayment={() => { setCartOpen(false); setPaymentModalOpen(true); }}
            />

            {/* Payment Modal */}
            <PaymentModal 
                isOpen={paymentModalOpen} 
                onClose={() => setPaymentModalOpen(false)} 
                fromUni={fromUni} 
                totalPrice={price} 
                institutionName={institutionName}
                hasTechnoVogue={isTechnoVogueSelected}
            />
        </div>
    );
}