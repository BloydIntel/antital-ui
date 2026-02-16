
import { OnboardingClient } from "@/app/(auth)/onboarding/individual/[step]/OnboardingClient"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Onboarding | Antital',
    description: '',
}

export default async function OnboardingPage({
    params,
}: {
    params: Promise<{ step: string }>
}) {
    const { step } = await params

    return <OnboardingClient step={step} />
}
