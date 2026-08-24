import TransactionDetailsPage from "@/app/(dashboard)/investor-profile/investor-transactions/[investorId]/[transactionId]/TransactionDetailsPage";


interface PageProps {
    params: Promise<{
        investorId: string;
        transactionId: string;
    }>;
}

export default function Page({ params }: PageProps) {
    return <TransactionDetailsPage params={params} />;
}