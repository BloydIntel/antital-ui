'use client';

import React, { useState } from 'react';
import { Globe, MessageCircle } from 'lucide-react';
import { TYPOGRAPHY } from '@/constants/styles';
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton';
import { OnboardingInput } from '@/components/onboarding/molecules/OnboardingInput';

export interface ContactInfoData {
    fullName: string;
    emailAddress: string;
    phoneNumber: string;
    isWhatsAppConnected: boolean;
    hasPublicHelpDesk: boolean;
}

const MOCK_CONTACT_INFO: ContactInfoData = {
    fullName: 'John Doe',
    emailAddress: 'doe@skyhightech.com',
    phoneNumber: '+234 801 234 5678',
    isWhatsAppConnected: false,
    hasPublicHelpDesk: true
};

const CONTACT_FIELDS = [
    { key: 'fullName', label: 'Full Name', type: 'text' },
    { key: 'emailAddress', label: 'Email Address', type: 'email' },
    { key: 'phoneNumber', label: 'Phone Number', type: 'text' },
] as const;

const SUPPORT_CHANNELS = [
    {
        id: 'whatsapp',
        label: 'WhatsApp Support',
        icon: MessageCircle,
        isConnected: MOCK_CONTACT_INFO.isWhatsAppConnected,
        onClick: () => console.log('Triggering WhatsApp integration configuration hook...'),
    },
    {
        id: 'helpdesk',
        label: 'Public Help Desk',
        icon: Globe,
        isConnected: MOCK_CONTACT_INFO.hasPublicHelpDesk,
        onClick: () => console.log('Triggering Help Desk settings panel mapping...'),
    },
] as const;


interface ContactInformationProps {
    onBack: () => void;
    onSave?: (updatedData: Partial<ContactInfoData>) => void;
}

export function ContactInformation({ onBack, onSave }: ContactInformationProps) {

    const [form, setForm] = useState({
        fullName: MOCK_CONTACT_INFO.fullName,
        emailAddress: MOCK_CONTACT_INFO.emailAddress,
        phoneNumber: MOCK_CONTACT_INFO.phoneNumber
    });

    const handleInputChange = (field: keyof typeof form, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        if (onSave) {
            onSave(form);
        } else {
            console.log('API Contact Payload ready for transport:', form);
        }
    };

    return (
        <div className="w-full font-sans space-y-6">

            {/* Header Description Title */}
            <div>
                <h2 className="text-[24px] lg:text-[28px] text-[#1B1B1B]" style={TYPOGRAPHY.heading}>
                    Contact Information
                </h2>
                <p className="text-[14px] lg:text-[16px] text-[#505050] mt-0.5" style={TYPOGRAPHY.body}>
                    Manage how we and your investors can reach you.
                </p>
            </div>

            {/* Main Content Workspace Layout Matrix Grid */}
            <div className="grid lg:grid-cols-12 gap-6 items-start">

                {/* Left Side Sheet: Primary Contact Details Fields */}
                <div className="lg:col-span-7 bg-white border border-[#F4F5F7] rounded-xl p-6 shadow-sm space-y-4">
                    <h3 className="text-[16px] text-[#1B1B1B]" style={{ ...TYPOGRAPHY.body, fontWeight: 600 }}>
                        Primary Contact
                    </h3>

                    <div className="space-y-1">

                        {CONTACT_FIELDS.map(({ key, label, type }) => (
                            <OnboardingInput
                                key={key}
                                label={label}
                                type={type}
                                value={form[key]}
                                onChange={(e) => handleInputChange(key, e.target.value)}
                                inputAreaStyle="text-[16px] text-[#505050] focus:ring-1"
                                labelStyle="text-[#505050]"
                            />
                        ))}

                    </div>
                </div>

                {/* Right Side Sheet: Integration Support Channels Panel */}
                <div className="lg:col-span-5 bg-white border border-[#F4F5F7] rounded-xl p-6 shadow-sm space-y-4">
                    <h3 className="text-[16px] text-[#1B1B1B]" style={{ ...TYPOGRAPHY.body, fontWeight: 600 }}>
                        Support Channels
                    </h3>

                    <div className="space-y-3">

                        {SUPPORT_CHANNELS.map(({ label, icon: Icon, isConnected, onClick }) => (
                            <div
                                key={label}
                                className="flex items-center justify-between p-3.5 bg-[#F4F5F7] rounded-lg border border-transparent"
                            >
                                <div className="flex items-center gap-3">
                                    <Icon className="w-4.5 h-4.5 text-[#858585]" />
                                    <span className="text-sm text-[#595959] font-medium">{label}</span>
                                </div>
                                <button
                                    type="button"
                                    className='text-[#B9C65B] text-[14px] font-medium cursor-pointer'
                                    onClick={onClick}
                                >
                                    {isConnected ? 'Manage' : 'Connect'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Bottom Form Action Commands Row Footer Component Strip */}
            <div className="w-full flex  flex-col lg:flex-row justify-end items-center gap-3 pt-4">
                <OnboardingButton
                    label="Discard Changes"
                    variant="plain"
                    className="lg:max-w-[271px] border-[#EAEAEA]"
                    onClick={onBack}
                />
                <OnboardingButton
                    label="Save Contact"
                    className="lg:max-w-[271px]"
                    onClick={handleSubmit}
                />
            </div>

        </div>
    );
}