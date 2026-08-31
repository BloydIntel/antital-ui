import InvestigationPage from "@/components/flags-and-alerts/investigation/InvestigationPage";

interface PageProps {
    params: Promise<{ flagId: string }>;
}

export default async function Page({ params }: PageProps) {
    const { flagId } = await params;
    return <InvestigationPage flagId={flagId} />;
}