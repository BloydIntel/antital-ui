"use client"

import React from 'react'

interface MetricItem {
    label: string
    value: string
}

export function ConversionMetricsCard() {
    // Analytical list tracking metrics data points
    const metricsList: MetricItem[] = [
        {
            label: "View-to-investment rate",
            value: "5.9%"
        },
        {
            label: "Average time to invest",
            value: "24%"
        },
        {
            label: "Return visitors",
            value: "41%"
        }
    ]

    return (
        <div className="w-full bg-white border border-[#F4F5F7] rounded-xl p-6 font-sans">

            {/* Container Module Header Label */}
            <h3 className="text-[#1B1B1B] text-[14px] lg:text-[16px] font-medium tracking-tight mb-5">
                Conversion Metrics
            </h3>

            {/* Row List Breakdown Block */}
            <div>
                {metricsList.map((metric, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between py-4 border-b border-[#EAEAEA] first:pt-2 last:pb-2 text-sm"
                    >
                        {/* Descriptive Variable Label */}
                        <span className="text-[#858585] font-medium">
                            {metric.label}
                        </span>

                        {/* Numerical Performance Value Data Indicator */}
                        <span className="text-[#858585] font-medium text-right">
                            {metric.value}
                        </span>
                    </div>
                ))}
            </div>

        </div>
    )
}