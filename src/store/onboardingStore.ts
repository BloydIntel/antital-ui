import { create } from "zustand"
import { ONBOARDING_STEPS } from "@/components/onboarding/steps"

type StepKey = (typeof ONBOARDING_STEPS)[number]["key"];

type OnboardingState = {
    // State
    currentStep: StepKey
    personalSubStep: number
    kycSubStep: number

    // Actions
    setCurrentStep: (step: StepKey) => void
    setPersonalSubStep: (index: number) => void
    setKycSubStep: (index: number) => void
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
    // Initial State
    currentStep: ONBOARDING_STEPS[0].key as StepKey,
    personalSubStep: 0,
    kycSubStep: 0,

    // Actions
    setCurrentStep: (step) => set({
        currentStep: step
    }),

    setPersonalSubStep: (index) => set({
        personalSubStep: index,
        currentStep: "personal"
    }),

    setKycSubStep: (index) => set({
        kycSubStep: index,
        currentStep: "kyc"
    }),
}))
