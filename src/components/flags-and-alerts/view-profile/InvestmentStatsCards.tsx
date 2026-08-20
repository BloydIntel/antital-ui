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
    const isNegative = estimatedReturns.trim().startsWith("-");
    const isPositive = estimatedReturns.trim().startsWith("+");

    const returnsColorClass = isNegative
        ? "text-[#D4001A]"
        : isPositive
            ? "text-[#45B424]"
            : "text-[#2C2C2C]";

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Total Invested */}
            <div className="bg-white rounded-lg border border-[#EAEAEA] px-4 py-6">
                <span className="block text-[16px] text-[#858585] mb-2">
                    Total Invested
                </span>
                <span className="text-[28px] font-bold text-[#2C2C2C]">
                    {totalInvested}
                </span>
            </div>

            {/* Active Positions */}
            <div className="bg-white rounded-lg border border-[#EAEAEA] px-4 py-6">
                <span className="block text-[16px] text-[#858585] mb-2">
                    Active Positions
                </span>
                <span className="text-[28px] font-bold text-[#2C2C2C]">
                    {activePositions}
                </span>
            </div>

            {/* Est. Returns */}
            <div className="bg-white rounded-lg border border-[#EAEAEA] px-4 py-6">
                <span className="block text-[16px] text-[#858585] mb-2">
                    EST. RETURNS
                </span>
                <span className={`text-[28px] font-bold ${returnsColorClass}`}>
                    {estimatedReturns}
                </span>
            </div>
        </div>
    );
}