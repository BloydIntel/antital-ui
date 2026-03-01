"use client"

import { useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import StepRenderer from "@/components/onboarding/organisms/StepRenderer"
import { ONBOARDING_CONFIG, StepKey, isKnownOnboardingStep, InvestorUserType, isInvestorUserType, ALLOWED_STEP_BEFORE_VERIFICATION } from "@/components/onboarding/steps"
import { AllowedStepBeforeVerify, useOnboardingStore } from "@/store/onboardingStore"

const LAST_ALLOWED_STEP_KEY = "onboarding_lastAllowedStep"

interface Props {
    step: string;
    investorUserType: string;
}

export function OnboardingClient({ step, investorUserType }: Props) {
    const router = useRouter()

    const type: InvestorUserType = isInvestorUserType(investorUserType)
        ? investorUserType
        : "individual"

    const {
        setCurrentStep,
        setLastAllowedStep,
        emailVerified,
        setInvestorUserType
    } = useOnboardingStore()

    const configData = useMemo(() => {
        const STEPS = ONBOARDING_CONFIG[type]
        const FIRST_STEP = STEPS[0].key as StepKey;
        const REQUIRING_VERIFICATION = STEPS
            .map(s => s.key as StepKey)
            .filter(key => !ALLOWED_STEP_BEFORE_VERIFICATION.includes(key));

        return { FIRST_STEP, ALLOWED_STEP_BEFORE_VERIFICATION, REQUIRING_VERIFICATION }
    }, [type])

    const isValid = isKnownOnboardingStep(step, type);
    const stepKey = step as StepKey;
    const isRestricted = !emailVerified && configData.REQUIRING_VERIFICATION.includes(stepKey);

    useEffect(() => {
        setInvestorUserType(type)

        // If route is nonsense, go to start
        if (!isValid) {
            router.replace(`/onboarding/${type}/${configData.FIRST_STEP}`)
            return
        }

        // If route is valid but locked behind email verification
        if (isRestricted) {
            const stored = typeof window !== "undefined" ? sessionStorage.getItem(LAST_ALLOWED_STEP_KEY) : null

            const targetStep = (stored && isKnownOnboardingStep(stored, type) && configData.ALLOWED_STEP_BEFORE_VERIFICATION.includes(stored as StepKey))
                ? (stored as StepKey)
                : configData.FIRST_STEP

            router.replace(`/onboarding/${type}/${targetStep}`)
            return
        }

        // Only update store if we are on a valid, allowed step
        setCurrentStep(stepKey)

        if (configData.ALLOWED_STEP_BEFORE_VERIFICATION.includes(stepKey)) {
            setLastAllowedStep(stepKey as AllowedStepBeforeVerify)
            sessionStorage.setItem(LAST_ALLOWED_STEP_KEY, stepKey)
        }
    }, [
        isValid,
        isRestricted,
        stepKey,
        type,
        emailVerified,
        router,
        configData,
        setCurrentStep,
        setInvestorUserType,
        setLastAllowedStep
    ])

    if (!isValid || isRestricted) return null;

    return (
        <StepRenderer
            step={stepKey}
            investorUserTypeFromUrl={type}
        />
    )
}