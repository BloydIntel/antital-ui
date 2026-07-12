"use client"

import React from 'react'
import { Map, Users } from 'lucide-react'

export function InvestorDiversityCard() {
    // Geographic segment data structures
    const geoSegments = [
        { label: "West Africa", percentage: 65, color: "bg-[#7D8A26]" },
        { label: "Europe", percentage: 20, color: "bg-[#4A90E2]" },
        { label: "Americas", percentage: 10, color: "bg-[#F4B942]" },
        { label: "Other", percentage: 5, color: "bg-[#EFF4E4]" },
    ]

    // Individual categorical breakdown items
    const investorCategories = [
        { name: "Tech Enthusiasts", percentage: 72, color: "bg-[#4A90E2]" },
        { name: "Real Estate Investors", percentage: 18, color: "bg-[#F4B942]" },
        { name: "Fintech HNIs", percentage: 10, color: "bg-[#7D8A26]" },
    ]

    return (
        <div className="w-full max-w-[640px] bg-white border border-[#F4F5F7] rounded-xl p-6 font-sans">

            {/* Title Segment Header */}
            <h3 className="text-[#1B1B1B] text-[14px] lg:text-[16px] font-medium tracking-tight mb-6">
                Investor Diversity
            </h3>

            {/* --- GEOGRAPHIC DISTRIBUTION SECTION --- */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-[#1B1B1B]">
                        <Map className="w-5 h-5 text-[#717171] stroke-[1.75]" />
                        <span className="text-[14px] lg:text-[16px] font-medium">Geographic Distribution</span>
                    </div>
                    <span className="text-xs text-[#858585]">Top: Lagos, NG</span>
                </div>

                {/* Multi-segmented distribution line bar */}
                <div className="w-full h-3 rounded-full flex overflow-hidden bg-[#EDF1D6] mb-3">
                    {geoSegments.map((segment, index) => (
                        <div
                            key={index}
                            className={`${segment.color} h-full`}
                            style={{ width: `${segment.percentage}%` }}
                        />
                    ))}
                </div>

                {/* Legend Indicators Meta text wrapper */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#858585]">
                    {geoSegments.slice(0, 2).map((segment, index) => (
                        <div key={index} className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${segment.color}`} />
                            <span>{segment.label} ({segment.percentage}%)</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- INVESTOR CATEGORIES SECTION --- */}
            <div>
                <div className="flex items-center gap-2 text-[#1F1F1F] mb-5">
                    <Users className="w-5 h-5 text-[#858585] stroke-[1.75]" />
                    <span className="text-[16px] font-medium">Investor Categories</span>
                </div>

                {/* Categorization list loop block */}
                <div className="space-y-4">
                    {investorCategories.map((category, index) => (
                        <div key={index} className="space-y-1.5">
                            <div className="flex items-center justify-between text-[14px] text-[#858585]">
                                <span className="font-medium">{category.name}</span>
                                <span className="font-medium">{category.percentage}%</span>
                            </div>

                            {/* Individual Base Bar Component TRACK */}
                            <div className="w-full h-3 rounded-full bg-[#EDF1D6] overflow-hidden">
                                <div
                                    className={`h-full rounded-full ${category.color} transition-all duration-500`}
                                    style={{ width: `${category.percentage}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}