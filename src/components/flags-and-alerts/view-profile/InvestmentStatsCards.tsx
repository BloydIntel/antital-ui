"use client";

interface InvestmentStatsProps {
    totalInvested: string;
    activePositions: number;
    estimatedReturns: string;
}

export function InvestmentStatsCards({
    totalInvested,
    activePositions,
    estimatedReturns,
}: InvestmentStatsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Total Invested */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
                <span className="block text-[12px] font-medium text-[#858585] mb-1">
                    Total Invested
                </span>
                <span className="text-[22px] font-bold text-[#11110F]">
                    {totalInvested}
                </span>
            </div>

            {/* Active Positions */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
                <span className="block text-[12px] font-medium text-[#858585] mb-1">
                    Active Positions
                </span>
                <span className="text-[22px] font-bold text-[#11110F]">
                    {activePositions}
                </span>
            </div>

            {/* Est. Returns */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
                <span className="block text-[12px] font-medium text-[#858585] mb-1">
                    EST. RETURNS
                </span>
                <span className="text-[22px] font-bold text-[#10B981]">
                    +{estimatedReturns}
                </span>
            </div>
        </div>
    );
}