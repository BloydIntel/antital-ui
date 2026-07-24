'use client';

import React from 'react';
import { TYPOGRAPHY } from '@/constants/styles';
import { DisbursementRowItem, DisbursementItem } from '@/components/settings/organisms/fundraiser/disbursement/DisbursementRowItem';
import { PayoutFrequencyCard } from '@/components/settings/organisms/fundraiser/disbursement/PayoutFrequencyCard';

const DISBURSEMENT_MOCK_DATA: DisbursementItem[] = [
    {
        id: '1',
        title: 'Scheduled Payout',
        dateAndBank: 'June 10, 2026 – Access Bank',
        amount: '₦1,243,678.00',
        status: 'PROCESSING',
    },
    {
        id: '2',
        title: 'Scheduled Payout',
        dateAndBank: 'June 17, 2026 – Access Bank',
        amount: '₦1,243,678,.00',
        status: 'PROCESSING',
    },
];

export function DisbursementSchedule() {
    const handleChangeSchedule = () => {
        console.log('Change Schedule Triggered');
    };

    return (
        <div className="w-full font-sans space-y-6">

            {/* Header Title Section */}
            <div>
                <h2 className="text-[24px] lg:text-[28px] text-[#1B1B1B]" style={TYPOGRAPHY.heading}>
                    Disbursement Schedule
                </h2>
                <p className="text-[14px] lg:text-[16px] text-[#505050] mt-0.5" style={TYPOGRAPHY.body}>
                    Manage your Payout timings and history.
                </p>
            </div>

            {/* Grid Workspace Layout */}
            <div className="grid lg:grid-cols-12 gap-6 items-start">

                {/* Left Primary Panel: Active Payout List */}
                <div className="lg:col-span-8 bg-white border border-[#F4F5F7] rounded-xl p-3 lg:p-6 space-y-4">
                    <h3 className="text-[16px] text-[#1B1B1B]" style={{ ...TYPOGRAPHY.body, fontWeight: 600 }}>
                        Upcoming Payouts
                    </h3>

                    <div>
                        {DISBURSEMENT_MOCK_DATA.map((item) => (
                            <DisbursementRowItem key={item.id} item={item} />
                        ))}
                    </div>
                </div>

                {/* Right Sidebar: Payout Frequency Banner Card */}
                <div className="lg:col-span-4">
                    <PayoutFrequencyCard onChangeSchedule={handleChangeSchedule} />
                </div>

            </div>

        </div>
    );
}