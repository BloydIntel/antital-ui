import { redirect } from "next/navigation"
import { ONBOARDING_STEPS } from "@/components/onboarding/steps"

const firstStepKey = ONBOARDING_STEPS[0].key

export default function OnboardingIndividualPage() {
    redirect(`/onboarding/individual/${firstStepKey}`)
}
