'use client';

import React from 'react';
import {
    User, Bell, Shield, Wallet, ChevronRight,
} from 'lucide-react';
import { TYPOGRAPHY } from '@/constants/styles';
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton';
import { CompanyProfile } from '@/components/settings/organisms/fundraiser/CompanyProfile';

interface FundraiserSettingsProps {
    activeSlug: string;
    onNavigate: (slug: string) => void;
}

export default function FundraiserSettings({ activeSlug, onNavigate }: FundraiserSettingsProps) {

    // Schema from image_3f5da8.png
    const settingGroups = [
        {
            title: "Account Settings",
            icon: User,
            bgIcon: "bg-emerald-50 text-emerald-600",
            items: [
                { name: "Company Profile", slug: "company-profile" },
                { name: "Team Management", slug: "team-management" },
                { name: "Contact Information", slug: "contact-information" },
            ]
        },
        {
            title: "Notifications",
            icon: Bell,
            bgIcon: "bg-amber-50 text-amber-600",
            items: [
                { name: "Email Alerts", slug: "email-alerts" },
                { name: "In-app Notification", slug: "in-app-notifications" },
                { name: "Marketing Preferences", slug: "marketing-preferences" },
            ]
        },
        {
            title: "Security",
            icon: Shield,
            bgIcon: "bg-blue-50 text-blue-600",
            items: [
                { name: "Password & 2FA", slug: "password-2fa" },
                { name: "Authorized Devices", slug: "authorized-devices" },
                { name: "Login History", slug: "login-history" },
            ]
        },
        {
            title: "Payouts & Banking",
            icon: Wallet,
            bgIcon: "bg-lime-50 text-lime-600",
            items: [
                { name: "Verified Bank Accounts", slug: "verified-banking" },
                { name: "Disbursement Schedule", slug: "disbursements" },
                { name: "Tax Documentation", slug: "tax-docs" },
            ]
        }
    ];

    // Sub-view component switch routing handler logic
    if (activeSlug === 'company-profile') {
        return <CompanyProfile onBack={() => onNavigate('')} />;
    }

    return (
        <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-6 font-sans items-start">

            {/* Left Corporate Brand Panel Block Card */}
            <div className="w-full lg:w-[280px] shrink-0 bg-white border border-[#F4F5F7] rounded-xl p-5 flex flex-col items-center">
                <div className="relative w-20 h-20 rounded-full border border-gray-100 bg-[#0F172A] flex items-center justify-center mb-3 overflow-hidden shadow-inner">
                    <span className="text-white font-bold text-xl tracking-wide">SKY</span>
                    <div className="absolute inset-0 bg-sky-500/20 mix-blend-overlay" />
                </div>

                <h4 className="text-[16px] font-semibold text-[#1B1B1B] text-center" style={TYPOGRAPHY.heading}>
                    Skyhigh Technologies
                </h4>
                <p className="text-[12px] text-[#999999] text-center mb-4">
                    Lagos, Nigeria
                </p>

                <OnboardingButton
                    label="Edit Branding"
                    variant="plain"
                    className="w-full text-xs py-2 bg-[#F9FAFB] text-[#1B1B1B] border-[#EAEAEA]"
                />

                {/* Premium Badge Frame segment */}
                <div className="w-full mt-4 bg-[#051C14] text-white rounded-xl p-4 relative overflow-hidden">
                    <span className="text-[10px] tracking-wider uppercase font-medium text-[#B9C65B]">Membership</span>
                    <h5 className="text-[14px] font-semibold mt-1">Premium Fundraiser</h5>
                    <p className="text-[11px] text-gray-400 mt-0.5">Valid until December 2026</p>
                    <button className="flex items-center justify-between w-full text-[11px] text-[#B9C65B] mt-4 font-medium border-t border-white/10 pt-2 group">
                        <span>Plan Details</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Right Group Stack Workspace Columns Layout Menu Panel */}
            <div className="flex-1 w-full space-y-4">
                {settingGroups.map((group, gIdx) => {
                    const GroupIcon = group.icon;
                    return (
                        <div key={gIdx} className="bg-white border border-[#F4F5F7] rounded-xl overflow-hidden">
                            {/* Inner Heading Anchor Panel */}
                            <div className="p-4 bg-[#F9FAFB]/60 border-b border-[#F4F5F7] flex items-center gap-3">
                                <div className={`p-1.5 rounded-lg ${group.bgIcon}`}>
                                    <GroupIcon className="w-4 h-4" />
                                </div>
                                <h4 className="text-[14px] font-medium text-[#1B1B1B]" style={TYPOGRAPHY.heading}>
                                    {group.title}
                                </h4>
                            </div>

                            {/* Settings Target Item Lists */}
                            <div className="divide-y divide-[#F9FAFB]">
                                {group.items.map((item, iIdx) => (
                                    <button
                                        key={iIdx}
                                        type="button"
                                        onClick={() => onNavigate(item.slug)}
                                        className="w-full p-4 flex items-center justify-between text-left hover:bg-[#F9FAFB]/40 transition-colors group cursor-pointer"
                                    >
                                        <span className="text-[14px] text-[#505050] group-hover:text-[#1B1B1B] transition-colors">
                                            {item.name}
                                        </span>
                                        <ChevronRight className="w-4 h-4 text-[#CCCCCC] group-hover:text-[#717171] transition-colors" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    );
}