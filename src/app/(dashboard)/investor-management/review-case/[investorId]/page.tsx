import { ReviewCase } from "@/app/(dashboard)/investor-management/review-case/[investorId]/components/ReviewCase";

interface PageProps {
    params: Promise<{
        investorId: string;
    }>;
}

export default async function Page({ params }: PageProps) {
    const { investorId } = await params;

    return <ReviewCase investorId={investorId} />;
}