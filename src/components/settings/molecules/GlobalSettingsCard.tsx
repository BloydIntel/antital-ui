'use client';

import React from 'react';
import { CheckCircle2, LucideIcon } from 'lucide-react';
import { TYPOGRAPHY } from '@/constants/styles';
import { cn } from '@/lib/utils';
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton';

interface GlobalSettingsCardProps {
    title?: string;
    description?: string;
    icon?: LucideIcon;
    buttonLabel?: string;
    onButtonClick: () => void;
    className?: string;
    iconContainerClassName?: string;
    buttonClassName?: string;
    buttonVariant?: 'plain' | 'solid';
}

export function GlobalSettingsCard({
    // Copied layout values configured as defaults
    title = "Global Mute",
    description = "Temporarily disable all mute for 24 hours",
    icon: Icon = CheckCircle2,
    buttonLabel = "Enable mute",
    onButtonClick,
    className,
    iconContainerClassName,
    buttonClassName,
    buttonVariant = 'plain',
}: GlobalSettingsCardProps) {
    return (
        <div className={cn(
            "bg-[#021310] text-white rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4",
            className
        )}>
            <div className="flex items-center gap-4">
                <div className={cn(
                    "p-4 bg-[#233131] rounded-md text-[#B9C65B] shrink-0",
                    iconContainerClassName
                )}>
                    <Icon className="w-6 h-6" />
                </div>
                <div>
                    <h4 className="text-[16px] tracking-tight text-[#F4F5F7]" style={{ ...TYPOGRAPHY.body, fontWeight: 700 }}>
                        {title}
                    </h4>
                    <p className="text-[14px] text-[#858585] mt-1">
                        {description}
                    </p>
                </div>
            </div>

            <OnboardingButton
                variant={buttonVariant}
                label={buttonLabel}
                onClick={onButtonClick}
                className={cn(
                    "sm:w-fit bg-[#03211C] border-[#365852] text-[#F4F5F7] hover:text-black my-0",
                    buttonClassName
                )}
            />
        </div>
    );
}