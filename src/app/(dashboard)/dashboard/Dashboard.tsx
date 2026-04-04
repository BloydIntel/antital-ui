"use client"

import { PortfolioStatChart } from "./components/chart-area-interactive"
import { DataTable } from "./components/data-table"
import { SectionCards } from "./components/section-cards"

import data from "./data/data.json"
import pastPerformanceData from "./data/past-performance-data.json"
import keyPersonnelData from "./data/key-personnel-data.json"
import focusDocumentsData from "./data/focus-documents-data.json"
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
import { useState } from "react"

export default function Dashboard() {

    const [selectedMonth, setSelectedMonth] = useState("This month")

    const months = ["This month", "Last month", "October", "September"]

    return (
        <main>
            <div className="px-8 flex justify-between pb-[24px]">
                <div className="flex flex-col gap-1">
                    <h3
                        className="text-[28px] text-[#1B1B1B] tracking-tight"
                        style={TYPOGRAPHY.heading}
                    >Welcome back , John Doe</h3>
                    <p
                        className="text-[16px] text-[#2C2C2C]"
                        style={TYPOGRAPHY.body}
                    >Here is a summary of overall data</p>
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
                                <ChevronDown className="h-4 w-4 text-[#6A7682] cursor-pointer" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[180px] bg-white">
                            {months.map((month) => (
                                <DropdownMenuItem
                                    key={month}
                                    onClick={() => setSelectedMonth(month)}
                                    className="cursor-pointer py-2 text-[#6A7682] hover:text-[#1A1C1E] focus:bg-gray-50"
                                >
                                    {month}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>


                    <OnboardingButton label="New investment" icon={<Plus className="h-5 w-5" />} className="text-[16px] mt-0 h-[42px] max-w-[182px] flex-row-reverse font-normal rounded-md" />
                </div>
            </div>

            <div className="@container/main px-4 lg:px-6 space-y-6">
                <SectionCards />
                <PortfolioStatChart />
            </div>
            <div className="@container/main">
                <DataTable
                    data={data}
                    pastPerformanceData={pastPerformanceData}
                    keyPersonnelData={keyPersonnelData}
                    focusDocumentsData={focusDocumentsData}
                />
            </div>
        </main>
    )
}
