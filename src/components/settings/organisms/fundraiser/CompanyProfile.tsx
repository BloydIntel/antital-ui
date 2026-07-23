'use client';

import React, { useState } from 'react';
import { MapPin, Globe, Mail } from 'lucide-react';
import { TYPOGRAPHY } from '@/constants/styles';
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { OnboardingInput } from '@/components/onboarding/molecules/OnboardingInput';

export interface CompanyProfileData {
    companyName: string;
    registrationNumber: string;
    bio: string;
    website: string;
    publicEmail: string;
    headquarters: string;
    completionPercentage: number;
    locationLabel: string;
    companyAvatarURL: string;
    companyAvatarFallback: string;

}

export const MOCK_COMPANY_PROFILE: CompanyProfileData = {
    companyName: 'Skyhigh Technologies',
    registrationNumber: 'RC - 12345678',
    bio: 'Skyhigh Technologies is an innovative company dedicated to creating advanced prosthetic solutions. Based in the heart of Silicon Valley, we focus on enhancing the quality of life for individuals with limb loss through cutting-edge technology and personalized designs.',
    website: 'https://Skyhightechnologies.com',
    publicEmail: 'contact@skyhightech.com',
    headquarters: '123 Business way, Victoria Island, Lagos, Nigeria',
    completionPercentage: 85,
    locationLabel: 'Lagos, Nigeria',
    companyAvatarURL: '/dashboard/plantIQ.png',
    companyAvatarFallback: 'ST'
};

const ONLINE_PRESENCE_CHANNELS = [
    {
        key: 'website',
        label: 'Website',
        icon: Globe,
        value: MOCK_COMPANY_PROFILE.website,
        onEdit: () => console.log('Edit website triggered'),
    },
    {
        key: 'email',
        label: 'Public email',
        icon: Mail,
        value: MOCK_COMPANY_PROFILE.publicEmail,
        onEdit: () => console.log('Edit public email triggered'),
    },
] as const;

interface CompanyProfileProps {
    onBack: () => void;
    onSave?: (updatedData: Partial<CompanyProfileData>) => void;
}

