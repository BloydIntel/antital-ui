"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardSubHeader } from "@/components/dashboard/organisms/DashboardSubHeader"
import { PortfolioStatChart } from "@/app/(dashboard)/dashboard/components/chart-area-interactive"
import { DataTable } from "@/app/(dashboard)/dashboard/components/data-table"
import { SectionCards } from "@/app/(dashboard)/dashboard/components/section-cards"
import { useCurrentUser } from "@/hooks/use-current-user"
import { useDashboard } from "@/hooks/use-dashboard"
import { buildDashboardMonthOptions, toDashboardPeriod } from "@/lib/dashboard-period"
import { showApiErrorToast } from "@/lib/error-feedback"
import { resolveUserDisplayName } from "@/lib/user-display-name"

export function Dashboard() {
    const router = useRouter()
    const months = useMemo(() => buildDashboardMonthOptions(), [])
    const [selectedMonth, setSelectedMonth] = useState("This month")
    const period = toDashboardPeriod(selectedMonth)
    const { data: user, isError: isUserError, error: userError } = useCurrentUser()
    const { data, isLoading, isError, error } = useDashboard(period)

    useEffect(() => {
        if (isUserError) {
            showApiErrorToast(userError, "Unable to load user profile.")
        }
    }, [isUserError, userError])

    useEffect(() => {
        if (isError) {
            showApiErrorToast(error, "Unable to load dashboard.")
        }
    }, [isError, error])

    const displayName = resolveUserDisplayName(user)

    return (
        <main>
            <DashboardSubHeader
                title={`Welcome back, ${displayName}`}
                desc="Here is a summary of overall data"
                selectedMonth={selectedMonth}
                months={months}
                onMonthChange={setSelectedMonth}
                onButtonClick={() => router.push("/marketplace")}
            />

            <div className="@container/main px-4 lg:px-6 space-y-6">
                <SectionCards summary={data?.summary} isLoading={isLoading} />
                <PortfolioStatChart
                    portfolioPerformance={data?.portfolioPerformance}
                    activeDeals={data?.activeDeals}
                    isLoading={isLoading}
                />
            </div>

            <DataTable holdings={data?.holdings} isLoading={isLoading} />
        </main>
    )
}
