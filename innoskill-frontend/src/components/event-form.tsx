import { VerticalData } from "@/types";
import { useEffect, useState, useRef } from "react";
import { 
    ChevronDown, Check, Users, Sparkles, Zap, Heart, Leaf, ChefHat, Scale, Mic, Palette, 
    IndianRupee, X, ExternalLink, ShoppingCart, Trash2, Info, CreditCard, Building2, QrCode,
    Copy, Receipt
} from "lucide-react";

type EventFormProps = VerticalData & {
    updateFields: any,
    fromUni: boolean,
    institutionName: string,
    setPrices: React.Dispatch<React.SetStateAction<number>>
}

type VerticalKey = "v1" | "v2" | "v3" | "v4" | "v5" | "v6" | "v7" | "v8"

function getOriginalVerticalKey(shortKey: VerticalKey) {
    const keyMap = {
        v1: "vertical1",
        v2: "vertical2",
        v3: "vertical3",
        v4: "vertical4",
        v5: "vertical5",
        v6: "vertical6",
        v7: "vertical7",
        v8: "vertical8"
    };
    return keyMap[shortKey];
}

const verticalInfo: Record<VerticalKey, { title: string; subtitle: string; icon: React.ElementType; gradient: string; bgGradient: string; description: string }> = {
    v1: { title: "Innoskill Engineering Drift and Design", subtitle: "Vertical 1", icon: Zap, gradient: "from-red-500 to-orange-500", bgGradient: "from-red-50 to-orange-50", description: "Engineering competitions, workshops, and technical challenges." },
    v2: { title: "Innoskill Business and Management Conundrum", subtitle: "Vertical 2", icon: Sparkles, gradient: "from-orange-500 to-yellow-500", bgGradient: "from-orange-50 to-yellow-50", description: "Business and management focused competitions." },
    v3: { title: "Innoskill Healthcare Mystery", subtitle: "Vertical 3", icon: Heart, gradient: "from-emerald-500 to-teal-500", bgGradient: "from-emerald-50 to-teal-50", description: "Healthcare and wellness events with practical workshops." },
    v4: { title: "Innoskill Sustainathon", subtitle: "Vertical 4", icon: Leaf, gradient: "from-green-500 to-lime-500", bgGradient: "from-green-50 to-lime-50", description: "Sustainability, environment, and model-based challenges." },
    v5: { title: "Innoskill Culinary and Hospitality", subtitle: "Vertical 5", icon: ChefHat, gradient: "from-amber-500 to-orange-500", bgGradient: "from-amber-50 to-orange-50", description: "Culinary and hospitality competitions." },
    v6: { title: "Innoskill Law Knot", subtitle: "Vertical 6", icon: Scale, gradient: "from-indigo-500 to-purple-500", bgGradient: "from-indigo-50 to-purple-50", description: "Law-based challenges and creative legal events." },
    v7: { title: "Innoskill Media and Literary Stumper", subtitle: "Vertical 7", icon: Mic, gradient: "from-pink-500 to-rose-500", bgGradient: "from-pink-50 to-rose-50", description: "Media, debate, and literary competitions." },
    v8: { title: "Innoskill Design Ignite", subtitle: "Vertical 8", icon: Palette, gradient: "from-violet-500 to-fuchsia-500", bgGradient: "from-violet-50 to-fuchsia-50", description: "Design, gaming, and creative arts competitions." }
};

