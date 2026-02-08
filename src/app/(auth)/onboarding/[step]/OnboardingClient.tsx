"use client"

import { useEffect } from "react"
import StepRenderer from "@/components/onboarding/organisms/StepRenderer"
import { ONBOARDING_STEPS } from "@/components/onboarding/steps"
import { useOnboardingStore } from "@/store/onboardingStore"

export function OnboardingClient({ step }: { step: string }) {
    const setCurrentStep = useOnboardingStore((s) => s.setCurrentStep)

    useEffect(() => {
        if (ONBOARDING_STEPS.some((s) => s.key === step)) {
            setCurrentStep(step)
        }
    }, [step, setCurrentStep])

    return <StepRenderer step={step} />
}
