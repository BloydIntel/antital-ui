'use client';

import React from 'react';
import { TYPOGRAPHY } from '@/constants/styles';
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton';

interface PayoutSettingsCardProps {
    currency?: string;
    payoutMethod?: string;
    onEdit?: () => void;
}

export function PayoutSettingsCard({
    currency = "NGN (₦)",
    payoutMethod = "Direct Deposit",
    onEdit,
}: PayoutSettingsCardProps) {
    return (
        <div className="bg-[#021310] text-white rounded-md px-4 py-6 space-y-6">
            <h3 className="text-[18px] text-[#F4F5F7]" style={{ ...TYPOGRAPHY.heading, fontWeight: 700 }}>
                Payout Settings
            </h3>

            <div className="space-y-4">
                <div>
                    <span className="text-[14px] text-[#858585] block">Default currency</span>
                    <span className="text-[16px] lg:text-[18px] text-[#F4F5F7] font-bold mt-1 block">
                        {currency}
                    </span>
                </div>

                <div>
                    <span className="text-[14px] text-[#858585] block">Payout method</span>
                    <span className="text-[16px] lg:text-[18px] text-[#F4F5F7] font-bold mt-1 block">
                        {payoutMethod}
                    </span>
                </div>
            </div>

            <OnboardingButton
                variant="plain"
                label="Edit Payout Settings"
                onClick={onEdit}
                className="bg-[#B9C65B] text-white hover:text-[#021310] border-none"
            />
        </div>
    );
}