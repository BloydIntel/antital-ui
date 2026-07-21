"use client"

import { Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TYPOGRAPHY } from "@/constants/styles"
import type { FundraiserMilestone, FundraiserMilestoneStatus } from "@/types/fundraiser-dashboard-api"

interface FundraisingMilestonesProps {
    milestones?: FundraiserMilestone[]
    isLoading?: boolean
}

export function FundraisingMilestones({
    milestones = [],
    isLoading = false,
}: FundraisingMilestonesProps) {
    return (
        <Card className="w-full border-[#EAEAEA] shadow-none rounded-md bg-white overflow-hidden px-6 py-4">
            <CardHeader className="p-0 pb-6 space-y-1">
                <CardTitle className="text-[16px] text-[#1F1F1F]" style={{ ...TYPOGRAPHY.body, fontWeight: 600 }}>
                    Fundraising Milestones
                </CardTitle>
                <CardDescription className="text-[16px] text-[#858585]">
                    Track key achievement stages
                </CardDescription>
            </CardHeader>

            <CardContent className={cn("p-0 relative", isLoading && "animate-pulse opacity-60")}>
                {milestones.length === 0 ? (
                    <p className="text-[16px] text-[#858585] py-6">No active fundraising campaign yet.</p>
                ) : (
                    <div className="flex flex-col w-full relative">
                        <div className="absolute left-[13px] top-4 bottom-4 w-[2px] bg-[#EAEAEA] z-0" />

                        {milestones.map((milestone) => {
                            const status = milestone.status as FundraiserMilestoneStatus
                            const isCompleted = status === "completed"
                            const isActive = status === "active"
                            const isPending = status === "pending"

                            return (
                                <div
                                    key={milestone.key}
                                    className="flex items-start justify-between relative z-10 pb-[56px] pt-0 last:pb-0 group"
                                >
                                    <div className="flex items-start gap-4 flex-1">
                                        <div className="flex items-center justify-center mt-0.5 select-none shrink-0">
                                            {isCompleted && (
                                                <div className="size-7 rounded-full bg-[#EFF3E4] border border-[#7D9433] flex items-center justify-center">
                                                    <Check className="size-4 text-[#7D9433] stroke-[3]" />
                                                </div>
                                            )}

                                            {isActive && (
                                                <div className="size-7 rounded-full bg-white border border-[#A2B855] flex items-center justify-center">
                                                    <div className="size-3 rounded-full bg-[#7D9433]" />
                                                </div>
                                            )}

                                            {isPending && (
                                                <div className="size-7 rounded-full bg-white border-2 border-[#EAEAEA] flex items-center justify-center">
                                                    <div className="size-2.5 rounded-full bg-[#EAEAEA]" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-0.5">
                                            <h4
                                                className="text-[16px] lg:text-[18px] font-medium transition-colors text-[#1A1C1E]"
                                                style={TYPOGRAPHY.body}
                                            >
                                                {milestone.title}
                                            </h4>
                                            <p className="text-[14px] lg:text-[16px] text-[#A1A1A1] leading-normal">
                                                {milestone.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-1 lg:gap-1.5 pt-0.5 text-right select-none">
                                        <span className={cn(
                                            "text-[16px] lg:text-[18px] font-medium tracking-tight",
                                            isCompleted && "text-[#7D8A26]",
                                            isActive && "text-[#7D8A26]",
                                            isPending && "text-[#858585]"
                                        )}>
                                            {milestone.dateLabel}
                                        </span>

                                        <span className={cn(
                                            "text-[12px] lg:text-[14px] text-center  font-medium capitalize tracking-wider px-2 py-0.5 rounded-[3px] w-[96px] lg:w-[102px]",
                                            isCompleted && "bg-[#D0FFC2] text-[#45B424]",
                                            isActive && "bg-[#EBF5A6] text-[#A7B832]",
                                            isPending && "bg-[#EAEAEA] text-[#858585]"
                                        )}>
                                            {status}
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
