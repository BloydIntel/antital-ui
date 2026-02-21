"use client"

import { useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import StepRenderer from "@/components/onboarding/organisms/StepRenderer"
import { ONBOARDING_CONFIG, StepKey, isKnownOnboardingStep, InvestorUserType } from "@/components/onboarding/steps"
import { useOnboardingStore } from "@/store/onboardingStore"

const LAST_ALLOWED_STEP_KEY = "onboarding_lastAllowedStep"

interface Props {
    step: string;
    investorUserType: string;
}

export function OnboardingClient({ step, investorUserType }: Props) {
    const router = useRouter()

    const type = (ONBOARDING_CONFIG[investorUserType as InvestorUserType]
        ? (investorUserType as InvestorUserType)
        : "individual") as InvestorUserType;

    const {
        setCurrentStep,
        setLastAllowedStep,
        emailVerified,
        setInvestorUserType
    } = useOnboardingStore()

    const configData = useMemo(() => {
        const STEPS = ONBOARDING_CONFIG[type]
        const FIRST_STEP = STEPS[0].key
        const ALLOWED_BEFORE_VERIFY: StepKey[] = ["personal", "company", "email" as StepKey]

        const REQUIRING_VERIFICATION = STEPS
            .filter(s => !ALLOWED_BEFORE_VERIFY.includes(s.key as StepKey))
            .map(s => s.key as StepKey)

        return { FIRST_STEP, ALLOWED_BEFORE_VERIFY, REQUIRING_VERIFICATION }
    }, [type])

    useEffect(() => {
        setInvestorUserType(type)

        if (!isKnownOnboardingStep(step, type)) {
            router.replace(`/onboarding/${type}/${configData.FIRST_STEP}`)
            return
        }

        if (!emailVerified && configData.REQUIRING_VERIFICATION.includes(step)) {
            const stored = typeof window !== "undefined" ? sessionStorage.getItem(LAST_ALLOWED_STEP_KEY) : null

            const targetStep = (stored && configData.ALLOWED_BEFORE_VERIFY.includes(stored as StepKey))
                ? stored
                : configData.FIRST_STEP

            router.replace(`/onboarding/${type}/${targetStep}`)
            return
        }

        setCurrentStep(step)

        if (configData.ALLOWED_BEFORE_VERIFY.includes(step)) {

            setLastAllowedStep(step as "personal" | "email" | "company")

            if (typeof window !== "undefined") {
                sessionStorage.setItem(LAST_ALLOWED_STEP_KEY, step)
            }
        }
    }, [
        step,
        emailVerified,
        type,
        router,
        setInvestorUserType,
        setCurrentStep,
        setLastAllowedStep,
        configData
    ])

    if (!isKnownOnboardingStep(step, type)) return null
    if (!emailVerified && configData.REQUIRING_VERIFICATION.includes(step as StepKey)) return null

    return (
        <StepRenderer
            step={step}
            investorUserTypeFromUrl={type}
        />
    )
}