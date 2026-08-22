"use client";

import { useState } from "react";
import { AddNoteModal } from "@/components/flags-and-alerts/view-profile/AddNoteModal";
import { ActivePortfolioTable, PortfolioItem } from "@/components/flags-and-alerts/view-profile/ActivePortfolioTable";
import { IdentityKycData, IdentityKycSidebar } from "@/components/flags-and-alerts/view-profile/IdentityKycSidebar";
import { InvestmentStatsCards } from "@/components/flags-and-alerts/view-profile/InvestmentStatsCards";
import { ProfileHeader } from "@/components/flags-and-alerts/view-profile/ProfileHeader";
import { RecentTransactionsList, TransactionItem } from "@/components/flags-and-alerts/view-profile/RecentTransactionsList";
import { SuspendInvestorModal } from "@/components/flags-and-alerts/view-profile/SuspendInvestorModal";

interface InvestorProfilePageProps {
    investorId: string;
}

const MOCK_USER_DATA = {
    name: "John Doe",
    role: "Retail Investor",
    joinedDate: "14 months ago",
    initials: "JD",
    avatarUrl: undefined,
};

const MOCK_KYC_DATA: IdentityKycData = {
    email: "johndoe@gmail.com",
    phone: "+234 7499 293 8293",
    address: "NO 21, Lokogoma manu estate, Abuja",
    tierLevel: "Tier 2 (Verified)",
    bvnMatch: true,
    walletBalance: "₦124,500.00",
    bankName: "Guaranty Trust Bank",
    accountNumber: "0123456789",
    activeFlag: {
        flagId: "FLG-1092",
        label: "AML/Fraud Suspicion",
        url: "/investigations/FLG-1092",
    },
};

const MOCK_STATS_DATA = {
    totalInvested: "₦1,250,000",
    activePositions: 3,
    estimatedReturns: "+₦185,000",
};

const MOCK_PORTFOLIO: PortfolioItem[] = [
    {
        id: "1",
        campaign: "TechHub Series A",
        instrument: "Equity",
        amount: "₦200,000",
        status: "Performing",
    },
    {
        id: "2",
        campaign: "GreenEnergy Bond",
        instrument: "Debt",
        amount: "₦150,000",
        status: "Performing",
    },
    {
        id: "3",
        campaign: "AgriGrow Fund",
        instrument: "Equity",
        amount: "₦100,000",
        status: "Performing Close",
    },
];

const MOCK_TRANSACTIONS: TransactionItem[] = [
    {
        id: "1",
        title: "Investment (Flagged)",
        txnCode: "TXN-7387484",
        date: "Jun 24, 2026",
        amount: "₦2,500,000",
        status: "Hold",
        isFlagged: true,
        type: "debit",
    },
    {
        id: "2",
        title: "Wallet Deposit",
        txnCode: "TXN-7387484",
        date: "May 24, 2026",
        amount: "₦2,500,000",
        status: "Completed",
        type: "credit",
    },
    {
        id: "3",
        title: "SM Trade (Buy)",
        txnCode: "TXN-7387484",
        date: "Feb 24, 2026",
        amount: "₦50,000",
        status: "Completed",
        type: "debit",
    },
    {
        id: "4",
        title: "Dividend Payout",
        txnCode: "TXN-7387484",
        date: "Jan 24, 2026",
        amount: "₦12,000",
        status: "Completed",
        type: "credit",
    },
];

export default function InvestorProfilePage({ investorId }: InvestorProfilePageProps) {
    const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
    const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);

    const handleSaveNote = (noteData: { category: string; content: string }) => {
        console.log("Note saved:", noteData);
    };

    const handleConfirmSuspension = (suspensionData: {
        reason: string;
        details: string;
        notifyUser: boolean;
        requirePasswordReset: boolean;
    }) => {
        console.log("Account suspended with data:", suspensionData);
    };

    return (
        <div className="min-h-screen space-y-6 font-sans text-[#11110F]">
            {/* Header Component */}
            <ProfileHeader
                name={MOCK_USER_DATA.name}
                role={MOCK_USER_DATA.role}
                id={investorId}
                joinedDate={MOCK_USER_DATA.joinedDate}
                initials={MOCK_USER_DATA.initials}
                onAddNote={() => setIsNoteModalOpen(true)}
                onSuspend={() => setIsSuspendModalOpen(true)}
            />

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
                {/* Left Column (Sidebar - 3 cols) */}
                <div className="lg:col-span-3">
                    <IdentityKycSidebar data={MOCK_KYC_DATA} />
                </div>

                {/* Right Column (Main View - 4 cols) */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Top Metric Cards */}
                    <InvestmentStatsCards
                        totalInvested={MOCK_STATS_DATA.totalInvested}
                        activePositions={MOCK_STATS_DATA.activePositions}
                        estimatedReturns={MOCK_STATS_DATA.estimatedReturns}
                    />

                    {/* Active Portfolio Table */}
                    <ActivePortfolioTable
                        items={MOCK_PORTFOLIO}
                        onViewAll={() => console.log("View All Portfolio")}
                    />

                    {/* Recent Transactions */}
                    <RecentTransactionsList
                        items={MOCK_TRANSACTIONS}
                        onViewAll={() => console.log("View All Transactions")}
                    />
                </div>
            </div>

            {/* Modal Handler */}
            <AddNoteModal
                isOpen={isNoteModalOpen}
                onClose={() => setIsNoteModalOpen(false)}
                onSubmit={handleSaveNote}
                user={{
                    name: MOCK_USER_DATA.name,
                    id: investorId,
                    initials: MOCK_USER_DATA.initials,
                    avatarUrl: MOCK_USER_DATA.avatarUrl,
                }}
            />

            <SuspendInvestorModal
                isOpen={isSuspendModalOpen}
                onClose={() => setIsSuspendModalOpen(false)}
                onSubmit={handleConfirmSuspension}
                user={{
                    name: MOCK_USER_DATA.name,
                    id: investorId,
                }}
            />
        </div>
    );
}