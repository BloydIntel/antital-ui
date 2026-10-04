"use client";

import { TYPOGRAPHY } from "@/constants/styles";

interface InvestmentStatsProps {
    totalInvested: string;
    activePositions: number;
    estimatedReturns: string;
    isInvestorManagement: boolean;
}

export function InvestmentStatsCards({
    totalInvested,
    activePositions,
    estimatedReturns,
    isInvestorManagement,
}: InvestmentStatsProps) {
    const isNegative = estimatedReturns.trim().startsWith("-");
    const isPositive = estimatedReturns.trim().startsWith("+");

    const returnsColorClass = isNegative
        ? "text-[#D4001A]"
        : isPositive
            ? "text-[#45B424]"
            : "text-[#2C2C2C]";

    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            {/* Total Invested */}
            <div className="bg-white rounded-lg border border-[#EAEAEA] px-4 py-6">
                <span className="block text-[16px] text-[#858585] mb-2">
                    Total Invested
                </span>
                <span
                    className="text-[28px] text-[#2C2C2C]"
                    style={{
                        ...TYPOGRAPHY.heading,
                        fontWeight: isInvestorManagement ? 500 : 700,
                    }}
                >
                    {totalInvested}
                </span>
            </div>

            {/* Active Positions */}
            <div className="bg-white rounded-lg border border-[#EAEAEA] px-4 py-6">
                <span className="block text-[16px] text-[#858585] mb-2">
                    Active Positions
                </span>
                <span
                    className="text-[28px] text-[#2C2C2C]"
                    style={{
                        ...TYPOGRAPHY.heading,
                        fontWeight: isInvestorManagement ? 500 : 700,
                    }}
                >
                    {activePositions}
                </span>
            </div>

            {/* Est. Returns */}
            <div className="bg-white rounded-lg border border-[#EAEAEA] px-4 py-6">
                <span className="block text-[16px] text-[#858585] mb-2">
                    EST. RETURNS
                </span>
                <span
                    className={`text-[28px] ${returnsColorClass}`}
                    style={{
                        ...TYPOGRAPHY.heading,
                        fontWeight: isInvestorManagement ? 500 : 700,
                    }}
                >
                    {estimatedReturns}
                </span>
            </div>
        </div>
    );
}