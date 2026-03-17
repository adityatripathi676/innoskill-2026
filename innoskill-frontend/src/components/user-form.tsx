"use client";

import { UserFormData } from "@/types";
import FormWrapper from "./form-wrapper";
import { ChevronDown, User, Building2, GraduationCap, Users, Phone, UsersRound, Check, Mail, AlertCircle, MapPin, House, CalendarDays, IdCard } from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";

type UserFormDataProps = UserFormData & {
    updateFields: (fields: Partial<UserFormData>) => void;
};

const INDIA_STATES_AND_UTS = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
    "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const STATE_CITIES_MAP: Record<string, string[]> = {
    "Andhra Pradesh": ["Amaravati", "Visakhapatnam", "Vijayawada"],
    "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Tawang"],
    "Assam": ["Dispur", "Guwahati", "Dibrugarh"],
    "Bihar": ["Patna", "Gaya", "Muzaffarpur"],
    "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur"],
    "Goa": ["Panaji", "Margao", "Vasco da Gama"],
    "Gujarat": ["Gandhinagar", "Ahmedabad", "Surat"],
    "Haryana": ["Chandigarh", "Gurugram", "Faridabad"],
    "Himachal Pradesh": ["Shimla", "Dharamshala", "Solan"],
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad"],
    "Karnataka": ["Bengaluru", "Mysuru", "Hubballi"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
    "Manipur": ["Imphal", "Thoubal", "Bishnupur"],
    "Meghalaya": ["Shillong", "Tura", "Jowai"],
    "Mizoram": ["Aizawl", "Lunglei", "Champhai"],
    "Nagaland": ["Kohima", "Dimapur", "Mokokchung"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela"],
    "Punjab": ["Chandigarh", "Ludhiana", "Amritsar"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur"],
    "Sikkim": ["Gangtok", "Namchi", "Gyalshing"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad"],
    "Tripura": ["Agartala", "Udaipur", "Dharmanagar"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Noida"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Haldwani"],
    "West Bengal": ["Kolkata", "Howrah", "Siliguri"],
    "Andaman and Nicobar Islands": ["Port Blair"],
    "Chandigarh": ["Chandigarh"],
    "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Silvassa"],
    "Delhi": ["New Delhi", "Delhi"],
    "Jammu and Kashmir": ["Srinagar", "Jammu"],
    "Ladakh": ["Leh", "Kargil"],
    "Lakshadweep": ["Kavaratti"],
    "Puducherry": ["Puducherry", "Karaikal"],
};

function calculateAge(dob: string): number | null {
    if (!dob) return null;
    const birthDate = new Date(dob);
    if (Number.isNaN(birthDate.getTime())) return null;
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age -= 1;
    }
    return age;
}

function CustomDropdown({
    label,
    icon: Icon,
    value,
    placeholder,
    options,
    onSelect,
    descriptions,
    required = true
}: {
    label: string;
    icon: React.ElementType;
    value: string;
    placeholder: string;
    options: string[];
    onSelect: (option: string) => void;
    descriptions?: Record<string, string>;
    required?: boolean;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="form-field-group" ref={dropdownRef}>
            <label className="form-label text-xs sm:text-sm">
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {label}
                {required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`custom-dropdown-trigger touch-manipulation ${isOpen ? "ring-2 ring-orange-500/30 border-orange-500" : ""}`}
                >
                    <span className={`text-sm sm:text-base ${value ? "text-slate-800" : "text-slate-400"}`}>
                        {value || placeholder}
                    </span>
                    <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-slate-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                <div className={`custom-dropdown-menu ${isOpen ? "dropdown-open" : "dropdown-closed"}`}>
                    {options.map((option) => (
                        <button
                            key={option}
                            type="button"
                            onClick={() => {
                                onSelect(option);
                                setIsOpen(false);
                            }}
                            className={`custom-dropdown-option touch-manipulation ${value === option ? "selected" : ""}`}
                        >
                            <div className="flex flex-col items-start min-w-0">
                                <span className="font-medium text-sm sm:text-base">{option}</span>
                                {descriptions?.[option] && (
                                    <span className="text-[10px] sm:text-xs text-slate-400 truncate max-w-full">{descriptions[option]}</span>
                                )}
                            </div>
                            {value === option && <Check className="w-4 h-4 text-orange-500 flex-shrink-0" />}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export { CustomDropdown };

export default function UserForm({
    name,
    email,
    dateOfBirth,
    scOrUni,
    institutionName,
    institutionOtherName,
    intOrExt,
    roll,
    phoneNumber,
    addressLine1,
    addressLine2,
    city,
    state,
    pinCode,
    teamName,
    aadhaarNumber,
    updateFields
}: UserFormDataProps) {
    const [pinLoading, setPinLoading] = useState(false);

    const institutionDescriptions: Record<string, string> = {
        MRIS: "Manav Rachna International School",
        MRU: "Manav Rachna University",
        MRIIRS: "MR International Institute of Research & Studies",
        Others: "Enter your own school or university"
    };

    const age = calculateAge(dateOfBirth);
    const isMinor = age !== null ? age < 18 : scOrUni === "School";
    const isOtherInstitution = institutionName === "Others";

    const cityOptions = useMemo(() => STATE_CITIES_MAP[state] ?? [], [state]);

    useEffect(() => {
        if (pinCode.length !== 6) return;

        const controller = new AbortController();
        let debounceTimer: ReturnType<typeof setTimeout>;
        let loadingTimer: ReturnType<typeof setTimeout>;
        let timeoutId: ReturnType<typeof setTimeout>;

        debounceTimer = setTimeout(async () => {
            // Only show loading if it takes more than 300ms
            loadingTimer = setTimeout(() => setPinLoading(true), 300);

            try {
                // Set a 5-second timeout to abort the request
                timeoutId = setTimeout(() => controller.abort(), 5000);

                const res = await fetch(`https://api.postalpincode.in/pincode/${pinCode}`, {
                    signal: controller.signal
                });

                if (!res.ok) throw new Error("Fetch failed");
                const json = await res.json();
                
                const office = json?.[0]?.PostOffice?.[0];
                if (office) {
                    updateFields({
                        state: office.State || state,
                        city: office.District || office.Name || city,
                    });
                }
            } catch (err) {
                // Silently fail, let user fill manually
                console.log("Pincode fetch failed or timed out:", err);
            } finally {
                clearTimeout(loadingTimer);
                clearTimeout(timeoutId);
                setPinLoading(false);
            }
        }, 500);

        return () => {
            clearTimeout(debounceTimer);
            clearTimeout(loadingTimer);
            clearTimeout(timeoutId);
            controller.abort();
            setPinLoading(false);
        };
    }, [pinCode, updateFields]);

    return (
        <FormWrapper title="Personal Details" subtitle="Enter required details">
            <div className="flex flex-col w-full gap-4 sm:gap-5">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-xl flex-shrink-0">
                        <User className="w-4 h-4 text-orange-600" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-800">Basic Information</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="form-field-group">
                        <label className="form-label text-xs sm:text-sm">
                            <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            Full Name
                            <span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <input
                            autoFocus
                            required
                            type="text"
                            placeholder="Enter your full name"
                            className="form-input text-sm sm:text-base"
                            value={name}
                            onChange={(e) => {
                                const sanitized = e.target.value.replace(/[^A-Za-z ]/g, "");
                                updateFields({ name: sanitized });
                            }}
                        />
                    </div>

                    <div className="form-field-group">
                        <label className="form-label text-xs sm:text-sm">
                            <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            Email Address
                            <span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <input
                            required
                            type="email"
                            placeholder="example@email.com"
                            className="form-input text-sm sm:text-base"
                            value={email}
                            onChange={(e) => updateFields({ email: e.target.value })}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="form-field-group">
                        <label className="form-label text-xs sm:text-sm">
                            <CalendarDays className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            Date of Birth
                            <span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <input
                            required
                            type="date"
                            className="form-input text-sm sm:text-base"
                            value={dateOfBirth}
                            onChange={(e) => updateFields({ dateOfBirth: e.target.value })}
                            max={new Date().toISOString().split("T")[0]}
                        />
                        {age !== null && (
                            <div className="flex items-center gap-2 text-xs mt-1.5">
                                <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold">Age: {age}</span>
                                {isMinor && <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 font-semibold">Minor</span>}
                            </div>
                        )}
                    </div>

                    <div className="form-field-group">
                        <label className="form-label text-xs sm:text-sm">
                            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            Phone Number
                            <span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <div className="max-w-md flex items-center rounded-xl border-2 border-slate-200 bg-white overflow-hidden focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all">
                            <span className="px-3 sm:px-4 py-3 sm:py-3.5 bg-slate-50 border-r border-slate-200 text-slate-500 font-semibold text-sm sm:text-base">+91</span>
                            <input
                                required
                                type="tel"
                                inputMode="numeric"
                                placeholder="10-digit number"
                                className="w-full px-3 sm:px-4 py-3 sm:py-3.5 text-slate-800 text-sm sm:text-base outline-none"
                                maxLength={10}
                                value={phoneNumber}
                                onChange={(e) => updateFields({ phoneNumber: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                            />
                        </div>
                    </div>
                </div>

                <div className="form-field-group">
                    <label className="form-label text-xs sm:text-sm">
                        <UsersRound className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Team Name
                        <span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <input
                        required
                        type="text"
                        placeholder="Enter your team name"
                        className="form-input text-sm sm:text-base"
                        value={teamName}
                        onChange={(e) => updateFields({ teamName: e.target.value })}
                    />
                </div>

                <div className="form-field-group">
                    <label className="form-label text-xs sm:text-sm">
                        <IdCard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Aadhaar Number
                        <span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <input
                        required
                        type="text"
                        inputMode="numeric"
                        maxLength={12}
                        placeholder="12-digit Aadhaar number"
                        className="form-input text-sm sm:text-base"
                        value={aadhaarNumber}
                        onChange={(e) => updateFields({ aadhaarNumber: e.target.value.replace(/\D/g, "").slice(0, 12) })}
                    />
                </div>

                <div className="flex items-center gap-3 mt-2">
                    <div className="p-2 bg-blue-100 rounded-xl flex-shrink-0">
                        <GraduationCap className="w-4 h-4 text-blue-600" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-800">Academic Information</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <CustomDropdown
                        label="Institution"
                        icon={Building2}
                        value={institutionName}
                        placeholder="Select institution"
                        options={["MRIS", "MRU", "MRIIRS", "Others"]}
                        onSelect={(option) => {
                            if (option === "MRIS") {
                                updateFields({ institutionName: option, scOrUni: "School", intOrExt: "Internal", institutionOtherName: "" });
                                return;
                            }
                            if (option === "Others") {
                                updateFields({ institutionName: option, intOrExt: "External" });
                                return;
                            }
                            updateFields({ institutionName: option, scOrUni: "University", institutionOtherName: "" });
                        }}
                        descriptions={institutionDescriptions}
                    />

                    {isOtherInstitution ? (
                        <CustomDropdown
                            label="Category"
                            icon={GraduationCap}
                            value={scOrUni}
                            placeholder="Select category"
                            options={["School", "University"]}
                            onSelect={(option) => updateFields({ scOrUni: option as UserFormData["scOrUni"] })}
                        />
                    ) : (
                        <div className="form-field-group">
                            <label className="form-label text-xs sm:text-sm">
                                <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                Category
                            </label>
                            <div className="form-input text-sm sm:text-base bg-slate-50 pointer-events-none">
                                {scOrUni}
                            </div>
                        </div>
                    )}
                </div>

                {isOtherInstitution && (
                    <div className="form-field-group">
                        <label className="form-label text-xs sm:text-sm">
                            <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            School / University Name
                            <span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <input
                            required
                            type="text"
                            placeholder="Enter institution name"
                            className="form-input text-sm sm:text-base"
                            value={institutionOtherName}
                            onChange={(e) => updateFields({ institutionOtherName: e.target.value })}
                        />
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {isOtherInstitution ? (
                        <div className="form-field-group">
                            <label className="form-label text-xs sm:text-sm">
                                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                Participant Type
                            </label>
                            <div className="form-input text-sm sm:text-base bg-slate-50 pointer-events-none">External</div>
                        </div>
                    ) : (
                        <CustomDropdown
                            label="Participant Type"
                            icon={Users}
                            value={intOrExt}
                            placeholder="Select type"
                            options={["Internal", "External"]}
                            onSelect={(option) => updateFields({ intOrExt: option as UserFormData["intOrExt"] })}
                        />
                    )}

                    <div className="form-field-group">
                        <label className="form-label text-xs sm:text-sm">
                            <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            {intOrExt === "Internal" ? "Roll Number" : "ID Number"}
                            <span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <input
                            required
                            type="text"
                            placeholder={intOrExt === "Internal" ? "e.g., 2026CSE001" : "School/College ID"}
                            className="form-input text-sm sm:text-base"
                            value={roll}
                            onChange={(e) => updateFields({ roll: e.target.value })}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3 mt-2">
                    <div className="p-2 bg-blue-100 rounded-xl flex-shrink-0">
                        <MapPin className="w-4 h-4 text-blue-600" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-800">Address</h3>
                </div>

                <div className="form-field-group">
                    <label className="form-label text-xs sm:text-sm">
                        <House className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Address Line 1
                        <span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <input
                        required
                        type="text"
                        placeholder="House/flat number, street"
                        className="form-input text-sm sm:text-base"
                        value={addressLine1}
                        onChange={(e) => updateFields({ addressLine1: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="form-field-group">
                        <label className="form-label text-xs sm:text-sm">
                            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            Pin Code
                            <span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <input
                            required
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            placeholder="6-digit pin"
                            className="form-input text-sm sm:text-base"
                            value={pinCode}
                            onChange={(e) => updateFields({ pinCode: e.target.value.replace(/\D/g, "").slice(0, 6) })}
                        />
                        {pinLoading && <p className="text-[11px] text-blue-600 mt-1">Fetching city/state...</p>}
                    </div>

                    <div className="form-field-group">
                        <label className="form-label text-xs sm:text-sm">
                            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            State
                            <span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <input
                            required
                            list="state-list"
                            type="text"
                            placeholder="Select or type state"
                            className="form-input text-sm sm:text-base"
                            value={state}
                            onChange={(e) => updateFields({ state: e.target.value })}
                        />
                        <datalist id="state-list">
                            {INDIA_STATES_AND_UTS.map((stateName) => (
                                <option key={stateName} value={stateName} />
                            ))}
                        </datalist>
                    </div>

                    <div className="form-field-group">
                        <label className="form-label text-xs sm:text-sm">
                            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            City
                            <span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <input
                            required
                            list="city-list"
                            type="text"
                            placeholder="Select or type city"
                            className="form-input text-sm sm:text-base"
                            value={city}
                            onChange={(e) => updateFields({ city: e.target.value })}
                        />
                        <datalist id="city-list">
                            {cityOptions.map((cityName) => (
                                <option key={cityName} value={cityName} />
                            ))}
                        </datalist>
                    </div>
                </div>

                <div className="form-field-group">
                    <label className="form-label text-xs sm:text-sm">
                        <House className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Address Line 2
                    </label>
                    <input
                        type="text"
                        placeholder="Area, landmark (optional)"
                        className="form-input text-sm sm:text-base"
                        value={addressLine2}
                        onChange={(e) => updateFields({ addressLine2: e.target.value })}
                    />
                </div>

                {isMinor && (
                    <div className="info-card-blue">
                        <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-semibold text-blue-800">Minor Participant</p>
                            <p className="text-xs sm:text-sm text-blue-600 mt-1">Parent/guardian verification will be required in next steps.</p>
                        </div>
                    </div>
                )}
            </div>
        </FormWrapper>
    );
}
