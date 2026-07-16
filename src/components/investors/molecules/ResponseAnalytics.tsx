"use client"

import React from 'react'
import { Progress } from '@/components/ui/progress'
import { TYPOGRAPHY } from '@/constants/styles'

export function ResponseAnalytics() {
    return (
        <div className="w-full space-y-4 font-sans">

            {/* Upper Dark Response Metrics Panel */}
            <div className="bg-[#021915] text-[#F4F5F7] rounded-md p-6 space-y-6">
                <div>
                    <h4 className="text-[14px] font-medium tracking-wider text-[#A8A8A8] uppercase">
                        Response Metrics
                    </h4>
                </div>

                {/* Response Rate Metric Section */}
                <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="text-[24px] md:text-[28px] font-medium tracking-tight">94%</div>
                        <div className="text-xs text-[#F4F5F7]">Response Rate</div>
                    </div>
                    <div className="w-24 pt-4">
                        <Progress value={94} className="h-1.5 bg-[#3F5449] [&>div]:bg-[#B9C65B]" />
                    </div>
                </div>

                {/* Average Response Time Metric Section */}
                <div className="flex items-end justify-between gap-4 pt-1">
                    <div className="space-y-1">
                        <div className="text-[24px] md:text-[28px] font-medium tracking-tight">2.4h</div>
                        <div className="text-xs text-[#F4F5F7]">Avg. Response Time</div>
                    </div>

                    {/* Audio/Bar Visualizer Metric Indicator Graphic */}
                    <div className="flex items-end gap-1 h-10 pb-1">
                        <span className="w-1 h-6 bg-[#B9C65B] rounded-full" />
                        <span className="w-1 h-9 bg-[#B9C65B] rounded-full" />
                        <span className="w-1 h-4 bg-[#3F5449] rounded-full" />
                    </div>
                </div>
            </div>

            {/* Lower Light Sentiment Analysis Panel */}
            <div className="bg-white border border-[#F4F5F7] rounded-md p-4 space-y-5">
                <h3 className="text-[#021310] text-[14px] font-medium tracking-tight">
                    Sentiment Analysis
                </h3>

                {/* Percentage Breakdown Flex Row Grid */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                    {/* Positive Breakdown */}
                    <div className="space-y-1">
                        <div className="text-[24px] text-[#16A34A]" style={TYPOGRAPHY.heading}>82%</div>
                        <div className="text-xs text-[#A8A8A8]">Positive</div>
                    </div>

                    {/* Neutral Breakdown */}
                    <div className="space-y-1">
                        <div className="text-2xl text-[#EFBB08]" style={TYPOGRAPHY.heading}>14%</div>
                        <div className="text-xs text-[#A8A8A8]">Neutral</div>
                    </div>

                    {/* Critical Breakdown */}
                    <div className="space-y-1">
                        <div className="text-2xl text-[#EF4444]" style={TYPOGRAPHY.heading}>4%</div>
                        <div className="text-xs text-[#A8A8A8]">Critical</div>
                    </div>
                </div>
            </div>

        </div>
    )
}