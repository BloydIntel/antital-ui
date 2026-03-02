"use client"

import React, { useState } from 'react'
import { PersonalDetailsForm } from "@/components/onboarding/organisms/individual/personal-step/PersonalDetailsForm";
import { LocationForm } from "@/components/onboarding/organisms/individual/personal-step/LocationForm";
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton'
import { useRouter } from "next/navigation";
import { useOnboardingStore } from '@/store/onboardingStore';
import { PERSONAL_SUB_STEPS } from '@/components/onboarding/subSteps';

export function PersonalStep() {
    const subStep = useOnboardingStore((s) => s.personalSubStep);
    const setSubStep = useOnboardingStore((s) => s.setPersonalSubStep);

    const [isFormValid, setIsFormValid] = useState(false);

    const router = useRouter()

    const stepContent: Record<string, React.ReactNode> = {
        details: <PersonalDetailsForm onValidationChange={setIsFormValid} />,
        location: <LocationForm onValidationChange={setIsFormValid} />,
    }

    const currentStep = PERSONAL_SUB_STEPS[subStep]
    const isLastSubStep = subStep === PERSONAL_SUB_STEPS.length - 1

    const nextSubStep = () => {
        if (!isFormValid) return;

        if (isLastSubStep) {
            router.push('/onboarding/individual/email')
        } else {
            setSubStep(subStep + 1)
            setIsFormValid(false)
        }
    }

    return (
        <div className="w-full lg:w-[558px] flex flex-col gap-4">

            {/* Dynamic Content Area */}
            <div className="min-h-[300px]">
                {currentStep && stepContent[currentStep.id]}
            </div>

            <OnboardingButton
                label={subStep === 0 ? "Proceed" : "Create Account"}
                variant="solid"
                onClick={nextSubStep}
                disabled={!isFormValid}
                className={!isFormValid ? "opacity-50 cursor-not-allowed" : ""}
            />
        </div>
    )
}