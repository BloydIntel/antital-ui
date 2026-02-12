import { create } from 'zustand'
import { StepKey } from '@/components/onboarding/steps'

interface OnboardingState {

    currentStep: StepKey
    personalSubStep: number
    kycSubStep: number

    setCurrentStep: (step: StepKey) => void
    setPersonalSubStep: (subStep: number) => void
    setKycSubStep: (subStep: number) => void

}

export const useOnboardingStore = create<OnboardingState>((set) => ({

    currentStep: "personal",
    personalSubStep: 0,
    kycSubStep: 0,

    setCurrentStep: (step) => set({ currentStep: step }),

    setPersonalSubStep: (subStep) => set({ personalSubStep: subStep }),

    setKycSubStep: (subStep) => set({ kycSubStep: subStep }),

}))