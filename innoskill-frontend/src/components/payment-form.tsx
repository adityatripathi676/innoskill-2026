"use client";

import FormWrapper from "./form-wrapper";
import { Building2, Copy, ExternalLink, IndianRupee, QrCode, Receipt, Check, CreditCard, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";

type PaymentFormProps = {
    transactionID: string,
    prices: number,
    fromUni: boolean,
    updateFields: any
}

export function PaymentForm({
    transactionID,
    prices,
    fromUni,
    updateFields
}: PaymentFormProps) {
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const bankDetails = {
        bankName: "Axis Bank",
        accountName: "MANAV RACHNA INTERNATIONAL INSTITUTE OF RESEARCH AND STUDIES GST",
        accountNo: "924020046485383",
        ifscCode: "UTIB0002693"
    };

    const copyToClipboard = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const upiLink = fromUni 
        ? "https://paytm.me/PYTMPS/dGSFjpP"
        : "https://secure.paytmpayments.com/link/paymentForm/46694/LL_759455946";

    return (
        <FormWrapper 
            title="Complete Payment" 
            subtitle="Choose your preferred payment method"
        >
            <div className="w-full space-y-4 overflow-visible">
                {/* Amount Display Card */}
                <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-red-500 to-rose-500 rounded-2xl p-4 sm:p-5 shadow-lg shadow-orange-500/20">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                    <div className="relative flex items-center gap-3 sm:gap-4">
                        <div className="p-3 sm:p-4 bg-white/20 backdrop-blur-sm rounded-xl">
                            <IndianRupee className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                        </div>
                        <div>
                            <p className="text-xs sm:text-sm text-white/80 font-medium">Amount to Pay</p>
                            <p className="text-3xl sm:text-4xl font-bold text-white">
                                ₹{prices}
                            </p>
                        </div>
                        {prices === 0 && (
                            <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full">
                                <Sparkles className="w-3.5 h-3.5 text-white" />
                                <span className="text-xs font-medium text-white">Free!</span>
                            </div>
                        )}
                    </div>
                    {prices === 0 && (
                        <p className="relative text-xs sm:text-sm text-white/90 font-medium mt-3 flex items-center gap-2">
                            <Check className="w-4 h-4" />
                            You&apos;ve only selected free events!
                        </p>
                    )}
                </div>

                {/* Payment Methods */}
                <div className="space-y-3">
                    {/* UPI Payment Option */}
                    <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-violet-200 transition-all duration-300 overflow-visible">
                        {/* Header with wrapped layout */}
                        <div className="flex flex-wrap items-start gap-2 sm:gap-3 mb-4">
                            <div className="p-2.5 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex-shrink-0">
                                <QrCode className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-[120px]">
                                <h3 className="font-bold text-sm sm:text-base text-slate-800">UPI Payment</h3>
                                <p className="text-xs text-slate-500">Quick & Secure</p>
                            </div>
                            <span className="flex-shrink-0 px-2.5 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] sm:text-xs font-semibold rounded-full shadow-sm">
                                Recommended
                            </span>
                        </div>
                        <a 
                            href={upiLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`w-full py-3 px-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] touch-manipulation ${prices === 0 ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''}`}
                            onClick={(e) => prices === 0 && e.preventDefault()}
                        >
                            <span className="text-sm sm:text-base">Pay with UPI</span>
                            <ExternalLink className="w-4 h-4" />
                        </a>
                        <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-slate-400">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Secured by PayTM Payment Gateway</span>
                        </div>
                    </div>

                    {/* Bank Transfer Option */}
                    <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300">
                        <div className="flex items-center gap-2 sm:gap-3 mb-4">
                            <div className="p-2.5 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex-shrink-0">
                                <Building2 className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm sm:text-base text-slate-800">Bank Transfer</h3>
                                <p className="text-xs text-slate-500">NEFT / IMPS / RTGS</p>
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            {Object.entries({
                                "Bank Name": bankDetails.bankName,
                                "Account Name": bankDetails.accountName,
                                "Account No": bankDetails.accountNo,
                                "IFSC Code": bankDetails.ifscCode
                            }).map(([label, value]) => (
                                <div key={label} className="flex items-center gap-2 p-2.5 sm:p-3 bg-slate-50 hover:bg-slate-100 rounded-lg sm:rounded-xl transition-colors">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wide">{label}</p>
                                        <p className="text-xs sm:text-sm font-medium text-slate-700 break-all">{value}</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => copyToClipboard(value, label)}
                                        className="p-2 rounded-lg hover:bg-white active:bg-slate-200 transition-colors duration-200 touch-manipulation flex-shrink-0"
                                    >
                                        {copiedField === label ? (
                                            <Check className="w-4 h-4 text-emerald-500" />
                                        ) : (
                                            <Copy className="w-4 h-4 text-slate-400" />
                                        )}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Transaction ID Input */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl sm:rounded-2xl border border-orange-200/50 p-4 sm:p-5">
                    <div className="flex items-center gap-2 sm:gap-3 mb-4">
                        <div className="p-2.5 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex-shrink-0">
                            <Receipt className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm sm:text-base text-slate-800">Confirm Payment</h3>
                            <p className="text-xs text-slate-500">Enter your transaction ID after payment</p>
                        </div>
                    </div>
                    
                    <div className="relative">
                        <CreditCard className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                        <input 
                            type="text" 
                            placeholder={prices === 0 ? "No payment required" : "Enter Transaction ID / UPI Ref No."}
                            className="w-full pl-11 sm:pl-12 pr-4 py-3.5 sm:py-4 bg-white border-2 border-orange-200 rounded-xl text-sm sm:text-base text-slate-800 font-medium transition-all duration-300 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 placeholder:text-slate-400 placeholder:font-normal disabled:bg-slate-100 disabled:border-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed" 
                            disabled={prices === 0}
                            value={transactionID} 
                            onChange={(e) => updateFields({ transactionID: e.target.value })} 
                        />
                    </div>
                    
                    {prices > 0 && (
                        <p className="text-xs text-slate-500 mt-3 text-center">
                            You&apos;ll receive confirmation at your registered email
                        </p>
                    )}
                </div>
            </div>
        </FormWrapper>
    )
}