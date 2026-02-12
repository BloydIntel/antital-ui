"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import StepRenderer from "@/components/onboarding/organisms/StepRenderer"
import { ONBOARDING_STEPS, StepKey } from "@/components/onboarding/steps"
import { useOnboardingStore } from "@/store/onboardingStore"

export function OnboardingClient({ step }: { step: string }) {
    const router = useRouter()
    const setCurrentStep = useOnboardingStore((s) => s.setCurrentStep)

    const isValidStep = (s: string): s is StepKey => {
        return ONBOARDING_STEPS.some((item) => item.key === s)
    }

    useEffect(() => {
        if (isValidStep(step)) {

            setCurrentStep(step)
        } else {
            router.replace(`/onboarding/${ONBOARDING_STEPS[0].key}`)
        }
    }, [step, setCurrentStep, router])

    if (!isValidStep(step)) return null

    return <StepRenderer step={step} />
}