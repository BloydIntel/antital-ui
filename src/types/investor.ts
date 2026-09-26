export type InvestorIconType = "user" | "globe" | "naira";

export interface InvestorCategory {
    readonly id: string;
    readonly jsonKey: string;
    readonly title: string;
    readonly subTitle?: string;
    readonly description: string;
    readonly iconType: InvestorIconType;
}




// Admin Dashboard Types

export type InvestorStatus = "Active" | "Pending KYC" | "Suspended";

export interface Investor {
    id: string;
    name: string;
    email: string;
    initials: string;
    walletBalance: string;
    joinedDate: string;
    status: InvestorStatus;
}

export interface MetricCardData {
    title: string;
    value: string;
    subtext: string;
    subtextColor?: string;
}