import { create } from 'zustand'
import { StepKey } from '@/components/onboarding/steps'

type AllowedStepBeforeVerify = "personal" | "email"

export type QuestionValue = string | number | string[] | { selections: string[]; amount: string } | undefined;

export interface KYCData {
    idType: string;
    idNumber: string;
    idFile: File | null; // Replaced any
    bvn: string;
    address: string;
    addressFile: File | null; // Replaced any
    selfie: File | null; // Replaced any
    incomeDocuments: string[];
    incomeFile: File | null; // Replaced any
}

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
    // Questionnaire Data
    questionnaireAnswers: Record<string, QuestionValue>;
    // Kyc Data
    kycData: KYCData;
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
    questionnaireAnswers: {},
    kycData: {
        idType: "",
        idNumber: "",
        idFile: null,
        bvn: "",
        address: "",
        addressFile: null,
        selfie: null,
        incomeDocuments: [],
        incomeFile: null,
    }
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
            formData: {
                ...state.formData,
                ...data,
                kycData: data.kycData ? { ...state.formData.kycData, ...data.kycData } : state.formData.kycData
            }
        })),
}))