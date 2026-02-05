import { create } from "zustand"

type OnboardingState = {
    personalSubStep: 'details' | 'location'
    currentStep: string
    setCurrentStep: (step: string) => void
    setPersonalSubStep: (sub: 'details' | 'location') => void
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
    currentStep: 'personal',
    personalSubStep: 'details',
    setCurrentStep: (step) => set({ currentStep: step }),
    setPersonalSubStep: (sub) => set({ personalSubStep: sub }),
}))
