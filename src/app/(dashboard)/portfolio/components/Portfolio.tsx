"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardSubHeader } from "@/components/dashboard/organisms/DashboardSubHeader"
import { PortfolioStatChart } from "@/app/(dashboard)/dashboard/components/chart-area-interactive"
import { DataTable } from "@/app/(dashboard)/dashboard/components/data-table"
import { SectionCards } from "@/app/(dashboard)/dashboard/components/section-cards"
import { useDashboard } from "@/hooks/use-dashboard"
import { buildDashboardMonthOptions, toDashboardPeriod } from "@/lib/dashboard-period"
import { showApiErrorToast } from "@/lib/error-feedback"
import { useUserStore } from "@/store/userStore"

export function Portfolio() {
    const router = useRouter()
    const months = useMemo(() => buildDashboardMonthOptions(), [])
    const [selectedMonth, setSelectedMonth] = useState("This month")
    const period = toDashboardPeriod(selectedMonth)
    const { data, isLoading, isError, error } = useDashboard(period)

    const userType = useUserStore((state) => state.userType)
    const [hasHydrated, setHasHydrated] = useState(false)

    useEffect(() => {
        setHasHydrated(true)
    }, [])

    useEffect(() => {
        if (isError) {
            showApiErrorToast(error, "Unable to load portfolio.")
        }
    }, [isError, error])

    const currentUserType = hasHydrated ? userType : "individual"

    return (
        <main>
            <DashboardSubHeader
                title="My Portfolio"
                desc="Manage your investments and track performance"
                selectedMonth={selectedMonth}
                months={months}
                onMonthChange={setSelectedMonth}
                onButtonClick={() => router.push("/marketplace")}
                userType={currentUserType}
            />

            <div className="@container/main space-y-6">
                <SectionCards summary={data?.summary} isLoading={isLoading} />
                <PortfolioStatChart
                    portfolioPerformance={data?.portfolioPerformance}
                    holdings={data?.holdings}
                    isLoading={isLoading}
                />
            </div>

            <DataTable holdings={data?.holdings} isLoading={isLoading} />
        </main>
    )
}
