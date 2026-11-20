"use client";

import { TYPOGRAPHY } from "@/constants/styles";
import { Info } from "lucide-react";

interface FinancialImpactCardProps {
    financialImpact: {
        walletBalance: string;
        activePositions: number;
        pendingWithdrawals: string;
        withdrawalBlocked: boolean;
    };
}

export function FinancialImpactCard({ financialImpact }: FinancialImpactCardProps) {
    return (
        <div className="bg-white rounded-xl border border-[#EAEAEA]">
            <h2 className="text-[16px] text-[#11110F] border-b border-[#EAEAEA] p-4" style={{ ...TYPOGRAPHY.body, fontWeight: '500' }}>Financial Impact</h2>
            <div className="space-y-3 p-4">
                <div className="flex justify-between items-center bg-[#FCFCFC] p-2 rounded-md border border-[#EAEAEA]">
                    <span className="text-[16px] text-[#858585]">Wallet Balance</span>
                    <span className="text-[18px] font-medium text-[#11110F]">
                        +{financialImpact.walletBalance}
                    </span>
                </div>
                <div className="flex justify-between items-center py-2">
                    <span className="text-[14px] text-[#858585]">Active positions</span>
                    <span className="text-[16px] font-medium text-[#11110F]">
                        {financialImpact.activePositions}
                    </span>
                </div>
                <div className="flex justify-between items-center py-2">
                    <span className="text-[14px] text-[#858585]">Pending withdrawals</span>
                    <span className="text-[16px] font-semibold text-[#F4B942]">
                        {financialImpact.pendingWithdrawals}
                    </span>
                </div>

                {financialImpact.withdrawalBlocked && (
                    <div className="text-xs text-[#D4001A] flex items-center gap-2">
                        <Info className="w-4 h-4 shrink-0" />
                        <span>Withdrawal blocked due to suspension</span>
                    </div>
                )}
            </div>
        </div>
    );
}