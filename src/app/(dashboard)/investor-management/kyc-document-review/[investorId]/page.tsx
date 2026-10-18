import { KycReviewPage } from "@/app/(dashboard)/investor-management/kyc-document-review/[investorId]/components/KycReviewPage";

interface PageProps {
    params: Promise<{
        investorId: string;
    }>;
}

export default async function Page({ params }: PageProps) {
    const { investorId } = await params;

    return <KycReviewPage investorId={investorId} />;
}