export function CompanyProfile({ onBack, onSave }: CompanyProfileProps) {

    const [form, setForm] = useState({
        companyName: MOCK_COMPANY_PROFILE.companyName,
        registrationNumber: MOCK_COMPANY_PROFILE.registrationNumber,
        bio: MOCK_COMPANY_PROFILE.bio
    });

    const handleInputChange = (field: keyof typeof form, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        if (onSave) {
            onSave(form);
        } else {
            console.log('API Payload ready for transport:', form);
        }
    };

    return (
        <div className="w-full font-sans space-y-6">

            {/* Banner Header Block Frame */}
            <div className="w-full bg-white border border-[#F4F5F7] rounded-xl overflow-hidden">
                <div className="w-full h-27 bg-[#0EA5E9] relative" />
                <div className="px-6 pb-6 pt-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 relative">

                    <Avatar className="mb-4 h-25 w-25 cursor-pointer mt-[-40px]">
                        <AvatarImage src={MOCK_COMPANY_PROFILE.companyAvatarURL} alt="Company shorthand" />
                        <AvatarFallback>{MOCK_COMPANY_PROFILE.companyAvatarFallback}</AvatarFallback>
                    </Avatar>

                    <div className="mt-2 lg:-mt-2">
                        <h2 className="text-[24px] text-[#1B1B1B]" style={TYPOGRAPHY.heading}>
                            {form.companyName || 'Organization Name'}
                        </h2>
                        <p className="text-[16px] text-[#858585]">
                            Fundraising Organization – {MOCK_COMPANY_PROFILE.locationLabel}
                        </p>
                    </div>
                </div>
            </div>

            {/* Layout Grid Panels */}
            <div className="grid lg:grid-cols-12 gap-6 items-start">

                {/* Left Side: Editable form fields */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-white border border-[#F4F5F7] rounded-xl px-4 pt-4">
                        <h3 className="text-[16px] text-[#1B1B1B] mb-4" style={{ ...TYPOGRAPHY.body, fontWeight: 600 }}>
                            General Information
                        </h3>

                        <div className="grid sm:grid-cols-2 gap-4">

                            <OnboardingInput
                                label='Company Name'
                                type="text"
                                value={form.companyName}
                                onChange={(e) => handleInputChange('companyName', e.target.value)}
                                inputAreaStyle='text-[16px] text-[#505050] focus:ring-1'
                                labelStyle='text-[#505050]'
                            />

                            <OnboardingInput
                                label='Registration Number'
                                type="text"
                                value={form.registrationNumber}
                                onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                                inputAreaStyle='text-[16px] text-[#505050] focus:ring-1'
                                labelStyle='text-[#505050]'
                            />

                        </div>

                        <OnboardingInput
                            label='Company Bio'
                            type="textarea"
                            value={form.bio}
                            onChange={(e) => handleInputChange('bio', e.target.value)}
                            inputAreaStyle='text-[16px] text-[#505050] focus:ring-1'
                            labelStyle='text-[#505050]'
                            className='pb-0'
                        />

                    </div>

                    {/* Online Presence (Static Read-Only for Now) */}
                    <div className="bg-white border border-[#F4F5F7] rounded-xl p-5 space-y-4">
                        <h3 className="text-[16px] text-[#1B1B1B] mb-4" style={{ ...TYPOGRAPHY.body, fontWeight: 600 }}>
                            Online Presence
                        </h3>
                        <div className="space-y-3">
                            {ONLINE_PRESENCE_CHANNELS.map(({ key, label, icon: Icon, value, onEdit }) => (
                                <div
                                    key={key}
                                    className="flex items-center justify-between p-3.5 bg-[#F4F5F7] rounded-lg border border-transparent"
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon className="w-5 h-5 text-[#1F1F1F]" />
                                        <div>
                                            <span className="block text-[12px] text-[#A8A8A8]">{label}</span>
                                            <span className="text-sm text-[#1B1B1B] font-medium">{value}</span>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={onEdit}
                                        className="text-[#B9C65B] text-[14px] font-medium cursor-pointer hover:text-[#A4B04E] transition-colors"
                                    >
                                        Edit
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side Sidebar: Data Driven Info cards */}
                <div className="lg:col-span-4 space-y-4">
                    <div className="bg-white border border-[#F4F5F7] rounded-xl p-5 space-y-4">
                        <h3 className="text-[16px] text-[#1B1B1B]" style={{ ...TYPOGRAPHY.body, fontWeight: 600 }}>
                            Location
                        </h3>
                        <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-[#858585]" />
                            <div>
                                <h4 className="text-[16px] font-medium text-[#505050]">Headquarters</h4>
                                <p className="text-[14px] text-[#858585] mt-1 leading-relaxed">
                                    {MOCK_COMPANY_PROFILE.headquarters}
                                </p>
                            </div>
                        </div>

                        <OnboardingButton
                            label="Update Location"
                            variant="plain"
                            className="w-full text-[14px] bg-[#F9FAFB] text-[#1B1B1B] border-none"
                        />
                    </div>

                    <div className="bg-[#EDF1D6] border border-[#B9C65B] rounded-xl px-4 py-6 space-y-3">
                        <h4 className="text-[16px] text-[#7D8A26]" style={{ ...TYPOGRAPHY.body, fontWeight: 500 }}>
                            Profile Strength
                        </h4>

                        <p className='text-[14px] text-[#858585]'>
                            Complete your profile to increase trust with potential investors
                        </p>
                        <div className="space-y-2 pt-3">
                            <div className="w-full h-2 bg-white rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#7D8A26] rounded-full transition-all duration-500"
                                    style={{ width: `${MOCK_COMPANY_PROFILE.completionPercentage}%` }}
                                />
                            </div>
                            <span className="block text-[12px] font-bold text-[#858585]">
                                {MOCK_COMPANY_PROFILE.completionPercentage}% Completed
                            </span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Bottom Form Actions Control Footnotes */}
            <div className="w-full flex  flex-col lg:flex-row justify-end items-center gap-3 pt-4">
                <OnboardingButton
                    label="Discard Changes"
                    variant="plain"
                    className="lg:max-w-[271px] border-[#EAEAEA]"
                    onClick={onBack}
                />
                <OnboardingButton
                    label="Save Profile"
                    className="lg:max-w-[271px]"
                    onClick={handleSubmit}
                />
            </div>

        </div>
    );
}