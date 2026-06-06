'use client'

import React from 'react';
import { AlarmClock } from 'lucide-react';
import Image from 'next/image'
import { TYPOGRAPHY } from '@/constants/styles';
import { OnboardingButton } from '../../onboarding/molecules/OnboardingButton';

interface ReminderSuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    startupName: string
}

export function ReminderSuccessModal({ isOpen, onClose, startupName }: ReminderSuccessModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
            <div className="w-full max-w-[460px] bg-white rounded-md p-6 shadow-xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
                <div className="text-center space-y-5">

                    {/* Modal Header */}
                    <div className="items-center gap-2.5">
                        <div className="flex gap-2 rounded-lg text-[#042E27]">
                            <AlarmClock className="w-5 h-5" />
                            <h4 className="text-[16px] font-medium text-[#1F1F1F]">Set Investment Reminder</h4>
                        </div>
                        <div>
                            <p className="text-[16px] text-[#858585] mt-0.5 text-left">Get notified about {startupName}</p>
                        </div>
                    </div>

                    {/* Graphic Success Bell Vector Presentation Container */}
                    <div className="relative flex justify-center">
                        <Image src="/watchlist/success-alert.png" alt='success alert' width={78} height={76} />
                    </div>

                    {/* Success Message Body */}
                    <div className="space-y-2">
                        <h4 className="text-[16px] lg:text-[24px] text-[#1F1F1F]" style={TYPOGRAPHY.heading}>Reminder Set Successfully</h4>
                        <p className="text-[14px] lg:text-[16px] text-[#505050] mx-auto leading-relaxed">
                            Your reminder has been scheduled. We’ll notify you at the right time so you never miss an update
                        </p>
                    </div>

                    <OnboardingButton
                        type="button"
                        onClick={onClose}
                        label='Continue'
                        fontFamily='var(--font-clash-grotesk)'
                    />
                </div>
            </div>
        </div>
    );
}