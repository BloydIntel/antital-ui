export interface DashboardSummary {
  availableBalance: number;
  totalInvested: number;
  totalReturns: number;
  currency: string;
}

export interface DashboardPerformancePoint {
  periodLabel: string;
  value: number;
}

export interface DashboardActiveDeal {
  offeringId: number;
  slug: string;
  name: string;
  logoUrl: string;
  price: number;
  changePercent: number;
}

export interface DashboardHolding {
  offeringId: number;
  slug: string;
  name: string;
  sector: string;
  risk: string;
  invested: number;
  currentValue: number;
  returns: number;
  unitHolding: number;
  date: string;
}

export interface DashboardResponse {
  summary: DashboardSummary;
  portfolioPerformance: DashboardPerformancePoint[];
  activeDeals: DashboardActiveDeal[];
  holdings: DashboardHolding[];
}
