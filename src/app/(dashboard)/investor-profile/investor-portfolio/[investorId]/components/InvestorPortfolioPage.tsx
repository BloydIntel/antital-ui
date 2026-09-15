"use client";

import { useRouter } from "next/navigation";
import { InvestorPortfolioView } from "@/components/flags-and-alerts/investor-portfolio/InvestorPortfolioView";
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
    {
        id: "6",
        campaign: "FinPay Solutions Pre-A",
        campaignId: "CMP-108",
        assetClass: "Equity",
        dateInvested: "Jan 12, 2026",
        initialAmount: "₦400,000.00",
        currentValue: "₦480,000.00",
        roi: "+20.0%",
        status: "PERFORMING",
    },
    {
        id: "7",
        campaign: "SolarGrid Infrastructure",
        campaignId: "CMP-112",
        assetClass: "Debt",
        dateInvested: "Feb 05, 2026",
        initialAmount: "₦250,000.00",
        currentValue: "₦265,000.00",
        roi: "+6.0%",
        status: "PERFORMING",
    },
    {
        id: "8",
        campaign: "Metro Residences Phase 1",
        campaignId: "CMP-094",
        assetClass: "Real Estate",
        dateInvested: "Nov 18, 2025",
        initialAmount: "₦600,000.00",
        currentValue: "₦600,000.00",
        roi: "0%",
        status: "PENDING CLOSE",
    },
    {
        id: "9",
        campaign: "HealthCore Diagnostics",
        campaignId: "CMP-062",
        assetClass: "Equity",
        dateInvested: "Aug 14, 2024",
        initialAmount: "₦180,000.00",
        currentValue: "₦234,000.00",
        roi: "+30.0%",
        status: "EXITED",
    },
    {
        id: "10",
        campaign: "BioPharm Innovations",
        campaignId: "CMP-115",
        assetClass: "Equity",
        dateInvested: "Mar 10, 2026",
        initialAmount: "₦350,000.00",
        currentValue: "₦315,000.00",
        roi: "-10.0%",
        status: "PERFORMING",
    },
    {
        id: "11",
        campaign: "Urban Transit Fleet Expansion",
        campaignId: "CMP-099",
        assetClass: "Debt",
        dateInvested: "Dec 01, 2025",
        initialAmount: "₦500,000.00",
        currentValue: "₦540,000.00",
        roi: "+8.0%",
        status: "PERFORMING",
    },
    {
        id: "12",
        campaign: "EcoPack Sustainable Materials",
        campaignId: "CMP-106",
        assetClass: "Equity",
        dateInvested: "Feb 28, 2026",
        initialAmount: "₦120,000.00",
        currentValue: "₦120,000.00",
        roi: "0%",
        status: "PENDING CLOSE",
    },
    {
        id: "13",
        campaign: "Horizon Commercial Tower",
        campaignId: "CMP-051",
        assetClass: "Real Estate",
        dateInvested: "Jun 19, 2024",
        initialAmount: "₦800,000.00",
        currentValue: "₦1,040,000.00",
        roi: "+30.0%",
        status: "EXITED",
    },
    {
        id: "14",
        campaign: "CloudScale Data Centers",
        campaignId: "CMP-121",
        assetClass: "Equity",
        dateInvested: "Apr 18, 2026",
        initialAmount: "₦450,000.00",
        currentValue: "₦517,500.00",
        roi: "+15.0%",
        status: "PERFORMING",
    },
    {
        id: "15",
        campaign: "AquaPure Water Utilities",
        campaignId: "CMP-103",
        assetClass: "Debt",
        dateInvested: "Jan 25, 2026",
        initialAmount: "₦200,000.00",
        currentValue: "₦210,000.00",
        roi: "+5.0%",
        status: "PERFORMING",
    },
    {
        id: "16",
        campaign: "ColdChain Cold Storage",
        campaignId: "CMP-091",
        assetClass: "Real Estate",
        dateInvested: "Oct 05, 2025",
        initialAmount: "₦350,000.00",
        currentValue: "₦350,000.00",
        roi: "0%",
        status: "PENDING CLOSE",
    },
    {
        id: "17",
        campaign: "EduTech Global Accelerator",
        campaignId: "CMP-070",
        assetClass: "Equity",
        dateInvested: "Jan 15, 2025",
        initialAmount: "₦150,000.00",
        currentValue: "₦195,000.00",
        roi: "+30.0%",
        status: "EXITED",
    },
    {
        id: "18",
        campaign: "NextGen Robotics Series A",
        campaignId: "CMP-130",
        assetClass: "Equity",
        dateInvested: "May 02, 2026",
        initialAmount: "₦280,000.00",
        currentValue: "₦336,000.00",
        roi: "+20.0%",
        status: "PERFORMING",
    },
    {
        id: "19",
        campaign: "Telecom Towers Lease Fund",
        campaignId: "CMP-110",
        assetClass: "Debt",
        dateInvested: "Feb 14, 2026",
        initialAmount: "₦600,000.00",
        currentValue: "₦642,000.00",
        roi: "+7.0%",
        status: "PERFORMING",
    },
    {
        id: "20",
        campaign: "OmniLogistics Hub II",
        campaignId: "CMP-048",
        assetClass: "Real Estate",
        dateInvested: "Apr 11, 2024",
        initialAmount: "₦900,000.00",
        currentValue: "₦1,125,000.00",
        roi: "+25.0%",
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
                router.push(`/investor-profile/investor-portfolio/position/${position.id}`)
            }
        />
    );
}