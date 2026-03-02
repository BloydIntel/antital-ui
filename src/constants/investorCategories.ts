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

export const CORPORATE_CATEGORIES = [
    {
        id: "qii",
        jsonKey: "Qualified Institutional Investor (QII)",
        title: "Qualified Institutional Investor",
        subTitle: "(QII)",
        description: "I represent a regulated financial institution or entity with the professional capacity, expertise, and financial strength to participate in large or complex investment activities. I have established risk-management structures, access to specialized analysis, and the ability to evaluate and absorb significant investment risks.",
        iconType: "user"
    },
    {
        id: "oci",
        jsonKey: "Other Corporate Investor (OCI)",
        title: "Other Corporate Investor",
        subTitle: "(OCI)",
        description: "I represent a registered company or business entity investing its own funds. My organization has the legal capacity to make investment decisions and manage financial commitments on behalf of the company. I participate in investment opportunities appropriate for businesses with standard governance, approval processes, and risk-management practices, even if we do not meet the criteria for institutional or high-net-worth status.",
        iconType: "globe"
    }
] as const;