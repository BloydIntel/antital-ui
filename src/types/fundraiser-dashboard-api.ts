export interface FundraiserDashboardSummary {
  totalAmountRaised: number;
  totalInvestors: number;
  daysRemaining: number;
  averageInvestmentSize: number;
}

export interface FundraiserFundingProgress {
  raisedAmount: number;
  targetAmount: number;
  minimumThreshold: number;
  currentVelocity: number;
  velocityPeriod: string;
  confidenceRate: number;
}

export interface FundraiserBreakdownBucket {
  label: string;
  percentage: number;
}

export interface FundraiserInvestorBreakdown {
  dimension: string;
  buckets: FundraiserBreakdownBucket[];
}

export type FundraiserMilestoneStatus = "completed" | "active" | "pending";

export interface FundraiserMilestone {
  key: string;
  title: string;
  description: string;
  dateLabel: string;
  status: FundraiserMilestoneStatus;
}

export interface FundraiserDashboardResponse {
  offeringId: number | null;
  offeringSlug: string | null;
  offeringName: string | null;
  currency: string;
  summary: FundraiserDashboardSummary;
  fundingProgress: FundraiserFundingProgress;
  investorBreakdown: FundraiserInvestorBreakdown;
  milestones: FundraiserMilestone[];
}
