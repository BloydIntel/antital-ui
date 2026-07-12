"use client"

import { useState } from "react"
import * as Select from "@radix-ui/react-select"
import { ChevronDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TYPOGRAPHY } from "@/constants/styles"

interface BreakdownChartItem {
    range: string
    percentage: number // e.g., 20
    colorClass: string
}

export function InvestorBreakdownChart() {
    const [filterValue, setFilterValue] = useState("size")

    const chartData: BreakdownChartItem[] = [
        { range: "0 - 5M", percentage: 20, colorClass: "bg-[#C49132]" },
        { range: "6M - 20M", percentage: 40, colorClass: "bg-[#3B75BE]" },
        { range: "21M - 100M", percentage: 30, colorClass: "bg-[#80AC49]" },
        { range: "101M - 500M", percentage: 10, colorClass: "bg-[#A792CD]" },
    ]

    const yAxisMarkers = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0]

    return (
        <Card className="w-full border-[#EAEAEA] shadow-none rounded-md bg-white overflow-hidden p-4">
            {/* Header Container with Radix Select Wrapper */}
            <CardHeader className="flex flex-row items-center justify-between p-0 space-y-0">
                <CardTitle className="text-[16px] text-[#1A1C1E]" style={{ ...TYPOGRAPHY.body, fontWeight: 600 }}>
                    Investor Breakdown
                </CardTitle>

                {/* Radix UI Select Configuration */}
                <Select.Root value={filterValue} onValueChange={setFilterValue}>
                    <Select.Trigger
                        className="inline-flex items-center justify-between gap-4 px-4 py-2 text-[16px] text-[#11110F] border border-[#CCCCCC] rounded-md bg-white hover:bg-[#F9FAFA] transition-colors focus:outline-none min-w-[110px]"
                        aria-label="Filter context"
                    >
                        <Select.Value />
                        <Select.Icon>
                            <ChevronDown className="size-4 text-[#11110F]" />
                        </Select.Icon>
                    </Select.Trigger>

                    <Select.Portal>
                        <Select.Content
                            className="overflow-hidden bg-white rounded-md border border-[#EAEAEA] shadow-lg min-w-[110px] z-50 pointer-events-auto animate-in fade-in-50 duration-100"
                            position="popper"
                            sideOffset={4}
                        >
                            <Select.Viewport className="p-1">
                                <Select.Item
                                    value="size"
                                    className="relative flex items-center px-6 py-2 text-xs text-[#1A1C1E] rounded-xs cursor-pointer select-none hover:bg-[#F4F7F6] focus:bg-[#F4F7F6] focus:outline-none"
                                >
                                    <Select.ItemText>Size</Select.ItemText>
                                </Select.Item>
                                <Select.Item
                                    value="location"
                                    className="relative flex items-center px-6 py-2 text-xs text-[#1A1C1E] rounded-xs cursor-pointer select-none hover:bg-[#F4F7F6] focus:bg-[#F4F7F6] focus:outline-none"
                                >
                                    <Select.ItemText>Location</Select.ItemText>
                                </Select.Item>
                            </Select.Viewport>
                        </Select.Content>
                    </Select.Portal>
                </Select.Root>
            </CardHeader>

            {/* Grid Content Layout Container */}
            <CardContent className="px-0 pt-4 pb-0.5">
                <div className="relative h-[260px] w-full flex flex-col justify-between">

                    {/* Background Grid Guidelines with Y-Axis Values */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                        {yAxisMarkers.map((marker) => (
                            <div key={marker} className="w-full flex items-center gap-4 group">
                                <span className="text-[11px] text-[#7A7A7A] w-8 text-right select-none">
                                    {marker}%
                                </span>
                                <div className={cn(
                                    "flex-1 border-b transition-colors",
                                    marker === 0 ? "border-[#CCCCCC]" : "border-[#EAEAEA]"
                                )} />
                            </div>
                        ))}
                    </div>

                    {/* Active Data Bar Tracks */}
                    <div className="absolute left-12 right-4 bottom-0 top-0 flex justify-between items-end z-10 gap-3 md:gap-4 px-2">
                        {chartData.map((bar, idx) => (
                            <div key={idx} className="flex flex-col items-center flex-1 h-full max-w-[52px] justify-end">
                                {/* Dynamic Height Filled Column Segment */}
                                <div
                                    className={cn(
                                        "w-full rounded-t-[4px] transition-all duration-700 ease-out shadow-xs",
                                        bar.colorClass
                                    )}
                                    style={{ height: `${bar.percentage}%` }}
                                />
                            </div>
                        ))}
                    </div>

                </div> {/* This closes the relative h-[260px] Chart Matrix wrapper */}

                {/* NEW: Clean, isolated X-Axis Label Track running parallel with chart items */}
                <div className="flex justify-between items-start left-12 right-4 ml-12 mr-4 mt-2 gap-3 md:gap-4 px-2">
                    {chartData.map((bar, idx) => (
                        <div key={idx} className="flex-1 max-w-[52px] text-center">
                            <p className="text-[11px] text-[#555555] font-medium tracking-tight leading-tight break-words">
                                {bar.range}
                            </p>
                        </div>
                    ))}
                </div>



            </CardContent>
        </Card>
    )
}