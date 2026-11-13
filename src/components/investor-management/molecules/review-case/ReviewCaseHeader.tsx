"use client";

import { Mail, Info, LockKeyholeOpen } from "lucide-react";
import { TYPOGRAPHY } from "@/constants/styles";
import { OnboardingButton } from "@/components/onboarding/molecules/OnboardingButton";

interface ReviewCaseHeaderProps {
    user: {
        name: string;
        investorId: string;
        status: string;
        suspendedDate: string;
    };
    investorId: string;
    onEscalateStr?: () => void;
    onLiftSuspension?: () => void;
    onContactInvestor?: () => void;
}

export function ReviewCaseHeader({ user, investorId, onEscalateStr, onLiftSuspension, onContactInvestor }: ReviewCaseHeaderProps) {
    const initials = user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();

    return (
        <div className="bg-white text-[#11110F] p-4 lg:p-5 rounded-xl flex flex-col xl:flex-row xl:items-center justify-between gap-4 border border-[#EAEAEA]">
            <div className="flex items-center gap-4">
                <div
                    className="w-17 h-17 rounded-full bg-[#FCFCFC] border border-[#A8A8A8] flex items-center justify-center text-[#505050] text-[28px]"
                    style={{ ...TYPOGRAPHY.heading, fontWeight: 500 }}
                >
                    {initials}
                </div>
                <div>
                    <div className="flex items-center gap-2.5">
                        <h1 className="text-[24px]" style={TYPOGRAPHY.heading}>{user.name}</h1>
                        <span className="text-xs px-2.5 py-0.5 rounded-md bg-[#FCFCFC] border border-[#EAEAEA] text-[#D4001A] font-medium">
                            {user.status}
                        </span>
                    </div>
                    <p className="text-[14px] text-[#858585] mt-1">
                        {investorId || user.investorId} • Suspended {user.suspendedDate}
                    </p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-3 flex-wrap">

                <OnboardingButton
                    variant="plain"
                    label=""
                    icon={<Mail className="w-4 h-4 text-[#11110F]" />}
                    className="my-0 lg:w-fit border-[#EAEAEA]"
                    onClick={() => onContactInvestor?.()}
                />

                <OnboardingButton
                    variant="plain"
                    label="Lift Suspension"
                    icon={<LockKeyholeOpen className="w-4 h-4 text-[#11110F]" />}
                    className="my-0 lg:w-fit border-[#EAEAEA]"
                    onClick={() => onLiftSuspension?.()}
                />
                <OnboardingButton
                    label="Escalate to STR"
                    icon={<Info className="w-4 h-4 text-white" />}
                    className="my-0 lg:w-fit bg-[#365852]"
                    onClick={() => onEscalateStr?.()}
                />
            </div>
        </div>
    );
}