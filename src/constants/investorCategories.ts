import { InvestorCategory } from "@/types/investor";

export const INVESTOR_CATEGORIES: readonly InvestorCategory[] = [
    {
        id: "retail",
        jsonKey: "Retail Investor",
        title: "Retail Investor",
        subTitle: "(Restricted investment - person)",
        description: "Assets below ₦100m with limited investment experience. Investment caps apply to protect retail investors from overexposure to high-risk investments.",
        iconType: "user"
    },
    {
        id: "sophisticated",
        jsonKey: "Sophisticated Investor",
        title: "Sophisticated Investor",
        subTitle: "(self-acclaimed)",
        description: "3+ years of investment experience with demonstrated understanding of financial markets and risk-return tradeoffs. Comfortable evaluating complex investment opportunities.",
        iconType: "globe"
    },
    {
        id: "hni",
        jsonKey: "High Net-worth investor (HNI)",
        title: "High Net-worth Investor",
        subTitle: "(HNI)",
        description: "Assets above ₦100m with the financial capacity to absorb potential losses. Eligible to participate in high-risk, high-reward offerings with fewer restrictions.",
        iconType: "naira"
    }
]

export type InvestorCategoryId = (typeof INVESTOR_CATEGORIES)[number]['id'];