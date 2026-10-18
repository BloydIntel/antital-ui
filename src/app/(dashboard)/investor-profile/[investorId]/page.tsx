import InvestorProfilePage from "@/app/(dashboard)/investor-profile/[investorId]/components/InvestorProfilePage";

interface PageProps {
    params: Promise<{
        investorId: string;
    }>;
}

export default async function Page({ params }: PageProps) {
    const { investorId } = await params;

    return <InvestorProfilePage investorId={investorId} />;
}