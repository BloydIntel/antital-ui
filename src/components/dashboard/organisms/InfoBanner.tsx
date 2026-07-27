'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { TYPOGRAPHY } from '@/constants/styles';

export type BannerType = 'kyc' | 'email-verification' | 'two-factor' | 'bank-account';
export type BannerState = 'action-required' | 'pending';

interface InfoBannerProps {
    type: BannerType;
    state?: BannerState;
    onActionClick?: () => void;
}

export function InfoBanner({ type, state = 'action-required', onActionClick }: InfoBannerProps) {

    const getBannerConfig = () => {
        switch (type) {
            case 'kyc':
                if (state === 'pending') {
                    return {
                        title: 'KYC Under Review',
                        description: 'Your verification has been submitted and is currently under review.',
                        buttonText: 'View Application',
                        bgClass: 'bg-[#E8F1FD] border-[#7CA6E8]',
                        titleColor: 'text-[#1A1A1A]',
                        descColor: 'text-[#555555]',
                        btnClass: 'bg-[#3B73B5] hover:bg-[#315f95] text-white',
                        icon: <AlertTriangle className="w-5 h-5 text-[#3B73B5]" />
                    };
                }
                return {
                    title: 'Complete KYC',
                    description: 'Update your personal details and profile to unlock all features',
                    buttonText: 'Complete KYC',
                    bgClass: 'bg-[#FCE9C4] border-[#F4B942]',
                    titleColor: 'text-[#1A1A1A]',
                    descColor: 'text-[#555555]',
                    btnClass: 'bg-[#7D8A26] hover:bg-[#687721] text-white',
                    icon: <AlertTriangle className="w-5 h-5 text-[#F4B942]" />
                };

            default:
                return null;
        }
    };

    const config = getBannerConfig();
    if (!config) return null;

    return (
        <div className={`w-full flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:py-[18px] sm:px-4 border rounded-lg gap-4 transition-all ${config.bgClass}`}>

            {/* Left Content Cluster matching image_16bc9d.png */}
            <div className="gap-3">
                {/* <div className="mt-0.5 flex-shrink-0">
                    {config.icon}
                </div> */}
                <div className='flex gap-2'>
                    {config.icon}
                    <h4
                        className={`text-[16px] lg:text-[20px] tracking-tight leading-snug ${config.titleColor}`}
                        style={TYPOGRAPHY.body}
                    >
                        {config.title}
                    </h4>
                </div>
                <p
                    className={`text-[14px] lg:text-[16px] mt-0.5 leading-relaxed ${config.descColor}`}
                    style={TYPOGRAPHY.body}
                >
                    {config.description}
                </p>

            </div>

            <button
                onClick={onActionClick}
                className={`w-full sm:w-auto px-5 py-2 rounded-md font-medium text-[14px] transition-colors duration-150 cursor-pointer text-center flex-shrink-0 ${config.btnClass}`}
                style={TYPOGRAPHY.body}
            >
                {config.buttonText}
            </button>

        </div>
    );
}
