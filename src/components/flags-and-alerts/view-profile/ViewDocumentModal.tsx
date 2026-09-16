"use client";

import Image from "next/image";
import { FileText, CheckCircle2, X, Download, ArrowLeftRight } from "lucide-react";
import { TYPOGRAPHY } from "@/constants/styles";
import { OnboardingButton } from "@/components/onboarding/molecules/OnboardingButton";

export interface OcrData {
    documentType: string;
    issuingCountry: string;
    documentNumber: string;
    fullName: string;
    dateOfBirth: string;
    expiryDate: string;
}

export interface DocumentModalData {
    title: string;
    userName: string;
    userId: string;
    verificationStatus: string;
    documentImageUrl: string;
    ocrData: OcrData;
}

interface ViewDocumentModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: DocumentModalData;
}

export function ViewDocumentModal({ isOpen, onClose, data }: ViewDocumentModalProps) {
    if (!isOpen) return null;

    const ocrFields: { label: string; key: keyof OcrData }[] = [
        { label: "Document Type", key: "documentType" },
        { label: "Issuing Country", key: "issuingCountry" },
        { label: "Document Number", key: "documentNumber" },
        { label: "Full Name", key: "fullName" },
        { label: "Date of Birth", key: "dateOfBirth" },
        { label: "Expiry Date", key: "expiryDate" },
    ];

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = data.documentImageUrl;
        link.download = `${data.userName}_${data.title}`.replace(/\s+/g, "_");
        link.click();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-[694px] overflow-hidden rounded-2xl bg-white">
                {/* Header */}
                <div className="flex flex-col-reverse gap-1 lg:flex-row lg:items-center justify-between border-b border-[#EAEAEA] p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F4F4F4] text-[#444444]">
                            <FileText className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="text-[18px] font-medium text-[#11110F]">{data.title}</h3>
                            <p className="text-[14px] text-[#666666]">{data.userName} ({data.userId})</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3">
                        <div className="flex items-center gap-1.5 rounded-full bg-[#ABEFC6] px-3 py-1 text-[12px] text-[#067647]">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span>{data.verificationStatus}</span>
                        </div>
                        <button onClick={onClose} className="rounded-full p-1.5 text-[#858585] hover:bg-[#F4F4F4] hover:text-[#11110F]">
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="grid grid-cols-1 md:grid-cols-12 min-h-[380px]">
                    <div className="md:col-span-7 flex items-center justify-center bg-white p-6 border-b md:border-b-0 md:border-r border-[#EAEAEA]">
                        <div className="relative w-full max-w-[354px] aspect-[1.77/1] overflow-hidden rounded-xl border border-[#E0E0E0]">
                            <Image src={data.documentImageUrl} alt={data.title} width={354} height={200} />
                        </div>
                    </div>

                    <div className="md:col-span-5 px-4 pt-2 space-y-4">
                        <h4 className="text-[16px] font-medium text-[#11110F]" style={TYPOGRAPHY.body}>Extracted OCR Data</h4>
                        <div className="space-y-4 text-[14px]">
                            {ocrFields.map(({ label, key }) => (
                                <div key={key}>
                                    <p className="text-[#858585] text-[12px]">{label}</p>
                                    <p className="text-[#1B1B1B] mt-01">{data.ocrData[key]}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 border-t border-[#EAEAEA] p-4 bg-white">
                    <OnboardingButton
                        label="Download"
                        variant="plain"
                        icon={<Download className="h-4 w-4 text-[#2C2C2C]" />}
                        onClick={handleDownload}
                        className="my-0 w-fit"
                    />

                    <OnboardingButton
                        label={
                            <span className="relative inline-flex items-center justify-center">

                                <span className="absolute left-0 -translate-x-full opacity-0 scale-75 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-x-[20px] flex items-center justify-center">
                                    <ArrowLeftRight className="w-4 h-4 text-white" />
                                </span>

                                <span className="transition-transform duration-300 ease-out group-hover:translate-x-2.5">
                                    Close Viewer
                                </span>
                            </span>
                        }
                        className="group my-0 max-w-[150px]"
                        onClick={onClose}
                    />
                </div>
            </div>
        </div>
    );
}