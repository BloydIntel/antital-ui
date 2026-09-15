"use client";

import { Info, ArrowRightLeft, Circle, Check } from "lucide-react";
import { SecondaryMarketEligibility } from "@/types/position-detail";
import { OnboardingButton } from "@/components/onboarding/molecules/OnboardingButton";

interface SecondaryMarketProps {
    data: SecondaryMarketEligibility;
    onListClick?: () => void;
}

export function SecondaryMarketEligibilityCard({ data, onListClick }: SecondaryMarketProps) {
    const checks = [
        { label: "Investor tier eligible (HNWI / QII)", status: data.investorTierEligible },
        { label: "Minimum hold period met (14 days)", status: data.minimumHoldPeriodMet },
        { label: "No active trading restriction on asset", status: data.noActiveTradingRestriction },
        { label: "No open compliance flag on investor", status: data.noOpenComplianceFlag },
        { label: "Campaign not in locked disbursement", status: data.campaignNotInLockedDisbursement },
    ];

    const isEligible = checks.every((check) => check.status);

    return (
        <div className="bg-white rounded-lg border border-[#EAEAEA] space-y-4">
            <h2 className="text-[16px] font-medium text-[#040C17] border-b border-[#EAEAEA] p-4">Secondary Market Eligibility</h2>

            <div className="space-y-4 px-4">
                {checks.map((check, idx) => (
                    <div
                        key={idx}
                        className={`flex items-center gap-2.5 p-4 rounded-md border font-medium text-[14px] transition-colors ${check.status
                            ? "bg-[#F1F9E7] border-[#EAEAEA] text-[#11110F]"
                            : "bg-[#FAFAFA] border-[#EAEAEA] text-[#858585]"
                            }`}
                    >
                        {check.status ? (
                            <div className="rounded-full bg-[#45B424]"><Check className="w-4 h-4 text-white" /></div>
                        ) : (
                            <Circle className="w-4 h-4 text-[#CCCCCC] shrink-0" />
                        )}
                        <span>{check.label}</span>
                    </div>
                ))}
            </div>

            {/* Price Limit Callout */}
            <div className="flex items-center gap-2 p-4 mx-4 rounded-md font-medium bg-[#FAFAFA] border border-[#EAEAEA] text-[14px] text-[#858585]">
                <Info className="w-6 h-6 text-[#858585] shrink-0 mt-0.5" />
                <p>
                    Price limits apply: 10% from current NAV ({data.priceLimitMin} - {data.priceLimitMax} per unit)
                </p>
            </div>

            {/* List Action Button */}
            <div className="mx-4 mb-4">
                <OnboardingButton
                    label="List on Secondary Market"
                    icon={<ArrowRightLeft className="w-4 h-4" />}
                    onClick={onListClick}
                    className="my-0"
                    disabled={!isEligible}
                />
            </div>
        </div>
    );
}