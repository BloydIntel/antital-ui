"use client"

import React, { useRef, useState } from 'react'
import { Info, Upload, FileText, X, Loader2 } from 'lucide-react'
import { TYPOGRAPHY } from '@/constants/styles'
import { displayNameFromPathOrKey } from '@/lib/onboarding-file-upload'

const DEFAULT_ACCEPT = "image/jpeg,image/png,application/pdf"
const DOCUMENT_ACCEPT =
  "application/pdf,.pdf,application/vnd.ms-powerpoint,.ppt,application/vnd.openxmlformats-officedocument.presentationml.presentation,.pptx"

const DOCUMENT_MIME_TYPES = new Set([
  "application/pdf",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
])

const DOCUMENT_EXTENSIONS = [".pdf", ".ppt", ".pptx"]

function isAllowedDocument(file: File): boolean {
  if (DOCUMENT_MIME_TYPES.has(file.type)) return true
  const lower = file.name.toLowerCase()
  return DOCUMENT_EXTENSIONS.some((ext) => lower.endsWith(ext))
}

interface UploadSectionProps {
    label?: string;
    desc?: string;
    onUpload?: (file: File | null) => void;
    isError?: boolean;
    value?: File | null;
    /** Already-uploaded Cloudinary URL (hydration or eager upload). */
    uploadedUrl?: string | null;
    uploading?: boolean;
    /** File picker accept list. Defaults to images + PDF (KYC). */
    accept?: string;
    /** Helper text under the drop zone. */
    helperText?: string;
    /** When true, only PDF / PowerPoint files are accepted. */
    documentsOnly?: boolean;
}

export function UploadSection({
    label,
    desc,
    onUpload,
    isError,
    value,
    uploadedUrl,
    uploading = false,
    accept,
    helperText,
    documentsOnly = false,
}: UploadSectionProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [typeError, setTypeError] = useState<string | null>(null);

    const resolvedAccept = accept ?? (documentsOnly ? DOCUMENT_ACCEPT : DEFAULT_ACCEPT);
    const resolvedHelper =
        helperText ??
        (documentsOnly
            ? "Click here to upload, or drag and drop files (PDF and PowerPoint are supported)"
            : "Click here to upload, or drag and drop files (JPG's and PNG's are supported)");

    const handleContainerClick = () => {
        fileInputRef.current?.click();
    };

    const applyFile = (selectedFile: File | undefined) => {
        if (!selectedFile) return;
        if (documentsOnly && !isAllowedDocument(selectedFile)) {
            setTypeError("Please upload a PDF or PowerPoint file (.pdf, .ppt, .pptx)");
            onUpload?.(null);
            return;
        }
        setTypeError(null);
        onUpload?.(selectedFile);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        applyFile(e.target.files?.[0]);
        e.target.value = '';
    };

    const clearFile = (e: React.MouseEvent) => {
        e.stopPropagation();
        setTypeError(null);
        onUpload?.(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        applyFile(e.dataTransfer.files?.[0]);
    };

    // Safely detect if we have a file and it has a name property
    const hasFile = value instanceof File || (value && typeof value === 'object' && 'name' in value);
    const hasUploaded = Boolean(uploadedUrl);
    const showCompleted = Boolean(hasFile || hasUploaded);
    const displayName = hasFile
        ? (value?.name || "Document Uploaded")
        : hasUploaded
            ? displayNameFromPathOrKey(uploadedUrl!)
            : "Document Uploaded";
    const showError = (isError && !showCompleted && !uploading) || Boolean(typeError);

    return (
        <div className="space-y-2">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept={resolvedAccept}
                className="hidden"
                disabled={uploading}
            />

            {label && (
                <p className="text-[16px] text-[#2C2C2C]" style={TYPOGRAPHY.body}>
                    {label} <span className="text-red-500">*</span>
                </p>
            )}

            {desc && (
                <p className="text-[14px] text-gray-400" style={TYPOGRAPHY.body}>
                    {desc}
                </p>
            )}

            <div
                onClick={uploading ? undefined : handleContainerClick}
                onDragOver={uploading ? undefined : handleDragOver}
                onDrop={uploading ? undefined : handleDrop}
                className={`
                    border-2 border-dashed rounded-xl px-10 py-[72px] flex flex-col items-center justify-center 
                    transition-all bg-white text-center
                    ${uploading ? 'cursor-wait opacity-80' : 'cursor-pointer'}
                    ${showCompleted ? 'border-[#A7B832] bg-[#F9FAF5]' : 'border-[#E6EEDC] hover:bg-gray-50'}
                    ${showError ? 'border-red-500 bg-red-50' : ''} 
                `}
            >
                {uploading ? (
                    <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-8 h-8 text-[#A7B832] animate-spin" />
                        <p className="text-[14px] text-gray-500" style={TYPOGRAPHY.body}>
                            Uploading…
                        </p>
                    </div>
                ) : !showCompleted ? (
                    <>
                        <Upload className={`w-8 h-8 mb-3 ${showError ? 'text-red-400' : 'text-gray-400'}`} />
                        <p className={`text-[14px] max-w-[446px] ${showError ? 'text-red-500' : 'text-gray-500'}`} style={TYPOGRAPHY.body}>
                            {resolvedHelper}
                        </p>
                    </>
                ) : (
                    <div className="flex flex-col items-center animate-in zoom-in-95 duration-200">
                        <div className="relative p-4 bg-white rounded-lg border border-[#A7B832] shadow-sm mb-3">
                            <FileText className="w-10 h-10 text-[#A7B832]" />
                            <button
                                onClick={clearFile}
                                type="button"
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors z-20"
                            >
                                <X size={12} />
                            </button>
                        </div>
                        <p className="text-[14px] font-medium text-[#2C2C2C] max-w-[250px] truncate px-2">
                            {displayName}
                        </p>
                        {value?.size ? (
                            <p className="text-[12px] text-gray-400">
                                {(value.size / 1024).toFixed(1)} KB
                            </p>
                        ) : hasUploaded ? (
                            <p className="text-[12px] text-gray-400">Saved to cloud storage</p>
                        ) : null}
                    </div>
                )}
            </div>

            <div className={`flex items-center gap-3 p-3 rounded-lg border ${showError ? 'bg-red-50 border-red-100' : 'bg-[#F0F7FF] border-[#D1E4F9]'}`}>
                <Info className={`w-5 h-5 shrink-0 ${showError ? 'text-red-500' : 'text-[#3E82D5]'}`} />
                <p className={`text-[12px] ${showError ? 'text-red-500' : 'text-[#3E82D5]'}`} style={TYPOGRAPHY.body}>
                    {typeError
                        ? typeError
                        : isError && !showCompleted
                            ? "This document is required to proceed"
                            : "Ensure the document is clear and all information is visible"}
                </p>
            </div>
        </div>
    );
}
