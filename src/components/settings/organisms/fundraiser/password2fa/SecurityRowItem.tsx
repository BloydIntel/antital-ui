'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { TYPOGRAPHY } from '@/constants/styles';
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton';

interface SecurityRowItemProps {
    icon: LucideIcon;
    title: string;
    description: string;
    badge?: {
        label: string;
        variant: 'disabled' | 'enable';
    };
    buttonLabel: string;
    onActionClick: () => void;
}

export function SecurityRowItem({
    icon: Icon,
    title,
    description,
    badge,
    buttonLabel,
    onActionClick,
}: SecurityRowItemProps) {
    return (
        <div className="flex flex-col lg:flex-row gap-2 items-center justify-between py-4">
            <div className="flex items-start gap-4">
                <div className="p-3 bg-[#F9FAFB] rounded-md shrink-0 mt-0.5">
                    <Icon className="w-5 h-5 text-[#858585]" />
                </div>
                <div className='space-y-2'>
                    <div className="flex items-center gap-2">
                        <h4 className="text-[13px] lg:text-[16px] text-[#505050]" style={{ ...TYPOGRAPHY.body, fontWeight: 700 }}>
                            {title}
                        </h4>
                        {badge && (
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide uppercase ${badge.variant === 'disabled'
                                ? 'bg-[#FFE8E5] text-[#D4001A]'
                                : 'bg-[#D6FCCB] text-[#45B424]'
                                }`}>
                                {badge.label}
                            </span>
                        )}
                    </div>
                    <p className="text-[12px] lg:text-[14px] text-[#858585] mt-0.5" style={TYPOGRAPHY.body}>
                        {description}
                    </p>
                </div>
            </div>

            <OnboardingButton
                variant='plain'
                label={buttonLabel}
                onClick={onActionClick}
                className='my-0 bg-[#F4F5F7] text-[#A7B832] hover:text-black w-fit border-none'
            />
        </div>
    );
}