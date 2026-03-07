import { UserFormData } from "@/types";
import FormWrapper from "./form-wrapper";
import { ChevronDown, User, Building2, GraduationCap, Users, Phone, CreditCard, UsersRound, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type UserFormDataProps = UserFormData & {
    setFromUni: React.Dispatch<React.SetStateAction<boolean>>
    updateFields: any
}

// Custom dropdown component with animations
function CustomDropdown({
    label,
    icon: Icon,
    value,
    placeholder,
    options,
    onSelect,
    descriptions
}: {
    label: string;
    icon: React.ElementType;
    value: string;
    placeholder: string;
    options: string[];
    onSelect: (option: string) => void;
    descriptions?: Record<string, string>;
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
            </label>
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`custom-dropdown-trigger touch-manipulation ${isOpen ? 'ring-2 ring-orange-500/30 border-orange-500' : ''}`}
                >
                    <span className={`text-sm sm:text-base ${value ? 'text-slate-800' : 'text-slate-400'}`}>
                        {value || placeholder}
                    </span>
                    <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-slate-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <div className={`custom-dropdown-menu ${isOpen ? 'dropdown-open' : 'dropdown-closed'}`}>
                    {options.map((option) => (
                        <button
                            key={option}
                            type="button"
                            onClick={() => {
                                onSelect(option);
                                setIsOpen(false);
                            }}
                            className={`custom-dropdown-option touch-manipulation ${value === option ? 'selected' : ''}`}
                        >
                            <div className="flex flex-col items-start min-w-0">
                                <span className="font-medium text-sm sm:text-base">{option}</span>
                                {descriptions?.[option] && (
                                    <span className="text-[10px] sm:text-xs text-slate-400 truncate max-w-full">{descriptions[option]}</span>
                                )}
                            </div>
                            {value === option && (
                                <Check className="w-4 h-4 text-orange-500 flex-shrink-0" />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function UserForm({
    name,
    scOrUni,
    institutionName,
    intOrExt,
    roll,
    phoneNumber,
    feeType,
    teamName,
    setFromUni,
    updateFields
}: UserFormDataProps) {
    const institutionDescriptions: Record<string, string> = {
        "MRIS": "Manav Rachna International School",
        "MRU": "Manav Rachna University",
        "MRIIRS": "MR International Institute of Research & Studies"
    };

    const feeDescriptions: Record<string, string> = {
        "Registration": "Event participation only",
        "Accomodation": "Includes stay arrangements"
    };

    return (
        <FormWrapper
            title="Personal Details"
            subtitle="Fill in your information to get started"
        >
            <div className="flex flex-col w-full gap-3 sm:gap-4">
                {/* Row 1: Name */}
                <div className="form-field-group">
                    <label className="form-label text-xs sm:text-sm">
                        <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Full Name
                    </label>
                    <input
                        autoFocus
                        required
                        type="text"
                        placeholder="Enter your full name"
                        className="form-input text-sm sm:text-base"
                        value={name}
                        onChange={e => updateFields({ name: e.target.value })}
                    />
                </div>

                {/* Row 2: Study Type & Institution - Side by side on desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <CustomDropdown
                        label="Study Level"
                        icon={GraduationCap}
                        value={scOrUni}
                        placeholder="Select level"
                        options={["School", "University"]}
                        onSelect={(option) => {
                            updateFields({ scOrUni: option });
                            setFromUni(option === "University");
                        }}
                    />
                    
                    <CustomDropdown
                        label="Institution"
                        icon={Building2}
                        value={institutionName}
                        placeholder="Select institution"
                        options={["MRIS", "MRU", "MRIIRS"]}
                        onSelect={(option) => updateFields({ institutionName: option })}
                        descriptions={institutionDescriptions}
                    />
                </div>

                {/* Row 3: Participant Type & Roll Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <CustomDropdown
                        label="Participant Type"
                        icon={Users}
                        value={intOrExt}
                        placeholder="Select type"
                        options={["Internal", "External"]}
                        onSelect={(option) => updateFields({ intOrExt: option })}
                    />
                    
                    <div className="form-field-group">
                        <label className="form-label text-xs sm:text-sm">
                            <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            Roll Number
                        </label>
                        <input
                            required
                            type="text"
                            placeholder="e.g., 2024CSE001"
                            className="form-input text-sm sm:text-base"
                            value={roll}
                            onChange={e => updateFields({ roll: e.target.value })}
                        />
                    </div>
                </div>

                {/* Row 4: Phone & Fee Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="form-field-group">
                        <label className="form-label text-xs sm:text-sm">
                            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            Phone Number
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm sm:text-base">+91</span>
                            <input
                                required
                                type="tel"
                                inputMode="numeric"
                                placeholder="10-digit number"
                                className="form-input pl-12 sm:pl-14 text-sm sm:text-base"
                                maxLength={10}
                                value={phoneNumber}
                                onChange={e => updateFields({ phoneNumber: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                            />
                        </div>
                    </div>
                    
                    <CustomDropdown
                        label="Fee Type"
                        icon={CreditCard}
                        value={feeType}
                        placeholder="Select fee type"
                        options={["Registration", "Accomodation"]}
                        onSelect={(option) => updateFields({ feeType: option })}
                        descriptions={feeDescriptions}
                    />
                </div>

                {/* Row 5: Team Name */}
                <div className="form-field-group">
                    <label className="form-label text-xs sm:text-sm">
                        <UsersRound className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Team Name
                    </label>
                    <input
                        required
                        type="text"
                        placeholder="Enter your team name"
                        className="form-input text-sm sm:text-base"
                        value={teamName}
                        onChange={e => updateFields({ teamName: e.target.value })}
                    />
                    <p className="text-[10px] sm:text-xs text-slate-400 mt-1 sm:mt-1.5 ml-1">Choose a unique name for your team</p>
                </div>
            </div>
        </FormWrapper>
    )
}