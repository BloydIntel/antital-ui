"use client";

import { TYPOGRAPHY } from "@/constants/styles";
import { PositionMetric } from "@/types/position-detail";

interface PositionMetricsGridProps {
    metrics: PositionMetric;
}

export function PositionMetricsGrid({ metrics }: PositionMetricsGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Amount Invested */}
            <div className="bg-white rounded-xl border border-[#EAEAEA] px-4 py-6 space-y-2">
                <p className="text-[13px] text-[#666666]">Amount Invested</p>
                <p className="text-[28px] text-[#11110F] tracking-tight" style={TYPOGRAPHY.heading}>
                    {metrics.amountInvested}
                </p>
                <p className="text-[12px] text-[#858585]">{metrics.investmentDate}</p>
            </div>

            {/* Current Value */}
            <div className="bg-white rounded-xl border border-[#EAEAEA] px-4 py-6 space-y-2">
                <p className="text-[13px] text-[#666666]">Current Value (Est)</p>
                <p className="text-[28px] text-[#11110F] tracking-tight" style={TYPOGRAPHY.heading}>
                    {metrics.currentValue}
                </p>
                <p
                    className={`text-[12px] font-medium ${metrics.valueChange.trim().startsWith("+")
                        ? "text-[#16A34A]"
                        : metrics.valueChange.trim().startsWith("-")
                            ? "text-[#D4001A]"
                            : "text-[#666666]"
                        }`}
                >
                    {metrics.valueChange} since investment
                </p>
            </div>

            {/* Unrealized ROI */}
            <div className="bg-white rounded-xl border border-[#EAEAEA] px-4 py-6 space-y-2">
                <p className="text-[13px] text-[#666666]">Unrealized ROI</p>
                <p className="text-[28px] text-[#16A34A] tracking-tight" style={TYPOGRAPHY.heading}>
                    {metrics.unrealizedRoi}
                </p>
                <p className="text-[12px] text-[#858585]">{metrics.escrowPercentage} of escrow balance</p>
            </div>

            {/* Unit / Shares Held */}
            <div className="bg-white rounded-xl border border-[#EAEAEA] px-4 py-6 space-y-2">
                <p className="text-[13px] text-[#666666]">Unit / Shares Held</p>
                <p className="text-[28px] text-[#11110F] tracking-tight" style={TYPOGRAPHY.heading}>
                    {metrics.unitsHeld}
                </p>
                <p className="text-[12px] text-[#858585]">@ {metrics.navPrice} / unit NAV</p>
            </div>
        </div>
    );
}