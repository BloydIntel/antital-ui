import TransactionDetailsPage from "@/app/(dashboard)/investor-profile/investor-transactions/[investorId]/[transactionId]/TransactionDetailsPage";

interface PageProps {
    params: Promise<{
        investorId: string;
        transactionId: string;
    }>;
}

export default async function Page({ params }: PageProps) {
    const { investorId, transactionId } = await params;
    return <TransactionDetailsPage investorId={investorId} transactionId={transactionId} />;
}