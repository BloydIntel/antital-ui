import { redirect } from "next/navigation";
import { ONBOARDING_CONFIG, isInvestorUserType } from "@/constants/steps";

export default async function OnboardingRedirectPage({
    params,
}: {
    params: Promise<{ investorUserType: string }>;
}) {
    const { investorUserType } = await params;

    const type = isInvestorUserType(investorUserType)
        ? investorUserType
        : "individual";

    const steps = ONBOARDING_CONFIG[type];

    if (!steps || !steps[0]) {
        redirect("/onboarding/individual/personal");
    }

    const firstStepKey = steps[0].key;

    redirect(`/onboarding/${type}/${firstStepKey}`);
}