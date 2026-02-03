
import { OnboardingClient } from "@/app/(auth)/onboarding/[step]/OnboardingClient"

export default async function OnboardingPage({
    params,
}: {
    params: Promise<{ step: string }>
}) {
    const { step } = await params

    return <OnboardingClient step={step} />
}
