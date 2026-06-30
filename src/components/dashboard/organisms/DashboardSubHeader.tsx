import React from 'react'
import { TYPOGRAPHY } from "@/constants/styles"
import { OnboardingButton } from "@/components/onboarding/molecules/OnboardingButton"
import { ChevronDown, Plus } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface DashboardSubHeaderProps {
    title: string;
    desc: string;
    selectedMonth: string;
    months: string[];
    onMonthChange: (month: string) => void;
    buttonLabel?: string;
    onButtonClick?: () => void;
}

export function DashboardSubHeader({
    title,
    desc,
    selectedMonth,
    months,
    onMonthChange,
    buttonLabel = "New investment",
    onButtonClick
}: DashboardSubHeaderProps) {
    return (
        <div className=" flex flex-col lg:flex-row justify-between pb-[24px] gap-2">
            <div className="flex flex-col gap-1">
                <h3
                    className="text-[28px] text-[#1B1B1B] tracking-tight"
                    style={TYPOGRAPHY.heading}
                >
                    {title}
                </h3>
                <p
                    className="text-[16px] text-[#2C2C2C]"
                    style={TYPOGRAPHY.body}
                >
                    {desc}
                </p>
            </div>

            <div className="flex gap-2 justify-center items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            className="text-[16px] h-11 px-4 flex items-center gap-4 border-[#EAEAEA] text-[#1A1C1E] bg-white hover:bg-gray-50 rounded-md"
                            style={TYPOGRAPHY.body}
                        >
                            {selectedMonth}
                            <ChevronDown className="h-4 w-4 text-[#6A7682]" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className=" bg-white">
                        {months.map((month) => (
                            <DropdownMenuItem
                                key={month}
                                onClick={() => onMonthChange(month)}
                                className="cursor-pointer py-2 text-[#6A7682] hover:text-[#1A1C1E] focus:bg-gray-50"
                            >
                                {month}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <OnboardingButton
                    label={buttonLabel}
                    onClick={onButtonClick}
                    icon={<Plus className="h-5 w-5" />}
                    className="text-[16px] my-0 h-[42px] w-fit flex-row-reverse font-normal rounded-md"
                />
            </div>
        </div>
    )
}