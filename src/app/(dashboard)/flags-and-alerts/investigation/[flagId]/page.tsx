import InvestigationPage from "@/components/flags-and-alerts/investigation/InvestigationPage";

interface PageProps {
    params: Promise<{ flagId: string }>;
}

export default function Page({ params }: PageProps) {
    return <InvestigationPage params={params} />;
}