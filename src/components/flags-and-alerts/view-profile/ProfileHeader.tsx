"use client";

import { OnboardingButton } from "@/components/onboarding/molecules/OnboardingButton";
import { TYPOGRAPHY } from "@/constants/styles";
import { ArrowLeft, FilePlus, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProfileHeaderProps {
    name: string;
    role: string;
    id: string;
    joinedDate: string;
    initials: string;
    onAddNote?: () => void;
    onSuspend?: () => void;
}

export function ProfileHeader({
    name,
    role,
    id,
    joinedDate,
    initials,
    onAddNote,
    onSuspend,
}: ProfileHeaderProps) {
    const router = useRouter();

    return (
        <div className="space-y-4">

            <button
                type="button"
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 text-[16px] text-[#858585] hover:text-[#11110F] transition-colors cursor-pointer"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Investigation
            </button>

            {/* Profile Info & Top Actions Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-md border border-[#EAEAEA]">
                <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-14 h-14 rounded-full bg-[#EAEAEA] flex items-center justify-center text-[#1B1B1B]  text-[28px] shrink-0" style={{ ...TYPOGRAPHY.heading, fontWeight: 500 }}>
                        {initials}
                    </div>

                    {/* Meta info */}
                    <div>
                        <div className="flex items-center gap-2.5">
                            <h1 className="text-[24px] font-medium text-[#11110F]">
                                {name}
                            </h1>
                            <span className="text-[14px] font-medium text-[#7BA147]">
                                {role}
                            </span>
                        </div>
                        <p className="text-[14px] text-[#858585] mt-0.5">
                            {id} <span className="mx-1">•</span> Joined {joinedDate}
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <OnboardingButton
                        variant="plain"
                        label=" Add Note"
                        icon={<FilePlus className="w-4 h-4 text-[#11110F]" />}
                        onClick={onAddNote}
                        className="my-0 w-fit border-[#EAEAEA]"
                    />

                    <OnboardingButton
                        label="Suspend"
                        icon={<X className="w-4 h-4 text-[#D4001A]" />}
                        onClick={onSuspend}
                        className="my-0 w-fit text-[#D4001A] border-[#D4001A] bg-transparent"
                    />
                </div>
            </div>
        </div>
    );
}