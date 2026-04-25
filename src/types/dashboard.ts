export interface InvestmentData {
    // --- Identity & Meta ---
    id: string;
    name: string;
    category: string;
    sector: string;
    description?: string | null;
    image?: string;
    logoSrc?: string | null;
    risk?: Exclude<RiskLevel, "All Risk">;
    date?: string; // investment date

    // --- Campaign Details (Current Funding Round) ---
    goal?: number;
    raised?: number;
    percentage?: number; // Funding progress
    investors?: number;
    daysLeft?: number;
    minInvestment?: number;
    market?: MarketType;

    // --- User Portfolio Details (Optional based on user holdings) ---
    invested?: number;
    unitHolding?: number;
    currentValue?: number;
    returns?: number;

    tradeType?: "buy" | "sell";
    price?: number;
    priceChange?: number;
    volume?: number;
    marketCap?: number;
    offersCount?: number;
}

export type MarketType = "primary" | "secondary";
export type RiskLevel = "All Risk" | "low" | "moderate" | "high";
export type Sector = "All Sector" | "Technology" | "Health" | "Energy" | "Agriculture";
export const RISK_COLORS: Record<Exclude<RiskLevel, "All Risk">, string> = {
    low: "#94C155",      // Green
    moderate: "#DCA73B", // Medium/Yellow
    high: "#D4001A",     // Red
};