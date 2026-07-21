"use client"

import { Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TYPOGRAPHY } from "@/constants/styles"

interface FundingProgressProps {
    raisedAmount?: number
    targetAmount?: number
    minimumThreshold?: number
    currentVelocity?: string
    confidenceRate?: number
    isLoading?: boolean
}

export function FundingProgress({
    raisedAmount = 0,
    targetAmount = 0,
    minimumThreshold = 0,
    currentVelocity = "₦0 / Week",
    confidenceRate = 0,
    isLoading = false,
}: FundingProgressProps) {
    const safeTarget = targetAmount > 0 ? targetAmount : 1
    const safeThreshold = minimumThreshold > 0 ? minimumThreshold : 1
    const percentageOfTarget = Math.min((raisedAmount / safeTarget) * 100, 100)
    const isThresholdReached = minimumThreshold > 0 && raisedAmount >= minimumThreshold

    const radius = 65
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (percentageOfTarget / 100) * circumference

    const formatToMillions = (val: number) => {
        if (val <= 0) return "₦0"
        return `₦${(val / 1000000).toFixed(1).replace(/\.0$/, "")}M`
    }

    return (
        <Card className="w-full border-[#EAEAEA] shadow-none rounded-md bg-white overflow-hidden px-6 py-4">
            <CardHeader className="flex flex-row items-center justify-between p-0 space-y-0">
                <CardTitle className="text-[16px] text-[#051635]" style={{ ...TYPOGRAPHY.body, fontWeight: 600 }}>
                    Funding Progress
                </CardTitle>
                <div className="flex items-center gap-4 text-xs font-medium">
                    <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#7D8A26]" />
                        <span className="text-[#051635] tex-[14px]" style={TYPOGRAPHY.body}>Raised</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#EDF1D6]" />
                        <span className="text-[#051635] text-[14px]" style={TYPOGRAPHY.body}>Target</span>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 pb-10 pt-2 items-center">
                    <div className="flex justify-center md:justify-start items-center relative w-full max-w-[240px] mx-auto md:mx-0">
                        <svg className="transform rotate-15 w-[214px] h-[214px]" viewBox="0 0 160 160">
                            <circle
                                cx="80"
                                cy="80"
                                r={radius}
                                className="stroke-[#EDF1D6]"
                                strokeWidth="23"
                                fill="transparent"
                            />
                            <circle
                                cx="80"
                                cy="80"
                                r={radius}
                                className={cn("stroke-[#7D8A26] transition-all duration-500", isLoading && "animate-pulse")}
                                strokeWidth="23"
                                fill="transparent"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="square"
                            />
                        </svg>
                    </div>

                    <div className="space-y-6 w-full">
                        <div>
                            <h2 className="text-[28px] tracking-tight text-[#1B1B1B] leading-none" style={TYPOGRAPHY.heading}>
                                {isLoading ? "₦0" : formatToMillions(raisedAmount)}
                            </h2>
                            <p className="text-[16px] text-[#505050] mt-2">
                                of {formatToMillions(targetAmount)} funding target
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <div className="flex justify-between text-[14px] text-[#505050]" style={TYPOGRAPHY.body} >
                                    <span>Minimum threshold reached</span>
                                    <span className="font-medium text-[16px] text-[#505050]">{formatToMillions(minimumThreshold)}</span>
                                </div>
                                <div className="w-full h-2 bg-[#EFF3E4] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-[#7D8A26] rounded-full transition-all"
                                        style={{ width: `${Math.min((raisedAmount / safeThreshold) * 100, 100)}%` }}
                                    />
                                </div>

                                {isThresholdReached && (
                                    <div className="inline-flex items-center gap-1.5 bg-[#DCE3AD] text-[#7D8A26] px-2.5 py-1 rounded-full text-xs font-semibold mt-1">
                                        <Check className="size-3.5 text-[#7D8A26] stroke-[#7D8A26]" />
                                        Minimum threshold reached
                                    </div>
                                )}
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex justify-between text-[14px] text-[#505050]" style={TYPOGRAPHY.body} >
                                    <span>Maximum cap</span>
                                    <span className="font-medium text-[16px] text-[#505050]">{formatToMillions(targetAmount)}</span>
                                </div>
                                <div className="w-full h-2 bg-[#EFF3E4] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-[#7D8A26] rounded-full transition-all"
                                        style={{ width: `${percentageOfTarget}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 bg-[#F4F5F7] p-3 text-center md:text-left" style={TYPOGRAPHY.body}>
                    <div className="border-b lg:border-b-0 lg:border-r pb-2 lg:pb-0 border-[#A8A8A8]">
                        <p className="text-[14px] text-[#858585] tracking-wider">Minimum threshold</p>
                        <p className="text-sm md:text-base font-medium text-[#2C2C2C] mt-0.5">
                            ₦{new Intl.NumberFormat("en-NG").format(minimumThreshold)}
                        </p>
                    </div>
                    <div className="border-b lg:border-b-0 lg:border-r py-2 lg:py-0 border-[#A8A8A8] md:pl-6">
                        <p className="text-[14px] text-[#858585] tracking-wider">Current velocity</p>
                        <p className="text-sm md:text-base font-medium text-[#2C2C2C] mt-0.5">{currentVelocity}</p>
                    </div>
                    <div className="md:pl-6 pt-2 lg:pt-0">
                        <p className="text-[14px] text-[#858585] tracking-wider">Confidence rate</p>
                        <p className="text-sm md:text-base font-medium text-[#2C2C2C] mt-0.5">{confidenceRate}%</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
