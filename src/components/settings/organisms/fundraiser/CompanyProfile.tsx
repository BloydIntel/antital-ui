'use client';

import React, { useState } from 'react';
import { ArrowLeft, MapPin, Globe, Mail, ChevronRight } from 'lucide-react';
import { TYPOGRAPHY } from '@/constants/styles';
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton';

// 1. Define the structural type definition for the profile dataset
export interface CompanyProfileData {
    companyName: string;
    registrationNumber: string;
    bio: string;
    website: string;
    publicEmail: string;
    headquarters: string;
    completionPercentage: number;
    locationLabel: string;
}

// 2. Central Mock Data Object (easily swapped out for API responses later)
const MOCK_COMPANY_PROFILE: CompanyProfileData = {
    companyName: 'Skyhigh Technologies',
    registrationNumber: 'RC - 12345678',
    bio: 'Skyhigh Technologies is an innovative company dedicated to creating advanced prosthetic solutions. Based in the heart of Silicon Valley, we focus on enhancing the quality of life for individuals with limb loss through cutting-edge technology and personalized designs.',
    website: 'https://Skyhightechnologies.com',
    publicEmail: 'contact@skyhightech.com',
    headquarters: '123 Business way, Victoria Island, Lagos, Nigeria',
    completionPercentage: 85,
    locationLabel: 'Lagos, Nigeria'
};

interface CompanyProfileProps {
    onBack: () => void;
    onSave?: (updatedData: Partial<CompanyProfileData>) => void;
}

