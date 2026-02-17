"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import StepRenderer from "@/components/onboarding/organisms/StepRenderer"
import { ONBOARDING_STEPS, StepKey, isKnownOnboardingStep } from "@/components/onboarding/steps"
import { useOnboardingStore } from "@/store/onboardingStore"

const STEPS_REQUIRING_EMAIL_VERIFIED = ONBOARDING_STEPS.slice(2).map((s) => s.key)
const FIRST_STEP = ONBOARDING_STEPS[0].key
const ALLOWED_BEFORE_VERIFY: StepKey[] = ["personal", "email"]
const LAST_ALLOWED_STEP_KEY = "onboarding_lastAllowedStep"

export function OnboardingClient({ step }: { step: string }) {
    const router = useRouter()
    const lastAllowedStepRef = useRef<StepKey>(FIRST_STEP)

    const setCurrentStep = useOnboardingStore((s) => s.setCurrentStep)
    const setLastAllowedStep = useOnboardingStore((s) => s.setLastAllowedStep)
    const emailVerified = useOnboardingStore((s) => s.emailVerified)

    if (step === "personal" || step === "email") {
        lastAllowedStepRef.current = step as "personal" | "email"
    }


    useEffect(() => {
        if (!isKnownOnboardingStep(step)) {
            router.replace(`/onboarding/individual/${FIRST_STEP}`)
            return
        }

        if (!emailVerified && STEPS_REQUIRING_EMAIL_VERIFIED.includes(step as StepKey)) {
            const stored =
                typeof window !== "undefined" ? sessionStorage.getItem(LAST_ALLOWED_STEP_KEY) : null
            const refStep = lastAllowedStepRef.current
            const targetStep =
                stored === "personal" || stored === "email"
                    ? stored
                    : ALLOWED_BEFORE_VERIFY.includes(refStep)
                        ? refStep
                        : FIRST_STEP
            router.replace(`/onboarding/individual/${targetStep}`)
            return
        }

        setCurrentStep(step)
        if (step === "personal" || step === "email") {
            setLastAllowedStep(step)
            if (typeof window !== "undefined") {
                sessionStorage.setItem(LAST_ALLOWED_STEP_KEY, step)
            }
        }
    }, [step, emailVerified, setCurrentStep, setLastAllowedStep, router])

    if (!isKnownOnboardingStep(step)) return null

    if (!emailVerified && STEPS_REQUIRING_EMAIL_VERIFIED.includes(step as StepKey)) {
        return null
    }

    return <StepRenderer step={step} />
}