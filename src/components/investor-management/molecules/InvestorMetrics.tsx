"use client";

import { TYPOGRAPHY } from "@/constants/styles";
import { MetricCardData } from "@/types/investor";

interface InvestorMetricsProps {
    metrics: MetricCardData[];
}

export function InvestorMetrics({ metrics }: InvestorMetricsProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {metrics.map((metric, idx) => (
                <div key={idx} className="bg-white rounded-xl p-5 border border-[#EAEAEA]">
                    <span className="block text-[16px] text-[#858585] mb-2">{metric.title}</span>
                    <span className="block text-[28px] text-[#11110F] mb-1" style={TYPOGRAPHY.heading}>
                        {metric.value}
                    </span>
                    <span
                        className="text-[14px]"
                        style={{ color: metric.subtextColor || "#858585", ...TYPOGRAPHY.heading }}
                    >
                        {metric.subtext}
                    </span>
                </div>
            ))}
        </div>
    );
}