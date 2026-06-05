"use client"

import { DashboardSubHeader } from "@/components/dashboard/organisms/DashboardSubHeader"
import { PortfolioStatChart } from "@/app/(dashboard)/dashboard/components/chart-area-interactive"
import { DataTable } from "@/app/(dashboard)/dashboard/components/data-table"
import { SectionCards } from "@/app/(dashboard)/dashboard/components/section-cards"

import { useState } from "react"

export function Dashboard() {

    const [selectedMonth, setSelectedMonth] = useState("This month")

    const months = ["This month", "Last month", "October", "September", "Active"]

    const uiState = selectedMonth === "Active" ? true : false

    return (
        <main>
            <DashboardSubHeader
                title="Welcome back, John Doe"
                desc="Here is a summary of overall data"
                selectedMonth={selectedMonth}
                months={months}
                onMonthChange={setSelectedMonth}
                onButtonClick={() => console.log("Button Clicked")}
            />

            <div className="@container/main space-y-6">
                <SectionCards state={uiState} />
                <PortfolioStatChart state={uiState} />
            </div>

            <DataTable state={uiState} />

        </main>
    )
}
