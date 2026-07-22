'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { TYPOGRAPHY } from '@/constants/styles';
import { BankAccountCard, BankAccountDetails } from '@/components/settings/organisms/fundraiser/bank-accounts/BankAccountCard';
import { PayoutSettingsCard } from '@/components/settings/organisms/fundraiser/bank-accounts/PayoutSettingsCard';
import { VerificationStatusCard } from '@/components/settings/organisms/fundraiser/bank-accounts/VerificationStatusCard';
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton';

const INITIAL_ACCOUNTS: BankAccountDetails[] = [
    {
        id: '1',
        bankName: 'Access Bank PLC',
        accountHolder: 'Skyhightechnologies',
        accountNumberMasked: '****5678',
        isPrimary: true,
        isVerified: true,
    },
    {
        id: '2',
        bankName: 'Zenith Bank',
        accountHolder: 'Skyhightechnologies',
        accountNumberMasked: '****5678',
        isPrimary: false,
        isVerified: true,
    },
];

export function BankAccount() {
    const [accounts] = useState<BankAccountDetails[]>(INITIAL_ACCOUNTS);

    const handleAddAccount = () => {
        console.log('Open Add Account Modal Flow');
    };

    const handleViewDetails = (id: string) => {
        console.log(`View details for account ID: ${id}`);
    };

    const handleMoreOptions = (id: string) => {
        console.log(`More options for account ID: ${id}`);
    };

    return (
        <div className="w-full font-sans space-y-6">

            {/* Header Title Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h2 className="text-[24px] lg:text-[28px] text-[#1B1B1B]" style={TYPOGRAPHY.heading}>
                        Bank Accounts
                    </h2>
                    <p className="text-[14px] lg:text-[16px] text-[#505050] mt-0.5" style={TYPOGRAPHY.body}>
                        Manage your verified bank accounts for disbursements.
                    </p>
                </div>

                <OnboardingButton
                    label="Add Account"
                    onClick={handleAddAccount}
                    icon={<Plus className="h-5 w-5" />}
                    className="text-[16px] my-0 h-[42px] lg:w-fit flex-row-reverse font-normal rounded-md"
                />

            </div>

            {/* Main Content Workspace Layout Grid */}
            <div className="grid lg:grid-cols-12 gap-6 items-start">

                {/* Left Primary Column: Accounts Stack & Add Account Dashed Slot */}
                <div className="lg:col-span-8 space-y-4">
                    {accounts.map((acc) => (
                        <BankAccountCard
                            key={acc.id}
                            account={acc}
                            onViewDetails={handleViewDetails}
                            onMoreOptions={handleMoreOptions}
                        />
                    ))}

                    {/* Dotted Border Empty Add Account Trigger Dropzone */}
                    <button
                        type="button"
                        onClick={handleAddAccount}
                        className="w-full lg:h-[239px] border-2 border-dashed border-[#888888] hover:border-[#B9C65B] rounded-md p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer group"
                    >
                        <Plus className="w-6 h-6 text-[#858585] group-hover:text-[#1B1B1B] mb-2 transition-colors" />
                        <span className="text-[14px] text-[#4D4D4D] group-hover:text-[#1B1B1B] transition-colors">
                            Add another bank account (Verification usually takes about 2–3 business days)
                        </span>
                    </button>
                </div>

                {/* Right Sidebar Column: Payout Settings & Compliance Cards */}
                <div className="lg:col-span-4 space-y-6">
                    <PayoutSettingsCard onEdit={() => console.log('Edit Payout Settings Triggered')} />
                    <VerificationStatusCard />
                </div>

            </div>

        </div>
    );
}