import { OnboardingClient } from "@/app/(auth)/onboarding/[investorUserType]/[step]/OnboardingClient"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Onboarding | Antital',
    description: '',
}

export default async function OnboardingPage({
    params,
}: {
    params: Promise<{ investorUserType: string; step: string }>
}) {
    const { investorUserType, step } = await params

    return <OnboardingClient step={step} investorUserType={investorUserType} />
}