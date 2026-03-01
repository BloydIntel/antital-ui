import { create } from 'zustand'
import { StepKey, InvestorUserType } from '@/components/onboarding/steps'

export type AllowedStepBeforeVerify = "personal" | "email" | "company";

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

    // Corporate Fields 
    incorporationCertificate: File | null;
    qiiLicense: File | null;
    statusReport: File | null;
    boardResolution: File | null;
}

interface OnboardingFormData {
    // Shared / Personal Details
    firstName: string;
    lastName: string;
    email: string;
    alias: string;
    phone: string;
    dob: string;
    password: string;
    confirmPassword: string;

    // Location Details
    nationality: string;
    residence: string;
    state: string;
    address: string;
    agreed: boolean;

    // Corporate Specific Details
    companyName: string;
    brandName: string;
    registrationType: string;
    registrationNumber: string;
    loginEmail: string;

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

    // Questionnaire Data
    selectedCategoryId: string | null;
    questionnaireAnswers: Record<string, QuestionValue>;
    // Kyc Data
    kycData: KYCData;
}

export interface OnboardingState {
    investorUserType: InvestorUserType | null;
    setInvestorUserType: (type: InvestorUserType) => void;
    currentStep: StepKey
    personalSubStep: number
    companySubStep: number
    kycSubStep: number
    emailVerified: boolean
    lastAllowedStep: AllowedStepBeforeVerify
    formData: OnboardingFormData

    setCurrentStep: (step: StepKey) => void
    setPersonalSubStep: (subStep: number) => void
    setCompanySubStep: (subStep: number) => void
    setKycSubStep: (subStep: number) => void
    setEmailVerified: (verified: boolean) => void
    setLastAllowedStep: (step: AllowedStepBeforeVerify) => void
    updateFormData: (data: Partial<Omit<OnboardingFormData, 'kycData'>> & { kycData?: Partial<KYCData> }) => void
}

const initialFormData: OnboardingFormData = {
    firstName: "",
    lastName: "",
    email: "",
    alias: "",
    phone: "",
    dob: "",
    agreed: false,
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

    selectedCategoryId: null,
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

        incorporationCertificate: null,
        statusReport: null,
        boardResolution: null,
        qiiLicense: null,
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
    setCompanySubStep: (subStep) => set({ companySubStep: subStep }),
    setKycSubStep: (subStep) => set({ kycSubStep: subStep }),
    setEmailVerified: (verified) => set({ emailVerified: verified }),
    setLastAllowedStep: (step) => set({ lastAllowedStep: step }),

    updateFormData: (data) =>
        set((state) => {
            // Prepare the new KYC data by merging existing with the incoming partial data
            const updatedKycData = data.kycData
                ? { ...state.formData.kycData, ...data.kycData }
                : state.formData.kycData;

            return {
                formData: {
                    ...state.formData,
                    ...data,
                    kycData: updatedKycData
                }
            };
        }),
}))