'use client'

import PaymentMethodsSettings from '@/components/balance-funding/molecules/PaymentMethodsSettings';
import { Account } from '@/components/settings/organisms/Account';
import { Notification } from '@/components/settings/organisms/Notification';
import { Preferences } from '@/components/settings/organisms/Preferences';
import { Profile } from '@/components/settings/organisms/Profile';
import { Security } from '@/components/settings/organisms/Security';
import { SettingsPillTab } from '@/components/settings/organisms/SettingsPillTab'
import { TYPOGRAPHY } from '@/constants/styles'
import { useInvestorAccount } from '@/hooks/use-settings';
import authService from '@/services/authService';
import { getUserIdFromAccessToken } from '@/lib/jwt';
import { tokenStorage } from '@/lib/token-storage';
import { showApiErrorToast } from '@/lib/error-feedback';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner';

export function Settings() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const tabParam = searchParams.get('tab');
    const { data: account, isLoading: isAccountLoading } = useInvestorAccount();

    const [activeTab, setActiveTab] = useState(() => tabParam || "profile");

    useEffect(() => {
        if (tabParam) {
            setActiveTab(tabParam);
        }
    }, [tabParam]);

    const handleDeleteAccount = useCallback(async () => {
        const userId = getUserIdFromAccessToken(tokenStorage.getAccessToken());
        if (userId == null) {
            throw new Error('Unable to determine user id.');
        }

        try {
            await authService.deleteAccount(userId);
            tokenStorage.clear();
            toast.success('Account deleted');
            router.push('/sign-in');
        } catch (error) {
            showApiErrorToast(error, 'Unable to delete account.');
            throw error;
        }
    }, [router]);

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
                return <Preferences onDeleteAccount={handleDeleteAccount} />
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
                    {isAccountLoading ? 'Loading...' : account?.accountType ?? 'Ordinary Investor'}
                </span>
            </div>
            <SettingsPillTab activeTab={activeTab} onTabChange={setActiveTab} />
            <div className="mt-12">
                {renderTabContent()}
            </div>
        </div>
    )
}
