export type PortfolioStatus = "PERFORMING" | "PENDING CLOSE" | "EXITED";

export interface PortfolioPosition {
    id: string;
    campaign: string;
    campaignId: string;
    assetClass: "Equity" | "Debt" | "Real Estate" | string;
    dateInvested: string;
    initialAmount: string;
    currentValue: string;
    roi: string;
    status: PortfolioStatus;
}

export interface PortfolioMetric {
    label: string;
    value: string;
}