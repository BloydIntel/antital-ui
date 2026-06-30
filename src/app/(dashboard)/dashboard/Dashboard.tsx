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
import { useUserStore } from "@/store/userStore"
import { FundingProgress } from "@/app/(dashboard)/dashboard/components/funding-progress"
import { InvestorBreakdownChart } from "@/app/(dashboard)/dashboard/components/investor-breakdown-chart"
import { FundraisingMilestones } from "@/app/(dashboard)/dashboard/components/fundraising-milestones"

export function Dashboard() {
    const router = useRouter()
    const months = useMemo(() => buildDashboardMonthOptions(), [])
    const [selectedMonth, setSelectedMonth] = useState("This month")
    const period = toDashboardPeriod(selectedMonth)
    const { data: user, isError: isUserError, error: userError } = useCurrentUser()
    const { data, isLoading, isError, error } = useDashboard(period)

    // Select the userType from your Zustand store
    const userType = useUserStore((state) => state.userType)
    const [hasHydrated, setHasHydrated] = useState(false)

    useEffect(() => {
        setHasHydrated(true)
    }, [])

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
                desc={
                    hasHydrated && userType === "fundraiser"
                        ? "Here is a real-time summary of your current fundraising campaign."
                        : "Here is a summary of overall data"
                }
                selectedMonth={selectedMonth}
                months={months}
                onMonthChange={setSelectedMonth}
                onButtonClick={() => router.push("/marketplace")}
            />

            <div className="@container/main space-y-6">
                <SectionCards
                    summary={data?.summary}
                    isLoading={isLoading}
                    userType={hasHydrated ? userType : "individual"}
                />
                {userType !== "fundraiser" ?
                    <PortfolioStatChart
                        portfolioPerformance={data?.portfolioPerformance}
                        activeDeals={data?.activeDeals}
                        isLoading={isLoading}
                    />
                    : <div className="grid grid-cols-1 xl:grid-cols-10 mb-12 gap-5">
                        <div className="xl:col-span-7">
                            <FundingProgress />
                        </div>
                        <div className="xl:col-span-3">
                            <InvestorBreakdownChart />
                        </div>
                    </div>
                }
            </div>


            {userType !== "fundraiser" ?
                <DataTable
                    holdings={data?.holdings}
                    isLoading={isLoading}
                    userType={hasHydrated ? userType : "individual"}
                />
                : <FundraisingMilestones />

            }
        </main>
    )
}