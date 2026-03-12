"use client";

import { BankFormData } from "@/types";
import FormWrapper from "./form-wrapper";
import { CustomDropdown } from "@/components/user-form";
import { Building2, CreditCard, Hash, MapPin, Landmark, Check, AlertCircle, User, Shield } from "lucide-react";
import { useState } from "react";

type BankFormProps = BankFormData & {
    updateFields: (fields: Partial<BankFormData>) => void;
    isMinor: boolean;
    parentName: string;
}

export default function BankForm({
    accountHolderName,
    accountNumber,
    confirmAccountNumber,
    bankName,
    branchName,
    ifscCode,
    accountType,
    isParentAccount,
    updateFields,
    isMinor,
    parentName
}: BankFormProps) {
    const [showAccountNumber, setShowAccountNumber] = useState(false);
    
    const accountsMatch = accountNumber === confirmAccountNumber && accountNumber.length > 0;
    const isIfscValid = /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode.toUpperCase());

    // Handle IFSC code input - auto uppercase and validate format
    const handleIfscChange = (value: string) => {
        const formatted = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 11);
        updateFields({ ifscCode: formatted });
    };

    return (
        <FormWrapper
            title="Bank Account Details"
            subtitle="For refunds and prizes"
        >
            <div className="flex flex-col w-full gap-4 sm:gap-5">
                {/* Info Notice */}
                <div className="info-card-blue">
                    <Landmark className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-semibold text-blue-800">Why we need bank details</p>
                        <p className="text-xs sm:text-sm text-blue-600 mt-1">
                            Used for prize/refund transfer via NEFT/IMPS.
                        </p>
                    </div>
                </div>

                {/* Minor Account Notice */}
                {isMinor && (
                    <div className="info-card-blue">
                        <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-semibold text-blue-800">Account Requirement for School Students</p>
                            <p className="text-xs sm:text-sm text-blue-600 mt-1">
                                School participants should provide guardian account details for verification.
                            </p>
                        </div>
                    </div>
                )}

                {/* Parent Account Checkbox for Minors */}
                {isMinor && (
                    <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-orange-200/50">
                        <label className="flex items-start gap-3 cursor-pointer">
                            <div className="relative mt-0.5">
                                <input
                                    type="checkbox"
                                    checked={isParentAccount}
                                    onChange={e => {
                                        updateFields({ isParentAccount: e.target.checked });
                                        if (e.target.checked && parentName) {
                                            updateFields({ accountHolderName: parentName });
                                        }
                                    }}
                                    className="sr-only peer"
                                />
                                <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-orange-300 rounded-md bg-white peer-checked:bg-orange-500 peer-checked:border-orange-500 transition-all flex items-center justify-center">
                                    {isParentAccount && <Check className="w-3.5 h-3.5 text-white" />}
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-orange-500" />
                                    <span className="font-semibold text-sm sm:text-base text-slate-800">Use Parent/Guardian&apos;s Account</span>
                                </div>
                                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                                    {parentName ? `Account will be linked to ${parentName}` : "Enter your parent/guardian's account details"}
                                </p>
                            </div>
                        </label>
                    </div>
                )}

                {/* Section Header */}
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-xl flex-shrink-0">
                        <CreditCard className="w-4 h-4 text-orange-600" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-800">Account Information</h3>
                </div>

                {/* Row 1: Account Holder Name */}
                <div className="form-field-group">
                    <label className="form-label text-xs sm:text-sm">
                        <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Account Holder Name
                        <span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <input
                        required
                        type="text"
                        placeholder="Name as per bank records"
                        className="form-input text-sm sm:text-base uppercase"
                        value={accountHolderName}
                        onChange={e => updateFields({ accountHolderName: e.target.value.toUpperCase() })}
                    />
                    <p className="text-[10px] sm:text-xs text-slate-400 mt-1.5 ml-1">
                        Enter name exactly as it appears on your bank account
                    </p>
                </div>

                {/* Row 2: Account Number */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="form-field-group">
                        <label className="form-label text-xs sm:text-sm">
                            <Hash className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            Account Number
                            <span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <div className="relative">
                            <input
                                required
                                type={showAccountNumber ? "text" : "password"}
                                inputMode="numeric"
                                placeholder="Enter account number"
                                className="form-input text-sm sm:text-base pr-16"
                                value={accountNumber}
                                onChange={e => updateFields({ accountNumber: e.target.value.replace(/\D/g, '').slice(0, 18) })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowAccountNumber(!showAccountNumber)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-orange-500 hover:text-orange-600 transition-colors"
                            >
                                {showAccountNumber ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>
                    
                    <div className="form-field-group">
                        <label className="form-label text-xs sm:text-sm">
                            <Hash className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            Confirm Account Number
                            <span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <div className="relative">
                            <input
                                required
                                type="text"
                                inputMode="numeric"
                                placeholder="Re-enter account number"
                                className={`form-input text-sm sm:text-base ${
                                    confirmAccountNumber.length > 0 
                                        ? accountsMatch 
                                            ? 'border-green-500 focus:border-green-500 focus:ring-green-500/20' 
                                            : 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                        : ''
                                }`}
                                value={confirmAccountNumber}
                                onChange={e => updateFields({ confirmAccountNumber: e.target.value.replace(/\D/g, '').slice(0, 18) })}
                            />
                            {confirmAccountNumber.length > 0 && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                    {accountsMatch ? (
                                        <div className="p-1 bg-green-500 rounded-full">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                    ) : (
                                        <span className="text-xs text-red-500 font-medium">Mismatch</span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Section Header - Bank Details */}
                <div className="flex items-center gap-3 mt-2">
                    <div className="p-2 bg-blue-100 rounded-xl flex-shrink-0">
                        <Building2 className="w-4 h-4 text-blue-600" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-800">Bank Details</h3>
                </div>

                {/* Row 3: Bank Name & Branch */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="form-field-group">
                        <label className="form-label text-xs sm:text-sm">
                            <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            Bank Name
                            <span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <input
                            required
                            type="text"
                            placeholder="e.g., State Bank of India"
                            className="form-input text-sm sm:text-base"
                            value={bankName}
                            onChange={e => updateFields({ bankName: e.target.value })}
                        />
                    </div>
                    
                    <div className="form-field-group">
                        <label className="form-label text-xs sm:text-sm">
                            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            Branch Name
                            <span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <input
                            required
                            type="text"
                            placeholder="e.g., Faridabad Main Branch"
                            className="form-input text-sm sm:text-base"
                            value={branchName}
                            onChange={e => updateFields({ branchName: e.target.value })}
                        />
                    </div>
                </div>

                {/* Row 4: IFSC Code & Account Type */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="form-field-group">
                        <label className="form-label text-xs sm:text-sm">
                            <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            IFSC Code
                            <span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <div className="relative">
                            <input
                                required
                                type="text"
                                placeholder="e.g., SBIN0001234"
                                className={`form-input text-sm sm:text-base uppercase tracking-wider ${
                                    ifscCode.length === 11 
                                        ? isIfscValid 
                                            ? 'border-green-500 focus:border-green-500 focus:ring-green-500/20' 
                                            : 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                        : ''
                                }`}
                                maxLength={11}
                                value={ifscCode}
                                onChange={e => handleIfscChange(e.target.value)}
                            />
                            {ifscCode.length === 11 && isIfscValid && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                    <div className="p-1 bg-green-500 rounded-full">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                </div>
                            )}
                        </div>
                        <p className="text-[10px] sm:text-xs text-slate-400 mt-1.5 ml-1">
                            11-character IFSC code (e.g., SBIN0001234)
                        </p>
                    </div>
                    
                    <CustomDropdown
                        label="Account Type"
                        icon={CreditCard}
                        value={accountType}
                        placeholder="Select account type"
                        options={["Savings", "Current"]}
                        onSelect={(option: string) => updateFields({ accountType: option as BankFormData["accountType"] })}
                    />
                </div>

                {/* Security Notice */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
                    <Shield className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-semibold text-slate-700">Data Security</p>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">
                            Your bank details are securely encrypted and will only be used for official transactions related to INNOSKILLS 2026.
                        </p>
                    </div>
                </div>
            </div>
        </FormWrapper>
    );
}
