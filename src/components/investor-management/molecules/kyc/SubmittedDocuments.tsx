"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, MoveDiagonal } from "lucide-react";
import { OnboardingButton } from "@/components/onboarding/molecules/OnboardingButton";

type TabType = "id" | "address" | "selfie";

interface DocumentData {
    title: string;
    referenceNo: string;
    imageSrc: string;
    issuedDate: string;
    expiryDate: string;
    selfieMatchScore?: string;
    footerInfo?: string;
}

const DOCUMENTS_DATA: Record<TabType, DocumentData> = {
    id: {
        title: "International passport",
        referenceNo: "AUE89289",
        imageSrc: "/images/kyc-international-passport.jpg",
        issuedDate: "Jan 2019",
        expiryDate: "Jan 2029",
    },
    address: {
        title: "Electricity Bill",
        referenceNo: "AUE89289",
        imageSrc: "/images/kyc-electricity-bill.jpg",
        issuedDate: "Jan 2019",
        expiryDate: "Jan 2029",
    },
    selfie: {
        title: "Selfie Liveness match",
        referenceNo: "AUE89289",
        selfieMatchScore: "96% match",
        imageSrc: "/admin-investor-kyc/kyc-selfie-verification.png",
        issuedDate: "Jan 2019",
        expiryDate: "Jan 2029",
        footerInfo: "ⓘ Face geometry match score via identity API",
    },
};

const TABS = [
    { id: "id", label: "ID Document" },
    { id: "address", label: "Proof of address" },
    { id: "selfie", label: "Selfie" },
] as const;

export function SubmittedDocuments() {
    const [activeTab, setActiveTab] = useState<TabType>("id");

    const currentDoc = DOCUMENTS_DATA[activeTab];


    return (
        <div className="bg-white rounded-lg border border-[#EAEAEA] font-sans text-[#11110F]">
            {/* Header & Tabs */}
            <div className="flex flex-col gap-3 xl:flex-row items-center justify-between py-5 px-4 border-b border-[#EAEAEA]">
                <h3 className="font-bold text-[16px] text-[#11110F]">Submitted Documents</h3>
                <div className="flex flex-col lg:flex-row gap-2 w-full xl:w-auto">
                    {TABS.map(({ id, label }) => (
                        <OnboardingButton
                            key={id}
                            onClick={() => setActiveTab(id)}
                            label={label}
                            variant={activeTab === id ? "solid" : "plain"}
                            className={`my-0 lg:flex-1 lg:w-full xl:w-fit ${activeTab === id ? "bg-[#365852]" : ""
                                }`}
                        />
                    ))}
                </div>
            </div>

            <div className="p-4">
                {/* Sub-header / Status Badge */}
                <div className="flex items-center justify-between mb-3">
                    <span className="text-[16px] font-medium text-[#11110F]">
                        {currentDoc.title}
                    </span>
                    {activeTab === "selfie" ? (
                        <span className="flex items-center gap-1 bg-[#E3F8DD] text-[#45B424] text-[14px] px-2 py-3 rounded-lg font-bold border border[#E3F8DD]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#45B424]" />
                            {currentDoc.selfieMatchScore}
                        </span>
                    ) : (
                        <span className="text-xs font-mono text-[#858585]">
                            {currentDoc.referenceNo}
                        </span>
                    )}
                </div>

                {/* Image Container */}
                <div className="relative w-full h-64 rounded-lg overflow-hidden border border-[#EAEAEA] bg-gray-50">
                    <Image
                        src={currentDoc.imageSrc}
                        alt={currentDoc.title}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Footer Info & Full View Action */}
                <div className="flex items-center gap-2 mt-3 text-[11px] lg:text-[14px] text-[#858585]">
                    <span>
                        {activeTab === "selfie"
                            ? currentDoc.footerInfo
                            : `Issued: ${currentDoc.issuedDate} - Expires: ${currentDoc.expiryDate}`}
                    </span>
                    <button
                        onClick={() => window.open(currentDoc.imageSrc, "_blank")}
                        className="flex items-center gap-2 text-[#83AB4B] text-[11px] lg:text-[14px] font-bold hover:underline"
                    >
                        <MoveDiagonal className="w-3 lg:w-4 h-3 lg:h-4" /> Full view
                    </button>
                </div>
            </div>
        </div>
    );
}