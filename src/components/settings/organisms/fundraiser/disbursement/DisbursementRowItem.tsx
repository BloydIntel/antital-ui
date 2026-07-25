'use client';

import React from 'react';
import { TYPOGRAPHY } from '@/constants/styles';

export interface DisbursementItem {
    id: string;
    title: string;
    dateAndBank: string;
    amount: string;
    status: 'PROCESSING' | 'COMPLETED' | 'FAILED';
}

interface DisbursementRowItemProps {
    item: DisbursementItem;
}

export function DisbursementRowItem({ item }: DisbursementRowItemProps) {
    return (
        <div className="flex items-center justify-between py-4">
            {/* Left Column: Icon & Details */}
            <div className="flex items-center gap-2 lg:gap-4 min-w-0">
                <div className="w-12 h-12 bg-[#EFF6FF] text-[#1B1B1B] font-bold rounded-full flex items-center justify-center shrink-0 text-[16px]">
                    ₦
                </div>

                <div className="space-y-0.5 min-w-0">
                    <h4 className="text-[14px] text-[#505050]" style={{ ...TYPOGRAPHY.body, fontWeight: 500 }}>
                        {item.title}
                    </h4>
                    <p className="text-[12px] text-[#A8A8A8]" style={TYPOGRAPHY.body}>
                        {item.dateAndBank}
                    </p>
                </div>
            </div>

            {/* Right Column: Amount & Status Badge */}
            <div className="text-right shrink-0">
                <span className="block text-[14px] lg:text-[18px] text-[#1B1B1B]" style={{ ...TYPOGRAPHY.body, fontWeight: 700 }}>
                    {item.amount}
                </span>
                <span className={`block text-[10px] lg:text-[12px] font-bold tracking-wider uppercase mt-0.5 ${item.status === 'COMPLETED' ? 'text-[#34C759]' :
                    item.status === 'FAILED' ? 'text-[#D4001A]' :
                        'text-[#DCA73B]'
                    }`}>
                    {item.status}
                </span>
            </div>
        </div>
    );
}