// Payment Modal Component
function PaymentModal({ isOpen, onClose, fromUni, totalPrice }: { isOpen: boolean; onClose: () => void; fromUni: boolean; totalPrice: number; }) {
    const [copiedField, setCopiedField] = useState<string | null>(null);
    const bankDetails = { bankName: "Axis Bank", accountName: "MANAV RACHNA INTERNATIONAL INSTITUTE OF RESEARCH AND STUDIES GST", accountNo: "924020046485383", ifscCode: "UTIB0002693" };
    const copyToClipboard = (text: string, field: string) => { navigator.clipboard.writeText(text); setCopiedField(field); setTimeout(() => setCopiedField(null), 2000); };
    // TODO: Update UPI payment links before re-enabling the UPI payment option
    const upiLink = fromUni ? "YOUR_UNI_UPI_LINK_HERE" : "YOUR_EXTERNAL_UPI_LINK_HERE";
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] sm:max-h-[90vh] overflow-y-auto animate-modal-in">
                <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl"><CreditCard className="w-5 h-5 text-white" /></div>
                        <div><h3 className="font-bold text-slate-800">Payment Options</h3><p className="text-xs text-slate-500">Amount: ₹{totalPrice}</p></div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><X className="w-5 h-5 text-slate-500" /></button>
                </div>
                <div className="p-6 space-y-4">
                    {/* UPI Payment Option - Hidden until URLs are updated */}
                    {false && (
                    <div className="p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl border border-violet-200">
                        <div className="flex items-center gap-3 mb-3"><QrCode className="w-5 h-5 text-violet-600" /><span className="font-bold text-violet-800">UPI Payment</span><span className="ml-auto text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full font-medium">Recommended</span></div>
                        <button onClick={() => window.open(upiLink, '_blank')} className="w-full py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/30 transition-all"><span>Pay ₹{totalPrice} via UPI</span><ExternalLink className="w-4 h-4" /></button>
                    </div>
                    )}
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                        <div className="flex items-center gap-3 mb-3"><Building2 className="w-5 h-5 text-blue-600" /><span className="font-bold text-blue-800">Bank Transfer</span></div>
                        <div className="space-y-2">
                            {Object.entries({ "Bank Name": bankDetails.bankName, "Account Name": bankDetails.accountName, "Account No": bankDetails.accountNo, "IFSC Code": bankDetails.ifscCode }).map(([label, value]) => (
                                <div key={label} className="flex items-center gap-2 p-2 bg-white rounded-lg">
                                    <div className="flex-1 min-w-0"><p className="text-xs text-slate-400">{label}</p><p className="text-sm font-medium text-slate-700 truncate">{value}</p></div>
                                    <button type="button" onClick={() => copyToClipboard(value, label)} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">{copiedField === label ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-slate-400" />}</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <p className="text-xs text-slate-500 text-center">After payment, enter your Transaction ID in the next step to confirm registration.</p>
                </div>
            </div>
        </div>
    );
}

