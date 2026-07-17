"use client"

import { Eye, ThumbsUp, Share2 } from 'lucide-react'

interface MetricCardProps {
    title: string
    value: string
    icon: React.ReactNode
    iconBgColor: string
    iconColor: string
}

function MetricCard({ title, value, icon, iconBgColor, iconColor }: MetricCardProps) {
    return (
        <div className="flex-1 bg-white border border-[#EAEAEA] rounded-xl p-4 flex items-center gap-5 min-w-[240px]">

            {/* Icon Wrapper Container */}
            <div
                className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: iconBgColor }}
            >
                <div style={{ color: iconColor }}>
                    {icon}
                </div>
            </div>

            {/* Metric Details Label Meta Text */}
            <div className="space-y-1">
                <span className="text-[16px] text-[#858585] font-medium block">
                    {title}
                </span>
                <span className="text-2xl lg:text-[28px] font-bold text-[#1B1B1B] tracking-tight block">
                    {value}
                </span>
            </div>

        </div>
    )
}

export function AnalyticsOverviewGrid() {
    const metricsData = [
        {
            title: "Total page views",
            value: "42,891",
            icon: <Eye className="w-6 h-6" />,
            iconBgColor: "#EDF4FC",
            iconColor: "#4A90E2"
        },
        {
            title: "Campaign likes",
            value: "12,460",
            icon: <ThumbsUp className="w-6 h-6 stroke-[1.75]" />,
            iconBgColor: "#F6FBEF",
            iconColor: "#A4D65E"
        },
        {
            title: "Social shares",
            value: "1,803",
            icon: <Share2 className="w-6 h-6" />,
            iconBgColor: "#EDF0F5",
            iconColor: "#46699D"
        }
    ]

    return (
        <div className="w-full flex flex-col md:flex-row items-stretch gap-4 font-sans">
            {metricsData.map((metric) => (
                <MetricCard
                    key={metric.title}
                    title={metric.title}
                    value={metric.value}
                    icon={metric.icon}
                    iconBgColor={metric.iconBgColor}
                    iconColor={metric.iconColor}
                />
            ))}
        </div>
    )
}