"use client"

import React, { useState } from 'react'

interface DataPoint {
    day: string
    value: number // Percentage height for bar (0 - 100)
    displayValue: string // Value shown on hover/selection
}

export function TrafficConversionChart() {
    const chartData: DataPoint[] = [
        { day: 'Mon', value: 23, displayValue: '2300' },
        { day: 'Tue', value: 44, displayValue: '4400' },
        { day: 'Wed', value: 35, displayValue: '3500' },
        { day: 'Thu', value: 10, displayValue: '1000' },
        { day: 'Fri', value: 70, displayValue: '9600' },
        { day: 'Sat', value: 35, displayValue: '3500' },
        { day: 'Sun', value: 51, displayValue: '5100' },
    ]

    const [activeIndex, setActiveIndex] = useState<number | null>(4)
    const [mouseY, setMouseY] = useState<number>(0)

    // 6 ticks create 5 perfectly equal vertical spans (100-80, 80-60, 60-40, 40-20, 20-0)
    const yAxisTicks = [100, 80, 60, 40, 20, 0]

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const bounds = e.currentTarget.getBoundingClientRect()
        const relativeY = e.clientY - bounds.top
        setMouseY(relativeY)
    }

    return (
        <div className="w-full bg-white border border-[#F4F5F7] rounded-xl p-6 font-sans">

            {/* Header Metric Row Summary */}
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-[#1B1B1B] text-base lg:text-[18px] font-medium tracking-tight">
                    Traffic & Conversion velocity
                </h3>
                <span className="bg-[#EBF7EE] text-[#22C55E] text-xs font-medium px-2.5 py-1 rounded-full">
                    Avg: 4.8k / day
                </span>
            </div>

            {/* Main Chart Framework Workspace - Scaled to 484px */}
            <div className="relative flex h-[392px] w-full">

                {/* Left Hand Y-Axis Numerical Reference Labels - Distributed Evenly */}
                <div className="flex flex-col justify-between text-xs text-[#999999] pr-4 select-none h-[calc(100%-24px)] text-right w-8">
                    {yAxisTicks.map((tick) => (
                        <span key={tick} className="leading-none flex items-center justify-end h-0">
                            {tick}
                        </span>
                    ))}
                </div>

                {/* Content Viewbox Canvas Area */}
                <div className="relative flex-1 h-full">

                    {/* BACKGROUND LAYER: Horizontal Alignment Guidelines Grid Matrix - Distributed Evenly */}
                    <div className="absolute inset-0 flex flex-col justify-between h-[calc(100%-24px)] pointer-events-none z-0">
                        {yAxisTicks.map((tick) => (
                            <div
                                key={tick}
                                className={`w-full border-b ${tick === 0 ? 'border-[#EAEAEA]' : 'border-[#F2F2F2]'}`}
                            />
                        ))}
                    </div>

                    {/* FOREGROUND LAYER: Interactive Bar Pillars Flexstrip */}
                    <div className="absolute inset-0 z-10 h-[calc(100%-24px)] flex items-end justify-between px-4 md:px-8 gap-3 md:gap-4">
                        {chartData.map((data, idx) => {
                            const isActive = activeIndex === idx

                            return (
                                <div
                                    key={idx}
                                    className="relative flex-1 h-full flex flex-col justify-end items-center cursor-pointer"
                                    onMouseEnter={() => setActiveIndex(idx)}
                                    onMouseLeave={() => setActiveIndex(null)}
                                    onMouseMove={handleMouseMove}
                                    onClick={() => setActiveIndex(idx)}
                                >

                                    {/* Floating Selection Micro Tooltip Panel anchored to Cursor Height */}
                                    {isActive && (
                                        <div
                                            style={{
                                                top: `${mouseY - 58}px`
                                            }}
                                            className="absolute z-30 bg-white border border-[#EAEAEA] rounded-lg p-2.5 shadow-md text-xs whitespace-nowrap text-left left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-75 ease-out"
                                        >
                                            <div className="font-medium text-[#1B1B1B]">{data.day}</div>
                                            <div className="text-[#717171] mt-0.5">views: <span className="font-semibold text-[#1B1B1B]">{data.displayValue}</span></div>

                                            {/* Tail Anchor Indicator Hook */}
                                            <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-b border-r border-[#EAEAEA] rotate-45" />
                                        </div>
                                    )}

                                    {/* Physical Column Block Structure */}
                                    <div
                                        style={{
                                            height: `${data.value}%`
                                        }}
                                        className={`w-full max-w-[40px] rounded-t-md transition-all duration-300 ${isActive
                                            ? 'bg-[#A7B832]'
                                            : 'bg-[#E0E0E0] hover:bg-[#CCCCCC]'
                                            }`}
                                    />
                                </div>
                            )
                        })}
                    </div>

                    {/* BOTTOM LAYER: Axis Sequential Time Anchor Labels */}
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 md:px-8 h-6 text-xs text-[#999999] select-none z-10">
                        {chartData.map((data, idx) => (
                            <span
                                key={idx}
                                className={`w-full max-w-[40px] text-center pt-2 transition-colors ${activeIndex === idx ? 'text-[#1B1B1B] font-medium' : ''
                                    }`}
                            >
                                {data.day}
                            </span>
                        ))}
                    </div>

                </div>
            </div>

        </div>
    )
}