// Event Details Modal
function EventDetailsModal({ isOpen, onClose, eventName, verticalKey, isFree, institutionName }: { isOpen: boolean; onClose: () => void; eventName: string; verticalKey: VerticalKey; isFree: boolean; institutionName: string; }) {
    const info = verticalInfo[verticalKey];
    const Icon = info.icon;
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full animate-modal-in mx-3 sm:mx-0">
                <div className={`p-6 bg-gradient-to-r ${info.bgGradient} rounded-t-2xl`}>
                    <div className="flex items-start justify-between"><div className={`p-3 bg-gradient-to-r ${info.gradient} rounded-xl text-white`}><Icon className="w-6 h-6" /></div><button onClick={onClose} className="p-2 hover:bg-white/50 rounded-lg transition-colors"><X className="w-5 h-5 text-slate-600" /></button></div>
                    <h3 className="mt-4 text-lg font-bold text-slate-800">{eventName}</h3>
                    <p className="text-sm text-slate-600 mt-1">{info.title} - {info.subtitle}</p>
                </div>
                <div className="p-6 space-y-4">
                    <div><h4 className="text-sm font-semibold text-slate-700 mb-2">Event Details</h4><p className="text-sm text-slate-600">{info.description}</p></div>
                    <div className="flex items-center gap-4">
                        <div className="flex-1 p-3 bg-slate-50 rounded-xl"><p className="text-xs text-slate-500">Team Size</p><p className="font-bold text-slate-800">1-5 Members</p></div>
                        <div className="flex-1 p-3 bg-slate-50 rounded-xl"><p className="text-xs text-slate-500">Entry Fee</p><p className={`font-bold ${isFree ? 'text-emerald-600' : 'text-orange-600'}`}>{isFree ? 'Free' : eventName.startsWith("Techno- Vogue") ? (institutionName === "MRIS" ? '₹1500' : '₹2500') : (institutionName === "MRIS" ? '₹200-750' : institutionName === "MRU" || institutionName === "MRIIRS" ? '₹300-1200' : '₹400-1500')}</p></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Vertical Selector Dropdown
function VerticalSelector({ selectedVertical, onSelect }: { selectedVertical: VerticalKey | null; onSelect: (key: VerticalKey) => void; }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    useEffect(() => { function handleClickOutside(event: MouseEvent) { if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) { setIsOpen(false); } } document.addEventListener("mousedown", handleClickOutside); return () => document.removeEventListener("mousedown", handleClickOutside); }, []);
    const selected = selectedVertical ? verticalInfo[selectedVertical] : null;
    return (
        <div className="relative" ref={dropdownRef}>
            <button type="button" onClick={() => setIsOpen(!isOpen)} className="w-full p-3 sm:p-4 bg-white border-2 border-slate-200 rounded-xl flex items-center justify-between gap-2 sm:gap-3 hover:border-orange-400 active:border-orange-500 transition-all touch-manipulation">
                {selected ? (<div className="flex items-center gap-2 sm:gap-3 min-w-0"><div className={`p-1.5 sm:p-2 bg-gradient-to-r ${selected.gradient} rounded-lg text-white flex-shrink-0`}><selected.icon className="w-4 h-4 sm:w-5 sm:h-5" /></div><div className="text-left min-w-0"><p className={`font-bold text-sm sm:text-base bg-gradient-to-r ${selected.gradient} bg-clip-text text-transparent truncate`}>{selected.title}</p><p className="text-xs text-slate-500 hidden sm:block">{selected.subtitle}</p></div></div>) : (<span className="text-slate-400 text-sm sm:text-base">Select a vertical...</span>)}
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 overflow-hidden transition-all ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                <div className="max-h-[280px] sm:max-h-[320px] overflow-y-auto overscroll-contain">
                    {(Object.keys(verticalInfo) as VerticalKey[]).map((key) => { const info = verticalInfo[key]; const Icon = info.icon; const isSelected = selectedVertical === key;
                        return (<button key={key} type="button" onClick={() => { onSelect(key); setIsOpen(false); }} className={`w-full p-3 flex items-center gap-2 sm:gap-3 hover:bg-orange-50 active:bg-orange-100 transition-colors touch-manipulation ${isSelected ? 'bg-orange-50' : ''}`}><div className={`p-1.5 sm:p-2 bg-gradient-to-r ${info.gradient} rounded-lg text-white flex-shrink-0`}><Icon className="w-4 h-4" /></div><div className="text-left flex-1 min-w-0"><p className={`font-semibold text-sm bg-gradient-to-r ${info.gradient} bg-clip-text text-transparent`}>{info.title}</p><p className="text-xs text-slate-500 truncate">{info.subtitle}</p></div>{isSelected && <Check className="w-5 h-5 text-orange-500 flex-shrink-0" />}</button>);
                    })}
                </div>
            </div>
        </div>
    );
}


