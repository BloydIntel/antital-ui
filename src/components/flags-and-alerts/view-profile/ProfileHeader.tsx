"use client";

import { OnboardingButton } from "@/components/onboarding/molecules/OnboardingButton";
import { TYPOGRAPHY } from "@/constants/styles";
import { ArrowLeft, FilePlus, X, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

export interface ProfileHeaderProps {
    name: string;
    role: string;
    id: string;
    timeOnPlatform?: string;
    registeredDate?: string;
    backText?: string;
    initials: string;
    onAddNote?: () => void;
    onSuspend?: () => void;
    onExport?: () => void;
    showExport?: boolean;
    isInvestorManagement?: boolean;
    investorCategory?: string;
    status?: string;
}

export function ProfileHeader({
    name,
    role,
    id,
    timeOnPlatform,
    registeredDate,
    backText,
    initials,
    onAddNote,
    onSuspend,
    onExport,
    showExport = false,
    isInvestorManagement,
    investorCategory,
    status
}: ProfileHeaderProps) {
    const router = useRouter();

    const displayBackText =
        backText ??
        (isInvestorManagement ? "Back to Investor Management" : "Back to Investigation");

    return (
        <div className="space-y-4">
            <button
                type="button"
                onClick={() =>
                    isInvestorManagement
                        ? router.push("/investor-management")
                        : router.back()
                }
                className="hidden lg:inline-flex items-center gap-2 text-[16px] text-[#858585] hover:text-[#11110F] transition-colors cursor-pointer"
            >
                <ArrowLeft className="w-4 h-4" />
                {displayBackText}
            </button>

            {/* Profile Info & Top Actions Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-md border border-[#EAEAEA]">
                <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div
                        className="w-14 h-14 rounded-full bg-[#EAEAEA] flex items-center justify-center text-[#1B1B1B] text-[28px] shrink-0"
                        style={{ ...TYPOGRAPHY.heading, fontWeight: 500 }}
                    >
                        {initials}
                    </div>

                    {/* Meta info */}
                    <div>
                        <div className="flex items-center gap-2.5">
                            <h1 className="text-[24px] font-medium text-[#11110F]">
                                {name}
                            </h1>
                            {isInvestorManagement ? (
                                <span className="inline-flex items-center rounded-md bg-[#FCFCFC] border border-[#EAEAEA] px-2.5 py-1 text-[12px] text-[#45B424]">
                                    {status ?? "Active"}
                                </span>
                            ) : (
                                <span className="text-[14px] font-medium text-[#7BA147]">
                                    {role}
                                </span>
                            )}
                        </div>
                        <p className="text-[14px] text-[#858585] mt-0.5">
                            {isInvestorManagement ?
                                <>
                                    {id} <span className="mx-1">•<span className="mx-1">{investorCategory}</span>•</span> Joined {registeredDate}
                                </> : <>
                                    {id} <span className="mx-1">•</span> Joined {timeOnPlatform}
                                </>}
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    {showExport ? (
                        <OnboardingButton
                            variant="plain"
                            label="Export"
                            icon={<Upload className="w-4 h-4 text-[#11110F]" />}
                            onClick={onExport}
                            className="my-0 lg:w-fit border-[#EAEAEA]"
                        />
                    ) : (
                        <div className="w-full flex items-center gap-3">
                            {/* Show 'Add Note' ONLY when NOT coming from Investor Management */}
                            {!isInvestorManagement && onAddNote && (
                                <OnboardingButton
                                    variant="plain"
                                    label="Add Note"
                                    icon={<FilePlus className="w-4 h-4 text-[#11110F]" />}
                                    onClick={onAddNote}
                                    className="my-0 lg:w-fit border-[#EAEAEA]"
                                />
                            )}

                            {/* Show 'Suspend Account' for both Investor Management and Investigation */}
                            {onSuspend && (
                                <OnboardingButton
                                    variant="plain"
                                    label={isInvestorManagement && status === "Suspended" ? "Unsuspend Account" : isInvestorManagement ? "Suspend Account" : "Suspend"}
                                    icon={<X className="w-4 h-4 text-[#D4001A]" />}
                                    onClick={onSuspend}
                                    className={`my-0 lg:w-fit text-[#D4001A] border-[#D4001A] bg-transparent ${isInvestorManagement ? "hover:text-black" : "hover:bg-[#D4001A]/5"}`}
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
