"use client";

import { use } from "react";
import { useRouter } from "next/navigation";

import { TransactionDetailsData } from "@/types/transaction";
import { TransactionDetailsView } from "@/components/flags-and-alerts/investor-transactions/investor-transaction-details/TransactionDetailsView";

const mockTransactionDetails: TransactionDetailsData = {
    id: "TXN-738289324",
    type: "Investment",
    flagged: true,
    status: "Completed",
    date: "May 22, 2025 • 02:45 PM",
    overview: {
        type: "Investment",
        status: "Completed",
        amount: "₦85,000,000",
        campaign: "TechHub Series A",
        paymentMethod: "Bank & Transfer",
        currency: "NGN",
        referenceId: "TXN-87163723",
        initiatedBy: "John Doe",
        processedBy: "Sarah Mitchell",
        dateTime: "Oct 31, 2024 • 02:45 PM",
        channel: "Investor Portal",
        sourceIp: "197.xxx.xxx.xxx",
    },
    information: {
        transactionId: "TXN-9947294",
        investmentId: "INV-2025-003278",
        investor: "John Doe",
        investorType: "Retail Investor",
        campaign: "TechHub Series A",
        investmentAmount: "₦85,000,000",
        fee: "₦0",
        netAmount: "₦85,000,000",
    },
    payment: {
        paymentMethod: "Bank Transfer",
        bankName: "GT Bank",
        accountName: "Antital Escrow Account",
        accountNumber: "0091738623824",
        transactionReference: "GTB-893874924",
        paymentStatus: "Completed",
        paymentDate: "Oct 31, 2024 • 02:45 PM",
        settlementDate: "Oct 31, 2024 • 02:45 PM",
    },
    timeline: [
        { date: "Oct 31, 2024 • 02:45 PM", description: "Investment initiated by investor", actor: "John Doe" },
        { date: "Oct 31, 2024 • 02:45 PM", description: "Payment details submitted", actor: "John Doe" },
        { date: "Oct 31, 2024 • 02:45 PM", description: "Payment received successfully", actor: "Gtbank" },
        { date: "Oct 31, 2024 • 02:45 PM", description: "Funds validated and escrowed", actor: "System" },
        { date: "Oct 31, 2024 • 02:45 PM", description: "Investment recorded and confirmed", actor: "System" },
        { date: "Oct 31, 2024 • 02:45 PM", description: "Transaction Completed", actor: "System" },
    ],
};

interface TransactionDetailsPageProps {
    params: Promise<{
        investorId: string;
        transactionId: string;
    }>;
}

export default function TransactionDetailsPage({ params }: TransactionDetailsPageProps) {
    const router = useRouter();
    const { transactionId } = use(params);

    const data: TransactionDetailsData = {
        ...mockTransactionDetails,
        id: transactionId || mockTransactionDetails.id,
    };

    return (
        <TransactionDetailsView
            data={data}
            onClose={() => router.back()}
        />
    );
}