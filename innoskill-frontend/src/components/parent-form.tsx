"use client";

import { ParentFormData } from "@/types";
import FormWrapper from "./form-wrapper";
import { CustomDropdown } from "@/components/user-form";
import { User, Phone, CreditCard, Shield, AlertCircle, Check } from "lucide-react";

type ParentFormProps = ParentFormData & {
    updateFields: (fields: Partial<ParentFormData>) => void;
    isMinor: boolean;
}

export default function ParentForm({
    parentType,
    parentName,
    parentPhone,
    parentAadhaar,
    updateFields,
    isMinor
}: ParentFormProps) {
    // Format Aadhaar for display (XXXX XXXX XXXX)
    const formatAadhaar = (value: string) => {
        const digits = value.replace(/\D/g, '').slice(0, 12);
        const parts = [];
        for (let i = 0; i < digits.length; i += 4) {
            parts.push(digits.slice(i, i + 4));
        }
        return parts.join(' ');
    };

    const handleAadhaarChange = (value: string) => {
        const digits = value.replace(/\D/g, '').slice(0, 12);
        updateFields({ parentAadhaar: digits });
    };

    const isAadhaarValid = parentAadhaar.length === 12;

    return (
        <FormWrapper
            title="Parent / Guardian Details"
            subtitle="Required for verification"
        >
            <div className="flex flex-col w-full gap-4 sm:gap-5">
                {/* Info Notice */}
                <div className="info-card-blue">
                    <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-semibold text-blue-800">Why this is needed</p>
                        <p className="text-xs sm:text-sm text-blue-600 mt-1">
                            {isMinor 
                                ? "For school participants, guardian details are mandatory."
                                : "Used for emergency and official communication."
                            }
                        </p>
                    </div>
                </div>

                {/* Section Header */}
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-xl flex-shrink-0">
                        <User className="w-4 h-4 text-orange-600" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-800">Guardian Information</h3>
                </div>

                {/* Row 1: Parent Type */}
                <CustomDropdown
                    label="Relation"
                    icon={User}
                    value={parentType}
                    placeholder="Select relation"
                    options={["Father", "Mother", "Guardian"]}
                    onSelect={(option: string) => updateFields({ parentType: option as ParentFormData["parentType"] })}
                />

                {/* Row 2: Parent Name */}
                <div className="form-field-group">
                    <label className="form-label text-xs sm:text-sm">
                        <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        {parentType || "Parent"}&apos;s Full Name
                        <span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <input
                        required
                        type="text"
                        placeholder={`Enter ${parentType?.toLowerCase() || "parent"}'s full name`}
                        className="form-input text-sm sm:text-base"
                        value={parentName}
                        onChange={e => {
                            const sanitized = e.target.value.replace(/[^A-Za-z ]/g, "");
                            updateFields({ parentName: sanitized });
                        }}
                    />
                </div>

                {/* Row 3: Parent Phone */}
                <div className="form-field-group">
                    <label className="form-label text-xs sm:text-sm">
                        <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        {parentType || "Parent"}&apos;s Phone Number
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
                            value={parentPhone}
                            onChange={e => updateFields({ parentPhone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                        />
                    </div>
                </div>

                {/* Section Header - Aadhaar */}
                <div className="flex items-center gap-3 mt-2">
                    <div className="p-2 bg-blue-100 rounded-xl flex-shrink-0">
                        <Shield className="w-4 h-4 text-blue-600" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-800">Identity Verification</h3>
                </div>

                {/* Row 4: Parent Aadhaar */}
                <div className="form-field-group">
                    <label className="form-label text-xs sm:text-sm">
                        <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        {parentType || "Parent"}&apos;s Aadhaar Number
                        <span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <div className="relative max-w-md">
                        <input
                            required
                            type="text"
                            inputMode="numeric"
                            placeholder="XXXX XXXX XXXX"
                            className={`form-input text-sm sm:text-base tracking-wider ${isAadhaarValid ? 'border-green-500 focus:border-green-500 focus:ring-green-500/20' : ''}`}
                            value={formatAadhaar(parentAadhaar)}
                            onChange={e => handleAadhaarChange(e.target.value)}
                        />
                        {isAadhaarValid && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                <div className="p-1 bg-green-500 rounded-full">
                                    <Check className="w-3 h-3 text-white" />
                                </div>
                            </div>
                        )}
                    </div>
                    <p className="text-[10px] sm:text-xs text-slate-400 mt-1.5 ml-1">
                        12-digit Aadhaar number for identity verification
                    </p>
                </div>

            </div>
        </FormWrapper>
    );
}
