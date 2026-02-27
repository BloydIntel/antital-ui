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
        const FIRST_STEP = STEPS[0].key as StepKey;
        const ALLOWED_BEFORE_VERIFY: StepKey[] = ["personal", "company", "email"] as StepKey[];

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

        const stepKey = step as StepKey;

        if (!emailVerified && configData.REQUIRING_VERIFICATION.includes(stepKey)) {
            const stored = typeof window !== "undefined" ? sessionStorage.getItem(LAST_ALLOWED_STEP_KEY) : null

            const targetStep = (stored && isKnownOnboardingStep(stored, type) && configData.ALLOWED_BEFORE_VERIFY.includes(stored as StepKey))
                ? (stored as StepKey)
                : configData.FIRST_STEP

            router.replace(`/onboarding/${type}/${targetStep}`)
            return
        }

        setCurrentStep(stepKey)

        if (configData.ALLOWED_BEFORE_VERIFY.includes(stepKey)) {
            setLastAllowedStep(stepKey as "personal" | "email" | "company")

            if (typeof window !== "undefined") {
                sessionStorage.setItem(LAST_ALLOWED_STEP_KEY, stepKey)
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

    const isValid = isKnownOnboardingStep(step, type);
    const stepKey = step as StepKey;
    const isRestricted = !emailVerified && configData.REQUIRING_VERIFICATION.includes(stepKey);

    if (!isValid || isRestricted) return null;

    return (
        <StepRenderer
            step={stepKey}
            investorUserTypeFromUrl={type}
        />
    )
}