export function CompanyProfile({ onBack, onSave }: CompanyProfileProps) {
    // 3. Initialize mutable fields directly from the mock object
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

            {/* Breadcrumb Header Top Navigation Bar */}
            <div className="flex items-center gap-2 text-sm text-[#717171] mb-2">
                <button
                    onClick={onBack}
                    className="p-1 hover:bg-[#F2F2F2] rounded-lg transition-colors inline-flex items-center justify-center mr-1"
                    aria-label="Back to setting options root"
                >
                    <ArrowLeft className="w-4 h-4 text-[#1B1B1B]" />
                </button>
                <span>Home</span>
                <ChevronRight className="w-3 h-3 text-[#CCCCCC]" />
                <span>Settings</span>
                <ChevronRight className="w-3 h-3 text-[#CCCCCC]" />
                <span className="text-[#1B1B1B] font-medium">Company Profile</span>
            </div>

            {/* Banner Header Block Frame */}
            <div className="w-full bg-white border border-[#F4F5F7] rounded-xl overflow-hidden shadow-sm">
                <div className="w-full h-28 bg-[#0EA5E9] relative" />
                <div className="px-6 pb-6 pt-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 relative">
                    <div className="w-20 h-20 bg-[#0F172A] border-4 border-white rounded-full flex items-center justify-center shadow-md mt-[-40px] shrink-0">
                        <span className="text-white font-bold text-sm tracking-wide">
                            {form.companyName?.substring(0, 3).toUpperCase() || 'ORG'}
                        </span>
                    </div>
                    <div className="mt-2 sm:mt-0">
                        <h2 className="text-[20px] font-bold text-[#1B1B1B]" style={TYPOGRAPHY.heading}>
                            {form.companyName || 'Organization Name'}
                        </h2>
                        <p className="text-[13px] text-[#717171]">
                            Fundraising Organization – {MOCK_COMPANY_PROFILE.locationLabel}
                        </p>
                    </div>
                </div>
            </div>

            {/* Layout Grid Panels */}
            <div className="grid lg:grid-cols-12 gap-6 items-start">

                {/* Left Side: Editable form fields */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-white border border-[#F4F5F7] rounded-xl p-5 space-y-4 shadow-sm">
                        <h3 className="text-[15px] font-semibold text-[#1B1B1B]" style={TYPOGRAPHY.heading}>
                            General Information
                        </h3>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-[#717171]">Company Name</label>
                                <input
                                    type="text"
                                    value={form.companyName}
                                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                                    className="w-full h-11 px-3 bg-[#F4F5F7]/70 border border-transparent rounded-lg text-sm text-[#1B1B1B] focus:bg-white focus:border-[#EAEAEA] outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-[#717171]">Registration Number</label>
                                <input
                                    type="text"
                                    value={form.registrationNumber}
                                    onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                                    className="w-full h-11 px-3 bg-[#F4F5F7]/70 border border-transparent rounded-lg text-sm text-[#1B1B1B] focus:bg-white focus:border-[#EAEAEA] outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-[#717171]">Company Bio</label>
                            <textarea
                                rows={5}
                                value={form.bio}
                                onChange={(e) => handleInputChange('bio', e.target.value)}
                                className="w-full p-3 bg-[#F4F5F7]/70 border border-transparent rounded-lg text-sm text-[#1B1B1B] focus:bg-white focus:border-[#EAEAEA] outline-none transition-all resize-none leading-relaxed"
                            />
                        </div>
                    </div>

                    {/* Online Presence (Static Read-Only for Now) */}
                    <div className="bg-white border border-[#F4F5F7] rounded-xl p-5 space-y-4 shadow-sm">
                        <h3 className="text-[15px] font-semibold text-[#1B1B1B]" style={TYPOGRAPHY.heading}>
                            Online Presence
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3.5 bg-[#F4F5F7]/50 rounded-lg border border-transparent">
                                <div className="flex items-center gap-3">
                                    <Globe className="w-4 h-4 text-[#717171]" />
                                    <div>
                                        <span className="block text-[10px] text-[#999999] font-medium mb-0.5">Website</span>
                                        <span className="text-sm text-[#1B1B1B] font-medium">{MOCK_COMPANY_PROFILE.website}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-3.5 bg-[#F4F5F7]/50 rounded-lg border border-transparent">
                                <div className="flex items-center gap-3">
                                    <Mail className="w-4 h-4 text-[#717171]" />
                                    <div>
                                        <span className="block text-[10px] text-[#999999] font-medium mb-0.5">Public email</span>
                                        <span className="text-sm text-[#1B1B1B] font-medium">{MOCK_COMPANY_PROFILE.publicEmail}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side Sidebar: Data Driven Info cards */}
                <div className="lg:col-span-4 space-y-4">
                    <div className="bg-white border border-[#F4F5F7] rounded-xl p-5 space-y-4 shadow-sm">
                        <h3 className="text-[15px] font-semibold text-[#1B1B1B]" style={TYPOGRAPHY.heading}>
                            Location
                        </h3>
                        <div className="flex items-start gap-3">
                            <div className="p-1.5 bg-[#F4F5F7] rounded-lg text-[#717171] mt-0.5">
                                <MapPin className="w-4 h-4" />
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-[#1B1B1B]">Headquarters</h4>
                                <p className="text-xs text-[#717171] mt-1 leading-relaxed">
                                    {MOCK_COMPANY_PROFILE.headquarters}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#F7F9EC] border border-[#E3E8C4] rounded-xl p-5 space-y-3">
                        <h4 className="text-[14px] font-semibold text-[#667026]" style={TYPOGRAPHY.heading}>
                            Profile Strength
                        </h4>
                        <div className="space-y-2 pt-1">
                            <div className="w-full h-2 bg-white rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#829124] rounded-full transition-all duration-500"
                                    style={{ width: `${MOCK_COMPANY_PROFILE.completionPercentage}%` }}
                                />
                            </div>
                            <span className="block text-[11px] font-medium text-[#829124]">
                                {MOCK_COMPANY_PROFILE.completionPercentage}% Completed
                            </span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Bottom Form Actions Control Footnotes */}
            <div className="w-full flex justify-end items-center gap-3 pt-4 border-t border-[#F2F2F2]">
                <OnboardingButton
                    label="Discard Changes"
                    variant="plain"
                    className="px-6 py-2.5 bg-white border-[#EAEAEA] text-[#1B1B1B]"
                    onClick={onBack}
                />
                <OnboardingButton
                    label="Save Profile"
                    className="px-6 py-2.5 bg-[#06241E] text-white"
                    onClick={handleSubmit}
                />
            </div>

        </div>
    );
}