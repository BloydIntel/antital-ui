"use client";

import { OnboardingButton } from "@/components/onboarding/molecules/OnboardingButton";
import { ArrowLeft, Download } from "lucide-react";

interface PositionHeaderProps {
    title: string;
    campaignId: string;
    investorName: string;
    investorId: string;
    issuer: string;
    status: string;
    assetClass: string;
    onBack?: () => void;
    onDownloadCertificate?: () => void;
}

export function PositionHeader({
    title,
    campaignId,
    investorName,
    investorId,
    issuer,
    status,
    assetClass,
    onBack,
    onDownloadCertificate,
}: PositionHeaderProps) {
    const initials = title
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    return (
        <div className="space-y-4">
            {/* Back Button */}
            <button
                onClick={onBack}
                className="hidden lg:inline-flex items-center text-[14px] text-[#666666] hover:text-[#11110F] transition-colors cursor-pointer"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Full Profile
            </button>

            {/* Header Card */}
            <div className="bg-white rounded-xl border border-[#EAEAEA] p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    {/* Logo Avatar */}
                    <div className="w-16 h-16 rounded-full bg-[#FCFCFC] border border-[#A8A8A8] flex items-center justify-center font-medium text-[#333333] text-[28px]">
                        {initials}
                    </div>

                    <div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <h1 className="text-[24px] font-medium text-[#11110F]">{title}</h1>
                            <span className="bg-[#FCFCFC] border border-[#EAEAEA] text-[#137333] text-[12px] px-2 py-1 rounded-md">
                                {status}
                            </span>
                            <span className="text-[#858585] text-[12px] border border-[#EAEAEA] bg-[#FCFCFC] px-2 py-1 rounded-md">
                                {assetClass}
                            </span>
                        </div>

                        <p className="text-[12px] text-[#A8A8A8] mt-2">
                            <span className="text-[#858585] text-[12px] border border-[#EAEAEA] bg-[#FCFCFC] px-2 py-1 rounded-md">{campaignId}</span>

                            <span className="mx-1">•</span> Investor: {investorName} ({investorId})
                        </p>
                        <p className="text-[12px] text-[#858585] mt-2">Issuer: {issuer}</p>
                    </div>
                </div>

                {/* Download Button */}
                <OnboardingButton
                    variant="plain"
                    label="Download Certificate"
                    icon={<Download className="w-4 h-4 text-[#505050]" />}
                    onClick={onDownloadCertificate}
                    className="my-0 w-fit border-[#EAEAEA]"
                />
            </div>
        </div>
    );
}