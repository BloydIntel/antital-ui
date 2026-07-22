'use client';

import React, { useMemo } from 'react';
import {
    User, Bell, Shield, Wallet, ChevronRight,
    ArrowLeft,
} from 'lucide-react';
import { TYPOGRAPHY } from '@/constants/styles';
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton';
import { CompanyProfile, MOCK_COMPANY_PROFILE } from '@/components/settings/organisms/fundraiser/CompanyProfile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TeamManagement } from '@/components/settings/organisms/fundraiser/TeamManagement';
import { ContactInformation } from '@/components/settings/organisms/fundraiser/ContactInformation';
import { EmailAlerts } from '@/components/settings/organisms/fundraiser/EmailAlert';
import { InAppNotifications } from '@/components/settings/organisms/fundraiser/InAppNotification';
import { MarketingPreferences } from '@/components/settings/organisms/fundraiser/MarketingPreferences';
import { SecurityAnd2fa } from '@/components/settings/organisms/fundraiser/SecurityAnd2fa';
import { BankAccount } from '@/components/settings/organisms/fundraiser/BankAccounts';
import { DisbursementSchedule } from '@/components/settings/organisms/fundraiser/DisbursementSchedule';

interface FundraiserSettingsProps {
    activeSlug: string;
    onNavigate: (slug: string) => void;
}

const SETTINGS_GROUPS = [
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
            { name: "Bank Accounts", slug: "bank-accounts" },
            { name: "Disbursement Schedule", slug: "disbursement" },
            { name: "Tax Documentation", slug: "tax-docs" },
        ]
    }
];

export default function FundraiserSettings({ activeSlug, onNavigate }: FundraiserSettingsProps) {

    const activePageName = useMemo(() => {
        if (!activeSlug) return '';
        for (const group of SETTINGS_GROUPS) {
            const match = group.items.find(item => item.slug === activeSlug);
            if (match) return match.name;
        }
        return '';
    }, [activeSlug]);

    const handleBack = () => onNavigate('');

    const renderSubView = () => {
        switch (activeSlug) {
            case 'company-profile':
                return <CompanyProfile onBack={handleBack} />;
            case 'team-management':
                return <TeamManagement />;
            case 'contact-information':
                return <ContactInformation onBack={handleBack} />;
            case 'email-alerts':
                return <EmailAlerts />;
            case 'in-app-notifications':
                return <InAppNotifications />;
            case 'marketing-preferences':
                return <MarketingPreferences />;
            case 'marketing-preferences':
                return <MarketingPreferences />;
            case 'password-2fa':
            case 'authorized-devices':
            case 'login-history':
                return <SecurityAnd2fa targetSection={activeSlug} />;
            case 'bank-accounts':
                return <BankAccount />;
            case 'disbursement':
                return <DisbursementSchedule />;
            default:
                return null;
        }
    };

    const subView = renderSubView();

    return (

        <div className="w-full font-sans">

            {activeSlug && (

                <div className="hidden lg:flex items-center gap-2 text-[18px] text-[#858585] mb-8">
                    <button
                        onClick={handleBack}
                        className="p-1 hover:bg-[#F2F2F2] rounded-lg transition-colors inline-flex items-center justify-center mr-1 cursor-pointer"
                        aria-label="Back to setting options root"
                    >
                        <ArrowLeft className="w-4.5 h-4.5 text-[#1B1B1B]" />
                    </button>
                    <span>Home</span>
                    <ChevronRight className="w-4.5 h-4.5 text-[#CCCCCC]" />
                    <span>Settings</span>
                    <ChevronRight className="w-4.5 h-4.5 text-[#CCCCCC]" />
                    <span className="text-[#1B1B1B]">{activeSlug === "password-2fa" ? "Security & 2FA" : activePageName}</span>
                </div>
            )}

            {subView ? (
                <div key={activeSlug} className="w-full animate-in fade-in slide-in-from-bottom-2 duration-300 fill-mode-forwards">
                    {subView}
                </div>
            ) : (
                <div className="w-full grid lg:grid-cols-11 gap-6 font-sans items-start">

                    {/* Left Corporate Brand Panel Block Card */}
                    <div className="lg:col-span-3 w-full shrink-0 flex flex-col items-center">
                        <div className=' bg-white border border-[#F4F5F7] rounded-md px-4 py-6 flex flex-col items-center w-full'>
                            <Avatar className="mb-4 h-14 w-14 border border-[#EAEAEA] cursor-pointer">
                                <AvatarImage src={MOCK_COMPANY_PROFILE.companyAvatarURL} alt="Company shorthand" />
                                <AvatarFallback>{MOCK_COMPANY_PROFILE.companyAvatarFallback}</AvatarFallback>
                            </Avatar>

                            <h4 className="text-[18px] text-[#1B1B1B] text-center mb-2" style={{ ...TYPOGRAPHY.body, fontWeight: 500 }}>
                                {MOCK_COMPANY_PROFILE.companyName}
                            </h4>
                            <p className="text-[12px] text-[#858585] text-center mb-4">
                                {MOCK_COMPANY_PROFILE.locationLabel}
                            </p>

                            <OnboardingButton
                                label="Edit Branding"
                                variant="plain"
                                className="w-full text-[14px] bg-[#F9FAFB] text-[#1B1B1B] border-none"
                            />
                        </div>

                        {/* Premium Badge Frame segment */}
                        <div className="w-full mt-4 bg-[#021310] text-white rounded-md p-4 relative overflow-hidden">
                            <span className="text-[12px] tracking-wide text-[#B9C65B]">Membership</span>
                            <h5 className="text-[18px] text-[#F4F5F7] font-medium mt-4">Premium Fundraiser</h5>
                            <p className="text-[14px] text-[#858585] mt-1">Valid until December 2026</p>
                            <button className="flex items-center justify-between w-full text-[12px] text-[#F4F5F7] mt-4 font-medium border-t border-[#1E3731] pt-2 group">
                                <span>Plan Details</span>
                                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </div>
                    </div>

                    {/* Right Group Stack Workspace Columns Layout Menu Panel */}
                    <div className="lg:col-span-8 w-full space-y-4">
                        {SETTINGS_GROUPS.map((group, gIdx) => {
                            const GroupIcon = group.icon;
                            return (
                                <div key={gIdx} className="bg-white border border-[#EAEAEA] rounded-md overflow-hidden">
                                    {/* Inner Heading Anchor Panel */}
                                    <div className="p-4 bg-[#F4F5F7] flex items-center gap-3">
                                        <div className='p-2 rounded-md bg-white'>
                                            <GroupIcon className="w-4 h-4 text-[#B9C65B]" />
                                        </div>
                                        <h4 className="text-[20px] text-[#1B1B1B]" style={TYPOGRAPHY.body}>
                                            {group.title}
                                        </h4>
                                    </div>

                                    {/* Settings Target Item Lists */}
                                    <div className="divide-y divide-[#EAEAEA] px-4">
                                        {group.items.map((item, iIdx) => (
                                            <button
                                                key={iIdx}
                                                type="button"
                                                onClick={() => onNavigate(item.slug)}
                                                className="w-full py-4 flex items-center justify-between text-left hover:bg-[#F9FAFB]/40 transition-colors group cursor-pointer"
                                            >
                                                <span className="text-[16px] text-[#505050] group-hover:text-[#1B1B1B] transition-colors">
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

                </div>)}
        </div>
    );
}