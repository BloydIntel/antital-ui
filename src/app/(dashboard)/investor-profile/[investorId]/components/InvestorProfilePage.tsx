"use client";

import { useMemo, useState } from "react";
import { AddNoteModal } from "@/components/flags-and-alerts/view-profile/AddNoteModal";
import { ActivePortfolioTable, PortfolioItem } from "@/components/flags-and-alerts/view-profile/ActivePortfolioTable";
import { IdentityKycData, IdentityKycSidebar } from "@/components/flags-and-alerts/view-profile/IdentityKycSidebar";
import { InvestmentStatsCards } from "@/components/flags-and-alerts/view-profile/InvestmentStatsCards";
import { ProfileHeader } from "@/components/flags-and-alerts/view-profile/ProfileHeader";
import { RecentTransactionsList, TransactionItem } from "@/components/flags-and-alerts/view-profile/RecentTransactionsList";
import { SuspendInvestorModal } from "@/components/flags-and-alerts/view-profile/SuspendInvestorModal";
import { useRouter } from "next/navigation";
import { DocumentModalData, ViewDocumentModal } from "@/components/flags-and-alerts/view-profile/ViewDocumentModal";
import { useSearchParams } from "next/navigation";
import { useAdminInvestor, useUpdateAdminInvestor } from "@/hooks/use-admin-investors";
import { toast } from "sonner";
import { KycReviewPage } from "./KycReviewPage";

interface InvestorProfilePageProps {
    investorId: string;
}

const MOCK_USER_DATA = {
    name: "John Doe",
    role: "Retail Investor",
    timeOnPlatform: "14 months ago",
    initials: "JD",
    avatarUrl: undefined,
    investorCategory: "Institutional/HNWI",
    status: "Active",
    tierLevel: "Tier 3"
};

