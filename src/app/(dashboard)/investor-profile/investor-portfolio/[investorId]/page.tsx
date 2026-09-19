import InvestorPortfolioPage from "@/app/(dashboard)/investor-profile/investor-portfolio/[investorId]/components/InvestorPortfolioPage";


interface PageProps {
    params: Promise<{
        investorId: string;
    }>;
}

export default async function Page({ params }: PageProps) {
    const { investorId } = await params;
    return <InvestorPortfolioPage investorId={investorId} />;
}