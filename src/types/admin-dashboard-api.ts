export type AdminDashboardActionType = "PendingOnboardingReview" | "DraftCampaign" | "PaymentException"
export type AdminDashboardActivityType = "InvestorRegistered" | "OnboardingSubmitted" | "CampaignPublished" | "InvestmentCompleted"

export interface AdminDashboardSummary {
  totalInvestors: number
  newInvestorsInPeriod: number
  newInvestorsInPreviousPeriod: number
  investorGrowthPercent: number | null
  activeCampaigns: number
  activeCampaignRaisedAmount: number
  totalCampaigns: number
  totalFundsRaised: number
  currency: string
}

export interface AdminDashboardAction {
  type: AdminDashboardActionType
  title: string
  description: string
  count: number
  route: string | null
}

export interface AdminDashboardRecentActivity {
  id: string
  type: AdminDashboardActivityType
  subject: string
  description: string
  occurredAtUtc: string
  route: string | null
}

export interface AdminDashboardResponse {
  summary: AdminDashboardSummary
  actions: AdminDashboardAction[]
  recentActivity: AdminDashboardRecentActivity[]
}
