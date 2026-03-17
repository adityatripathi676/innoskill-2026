"use client";

import { DocumentFormData } from "@/types";
import FormWrapper from "./form-wrapper";
import { Upload, FileImage, Check, X, AlertCircle, CreditCard, BookOpen, IdCard, Eye, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import Image from "next/image";

type DocumentFormProps = DocumentFormData & {
    updateFields: (fields: Partial<DocumentFormData>) => void;
    isMinor: boolean;
}

type UploadCardProps = {
    title: string;
    description: string;
    icon: React.ElementType;
    file: File | null;
    preview: string;
    required: boolean;
    onUpload: (file: File, preview: string) => void;
    onRemove: () => void;
    acceptedTypes?: string;
    maxSizeLabel?: string;
}

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

function UploadCard({
    title,
    description,
    icon: Icon,
    file,
    preview,
    required,
    onUpload,
    onRemove,
    acceptedTypes = "image/*,application/pdf",
    maxSizeLabel = "Max 5MB"
}: UploadCardProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    const handleFileSelect = async (selectedFile: File) => {
        // Check file size (5MB max)
        if (selectedFile.size > 5 * 1024 * 1024) {
            alert("File size must be less than 5MB");
            return;
        }

        const type = (selectedFile.type || "").toLowerCase();
        if (type === "video/mp4" || type === "audio/mpeg" || type === "audio/mp3" || type === "audio/mp4" || isBlockedExtension(selectedFile.name)) {
            alert("MP3/MP4 files are not allowed");
            return;
        }

        const isImage = type.startsWith("image/");
        const isPdf = type === "application/pdf";
        const hasAllowedExt = type === "" ? isAllowedExtension(selectedFile.name) : false;

        if (!isImage && !isPdf && !hasAllowedExt) {
            alert("Only image or PDF files are allowed");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = async () => {
            let preview = reader.result as string;
            
            // Compress if it's an image to avoid "Payload Too Large" error
            if (isImage) {
                try {
                    const { compressImage } = await import("@/utils/image-compression");
                    preview = await compressImage(preview);
                } catch (err) {
                    console.error("Auto-compression failed", err);
                }
            }
            
            onUpload(selectedFile, preview);
        };
        reader.readAsDataURL(selectedFile);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            handleFileSelect(droppedFile);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const isUploaded = !!preview;
    const previewMime = preview ? getDataUrlMime(preview) : "";
    const isPdf = previewMime === "application/pdf";

    return (
        <>
            <div
                className={`relative rounded-xl border-2 border-dashed transition-all duration-300 ${
                    isUploaded
                        ? 'border-green-300 bg-green-50'
                        : isDragging
                            ? 'border-orange-400 bg-orange-50'
                            : 'border-slate-200 bg-white hover:border-orange-300 hover:bg-orange-50/30'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept={acceptedTypes}
                    className="hidden"
                    onChange={(e) => {
                        const selectedFile = e.target.files?.[0];
                        if (selectedFile) {
                            handleFileSelect(selectedFile);
                        }
                    }}
                />

                {isUploaded ? (
                    <div className="p-4">
                        <div className="flex items-start gap-3">
                            <div className="p-2.5 bg-green-500 rounded-xl flex-shrink-0">
                                <Check className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm text-green-800">{title}</p>
                                <p className="text-xs text-green-600 mt-0.5 truncate">{file?.name}</p>
                                <p className="text-xs text-green-500 mt-0.5">
                                    {file && (file.size / 1024).toFixed(1)} KB
                                </p>
                            </div>
                            <div className="flex gap-2">
                                {!isPdf && (
                                    <button
                                        type="button"
                                        onClick={() => setShowPreview(true)}
                                        className="p-2 rounded-lg bg-green-100 hover:bg-green-200 text-green-600 transition-colors"
                                        title="Preview"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={onRemove}
                                    className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
                                    title="Remove"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        className="w-full p-6 text-left"
                    >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <div className={`p-3 rounded-xl ${isDragging ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-500'} transition-colors`}>
                                <Icon className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <p className="font-semibold text-sm text-slate-800">{title}</p>
                                    {required && (
                                        <span className="px-1.5 py-0.5 text-[10px] font-medium bg-red-100 text-red-600 rounded">Required</span>
                                    )}
                                </div>
                                <p className="text-xs text-slate-500 mt-1">{description}</p>
                                <div className="flex items-center gap-3 mt-2">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-medium">
                                        <Upload className="w-3 h-3" />
                                        Click to upload
                                    </span>
                                    <span className="text-xs text-slate-400">{maxSizeLabel}</span>
                                </div>
                            </div>
                        </div>
                    </button>
                )}
            </div>

            {/* Preview Modal */}
            {showPreview && preview && preview !== "pdf" && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setShowPreview(false)}>
                    <div className="relative max-w-2xl max-h-[80vh] bg-white rounded-2xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
                        <div className="sticky top-0 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
                            <span className="font-semibold text-slate-800">{title}</span>
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
                                src={preview}
                                alt={title}
                                width={600}
                                height={400}
                                className="w-full h-auto rounded-lg object-contain max-h-[60vh]"
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default function DocumentForm({
    cancelledCheque,
    cancelledChequePreview,
    passbookPhoto,
    passbookPhotoPreview,
    aadhaarPhoto,
    aadhaarPhotoPreview,
    updateFields,
    isMinor
}: DocumentFormProps) {
    return (
        <FormWrapper
            title="Document Upload"
            subtitle="Upload required documents"
        >
            <div className="flex flex-col w-full gap-4 sm:gap-5">
                {/* Info Notice */}
                <div className="info-card-blue">
                    <FileImage className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-semibold text-blue-800">Document Requirements</p>
                        <p className="text-xs sm:text-sm text-blue-600 mt-1">
                            Upload clear JPG, PNG, or PDF files (max 5MB each).
                        </p>
                    </div>
                </div>

                {/* Section Header - Identity Documents */}
                <div className="flex items-center gap-3 mt-2">
                    <div className="p-2 bg-red-100 rounded-xl flex-shrink-0">
                        <IdCard className="w-4 h-4 text-red-600" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-800">Identity Verification</h3>
                </div>

                {/* Aadhaar Upload */}
                <UploadCard
                    title="Aadhaar Card"
                    description="Upload your Aadhaar card (front side) for identity verification"
                    icon={IdCard}
                    file={aadhaarPhoto}
                    preview={aadhaarPhotoPreview}
                    required={true}
                    onUpload={(file, preview) => updateFields({ aadhaarPhoto: file, aadhaarPhotoPreview: preview })}
                    onRemove={() => updateFields({ aadhaarPhoto: null, aadhaarPhotoPreview: "" })}
                />

                {/* Section Header - Bank Documents */}
                <div className="flex items-center gap-3 mt-4">
                    <div className="p-2 bg-orange-100 rounded-xl flex-shrink-0">
                        <CreditCard className="w-4 h-4 text-orange-600" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-800">Bank Verification (Any One Required)</h3>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {/* Cancelled Cheque */}
                    <UploadCard
                        title="Cancelled Cheque"
                        description="Upload a clear image of your cancelled cheque showing account details"
                        icon={CreditCard}
                        file={cancelledCheque}
                        preview={cancelledChequePreview}
                        required={false}
                        onUpload={(file, preview) => updateFields({ cancelledCheque: file, cancelledChequePreview: preview })}
                        onRemove={() => updateFields({ cancelledCheque: null, cancelledChequePreview: "" })}
                    />

                    {/* Passbook Photo */}
                    <UploadCard
                        title="Passbook Front Page"
                        description="Upload the first page of your passbook showing account holder name and number"
                        icon={BookOpen}
                        file={passbookPhoto}
                        preview={passbookPhotoPreview}
                        required={false}
                        onUpload={(file, preview) => updateFields({ passbookPhoto: file, passbookPhotoPreview: preview })}
                        onRemove={() => updateFields({ passbookPhoto: null, passbookPhotoPreview: "" })}
                    />
                </div>

                {/* Tips Section */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-sm font-semibold text-slate-700 mb-3">Upload Tips</p>
                    <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                            <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>Ensure all text is clearly readable</span>
                        </li>
                        <li className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                            <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>Avoid glare or shadows on the document</span>
                        </li>
                        <li className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                            <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>Account details must match the information provided</span>
                        </li>
                        <li className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                            <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>File size should not exceed 5MB</span>
                        </li>
                    </ul>
                </div>
            </div>
        </FormWrapper>
    );
}
