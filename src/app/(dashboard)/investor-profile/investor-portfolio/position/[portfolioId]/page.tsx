
import { PositionDetailPageView } from "@/app/(dashboard)/investor-profile/investor-portfolio/position/[portfolioId]/PositionDetailPageView";

interface PageProps {
    params: Promise<{
        portfolioId: string;
    }>;
}

export default async function Page({ params }: PageProps) {
    const { portfolioId } = await params;

    return <PositionDetailPageView portfolioId={portfolioId} />;
}