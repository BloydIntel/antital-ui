"use client"

import { useEffect, useMemo, useState } from "react"
import { DashboardSubHeader } from "@/components/dashboard/organisms/DashboardSubHeader"
import { PortfolioStatChart } from "@/app/(dashboard)/dashboard/components/chart-area-interactive"
import { DataTable } from "@/app/(dashboard)/dashboard/components/data-table"
import { SectionCards } from "@/app/(dashboard)/dashboard/components/section-cards"
import { useCurrentUser } from "@/hooks/use-current-user"
import { useDashboard } from "@/hooks/use-dashboard"
import { useFundraiserDashboard } from "@/hooks/use-fundraiser-dashboard"
import { buildDashboardMonthOptions, toDashboardPeriod } from "@/lib/dashboard-period"
import { showApiErrorToast } from "@/lib/error-feedback"
import { resolveUserDisplayName } from "@/lib/user-display-name"
import { useUserStore } from "@/store/userStore"
import { FundingProgress } from "@/app/(dashboard)/dashboard/components/funding-progress"
import { InvestorBreakdownChart } from "@/app/(dashboard)/dashboard/components/investor-breakdown-chart"
import { FundraisingMilestones } from "@/app/(dashboard)/dashboard/components/fundraising-milestones"
import { AdminDashboard } from "@/app/(dashboard)/dashboard/components/admin-dashboard"

function formatVelocityLabel(amount: number, period: string): string {
    const safeAmount = Number.isFinite(amount) ? Math.max(0, amount) : 0
    const formatted = safeAmount <= 0
        ? "₦0"
        : `₦${(safeAmount / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`
    const periodLabel = period === "week" ? "Week" : period
    return `${formatted} / ${periodLabel}`
}

export function Dashboard() {
    const months = useMemo(() => buildDashboardMonthOptions(), [])
    const [selectedMonth, setSelectedMonth] = useState("This month")
    const period = toDashboardPeriod(selectedMonth)
    const { data: user, isError: isUserError, error: userError } = useCurrentUser()

    const userType = useUserStore((state) => state.userType)
    const [hasHydrated, setHasHydrated] = useState(false)

    useEffect(() => {
        setHasHydrated(true)
    }, [])

    const isFundraiser = hasHydrated && userType === "fundraiser"
    const isAdmin = hasHydrated && userType === "admin"

    const {
        data: investorData,
        isLoading: isInvestorLoading,
        isError: isInvestorError,
        error: investorError,
    } = useDashboard(period, hasHydrated && !isFundraiser && !isAdmin)

    const {
        data: fundraiserData,
        isLoading: isFundraiserLoading,
        isError: isFundraiserError,
        error: fundraiserError,
    } = useFundraiserDashboard(period, isFundraiser)

    useEffect(() => {
        if (isUserError) {
            showApiErrorToast(userError, "Unable to load user profile.")
        }
    }, [isUserError, userError])

    useEffect(() => {
        if (!isFundraiser && !isAdmin && isInvestorError) {
            showApiErrorToast(investorError, "Unable to load dashboard.")
        }
    }, [isAdmin, isFundraiser, isInvestorError, investorError])

    useEffect(() => {
        if (isFundraiser && isFundraiserError) {
            showApiErrorToast(fundraiserError, "Unable to load fundraiser dashboard.")
        }
    }, [isFundraiser, isFundraiserError, fundraiserError])

    const displayName = resolveUserDisplayName(user)
    const currentUserType = hasHydrated ? userType : "individual"
    const isLoading = isFundraiser ? isFundraiserLoading : isInvestorLoading

    if (isAdmin) {
        return <AdminDashboard />
    }

    return (
        <main>
            <DashboardSubHeader
                title={`Welcome back, ${displayName}`}
                desc={
                    isFundraiser
                        ? "Here is a real-time summary of your current fundraising campaign."
                        : "Here is a summary of overall data"
                }
                selectedMonth={selectedMonth}
                months={months}
                onMonthChange={setSelectedMonth}
                userType={currentUserType}
                hasActiveFundraising={Boolean(fundraiserData?.offeringId)}
            />

            <div className="@container/main space-y-6">
                <SectionCards
                    summary={investorData?.summary}
                    fundraiserSummary={fundraiserData?.summary}
                    isLoading={isLoading}
                    userType={currentUserType}
                />
                {!isFundraiser ? (
                    <PortfolioStatChart
                        portfolioPerformance={investorData?.portfolioPerformance}
                        activeDeals={investorData?.activeDeals}
                        holdings={investorData?.holdings}
                        isLoading={isLoading}
                    />
                ) : (
                    <div className="grid grid-cols-1 xl:grid-cols-10 mb-12 gap-5">
                        <div className="xl:col-span-7">
                            <FundingProgress
                                raisedAmount={fundraiserData?.fundingProgress.raisedAmount ?? 0}
                                targetAmount={fundraiserData?.fundingProgress.targetAmount ?? 0}
                                minimumThreshold={fundraiserData?.fundingProgress.minimumThreshold ?? 0}
                                currentVelocity={formatVelocityLabel(
                                    fundraiserData?.fundingProgress.currentVelocity ?? 0,
                                    fundraiserData?.fundingProgress.velocityPeriod ?? "week"
                                )}
                                confidenceRate={fundraiserData?.fundingProgress.confidenceRate ?? 0}
                                isLoading={isLoading}
                            />
                        </div>
                        <div className="xl:col-span-3">
                            <InvestorBreakdownChart
                                buckets={fundraiserData?.investorBreakdown.buckets}
                                isLoading={isLoading}
                            />
                        </div>
                    </div>
                )}
            </div>

            {!isFundraiser ? (
                <DataTable
                    holdings={investorData?.holdings}
                    isLoading={isLoading}
                    userType={currentUserType === "admin" ? "individual" : currentUserType}
                />
            ) : (
                <FundraisingMilestones
                    milestones={fundraiserData?.milestones}
                    isLoading={isLoading}
                />
            )}
        </main>
    )
}
