import InvestorProfilePage from "./components/InvestorProfilePage";

interface PageProps {
    params: Promise<{
        investorId: string;
    }>;
}

export default async function Page({ params }: PageProps) {
    const { investorId } = await params;

    return <InvestorProfilePage investorId={investorId} />;
}