export default function EventForm({
    vertical1,
    vertical2,
    vertical3,
    vertical4,
    vertical5,
    vertical6,
    vertical7,
    vertical8,
    updateFields,
    fromUni,
    institutionName,
    setPrices
}: EventFormProps) {
    const [price, setPrice] = useState(0);
    const [selectedVertical, setSelectedVertical] = useState<VerticalKey | null>('v1');
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [eventDetailsModal, setEventDetailsModal] = useState<{ isOpen: boolean; eventName: string; verticalKey: VerticalKey; isFree: boolean } | null>(null);

    const [verticals, setVerticals] = useState({
        v1: vertical1, v2: vertical2, v3: vertical3, v4: vertical4,
        v5: vertical5, v6: vertical6, v7: vertical7, v8: vertical8
    });

    const getFeeTier = () => {
        if (institutionName === "MRIS") {
            return { individual: 200, group3_5: 300, group6_10: 500, group11_15: 750, technoVogue: 1500, label: "MRIS" };
        }
        if (institutionName === "MRU" || institutionName === "MRIIRS") {
            return { individual: 300, group3_5: 500, group6_10: 750, group11_15: 1200, technoVogue: 2500, label: "MRIIRS/MRU" };
        }
        return { individual: 400, group3_5: 650, group6_10: 1000, group11_15: 1500, technoVogue: 2500, label: "Other Institutions" };
    };

    const calculatePriceForEvent = (members: string, eventName: string) => {
        const fee = getFeeTier();

        if (eventName.startsWith("Techno- Vogue")) {
            return fee.technoVogue;
        }

        if (members === "1") return fee.individual;
        if (members === "3-5") return fee.group3_5;
        if (members === "6-10") return fee.group6_10;
        return fee.group11_15;
    };

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        Object.values(verticals).forEach(vertical => { vertical.forEach(event => { if (event.members !== null && !event.free) { totalPrice += event.price; } }); });
        setPrices(totalPrice);
        return totalPrice;
    };

    const getAllSelectedEvents = () => {
        const selected: { eventName: string; members: string; price: number; free: boolean; verticalKey: VerticalKey }[] = [];
        (Object.keys(verticals) as VerticalKey[]).forEach(key => {
            verticals[key].forEach(event => { if (event.members !== null) { selected.push({ eventName: event.eventName, members: event.members, price: event.price, free: event.free, verticalKey: key }); } });
        });
        return selected;
    };

    const handleTeamSizeChange = (verticalKey: VerticalKey, index: number, value: string) => {
        const updatedVerticals = { ...verticals };
        const updatedData = [...updatedVerticals[verticalKey]];
        updatedData[index].members = value;
        updatedData[index].price = updatedData[index].free ? 0 : calculatePriceForEvent(value, updatedData[index].eventName);
        updatedVerticals[verticalKey] = updatedData;
        setVerticals(updatedVerticals);
        updateFields({ [getOriginalVerticalKey(verticalKey)]: updatedData });
    };

    const handleCheckboxChange = (verticalKey: VerticalKey, index: number) => {
        const updatedVerticals = { ...verticals };
        const updatedData = [...updatedVerticals[verticalKey]];
        if (updatedData[index].members === null) {
            const defaultTeamBand = updatedData[index].eventName.startsWith("Techno- Vogue") ? "1" : "1";
            updatedData[index].members = defaultTeamBand;
            updatedData[index].price = updatedData[index].free ? 0 : calculatePriceForEvent(defaultTeamBand, updatedData[index].eventName);
        }
        else { updatedData[index].members = null; updatedData[index].price = 0; }
        updatedVerticals[verticalKey] = updatedData;
        setVerticals(updatedVerticals);
        updateFields({ [getOriginalVerticalKey(verticalKey)]: updatedData });
    };

    const removeEvent = (verticalKey: VerticalKey, eventName: string) => {
        const index = verticals[verticalKey].findIndex(e => e.eventName === eventName);
        if (index !== -1) { handleCheckboxChange(verticalKey, index); }
    };

    useEffect(() => { const total = calculateTotalPrice(); setPrice(total); setPrices(total); }, [verticals, fromUni]);
    useEffect(() => { setVerticals({ v1: vertical1, v2: vertical2, v3: vertical3, v4: vertical4, v5: vertical5, v6: vertical6, v7: vertical7, v8: vertical8 }); }, [vertical1, vertical2, vertical3, vertical4, vertical5, vertical6, vertical7, vertical8]);

    const selectedEvents = getAllSelectedEvents();
    const currentVerticalInfo = selectedVertical ? verticalInfo[selectedVertical] : null;
    // Filter out closed events from display
    const currentEvents = selectedVertical ? verticals[selectedVertical].filter(e => !e.closed) : [];

    return (
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 w-full">
            {/* Left Panel - Event Selection */}
            <div className="flex-1 min-w-0">
                <div className="mb-3 sm:mb-4">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-1">Select Events</h2>
                    <p className="text-xs sm:text-sm text-orange-500">Choose a vertical, then select events</p>
                </div>

                <VerticalSelector selectedVertical={selectedVertical} onSelect={setSelectedVertical} />

                {currentVerticalInfo && (
                    <div className={`mt-3 sm:mt-4 p-3 sm:p-4 bg-gradient-to-r ${currentVerticalInfo.bgGradient} rounded-xl border border-slate-200`}>
                        <p className="text-xs sm:text-sm text-slate-600">{currentVerticalInfo.description}</p>
                    </div>
                )}

                {selectedVertical && (
                    <div className="mt-3 sm:mt-4 space-y-2">
                        <p className="text-xs sm:text-sm font-semibold text-slate-700 mb-2 sm:mb-3">{currentVerticalInfo?.title} Events ({currentEvents.length})</p>
                        {currentEvents.map((event, index) => {
                            const isSelected = event.members !== null;
                            const hideTeamSize = selectedVertical === 'v7' && event.eventName.startsWith("Techno- Vogue");
                            return (
                                <div key={event.eventName} className={`p-3 sm:p-4 rounded-xl border-2 transition-all cursor-pointer touch-manipulation ${isSelected ? 'bg-orange-50 border-orange-300 shadow-sm' : 'bg-white border-slate-200 hover:border-orange-200 active:border-orange-300'}`} onClick={() => handleCheckboxChange(selectedVertical, index)}>
                                    <div className="flex items-start gap-2 sm:gap-3">
                                        <div className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${isSelected ? 'bg-gradient-to-r from-red-500 to-orange-500 border-orange-500' : 'border-slate-300 bg-white'}`}>
                                            {isSelected && <Check className="w-3 h-3 text-white" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-xs sm:text-sm text-slate-800">{event.eventName}</p>
                                            <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2 flex-wrap">
                                                {event.free ? (<span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-emerald-100 text-emerald-700 font-medium">Free</span>) : (<span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-orange-100 text-orange-700 font-medium flex items-center gap-0.5"><IndianRupee className="w-2.5 h-2.5 sm:w-3 sm:h-3" />{event.eventName.startsWith("Techno- Vogue") ? (institutionName === "MRIS" ? '1500' : '2500') : (institutionName === "MRIS" ? '200-750' : institutionName === "MRU" || institutionName === "MRIIRS" ? '300-1200' : '400-1500')}</span>)}
                                                <button type="button" onClick={(e) => { e.stopPropagation(); setEventDetailsModal({ isOpen: true, eventName: event.eventName, verticalKey: selectedVertical, isFree: event.free }); }} className="text-[10px] sm:text-xs text-slate-500 hover:text-orange-500 active:text-orange-600 flex items-center gap-0.5 sm:gap-1 transition-colors touch-manipulation"><Info className="w-3 h-3" /><span className="hidden sm:inline">Details</span></button>
                                            </div>
                                        </div>
                                    </div>
                                    {isSelected && !hideTeamSize && event.members && (
                                        <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-orange-200" onClick={(e) => e.stopPropagation()}>
                                            <p className="text-[10px] sm:text-xs text-slate-500 mb-1.5 sm:mb-2">Team Size</p>
                                            <div className="flex gap-1.5 sm:gap-2">
                                                {["1", "3-5", "6-10", "11-15"].map(size => (
                                                    <button key={size} type="button" onClick={() => handleTeamSizeChange(selectedVertical, index, size)} className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg text-xs sm:text-sm font-bold transition-all touch-manipulation ${event.members === size ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-600 hover:border-orange-400 active:border-orange-500'}`}>{size}</button>
                                                ))}
                                            </div>
                                            {!event.free && <p className="text-[10px] sm:text-xs text-orange-600 mt-1.5 sm:mt-2 font-medium">Price: ₹{calculatePriceForEvent(event.members, event.eventName)}</p>}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Right Panel - Cart & Summary */}
            <div className="lg:w-80 flex-shrink-0 order-first lg:order-last">
                <div className="lg:sticky lg:top-4 space-y-3 sm:space-y-4">
                    <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-3 sm:p-4 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                            <div className="flex items-center gap-2"><ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" /><h3 className="font-bold text-sm sm:text-base text-slate-800">Selected Events</h3><span className="ml-auto text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 bg-orange-100 text-orange-700 rounded-full font-bold">{selectedEvents.length}</span></div>
                        </div>
                        <div className="max-h-[180px] sm:max-h-[280px] overflow-y-auto overscroll-contain">
                            {selectedEvents.length === 0 ? (
                                <div className="p-4 sm:p-6 text-center"><div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 rounded-full bg-slate-100 flex items-center justify-center"><ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400" /></div><p className="text-slate-500 text-xs sm:text-sm">No events selected yet</p><p className="text-slate-400 text-[10px] sm:text-xs mt-1 hidden sm:block">Select events from below</p></div>
                            ) : (
                                <div className="divide-y divide-slate-100">
                                    {selectedEvents.map((event) => { const info = verticalInfo[event.verticalKey]; return (
                                        <div key={event.eventName} className="p-2 sm:p-3 hover:bg-slate-50 transition-colors">
                                            <div className="flex items-start gap-1.5 sm:gap-2">
                                                <div className={`w-2 h-2 rounded-full mt-1.5 bg-gradient-to-r ${info.gradient} flex-shrink-0`} />
                                                <div className="flex-1 min-w-0"><p className="text-xs sm:text-sm font-medium text-slate-700 truncate">{event.eventName}</p><div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1"><span className="text-[10px] sm:text-xs text-slate-500"><Users className="w-2.5 h-2.5 sm:w-3 sm:h-3 inline mr-0.5 sm:mr-1" />{event.members}</span><span className={`text-[10px] sm:text-xs font-medium ${event.free ? 'text-emerald-600' : 'text-orange-600'}`}>{event.free ? 'Free' : `₹${event.price}`}</span></div></div>
                                                <button type="button" onClick={() => removeEvent(event.verticalKey, event.eventName)} className="p-1 sm:p-1.5 hover:bg-red-50 active:bg-red-100 rounded-lg text-slate-400 hover:text-red-500 transition-colors touch-manipulation"><Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /></button>
                                            </div>
                                        </div>
                                    ); })}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-rose-50 rounded-xl sm:rounded-2xl border border-orange-200 p-3 sm:p-4">
                        <div className="flex items-center gap-2 mb-2 sm:mb-3"><Receipt className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" /><h3 className="font-bold text-sm sm:text-base text-slate-800">Price Breakdown</h3></div>
                        <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                            <div className="flex justify-between text-xs sm:text-sm"><span className="text-slate-600">Paid Events ({selectedEvents.filter(e => !e.free).length})</span><span className="font-medium text-slate-800">₹{price}</span></div>
                            <div className="flex justify-between text-xs sm:text-sm"><span className="text-slate-600">Free ({selectedEvents.filter(e => e.free).length})</span><span className="font-medium text-emerald-600">₹0</span></div>
                            <div className="h-px bg-orange-200 my-1.5 sm:my-2" />
                            <div className="flex justify-between items-center"><span className="font-bold text-sm sm:text-base text-slate-800">Total</span><span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">₹{price}</span></div>
                        </div>
                        <button type="button" onClick={() => setPaymentModalOpen(true)} disabled={price === 0} className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-sm sm:text-base rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-orange-500/30 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"><CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />Payment Options</button>
                        <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-white/60 rounded-xl hidden sm:block">
                            <p className="text-[10px] sm:text-xs font-semibold text-slate-700 mb-1.5 sm:mb-2">Pricing ({institutionName === "MRIS" ? "MRIS" : institutionName === "MRU" || institutionName === "MRIIRS" ? "MRIIRS/MRU" : "Other Institutions"})</p>
                            <div className="space-y-0.5 sm:space-y-1 text-[10px] sm:text-xs text-slate-600">
                                <div className="flex justify-between"><span>Individual</span><span className="font-medium">₹{institutionName === "MRIS" ? 200 : institutionName === "MRU" || institutionName === "MRIIRS" ? 300 : 400}</span></div>
                                <div className="flex justify-between"><span>Group (3-5)</span><span className="font-medium">₹{institutionName === "MRIS" ? 300 : institutionName === "MRU" || institutionName === "MRIIRS" ? 500 : 650}</span></div>
                                <div className="flex justify-between"><span>Group (6-10)</span><span className="font-medium">₹{institutionName === "MRIS" ? 500 : institutionName === "MRU" || institutionName === "MRIIRS" ? 750 : 1000}</span></div>
                                <div className="flex justify-between"><span>Group (11-15)</span><span className="font-medium">₹{institutionName === "MRIS" ? 750 : institutionName === "MRU" || institutionName === "MRIIRS" ? 1200 : 1500}</span></div>
                                <div className="flex justify-between"><span>Techno- Vogue</span><span className="font-medium">₹{institutionName === "MRIS" ? 1500 : 2500}</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center hidden sm:block"><p className="text-xs text-slate-500">Need help? <a href="mailto:innoskills@mriirs.edu.in" className="text-orange-500 hover:underline">Contact us</a></p></div>
                </div>
            </div>

            <PaymentModal isOpen={paymentModalOpen} onClose={() => setPaymentModalOpen(false)} fromUni={fromUni} totalPrice={price} />
            {eventDetailsModal && <EventDetailsModal isOpen={eventDetailsModal.isOpen} onClose={() => setEventDetailsModal(null)} eventName={eventDetailsModal.eventName} verticalKey={eventDetailsModal.verticalKey} isFree={eventDetailsModal.isFree} institutionName={institutionName} />}
        </div>
    );
}