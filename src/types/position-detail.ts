export interface PositionMetric {
    amountInvested: string;
    investmentDate: string;
    currentValue: string;
    valueChange: string;
    unrealizedRoi: string;
    escrowPercentage: string;
    unitsHeld: string;
    navPrice: string;
}

export interface PositionInfo {
    investmentId: string;
    campaignId: string;
    assetClass: string;
    entryPriceNav: string;
    currentNav: string;
    unitsHeld: string;
    investmentDate: string;
    campaignCloses: string;
    holdingPeriod: string;
}

export interface SecondaryMarketEligibility {
    investorTierEligible: boolean;
    minimumHoldPeriodMet: boolean;
    noActiveTradingRestriction: boolean;
    noOpenComplianceFlag: boolean;
    campaignNotInLockedDisbursement: boolean;
    priceLimitMin: string;
    priceLimitMax: string;
}

export interface PositionTransactionRecord {
    reference: string;
    type: string;
    date: string;
    paymentMethod: string;
    amount: string;
    status: "Settled" | "Pending" | "Failed";
}

export interface NavHistoryRecord {
    date: string;
    nav: string;
    change: string;
    percentage: string;
}

export interface AdminNote {
    author: string;
    date: string;
    content: string;
}

export interface PositionDetailData {
    id: string;
    title: string;
    campaignId: string;
    investorName: string;
    investorId: string;
    issuer: string;
    status: "Active" | "Pending Close" | "Exited";
    assetClass: string;
    metrics: PositionMetric;
    details: PositionInfo;
    secondaryMarket: SecondaryMarketEligibility;
    transactions: PositionTransactionRecord[];
    navHistory: NavHistoryRecord[];
    adminNotes: AdminNote[];
}