const MOCK_KYC_DATA: IdentityKycData = {
    email: "johndoe@gmail.com",
    phone: "+234 7499 293 8293",
    address: "NO 21, Lokogoma manu estate, Abuja",
    tierLevel: "Tier 2 (Verified)",
    bvnMatch: true,
    walletBalance: "₦124,500.00",
    bankAccounts: [
        {
            id: "bank-1",
            bankName: "Stanbic IBTC Bank",
            accountNumber: "9012345678",
        },
        {
            id: "bank-2",
            bankName: "Access Bank",
            accountNumber: "0011223344",
        },
    ],
    activeFlag: {
        flagId: "FLG-1092",
        label: "AML/Fraud Suspicion",
        url: "/flags-and-alerts/investigation/FLG-1092",
    },
    sourceofFundsVerified: true,
    lastReviewDate: "Jan 10, 2024",
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
    const router = useRouter();
    const { data: apiInvestor, isLoading, isError } = useAdminInvestor(investorId);
    const updateInvestor = useUpdateAdminInvestor(investorId);

    const searchParams = useSearchParams();
    const source = searchParams.get("from");
    const review = searchParams.get("review");
    const isInvestorManagement = source === "investor-management";
    const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
    const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
    const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
    const documentData = useMemo<DocumentModalData>(() => ({ title: "Identity Document", userName: apiInvestor ? `${apiInvestor.firstName} ${apiInvestor.lastName}` : MOCK_USER_DATA.name, userId: investorId, verificationStatus: "Verified Match", documentImageUrl: "/admin-investor-profile/identityCardMockup.png", ocrData: { documentType: "National ID Card", issuingCountry: "Nigeria (NGA)", documentNumber: "AO1234567", fullName: (apiInvestor ? `${apiInvestor.firstName} ${apiInvestor.lastName}` : MOCK_USER_DATA.name).toUpperCase(), dateOfBirth: "15 SEP 1985", expiryDate: "12 OCT 2028" } }), [apiInvestor, investorId]);
    if (isInvestorManagement && isLoading) return <div className="p-10 text-center">Loading investor profile…</div>;
    if (isInvestorManagement && (isError || !apiInvestor)) return <div className="p-10 text-center">Unable to load investor profile.</div>;
    const updateKyc = (status: "Approved" | "Rejected" | "DocumentsRequested", note: string) => updateInvestor.mutate({ kycStatus: status, note }, { onSuccess: () => toast.success(status === "DocumentsRequested" ? "Additional information requested." : `KYC ${status.toLowerCase()}.`), onError: () => toast.error("Unable to update KYC status.") });
    if (isInvestorManagement && review === "kyc" && apiInvestor) return <KycReviewPage investor={apiInvestor} onBack={() => router.push("/investor-management")} onUpdate={({ kycStatus, note }) => updateKyc(kycStatus as "Approved" | "Rejected" | "DocumentsRequested", note)} isUpdating={updateInvestor.isPending} />;
    const userData = apiInvestor ? { ...MOCK_USER_DATA, name: `${apiInvestor.firstName} ${apiInvestor.lastName}`, role: apiInvestor.userType, initials: `${apiInvestor.firstName[0] ?? ""}${apiInvestor.lastName[0] ?? ""}`, investorCategory: apiInvestor.userType, status: apiInvestor.accountStatus, tierLevel: apiInvestor.kycStatus } : MOCK_USER_DATA;
    const kycData = apiInvestor ? { ...MOCK_KYC_DATA, email: apiInvestor.email, phone: apiInvestor.phoneNumber, address: `${apiInvestor.residentialAddress}, ${apiInvestor.stateOfResidence}`, walletBalance: new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(apiInvestor.walletBalance), lastReviewDate: apiInvestor.kycReviewedAt ? new Date(apiInvestor.kycReviewedAt).toLocaleDateString() : "Not reviewed" } : MOCK_KYC_DATA;
    const statsData = apiInvestor ? { totalInvested: new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(apiInvestor.totalInvested), activePositions: apiInvestor.activePositions, estimatedReturns: `+${new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(apiInvestor.estimatedReturns)}` } : MOCK_STATS_DATA;
    const portfolio = apiInvestor ? apiInvestor.holdings.map((x, i) => ({ id: String(i), campaign: x.campaign, instrument: x.instrument, amount: new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(x.amount), status: x.status })) : MOCK_PORTFOLIO;
    const transactions = apiInvestor ? apiInvestor.transactions.slice(0, 4).map(x => ({ id: String(x.id), title: x.type, txnCode: `TXN-${x.id}`, date: new Date(x.occurredAt).toLocaleDateString(), amount: new Intl.NumberFormat("en-NG", { style: "currency", currency: x.currency }).format(x.amount), status: x.status, type: "debit" as const })) : MOCK_TRANSACTIONS;

    const handleSaveNote = (noteData: { category: string; content: string }) => {
        console.log("Note saved:", noteData);
    };

    const handleConfirmSuspension = () => {
        updateInvestor.mutate({ suspended: true }, { onSuccess: () => { setIsSuspendModalOpen(false); toast.success("Investor account suspended."); }, onError: () => toast.error("Unable to suspend investor account.") });
    };
    const handleAccountAction = () => {
        if (apiInvestor?.accountStatus === "Suspended") updateInvestor.mutate({ suspended: false }, { onSuccess: () => toast.success("Investor account unsuspended."), onError: () => toast.error("Unable to unsuspend investor account.") });
        else setIsSuspendModalOpen(true);
    };
    const requestDocuments = () => updateKyc("DocumentsRequested", "Additional identity documents are required for KYC review.");

    const handleNavigateToTransactions = () => {
        router.push(`/investor-profile/investor-transactions/${investorId}`);
    };

    const handleNavigateToPortfolio = () => {
        router.push(`/investor-profile/investor-portfolio/${investorId}`);
    };

    return (
        <div className="min-h-screen space-y-6 font-sans text-[#11110F]">
            {/* Header Component */}
            <ProfileHeader
                name={userData.name}
                role={userData.role}
                id={investorId}
                timeOnPlatform={userData.timeOnPlatform}
                initials={userData.initials}
                onAddNote={() => setIsNoteModalOpen(true)}
                onSuspend={handleAccountAction}
                isInvestorManagement={isInvestorManagement}
                investorCategory={userData.investorCategory}
                status={userData.status}
            />

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
                {/* Left Column (Sidebar - 3 cols) */}
                <div className="lg:col-span-3">
                    <IdentityKycSidebar
                        data={kycData}
                        onViewDocument={() => setIsDocumentModalOpen(true)}
                        isInvestorManagement={isInvestorManagement}
                    />
                </div>

                {/* Right Column (Main View - 4 cols) */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Top Metric Cards */}
                    <InvestmentStatsCards
                        totalInvested={statsData.totalInvested}
                        activePositions={statsData.activePositions}
                        estimatedReturns={statsData.estimatedReturns}
                        isInvestorManagement={isInvestorManagement}
                    />

                    {/* Active Portfolio Table */}
                    <ActivePortfolioTable
                        items={portfolio}
                        onViewAll={handleNavigateToPortfolio}
                        isInvestorManagement={isInvestorManagement}
                    />

                    {/* Recent Transactions */}
                    <RecentTransactionsList
                        items={transactions}
                        onViewAll={handleNavigateToTransactions}
                    />
                </div>
            </div>

            {/* Modal Handler */}
            <AddNoteModal
                isOpen={isNoteModalOpen}
                onClose={() => setIsNoteModalOpen(false)}
                onSubmit={handleSaveNote}
                user={{
                    name: userData.name,
                    id: investorId,
                    initials: userData.initials,
                    avatarUrl: MOCK_USER_DATA.avatarUrl,
                }}
            />

            <SuspendInvestorModal
                isOpen={isSuspendModalOpen}
                onClose={() => setIsSuspendModalOpen(false)}
                onSubmit={handleConfirmSuspension}
                user={{
                    name: userData.name,
                    id: investorId,
                    status: userData.status,
                    tierLevel: userData.tierLevel,
                    investorCategory: userData.investorCategory
                }}
                isInvestorManagement={isInvestorManagement}
            />

            <ViewDocumentModal
                isOpen={isDocumentModalOpen}
                onClose={() => setIsDocumentModalOpen(false)}
                data={documentData}
                onApprove={isInvestorManagement ? () => updateKyc("Approved", "Identity document reviewed and approved.") : undefined}
                onReject={isInvestorManagement ? () => updateKyc("Rejected", "Identity document rejected during admin review.") : undefined}
                onRequestDocuments={isInvestorManagement ? requestDocuments : undefined}
            />
        </div>
    );
}
