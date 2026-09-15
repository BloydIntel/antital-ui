"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { PositionHeader } from "@/components/flags-and-alerts/investor-portfolio/investor-portfolio-details/PositionHeader";
import { PositionMetricsGrid } from "@/components/flags-and-alerts/investor-portfolio/investor-portfolio-details/PositionMetricsGrid";
import { PositionDetailsList } from "@/components/flags-and-alerts/investor-portfolio/investor-portfolio-details/PositionDetailsList";
import { SecondaryMarketEligibilityCard } from "@/components/flags-and-alerts/investor-portfolio/investor-portfolio-details/SecondaryMarketEligibilityCard";
import { DistributionsCard } from "@/components/flags-and-alerts/investor-portfolio/investor-portfolio-details/DistributionsCard";
import { PositionTransactionHistoryTable } from "@/components/flags-and-alerts/investor-portfolio/investor-portfolio-details/PositionTransactionHistoryTable";
import { NavHistoryTable } from "@/components/flags-and-alerts/investor-portfolio/investor-portfolio-details/NavHistoryTable";
import { AdminNoteCard } from "@/components/flags-and-alerts/investor-portfolio/investor-portfolio-details/AdminNoteCard";
import { PositionDetailData } from "@/types/position-detail";

export const MOCK_POSITION_DETAIL: PositionDetailData = {
    id: "1",
    title: "FinTech Alpha Series B",
    campaignId: "CMP-201",
    investorName: "Sarah Mitchell",
    investorId: "INV-8933",
    issuer: "FinTech Alpha Inc.",
    status: "Active",
    assetClass: "Equity",
    metrics: {
        amountInvested: "5,000,000",
        investmentDate: "Jan 02, 2024",
        currentValue: "5,410,000",
        valueChange: "-410,000",
        unrealizedRoi: "+8.2%",
        escrowPercentage: "1%",
        unitsHeld: "50,000",
        navPrice: "100",
    },
    details: {
        investmentId: "INV-POS-5435",
        campaignId: "CMP-356",
        assetClass: "Equity",
        entryPriceNav: "100",
        currentNav: "108.20",
        unitsHeld: "50,000",
        investmentDate: "Jan 20, 2024",
        campaignCloses: "Mar 31, 2024",
        holdingPeriod: "16 days",
    },
    secondaryMarket: {
        investorTierEligible: true,
        minimumHoldPeriodMet: true,
        noActiveTradingRestriction: true,
        noOpenComplianceFlag: true,
        campaignNotInLockedDisbursement: true,
        priceLimitMin: "97.38",
        priceLimitMax: "119.02",
    },
    transactions: [
        {
            reference: "TXN-63847284",
            type: "Initial Investment",
            date: "Jan 12, 2024",
            paymentMethod: "Wallet",
            amount: "5,000,000",
            status: "Settled",
        },
        {
            reference: "TXN-68399323",
            type: "Platform Fee",
            date: "Jan 12, 2024",
            paymentMethod: "Auto-deducted",
            amount: "50,000",
            status: "Settled",
        },
    ],
    navHistory: [
        { date: "Jan 12, 2024", nav: "108.20", change: "+3.20", percentage: "+3.05%" },
        { date: "Jan 14, 2024", nav: "108.20", change: "+3.20", percentage: "+3.05%" },
        { date: "Jan 16, 2024", nav: "100.00", change: "-", percentage: "-" },
        { date: "Jan 20, 2024", nav: "100.00", change: "Entry price", percentage: "-" },
    ],
    adminNotes: [
        {
            author: "Funmi Adeyemi",
            date: "Jan 03, 2024",
            content:
                "HNWI Investment verified. Source of funds confirmed via wire transfer receipt. No AML concerns. Campaign IC approval on file.",
        },
    ],
};

interface PositionDetailPageViewProps {
    portfolioId: string;
}

export function PositionDetailPageView({ portfolioId }: PositionDetailPageViewProps) {
    const router = useRouter();

    // Use mock data directly with dynamic route ID passed down
    const data: PositionDetailData = {
        ...MOCK_POSITION_DETAIL,
        id: portfolioId,
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-[#11110F] space-y-6 mx-auto font-sans">
            {/* Header Section */}
            <PositionHeader
                title={data.title}
                campaignId={data.campaignId}
                investorName={data.investorName}
                investorId={data.investorId}
                issuer={data.issuer}
                status={data.status}
                assetClass={data.assetClass}
                onBack={() => router.back()}
                onDownloadCertificate={() => console.log("Download Certificate")}
            />

            {/* Metrics Grid */}
            <PositionMetricsGrid metrics={data.metrics} />

            {/* Main Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-start">
                {/* Left Column */}
                <div className="lg:col-span-3 space-y-6">
                    <PositionDetailsList details={data.details} />
                    <SecondaryMarketEligibilityCard
                        data={data.secondaryMarket}
                        onListClick={() => console.log("List on Secondary Market")}
                    />
                </div>

                {/* Right Column */}
                <div className="lg:col-span-7 space-y-6">
                    <DistributionsCard expectedDate={data.details.campaignCloses} />
                    <PositionTransactionHistoryTable transactions={data.transactions} />
                    <NavHistoryTable records={data.navHistory} />
                    {data.adminNotes.length > 0 && <AdminNoteCard note={data.adminNotes[0]} />}
                </div>
            </div>
        </div>
    );
}