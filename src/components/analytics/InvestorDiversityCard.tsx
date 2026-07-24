"use client"

import React from 'react'
import { Map, Users } from 'lucide-react'
import type { FundraiserAnalyticsDiversity } from '@/types/fundraiser-analytics-api'

const GEO_COLORS = ['bg-[#7D8A26]', 'bg-[#4A90E2]', 'bg-[#F4B942]', 'bg-[#EFF4E4]']
const CATEGORY_COLORS = ['bg-[#4A90E2]', 'bg-[#F4B942]', 'bg-[#7D8A26]', 'bg-[#A7B832]', 'bg-[#858585]']

interface InvestorDiversityCardProps {
    diversity?: FundraiserAnalyticsDiversity | null
    isLoading?: boolean
}

export function InvestorDiversityCard({ diversity = null, isLoading = false }: InvestorDiversityCardProps) {
    const geoSegments = (diversity?.geographic ?? []).map((segment, index) => ({
        label: segment.label,
        percentage: segment.percentage,
        color: GEO_COLORS[index % GEO_COLORS.length],
    }))

    const investorCategories = (diversity?.categories ?? []).map((category, index) => ({
        name: category.label,
        percentage: category.percentage,
        color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
    }))

    return (
        <div className="w-full max-w-[640px] bg-white border border-[#F4F5F7] rounded-xl p-6 font-sans">
            <h3 className="text-[#1B1B1B] text-[14px] lg:text-[16px] font-medium tracking-tight mb-6">
                Investor Diversity
            </h3>

            {isLoading ? (
                <div className="py-10 text-center text-sm text-[#717171]">Loading diversity…</div>
            ) : geoSegments.length === 0 && investorCategories.length === 0 ? (
                <div className="py-10 text-center text-sm text-[#717171]">
                    No investor diversity data yet.
                </div>
            ) : (
                <>
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2 text-[#1B1B1B]">
                                <Map className="w-5 h-5 text-[#717171] stroke-[1.75]" />
                                <span className="text-[14px] lg:text-[16px] font-medium">
                                    Geographic Distribution
                                </span>
                            </div>
                            <span className="text-xs text-[#858585]">
                                {diversity?.topLocation ? `Top: ${diversity.topLocation}` : 'Top: —'}
                            </span>
                        </div>

                        <div className="w-full h-3 rounded-full flex overflow-hidden bg-[#EDF1D6] mb-3">
                            {geoSegments.map((segment) => (
                                <div
                                    key={segment.label}
                                    className={`${segment.color} h-full`}
                                    style={{ width: `${segment.percentage}%` }}
                                />
                            ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#858585]">
                            {geoSegments.slice(0, 2).map((segment) => (
                                <div key={segment.label} className="flex items-center gap-1.5">
                                    <span className={`w-2 h-2 rounded-full ${segment.color}`} />
                                    <span>
                                        {segment.label} ({segment.percentage}%)
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 text-[#1F1F1F] mb-5">
                            <Users className="w-5 h-5 text-[#858585] stroke-[1.75]" />
                            <span className="text-[16px] font-medium">Investor Categories</span>
                        </div>

                        {investorCategories.length === 0 ? (
                            <p className="text-sm text-[#717171]">No category breakdown yet.</p>
                        ) : (
                            <div className="space-y-4">
                                {investorCategories.map((category) => (
                                    <div key={category.name} className="space-y-1.5">
                                        <div className="flex items-center justify-between text-[14px] text-[#858585]">
                                            <span className="font-medium">{category.name}</span>
                                            <span className="font-medium">{category.percentage}%</span>
                                        </div>
                                        <div className="w-full h-3 rounded-full bg-[#EDF1D6] overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${category.color} transition-all duration-500`}
                                                style={{ width: `${category.percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}
