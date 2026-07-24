export type FundraiserAnalyticsPeriod = "last-7-days" | "last-14-days" | "last-30-days";

export interface FundraiserAnalyticsOverview {
  totalPageViews: number;
  campaignLikes: number;
  socialShares: number;
}

export interface FundraiserAnalyticsTrafficPoint {
  date: string;
  label: string;
  value: number;
}

export interface FundraiserAnalyticsTraffic {
  averagePerDay: number;
  unit: string;
  points: FundraiserAnalyticsTrafficPoint[];
}

export interface FundraiserAnalyticsBucket {
  label: string;
  percentage: number;
}

export interface FundraiserAnalyticsDiversity {
  topLocation: string | null;
  geographic: FundraiserAnalyticsBucket[];
  categories: FundraiserAnalyticsBucket[];
}

export interface FundraiserAnalyticsConversion {
  viewToInvestmentRate: number;
  averageTimeToInvestHours: number | null;
  returnVisitorRate: number;
}

export interface FundraiserAnalyticsResponse {
  offeringId: number | null;
  offeringSlug: string | null;
  overview: FundraiserAnalyticsOverview;
  traffic: FundraiserAnalyticsTraffic;
  diversity: FundraiserAnalyticsDiversity;
  conversion: FundraiserAnalyticsConversion;
}
