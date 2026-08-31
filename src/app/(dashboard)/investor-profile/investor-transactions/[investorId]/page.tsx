import InvestorTransactionsPage from "@/components/flags-and-alerts/investor-transactions/InvestorTransactionsPage";

interface PageProps {
    params: Promise<{
        investorId: string;
    }>;
}

export default async function Page({ params }: PageProps) {
    const { investorId } = await params;

    return <InvestorTransactionsPage investorId={investorId} />;
}