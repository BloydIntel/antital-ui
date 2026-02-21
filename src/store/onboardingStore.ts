import { create } from 'zustand'
import { StepKey, InvestorUserType } from '@/components/onboarding/steps'

type AllowedStepBeforeVerify = "personal" | "email" | "company";

export type QuestionValue = string | number | string[] | { selections: string[]; amount: string } | undefined;

export interface KYCData {
    idType: string;
    idNumber: string;
    idFile: File | null;
    bvn: string;
    address: string;
    addressFile: File | null;
    selfie: File | null;
    incomeDocuments: string[];
    incomeFile: File | null;
}

interface OnboardingFormData {
    // Shared / Personal Details
    firstName: string;
    lastName: string;
    email: string;
    alias: string;
    phone: string;
    dob: string;

    // Corporate Specific Details
    companyName: string;
    brandName: string;
    registrationType: string;
    registrationNumber: string;
    loginEmail: string;
    password: string;
    confirmPassword: string;

    // Company Address Fields
    registrationDate: string;
    companyWebsite: string;
    businessAddress: string;
    registeredAddress: string;
    companyPhone: string;
    companyEmail: string;

    // Account Representative Details Fields
    repFullName: string;
    repJobTitle: string;
    repPhoneNumber: string;
    repDob: string;
    repEmail: string;
    repNationality: string;
    repResidence: string;
    repAddress: string;

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
    investorUserType: InvestorUserType | null;
    setInvestorUserType: (type: InvestorUserType) => void;
    currentStep: StepKey
    personalSubStep: number
    companySubStep: number // Added for corporate flow
    kycSubStep: number
    emailVerified: boolean
    lastAllowedStep: AllowedStepBeforeVerify
    formData: OnboardingFormData

    setCurrentStep: (step: StepKey) => void
    setPersonalSubStep: (subStep: number) => void
    setCompanySubStep: (subStep: number) => void // Added setter
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
    // Corporate Defaults
    companyName: "",
    brandName: "",
    registrationType: "",
    registrationNumber: "",
    loginEmail: "",
    password: "",
    confirmPassword: "",
    // Company Address Fields
    registrationDate: "",
    companyWebsite: "",
    businessAddress: "",
    registeredAddress: "",
    companyPhone: "",
    companyEmail: "",
    // Account Representative Details Fields
    repFullName: "",
    repJobTitle: "",
    repPhoneNumber: "",
    repDob: "",
    repEmail: "",
    repNationality: "",
    repResidence: "",
    repAddress: "",
    // Location Defaults
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
    investorUserType: null,
    setInvestorUserType: (type) => set({ investorUserType: type }),
    currentStep: "personal",
    personalSubStep: 0,
    companySubStep: 0, // Initializing sub-step
    kycSubStep: 0,
    emailVerified: false,
    lastAllowedStep: "personal",
    formData: initialFormData,

    setCurrentStep: (step) => set({ currentStep: step }),
    setPersonalSubStep: (subStep) => set({ personalSubStep: subStep }),
    setCompanySubStep: (subStep) => set({ companySubStep: subStep }), // Setter
    setKycSubStep: (subStep) => set({ kycSubStep: subStep }),
    setEmailVerified: (verified) => set({ emailVerified: verified }),
    setLastAllowedStep: (step) => set({ lastAllowedStep: step }),

    updateFormData: (data) =>
        set((state) => ({
            formData: {
                ...state.formData,
                ...data,
                // Ensure kycData deep merge if kycData is provided in the partial update
                kycData: data.kycData ? { ...state.formData.kycData, ...data.kycData } : state.formData.kycData
            }
        })),
}))