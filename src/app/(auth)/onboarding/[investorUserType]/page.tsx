import { redirect } from "next/navigation";
import { ONBOARDING_CONFIG, InvestorUserType } from "@/components/onboarding/steps";

export default async function OnboardingRedirectPage({
    params,
}: {
    params: Promise<{ investorUserType: string }>;
}) {
    const { investorUserType } = await params;

    const type = (ONBOARDING_CONFIG[investorUserType as InvestorUserType]
        ? investorUserType
        : "individual") as InvestorUserType;

    const steps = ONBOARDING_CONFIG[type];
    const firstStepKey = steps[0].key;

    redirect(`/onboarding/${type}/${firstStepKey}`);
}