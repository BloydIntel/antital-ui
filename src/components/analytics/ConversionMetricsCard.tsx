"use client"

import React from 'react'
import type { FundraiserAnalyticsConversion } from '@/types/fundraiser-analytics-api'

interface ConversionMetricsCardProps {
    conversion?: FundraiserAnalyticsConversion | null
    isLoading?: boolean
}

function formatRate(rate: number) {
    return `${(rate * 100).toFixed(1).replace(/\.0$/, '')}%`
}

function formatDurationHours(hours: number | null | undefined) {
    if (hours == null || Number.isNaN(hours)) return '—'
    if (hours < 1) return `${Math.max(1, Math.round(hours * 60))}m`
    if (hours < 48) return `${hours.toFixed(1).replace(/\.0$/, '')}h`
    const days = hours / 24
    return `${days.toFixed(1).replace(/\.0$/, '')}d`
}

export function ConversionMetricsCard({
    conversion = null,
    isLoading = false,
}: ConversionMetricsCardProps) {
    const metricsList = [
        {
            label: 'View-to-investment rate',
            value: isLoading ? '—' : formatRate(conversion?.viewToInvestmentRate ?? 0),
        },
        {
            label: 'Average time to invest',
            value: isLoading ? '—' : formatDurationHours(conversion?.averageTimeToInvestHours),
        },
        {
            label: 'Return visitors',
            value: isLoading ? '—' : formatRate(conversion?.returnVisitorRate ?? 0),
        },
    ]

    return (
        <div className="w-full bg-white border border-[#F4F5F7] rounded-xl p-6 font-sans">
            <h3 className="text-[#1B1B1B] text-[14px] lg:text-[16px] font-medium tracking-tight mb-5">
                Conversion Metrics
            </h3>

            <div>
                {metricsList.map((metric) => (
                    <div
                        key={metric.label}
                        className="flex items-center justify-between py-4 border-b border-[#EAEAEA] first:pt-2 last:pb-2 text-sm"
                    >
                        <span className="text-[#858585] font-medium">{metric.label}</span>
                        <span className="text-[#858585] font-medium text-right">{metric.value}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
