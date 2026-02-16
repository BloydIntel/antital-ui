"use client"

import React, { useRef, useState } from 'react'
import { Info, Upload, FileText, X } from 'lucide-react'
import { TYPOGRAPHY } from '@/constants/styles'

interface UploadSectionProps {
    label: string;
    desc: string;
}

export function UploadSection({ label, desc }: UploadSectionProps) {
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Trigger the hidden file input click
    const handleContainerClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const clearFile = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent re-triggering the file dialog
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="space-y-2">
            {/* Hidden Native Input */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/jpeg,image/png,application/pdf"
                className="hidden"
            />

            <p className="text-[16px] text-[#2C2C2C]" style={TYPOGRAPHY.body}>
                {label} <span className="text-red-500">*</span>
            </p>
            <p className="text-[14px] text-gray-400" style={TYPOGRAPHY.body}>
                {desc}
            </p>

            {/* Clickable/Droppable Area */}
            <div
                onClick={handleContainerClick}
                className={`
                    border-2 border-dashed rounded-xl px-10 py-[72px] flex flex-col items-center justify-center 
                    transition-all cursor-pointer bg-white
                    ${file ? 'border-[#A7B832] bg-[#F9FAF5]' : 'border-[#E6EEDC] hover:bg-gray-50'}
                `}
            >
                {!file ? (
                    <>
                        <Upload className="w-8 h-8 text-gray-400 mb-3" />
                        <p className="text-[14px] text-center text-gray-500 max-w-[446px]" style={TYPOGRAPHY.body}>
                            Click here to upload, or drag and drop files (JPG&apos;s and PNG&apos;s are supported)
                        </p>
                    </>
                ) : (
                    <div className="flex flex-col items-center animate-in zoom-in-95 duration-200">
                        <div className="relative p-4 bg-white rounded-lg border border-[#A7B832] shadow-sm mb-3">
                            <FileText className="w-10 h-10 text-[#A7B832]" />
                            <button
                                onClick={clearFile}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                            >
                                <X size={12} />
                            </button>
                        </div>
                        <p className="text-[14px] font-medium text-[#2C2C2C]">{file.name}</p>
                        <p className="text-[12px] text-gray-400">{(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                )}
            </div>

            {/* Help/Info Bar */}
            <div className="flex items-center gap-3 p-3 bg-[#F0F7FF] rounded-lg border border-[#D1E4F9]">
                <Info className="w-5 h-5 text-[#3E82D5] shrink-0" />
                <p className="text-[12px] text-[#3E82D5]" style={TYPOGRAPHY.body}>
                    Ensure the document is clear and all information is visible
                </p>
            </div>
        </div>
    );
}