"use client";

import { ArrowLeft, Mail, CheckCircle2, MessageSquare, X } from "lucide-react";
import { KycUser } from "@/types/admin-investor-kyc";
import { TYPOGRAPHY } from "@/constants/styles";
import { useRouter } from "next/navigation";
import { OnboardingButton } from "@/components/onboarding/molecules/OnboardingButton";

interface KycHeaderProps {
    user: KycUser;
    onRequestMoreInfo?: () => void;
    onReject?: () => void;
    onApprove?: () => void;
    onSendApprovalEmail?: () => void;
}

export function KycHeader({
    user,
    onRequestMoreInfo,
    onReject,
    onApprove,
    onSendApprovalEmail,
}: KycHeaderProps) {
    const router = useRouter();
    const isApproved = user.status === "approved";
    const initials = user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();

    return (
        <div>
            {/* Top Navigation */}
            <button
                onClick={() => router.back()}
                className="hidden lg:inline-flex items-center gap-2 text-[16px] text-[#858585] hover:text-[#11110F] transition-colors cursor-pointer mb-4"
            >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Pending KYC</span>
            </button>

            {/* Action Header Card */}
            <div className="bg-white text-[#11110F] p-4 rounded-lg flex flex-col xl:flex-row xl:items-center justify-between gap-4 border border-[#EAEAEA]">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-[#FCFCFC] border border-[#A8A8A8] flex items-center justify-center text-[#505050] text-[28px]" style={{ ...TYPOGRAPHY.heading, fontWeight: 700 }}>
                        {initials}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-[24px] font-bold">{user.name}</h1>
                            <span
                                className={`text-xs px-2.5 py-0.5 rounded-md bg-[#FCFCFC] border border-[#EAEAEA] ${isApproved
                                    ? " text-[#45B424]"
                                    : " text-[#F4B942]"
                                    }`}
                            >
                                {isApproved ? "KYC Approved" : "Pending KYC"}
                            </span>
                        </div>
                        <p className="text-[14px] text-[#858585] mt-2">
                            {user.investorId} • {user.email}
                        </p>
                        <p className="text-[14px] text-[#858585] mt-2">
                            {isApproved
                                ? `Approved ${user.approvalDate}`
                                : `Submitted ${user.submittedDate}`}
                        </p>
                    </div>
                </div>

                {/* Dynamic Action Buttons */}
                <div className="flex flex-col lg:flex-row lg:justify-center lg:items-center gap-2 flex-wrap">
                    {!isApproved ? (
                        <>
                            <OnboardingButton
                                variant="plain"
                                label="Request more info"
                                onClick={() => onRequestMoreInfo?.()}
                                icon={<MessageSquare className="w-5 h-5" />}
                                className="my-0 lg:flex-1 lg:w-full xl:w-fit"
                            />

                            <OnboardingButton
                                variant="plain"
                                label="Reject KYC"
                                onClick={() => onReject?.()}
                                icon={<X className="w-5 h-5 text-[#D4001A]" strokeWidth={2.5} />}
                                className="my-0 lg:flex-1 lg:w-full xl:w-fit border-[#FFADB7] text-[#D4001A] hover:text-[#2C2C2C]"
                            />

                            <OnboardingButton
                                label="Approve KYC"
                                onClick={() => onApprove?.()}
                                icon={<CheckCircle2 className="w-5 h-5" />}
                                className="my-0 lg:flex-1 lg:w-full xl:w-fit bg-[#365852]"
                            />
                        </>
                    ) : (
                        <OnboardingButton
                            label="Send Approval Email"
                            onClick={() => onSendApprovalEmail?.()}
                            icon={<Mail className="w-5 h-5" />}
                            className="my-0 lg:w-fit"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}