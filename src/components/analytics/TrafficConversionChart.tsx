"use client"

import React, { useMemo, useState } from 'react'
import type { FundraiserAnalyticsTraffic } from '@/types/fundraiser-analytics-api'

interface TrafficConversionChartProps {
    traffic?: FundraiserAnalyticsTraffic | null
    isLoading?: boolean
}

function formatAverageBadge(averagePerDay: number) {
    if (averagePerDay >= 1000) {
        const k = averagePerDay / 1000
        const rounded = k >= 10 ? Math.round(k) : Math.round(k * 10) / 10
        return `Avg: ${rounded}k / day`
    }
    return `Avg: ${Math.round(averagePerDay).toLocaleString('en-US')} / day`
}

export function TrafficConversionChart({ traffic = null, isLoading = false }: TrafficConversionChartProps) {
    const chartData = useMemo(() => {
        const points = traffic?.points ?? []
        if (points.length === 0) {
            return []
        }
        const max = Math.max(...points.map((p) => p.value), 1)
        return points.map((point) => ({
            day: point.label,
            value: Math.max(2, Math.round((point.value / max) * 100)),
            displayValue: point.value.toLocaleString('en-US'),
        }))
    }, [traffic?.points])

    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const [mouseY, setMouseY] = useState<number>(0)

    const yAxisTicks = [100, 80, 60, 40, 20, 0]

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const bounds = e.currentTarget.getBoundingClientRect()
        const relativeY = e.clientY - bounds.top
        setMouseY(relativeY)
    }

    return (
        <div className="w-full bg-white border border-[#F4F5F7] rounded-xl p-6 font-sans">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-[#1B1B1B] text-base lg:text-[18px] font-medium tracking-tight">
                    Traffic & Conversion velocity
                </h3>
                <span className="bg-[#EBF7EE] text-[#22C55E] text-xs font-medium px-2.5 py-1 rounded-full">
                    {isLoading ? 'Loading…' : formatAverageBadge(traffic?.averagePerDay ?? 0)}
                </span>
            </div>

            {isLoading ? (
                <div className="h-[392px] flex items-center justify-center text-sm text-[#717171]">
                    Loading traffic…
                </div>
            ) : chartData.length === 0 ? (
                <div className="h-[392px] flex items-center justify-center text-sm text-[#717171]">
                    No traffic data for this period.
                </div>
            ) : (
                <div className="relative flex h-[392px] w-full">
                    <div className="flex flex-col justify-between text-xs text-[#999999] pr-4 select-none h-[calc(100%-24px)] text-right w-8">
                        {yAxisTicks.map((tick) => (
                            <span key={tick} className="leading-none flex items-center justify-end h-0">
                                {tick}
                            </span>
                        ))}
                    </div>

                    <div className="relative flex-1 h-full">
                        <div className="absolute inset-0 flex flex-col justify-between h-[calc(100%-24px)] pointer-events-none z-0">
                            {yAxisTicks.map((tick) => (
                                <div
                                    key={tick}
                                    className={`w-full border-b ${tick === 0 ? 'border-[#EAEAEA]' : 'border-[#F2F2F2]'}`}
                                />
                            ))}
                        </div>

                        <div className="absolute inset-0 z-10 h-[calc(100%-24px)] flex items-end justify-between px-4 md:px-8 gap-3 md:gap-4">
                            {chartData.map((data, idx) => {
                                const isActive = activeIndex === idx

                                return (
                                    <div
                                        key={`${data.day}-${idx}`}
                                        role="button"
                                        tabIndex={0}
                                        aria-label={`${data.day}: ${data.displayValue} views`}
                                        className="relative flex-1 h-full flex flex-col justify-end items-center cursor-pointer"
                                        onMouseEnter={() => setActiveIndex(idx)}
                                        onMouseLeave={() => setActiveIndex(null)}
                                        onMouseMove={handleMouseMove}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault()
                                                setActiveIndex(idx)
                                            }
                                        }}
                                        onClick={() => setActiveIndex(idx)}
                                    >
                                        {isActive && (
                                            <div
                                                style={{
                                                    top: `${mouseY - 58}px`,
                                                }}
                                                className="absolute z-30 bg-white border border-[#EAEAEA] rounded-lg p-2.5 shadow-md text-xs whitespace-nowrap text-left left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-75 ease-out"
                                            >
                                                <div className="font-medium text-[#1B1B1B]">{data.day}</div>
                                                <div className="text-[#717171] mt-0.5">
                                                    views:{' '}
                                                    <span className="font-semibold text-[#1B1B1B]">
                                                        {data.displayValue}
                                                    </span>
                                                </div>
                                                <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-b border-r border-[#EAEAEA] rotate-45" />
                                            </div>
                                        )}

                                        <div
                                            style={{
                                                height: `${data.value}%`,
                                            }}
                                            className={`w-full max-w-[40px] rounded-t-md transition-all duration-300 ${
                                                isActive
                                                    ? 'bg-[#A7B832]'
                                                    : 'bg-[#E0E0E0] hover:bg-[#CCCCCC]'
                                            }`}
                                        />
                                    </div>
                                )
                            })}
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 md:px-8 h-6 text-xs text-[#999999] select-none z-10">
                            {chartData.map((data, idx) => (
                                <span
                                    key={`${data.day}-label-${idx}`}
                                    className={`w-full max-w-[40px] text-center pt-2 transition-colors ${
                                        activeIndex === idx ? 'text-[#1B1B1B] font-medium' : ''
                                    }`}
                                >
                                    {data.day}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
