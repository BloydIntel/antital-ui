"use client";

import { AlertTriangle } from "lucide-react";

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
        <div className="bg-white p-5 rounded-xl border border-[#EAEAEA] space-y-4">
            <h2 className="font-bold text-[16px] text-[#11110F]">Financial Impact</h2>
            <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-[#EAEAEA]">
                    <span className="text-xs text-[#858585]">Wallet Balance</span>
                    <span className="text-[15px] font-bold text-[#11110F]">
                        {financialImpact.walletBalance}
                    </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#EAEAEA]">
                    <span className="text-xs text-[#858585]">Active positions</span>
                    <span className="text-[14px] font-medium text-[#11110F]">
                        {financialImpact.activePositions}
                    </span>
                </div>
                <div className="flex justify-between items-center py-2">
                    <span className="text-xs text-[#858585]">Pending withdrawals</span>
                    <span className="text-[14px] font-semibold text-[#D97706]">
                        {financialImpact.pendingWithdrawals}
                    </span>
                </div>

                {financialImpact.withdrawalBlocked && (
                    <div className="p-3 bg-[#FEF8EC] border border-[#FCE9C4] rounded-lg text-xs text-[#B78B32] flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>Withdrawal blocked due to suspension</span>
                    </div>
                )}
            </div>
        </div>
    );
}