'use client';

import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { TYPOGRAPHY } from '@/constants/styles';
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton';

interface PayoutFrequencyCardProps {
    scheduleDescription?: string;
    onChangeSchedule?: () => void;
}

export function PayoutFrequencyCard({
    scheduleDescription = "Your current schedule is set to weekly disbursements every Monday.",
    onChangeSchedule,
}: PayoutFrequencyCardProps) {
    return (
        <div className="bg-[#021310] text-white rounded-lg px-4 py-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">

                <Clock className="w-6 h-6 text-[#B9C65B]" />


                {/* Text Content */}
                <div>
                    <h3 className="text-[18px] text-[#F4F5F7]" style={{ ...TYPOGRAPHY.heading, fontWeight: 700 }}>
                        Payout Frequency
                    </h3>
                    <p className="text-[14px] text-[#858585] mt-2 leading-relaxed max-w-[328px]" style={TYPOGRAPHY.body}>
                        {scheduleDescription}
                    </p>
                </div>
            </div>

            {/* Action Button */}
            <OnboardingButton
                variant="plain"
                label="Change Schedule"
                onClick={onChangeSchedule}
                icon={<ArrowRight className="w-4 h-4" />}
                className="bg-[#B9C65B] text-white hover:text-[#021310] border-none flex-row-reverse"
            />

        </div>
    );
}