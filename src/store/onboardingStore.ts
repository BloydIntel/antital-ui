import { create } from 'zustand'
import { StepKey } from '@/components/onboarding/steps'

type AllowedStepBeforeVerify = "personal" | "email"

interface OnboardingFormData {
    // Personal Details
    firstName: string;
    lastName: string;
    email: string;
    alias: string;
    phone: string;
    dob: string;
    // Location Details
    nationality: string;
    residence: string;
    state: string;
    address: string;
}

interface OnboardingState {
    currentStep: StepKey
    personalSubStep: number
    kycSubStep: number
    emailVerified: boolean
    lastAllowedStep: AllowedStepBeforeVerify
    formData: OnboardingFormData

    setCurrentStep: (step: StepKey) => void
    setPersonalSubStep: (subStep: number) => void
    setKycSubStep: (subStep: number) => void
    setEmailVerified: (verified: boolean) => void
    setLastAllowedStep: (step: AllowedStepBeforeVerify) => void
    updateFormData: (data: Partial<OnboardingFormData>) => void
}

const initialFormData: OnboardingFormData = {
    firstName: "",
    lastName: "",
    email: "",
    alias: "",
    phone: "",
    dob: "",
    nationality: "",
    residence: "",
    state: "",
    address: "",
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
    currentStep: "personal",
    personalSubStep: 0,
    kycSubStep: 0,
    emailVerified: false,
    lastAllowedStep: "personal",
    formData: initialFormData,

    setCurrentStep: (step) => set({ currentStep: step }),
    setPersonalSubStep: (subStep) => set({ personalSubStep: subStep }),
    setKycSubStep: (subStep) => set({ kycSubStep: subStep }),
    setEmailVerified: (verified) => set({ emailVerified: verified }),
    setLastAllowedStep: (step) => set({ lastAllowedStep: step }),

    updateFormData: (data) =>
        set((state) => ({
            formData: { ...state.formData, ...data }
        })),
}))