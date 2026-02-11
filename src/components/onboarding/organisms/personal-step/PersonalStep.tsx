"use client"

import React from 'react'
import { PersonalDetailsForm } from "@/components/onboarding/organisms/personal-step/PersonalDetailsForm";
import { LocationForm } from "@/components/onboarding/organisms/personal-step/LocationForm";
import { OnboardingButton } from '../../molecules/OnboardingButton'
import { useRouter } from "next/navigation";
import { useOnboardingStore } from '@/store/onboardingStore';

const PERSONAL_SUB_STEPS = [
    { id: 'details', title: 'Personal Details' },
    { id: 'location', title: 'Location Information' }
]

export function PersonalStep() {
    const subStep = useOnboardingStore((s) => s.personalSubStep);
    const setSubStep = useOnboardingStore((s) => s.setPersonalSubStep);

    const router = useRouter()

    const nextSubStep = () => {
        if (subStep === PERSONAL_SUB_STEPS.length - 1) {
            router.push('/onboarding/email')
        } else {
            setSubStep(subStep + 1)
        }
    }

    // const prevSubStep = () => setStep((p) => Math.max(p - 1, 0))

    return (
        <div className="w-full lg:w-[558px] flex flex-col">

            {/* Dynamic Content Area */}
            <div className="min-h-[300px]">
                {subStep === 0 && (
                    <PersonalDetailsForm />
                )}
                {subStep === 1 && (
                    <LocationForm />
                )}
            </div>

            <OnboardingButton
                Label={subStep === 0 ? "Proceed" : "Create Account"}
                variant="solid"
                onClick={nextSubStep}
            />
        </div>
    )
}