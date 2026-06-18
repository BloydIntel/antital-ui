'use client'

import PaymentMethodsSettings from '@/components/balance-funding/molecules/PaymentMethodsSettings';
import { Account } from '@/components/settings/organisms/Account';
import { Notification } from '@/components/settings/organisms/Notification';
import { Preferences } from '@/components/settings/organisms/Preferences';
import { Profile } from '@/components/settings/organisms/Profile';
import { Security } from '@/components/settings/organisms/Security';
import { SettingsPillTab } from '@/components/settings/organisms/SettingsPillTab'
import { TYPOGRAPHY } from '@/constants/styles'
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react'

export function Settings() {
    const searchParams = useSearchParams();
    const tabParam = searchParams.get('tab');

    const [activeTab, setActiveTab] = useState(() => tabParam || "profile");

    useEffect(() => {
        if (tabParam) {
            setActiveTab(tabParam);
        }
    }, [tabParam]);

    const renderTabContent = () => {
        switch (activeTab) {
            case "profile":
                return <Profile />
            case "notification":
                return <Notification />
            case "security":
                return <Security />
            case "account":
                return <Account />
            case "payment":
                return <PaymentMethodsSettings />
            case "preferences":
                return <Preferences />
            default:
                return null;
        }
    }
    return (
        <div>
            <div className='flex justify-between items-center mb-8'>
                <div>
                    <h3 className="text-[28px] text-[#1F1F1F]" style={TYPOGRAPHY.heading}>
                        Settings
                    </h3>
                    <p className="text-[16px] text-[#505050]" style={TYPOGRAPHY.body}>
                        Manage your account preferences and security
                    </p>
                </div>
                <span className="hidden lg:block text-[16px] text-[#1F1F1F] bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg px-2 py-1.5" style={TYPOGRAPHY.heading}>
                    Ordinary Investor
                </span>
            </div>
            <SettingsPillTab activeTab={activeTab} onTabChange={setActiveTab} />
            <div className="mt-12">
                {renderTabContent()}
            </div>
        </div>
    )
}
