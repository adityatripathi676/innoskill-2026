"use client";

import FormWrapper from "./form-wrapper";
import { Building2, Copy, ExternalLink, IndianRupee, QrCode, Receipt, Check, CreditCard, ShieldCheck, Sparkles, Calendar, Upload, FileImage, Eye, Trash2, X, AlertCircle } from "lucide-react";
import { useState, useRef } from "react";
import Image from "next/image";
import { PaymentFormData } from "@/types";

type PaymentFormProps = PaymentFormData & {
    prices: number,
    fromUni: boolean,
    updateFields: (fields: Partial<PaymentFormData>) => void
}

export function PaymentForm({
    transactionID,
    transactionDate,
    paymentReceipt,
    paymentReceiptPreview,
    prices,
    fromUni,
    updateFields
}: PaymentFormProps) {
    const [copiedField, setCopiedField] = useState<string | null>(null);
    const [showPreview, setShowPreview] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

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

    // TODO: Update UPI payment links before re-enabling the UPI payment option
    const upiLink = fromUni 
        ? "YOUR_UNI_UPI_LINK_HERE"
        : "YOUR_EXTERNAL_UPI_LINK_HERE";

    const getDataUrlMime = (value: string) => {
        const match = value.match(/^data:([^;]+);/);
        return match ? match[1].toLowerCase() : "";
    };

    const isBlockedExtension = (filename: string) => {
        const lower = filename.toLowerCase();
        return lower.endsWith(".mp3") || lower.endsWith(".mp4");
    };

    const isAllowedExtension = (filename: string) => {
        const lower = filename.toLowerCase();
        if (lower.endsWith(".pdf")) return true;
        return (
            lower.endsWith(".jpg") ||
            lower.endsWith(".jpeg") ||
            lower.endsWith(".png") ||
            lower.endsWith(".webp") ||
            lower.endsWith(".gif") ||
            lower.endsWith(".bmp") ||
            lower.endsWith(".heic") ||
            lower.endsWith(".heif")
        );
    };

    const handleFileSelect = (file: File) => {
        if (file.size > 5 * 1024 * 1024) {
            alert("File size must be less than 5MB");
            return;
        }
        const type = (file.type || "").toLowerCase();
        if (type === "video/mp4" || type === "audio/mpeg" || type === "audio/mp3" || type === "audio/mp4" || isBlockedExtension(file.name)) {
            alert("MP3/MP4 files are not allowed");
            return;
        }

        const isImage = type.startsWith("image/");
        const isPdf = type === "application/pdf";
        const hasAllowedExt = type === "" ? isAllowedExtension(file.name) : false;

        if (!isImage && !isPdf && !hasAllowedExt) {
            alert("Only image or PDF files are allowed");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            updateFields({ paymentReceipt: file, paymentReceiptPreview: reader.result as string });
        };
        reader.readAsDataURL(file);
    };

    const isPaid = prices === 0;
    const isReceiptUploaded = !!paymentReceiptPreview;
    const receiptMime = paymentReceiptPreview ? getDataUrlMime(paymentReceiptPreview) : "";
    const isReceiptPdf = receiptMime === "application/pdf";

    return (
        <FormWrapper 
            title="Complete Payment" 
            subtitle="Enter payment details"
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
                            <p className="text-xs sm:text-sm text-white/80 font-medium">Total Amount</p>
                            <p className="text-3xl sm:text-4xl font-bold text-white">
                                ₹{prices}
                            </p>
                        </div>
                        {isPaid && (
                            <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full">
                                <Sparkles className="w-3.5 h-3.5 text-white" />
                                <span className="text-xs font-medium text-white">Free!</span>
                            </div>
                        )}
                    </div>
                    {isPaid && (
                        <p className="relative text-xs sm:text-sm text-white/90 font-medium mt-3 flex items-center gap-2">
                            <Check className="w-4 h-4" />
                            You&apos;ve only selected free events!
                        </p>
                    )}
                </div>

                {!isPaid && (
                    <>
                        {/* Payment Methods */}
                        <div className="space-y-3">
                            {/* UPI Payment Option - Hidden until URLs are updated */}
                        {false && (
                                <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 overflow-visible">
                                <div className="flex flex-wrap items-start gap-2 sm:gap-3 mb-4">
                                    <div className="p-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex-shrink-0">
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
                                    className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] touch-manipulation"
                                >
                                    <span className="text-sm sm:text-base">Pay ₹{prices} with UPI</span>
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                                <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-slate-400">
                                    <ShieldCheck className="w-3.5 h-3.5" />
                                    <span>Secured by PayTM Payment Gateway</span>
                                </div>
                            </div>
                        )}

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
                    </>
                )}

                {/* Payment Confirmation Section */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl sm:rounded-2xl border border-orange-200/50 p-4 sm:p-5">
                    <div className="flex items-center gap-2 sm:gap-3 mb-4">
                        <div className="p-2.5 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex-shrink-0">
                            <Receipt className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm sm:text-base text-slate-800">Payment Confirmation</h3>
                            <p className="text-xs text-slate-500">{isPaid ? "No payment required" : "Enter transaction details after payment"}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {/* Transaction ID */}
                        <div className="form-field-group">
                            <label className="form-label text-xs sm:text-sm">
                                <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                Transaction ID / UTR / Ref No.
                                {!isPaid && <span className="text-red-500 ml-0.5">*</span>}
                            </label>
                            <input 
                                type="text" 
                                placeholder={isPaid ? "No payment required" : "Enter Transaction ID / UPI Ref No."}
                                className="form-input text-sm sm:text-base" 
                                disabled={isPaid}
                                value={transactionID} 
                                onChange={(e) => updateFields({ transactionID: e.target.value })} 
                            />
                        </div>

                        {/* Transaction Date */}
                        <div className="form-field-group">
                            <label className="form-label text-xs sm:text-sm">
                                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                Transaction Date
                                {!isPaid && <span className="text-red-500 ml-0.5">*</span>}
                            </label>
                            <input 
                                type="date" 
                                className="form-input text-sm sm:text-base" 
                                disabled={isPaid}
                                value={transactionDate} 
                                max={new Date().toISOString().split('T')[0]}
                                onChange={(e) => updateFields({ transactionDate: e.target.value })} 
                            />
                        </div>

                        {/* Payment Receipt Upload */}
                        {!isPaid && (
                            <div className="form-field-group">
                                <label className="form-label text-xs sm:text-sm">
                                    <FileImage className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    Payment Screenshot / Receipt
                                    <span className="text-red-500 ml-0.5">*</span>
                                </label>
                                
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*,application/pdf"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) handleFileSelect(file);
                                    }}
                                />

                                {isReceiptUploaded ? (
                                    <div className="p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 bg-green-500 rounded-lg flex-shrink-0">
                                                <Check className="w-4 h-4 text-white" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-sm text-green-800">Receipt Uploaded</p>
                                                <p className="text-xs text-green-600 truncate">{paymentReceipt?.name}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                {!isReceiptPdf && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPreview(true)}
                                                        className="p-2 rounded-lg bg-green-100 hover:bg-green-200 text-green-600 transition-colors"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => updateFields({ paymentReceipt: null, paymentReceiptPreview: "" })}
                                                    className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-full p-4 border-2 border-dashed border-orange-200 rounded-xl hover:border-orange-400 hover:bg-orange-50/50 transition-all"
                                    >
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="p-3 bg-orange-100 rounded-xl">
                                                <Upload className="w-6 h-6 text-orange-500" />
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm font-semibold text-slate-700">Upload Payment Screenshot</p>
                                                <p className="text-xs text-slate-500 mt-1">Click to upload (Max 5MB)</p>
                                            </div>
                                        </div>
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Important Notice */}
                    {!isPaid && (
                        <div className="mt-4 p-3 bg-amber-100 rounded-lg flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-amber-700">
                                Payment screenshot is mandatory as sometimes transaction IDs don&apos;t provide complete details. Ensure the amount and date are visible.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Preview Modal */}
            {showPreview && paymentReceiptPreview && !isReceiptPdf && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setShowPreview(false)}>
                    <div className="relative max-w-2xl max-h-[80vh] bg-white rounded-2xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
                        <div className="sticky top-0 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
                            <span className="font-semibold text-slate-800">Payment Receipt</span>
                            <button
                                type="button"
                                onClick={() => setShowPreview(false)}
                                className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-slate-500" />
                            </button>
                        </div>
                        <div className="p-4">
                            <Image
                                src={paymentReceiptPreview}
                                alt="Payment Receipt"
                                width={600}
                                height={400}
                                className="w-full h-auto rounded-lg object-contain max-h-[60vh]"
                            />
                        </div>
                    </div>
                </div>
            )}
        </FormWrapper>
    )
}
