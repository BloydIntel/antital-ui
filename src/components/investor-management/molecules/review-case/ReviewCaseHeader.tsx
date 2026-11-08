"use client";

import { Mail, Lock, AlertTriangle } from "lucide-react";
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
}

export function ReviewCaseHeader({ user, investorId }: ReviewCaseHeaderProps) {
    const initials = user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();

    return (
        <div className="bg-white text-[#11110F] p-4 lg:p-5 rounded-xl flex flex-col xl:flex-row xl:items-center justify-between gap-4 border border-[#EAEAEA]">
            <div className="flex items-center gap-4">
                <div
                    className="w-16 h-16 rounded-full bg-[#FCFCFC] border border-[#A8A8A8] flex items-center justify-center text-[#505050] text-[26px]"
                    style={{ ...TYPOGRAPHY.heading, fontWeight: 700 }}
                >
                    {initials}
                </div>
                <div>
                    <div className="flex items-center gap-2.5">
                        <h1 className="text-[24px] font-bold">{user.name}</h1>
                        <span className="text-xs px-2.5 py-0.5 rounded-md bg-[#FCFCFC] border border-[#EAEAEA] text-[#D4001A] font-medium">
                            {user.status}
                        </span>
                    </div>
                    <p className="text-[14px] text-[#858585] mt-1">
                        {investorId || user.investorId} • Suspended {user.suspendedDate}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
                <button
                    type="button"
                    onClick={() => console.log("Send email")}
                    className="w-10 h-10 rounded-lg border border-[#EAEAEA] flex items-center justify-center text-[#505050] hover:bg-gray-50 transition-colors"
                    aria-label="Send Email"
                >
                    <Mail className="w-4 h-4" />
                </button>
                <OnboardingButton
                    variant="plain"
                    label="Lift Suspension"
                    onClick={() => console.log("Lift suspension")}
                    icon={<Lock className="w-4 h-4 text-[#11110F]" />}
                    className="my-0 border-[#EAEAEA] text-[#11110F]"
                />
                <OnboardingButton
                    label="Escalate to STR"
                    onClick={() => console.log("Escalate to STR")}
                    icon={<AlertTriangle className="w-4 h-4 text-white" />}
                    className="my-0 bg-[#30534C] text-white hover:bg-[#25423C]"
                />
            </div>
        </div>
    );
}