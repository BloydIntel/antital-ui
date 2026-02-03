import { create } from "zustand"

type OnboardingState = {
    currentStep: string
    setCurrentStep: (step: string) => void
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
    currentStep: "personal",
    setCurrentStep: (step) => set({ currentStep: step }),
}))
