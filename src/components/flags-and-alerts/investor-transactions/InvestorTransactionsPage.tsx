"use client";

import { ProfileHeader } from "@/components/flags-and-alerts/view-profile/ProfileHeader";
import {
    TransactionMetricsSummary,
    TransactionMetric,
} from "@/components/flags-and-alerts/investor-transactions/TransactionMetricsSummary";
import {
    InvestorTransactionsTable,
    TransactionRecord,
} from "@/components/flags-and-alerts/investor-transactions/InvestorTransactionsTable";
import { useRouter } from "next/navigation";

interface InvestorTransactionsPageProps {
    investorId: string;
}

const METRICS_DATA: TransactionMetric[] = [
    { label: "Total Transactions", value: "248" },
    { label: "Total Investment", value: "₦82,500,000" },
    { label: "Flagged Transactions", value: "4", highlightColor: "#D4001A" },
    { label: "Pending Transactions", value: "7", highlightColor: "#D97706" },
    { label: "Secondary Trades", value: "20" },
];

const TRANSACTIONS_DATA: TransactionRecord[] = [
    {
        id: "TXN-7387484",
        type: "Investment",
        campaign: "TechHub Series A",
        amount: "₦82,500,000",
        date: "May 22, 2025",
        paymentMethod: "Bank Transfer",
        status: "Flagged",
    },
    {
        id: "TXN-7387485",
        type: "Wallet Deposit",
        campaign: "-",
        amount: "₦82,500,000",
        date: "May 22, 2025",
        paymentMethod: "Paystack",
        status: "Completed",
    },
    {
        id: "TXN-7387486",
        type: "Secondary Market",
        campaign: "AgriGrow Fund Series B",
        amount: "₦82,500,000",
        date: "May 22, 2025",
        paymentMethod: "Wallet",
        status: "Pending",
    },
    {
        id: "TXN-7387487",
        type: "Dividend",
        campaign: "FinTech Alpha",
        amount: "₦82,500,000",
        date: "May 22, 2025",
        paymentMethod: "Auto-Credit",
        status: "Completed",
    },
    {
        id: "TXN-7387474",
        type: "Investment",
        campaign: "TechHub Series A",
        amount: "₦82,500,000",
        date: "May 22, 2025",
        paymentMethod: "Bank Transfer",
        status: "Flagged",
    },
    {
        id: "TXN-7387475",
        type: "Wallet Deposit",
        campaign: "-",
        amount: "₦82,500,000",
        date: "May 22, 2025",
        paymentMethod: "Paystack",
        status: "Completed",
    },
    {
        id: "TXN-7387476",
        type: "Secondary Market",
        campaign: "AgriGrow Fund Series B",
        amount: "₦82,500,000",
        date: "May 22, 2025",
        paymentMethod: "Wallet",
        status: "Pending",
    },
    {
        id: "TXN-7387477",
        type: "Dividend",
        campaign: "FinTech Alpha",
        amount: "₦82,500,000",
        date: "May 22, 2025",
        paymentMethod: "Auto-Credit",
        status: "Completed",
    },
];

export default function InvestorTransactionsPage({ investorId }: InvestorTransactionsPageProps) {

    const router = useRouter();

    const handleViewTransaction = (txn: TransactionRecord) => {
        router.push(`/investor-profile/investor-transactions/${investorId}/${txn.id}`);
    };

    return (
        <div className="min-h-screen space-y-6 font-sans text-[#11110F] bg-[#FAFAFA]">
            {/* Dynamic Header */}
            <ProfileHeader
                name="John Doe"
                role="Retail Investor"
                id={investorId}
                joinedDate="14 months ago"
                initials="JD"
                backText="Back to Investor Profile"
                showExport
                onExport={() => console.log(`Exporting transactions for ${investorId}...`)}
            />

            {/* Metrics */}
            <TransactionMetricsSummary metrics={METRICS_DATA} />

            {/* Data Table */}
            <InvestorTransactionsTable
                transactions={TRANSACTIONS_DATA}
                onViewTransaction={handleViewTransaction}
            />
        </div>
    );
}