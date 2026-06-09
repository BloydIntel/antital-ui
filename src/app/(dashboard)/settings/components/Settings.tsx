'use client'

import { Account } from '@/components/settings/organisms/Account';
import { Notification } from '@/components/settings/organisms/Notification';
import { Payment } from '@/components/settings/organisms/Payment';
import { Preferences } from '@/components/settings/organisms/Preferences';
import { Profile } from '@/components/settings/organisms/Profile';
import { SettingsPillTab } from '@/components/settings/organisms/SettingsPillTab'
import { TYPOGRAPHY } from '@/constants/styles'
import { useState } from 'react'

export function Settings() {
    const [activeTab, setActiveTab] = useState("profile");

    const renderTabContent = () => {
        switch (activeTab) {
            case "profile":
                return <Profile />
            case "notification":
                return <Notification />
            case "account":
                return <Account />
            case "payment":
                return <Payment />
            case "preferences":
                return <Preferences />
            default:
                return null;
        }
    }
    return (
        <div>
            <div className='flex justify-between items-center'>
                <div>
                    <h3 className="text-[28px] text-[#1F1F1F]" style={TYPOGRAPHY.heading}>
                        Settings
                    </h3>
                    <p className="text-[16px] text-[#505050] mb-8" style={TYPOGRAPHY.body}>
                        Manage your account preferences and security
                    </p>
                </div>
                <span className="text-[16px] text-[#1F1F1F] bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg px-2 py-1.5" style={TYPOGRAPHY.heading}>
                    Ordinary Investor
                </span>
            </div>
            <SettingsPillTab activeTab={activeTab} onTabChange={setActiveTab} />
            <div className="mt-6">
                {renderTabContent()}
            </div>
        </div>
    )
}
