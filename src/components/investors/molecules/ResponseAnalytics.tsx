"use client"

import React from 'react'
import { Progress } from '@/components/ui/progress'

interface ResponseAnalyticsProps {
    responseRate?: number
    averageResponseTimeHours?: number | null
    isLoading?: boolean
}

function formatRate(rate: number) {
    return `${Math.round(rate * 100)}%`
}

function formatAvgHours(hours: number | null | undefined) {
    if (hours == null || Number.isNaN(hours)) return '—'
    if (hours < 1) return `${Math.round(hours * 60)}m`
    return `${hours.toFixed(1).replace(/\.0$/, '')}h`
}

export function ResponseAnalytics({
    responseRate = 0,
    averageResponseTimeHours = null,
    isLoading = false,
}: ResponseAnalyticsProps) {
    const ratePercent = Math.round(responseRate * 100)

    return (
        <div className="w-full space-y-4 font-sans">
            <div className="bg-[#021915] text-[#F4F5F7] rounded-md p-6 space-y-6">
                <div>
                    <h4 className="text-[14px] font-medium tracking-wider text-[#A8A8A8] uppercase">
                        Response Metrics
                    </h4>
                </div>

                <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="text-[24px] md:text-[28px] font-medium tracking-tight">
                            {isLoading ? '—' : formatRate(responseRate)}
                        </div>
                        <div className="text-xs text-[#F4F5F7]">Response Rate</div>
                    </div>
                    <div className="w-24 pt-4">
                        <Progress
                            value={isLoading ? 0 : ratePercent}
                            className="h-1.5 bg-[#3F5449] [&>div]:bg-[#B9C65B]"
                        />
                    </div>
                </div>

                <div className="flex items-end justify-between gap-4 pt-1">
                    <div className="space-y-1">
                        <div className="text-[24px] md:text-[28px] font-medium tracking-tight">
                            {isLoading ? '—' : formatAvgHours(averageResponseTimeHours)}
                        </div>
                        <div className="text-xs text-[#F4F5F7]">Avg. Response Time</div>
                    </div>

                    <div className="flex items-end gap-1 h-10 pb-1">
                        <span className="w-1 h-6 bg-[#B9C65B] rounded-full" />
                        <span className="w-1 h-9 bg-[#B9C65B] rounded-full" />
                        <span className="w-1 h-4 bg-[#3F5449] rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    )
}
