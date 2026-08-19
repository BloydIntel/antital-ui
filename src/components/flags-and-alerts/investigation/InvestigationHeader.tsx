import Link from "next/link";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { OnboardingButton } from "@/components/onboarding/molecules/OnboardingButton";
import { TYPOGRAPHY } from "@/constants/styles";

interface InvestigationHeaderProps {
    flagId: string;
    title: string;
    onReassign: () => void;
    onFreezeAccount: () => void;
}

export function InvestigationHeader({
    flagId,
    title,
    onReassign,
    onFreezeAccount,
}: InvestigationHeaderProps) {
    return (
        <div className="space-y-4 mb-6">
            <Link
                href="/flags-and-alerts"
                className="hidden lg:inline-flex items-center gap-2 text-[16px] text-[#8D8D8D] hover:text-[#11110F] transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Flags and Alerts
            </Link>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-[24px] md:text-[28px] text-[#1B1B1B]" style={TYPOGRAPHY.body}>
                        Investigation: {flagId}
                    </h1>
                    <p className="text-[14px] text-[#505050] mt-0.5">{title}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">

                    <OnboardingButton
                        variant="plain"
                        label="Reassign"
                        onClick={onReassign}
                        className="my-0 w-fit border-[#8D8D8D]"
                    />

                    <OnboardingButton
                        label={
                            <span className="inline-block transition-transform duration-300 ease-in-out group-hover:-translate-x-[24px]">
                                Freeze Account
                            </span>
                        }
                        onClick={onFreezeAccount}
                        icon={
                            <span className="inline-flex items-center justify-center transition-transform duration-300 ease-in-out group-hover:translate-x-[120px]">
                                <LockKeyhole className="w-4 h-4" />
                            </span>
                        }
                        className="group my-0 w-fit border-white hover:border-[#858585] bg-[#D4001A]"
                    />
                </div>
            </div>
        </div>
    );
}