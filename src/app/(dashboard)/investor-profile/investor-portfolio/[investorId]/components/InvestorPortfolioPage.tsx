"use client";

import { useRouter } from "next/navigation";
import { InvestorPortfolioView } from "@/components/flags-and-alerts/investor-portfolio/molecules/InvestorPortfolioView";
import { PortfolioMetric, PortfolioPosition } from "@/types/portfolio";


interface InvestorPortfolioPageProps {
    investorId: string;
}

const METRICS_DATA: PortfolioMetric[] = [
    { label: "Total Invested All-Time", value: "₦1,250,000" },
    { label: "Active Invested Capital", value: "₦450,000" },
    { label: "Total Returns Realized", value: "₦185,000" },
    { label: "Active Positions", value: "3" },
];

const POSITIONS_DATA: PortfolioPosition[] = [
    {
        id: "1",
        campaign: "TechHub Series A",
        campaignId: "CMP-101",
        assetClass: "Equity",
        dateInvested: "May 15, 2026",
        initialAmount: "₦200,000.00",
        currentValue: "₦285,000.00",
        roi: "+42.5%",
        status: "PERFORMING",
    },
    {
        id: "2",
        campaign: "GreenEnergy Bond",
        campaignId: "CMP-102",
        assetClass: "Debt",
        dateInvested: "Apr 25, 2026",
        initialAmount: "₦150,000.00",
        currentValue: "₦156,000.00",
        roi: "+4.0%",
        status: "PERFORMING",
    },
    {
        id: "3",
        campaign: "AgriGrow Fund Series B",
        campaignId: "CMP-104",
        assetClass: "Equity",
        dateInvested: "Apr 6, 2026",
        initialAmount: "₦100,000.00",
        currentValue: "₦100,000.00",
        roi: "0%",
        status: "PENDING CLOSE",
    },
    {
        id: "4",
        campaign: "Logistics PropCo",
        campaignId: "CMP-088",
        assetClass: "Real Estate",
        dateInvested: "Mar 31, 2026",
        initialAmount: "₦300,000.00",
        currentValue: "₦345,000.00",
        roi: "+15.0%",
        status: "EXITED",
    },
    {
        id: "5",
        campaign: "RetailX Seed",
        campaignId: "CMP-075",
        assetClass: "Equity",
        dateInvested: "Feb 22, 2025",
        initialAmount: "₦500,000.00",
        currentValue: "₦640,000.00",
        roi: "+28.0%",
        status: "EXITED",
    },
];

export default function InvestorPortfolioPage({ investorId }: InvestorPortfolioPageProps) {
    const router = useRouter();

    return (
        <InvestorPortfolioView
            investorName="John Doe"
            investorCode={investorId}
            metrics={METRICS_DATA}
            positions={POSITIONS_DATA}
            onBack={() => router.back()}
            onViewDetails={(position) =>
                console.log("Navigating to details for position:", position.id)
            }
        />
    );
}