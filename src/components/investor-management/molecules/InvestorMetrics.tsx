"use client";

import { TYPOGRAPHY } from "@/constants/styles";
import { MetricCardData } from "@/types/investor";

interface InvestorMetricsProps {
    metrics: MetricCardData[];
    dateRangeLabel?: string; // e.g. "this week", "last 30 days", etc.
}

export function InvestorMetrics({ metrics, dateRangeLabel = "this period" }: InvestorMetricsProps) {

    const getValueColor = (title: string): string => {
        const normalized = title.toLowerCase();
        if (normalized.includes("pending")) return "#F4B942";
        if (normalized.includes("suspended")) return "#D4001A";
        return "#11110F";
    };

    const getSubtextColor = (metric: MetricCardData): string => {
        if (metric.title.toLowerCase().includes("total investors")) {
            const numVal = metric.changeValue ?? 0;
            if (numVal > 0) return "#45B424";
            if (numVal < 0) return "#D4001A";
            return "#858585";
        }
        return "#858585";
    };


    const renderSubtext = (metric: MetricCardData) => {
        if (metric.title.toLowerCase().includes("total investors")) {
            const val = metric.changeValue ?? 0;
            const prefix = val > 0 ? `+${val}` : `${val}`;
            return `${prefix} ${dateRangeLabel}`;
        }
        return metric.subtext;
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            {metrics.map((metric, idx) => {
                const valueColor = getValueColor(metric.title);
                const subtextColor = getSubtextColor(metric);
                const subtext = renderSubtext(metric);

                return (
                    <div key={idx} className="bg-white rounded-xl p-5 border border-[#EAEAEA]">
                        <span className="block text-[16px] text-[#858585] mb-2">{metric.title}</span>
                        <span
                            className="block text-[28px] mb-1"
                            style={{ color: valueColor, ...TYPOGRAPHY.heading }}
                        >
                            {metric.value}
                        </span>
                        <span
                            className="text-[14px]"
                            style={{ color: subtextColor, ...TYPOGRAPHY.heading }}
                        >
                            {subtext}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}