// components/onboarding/steps.ts
export const ONBOARDING_STEPS = [
    { key: "personal", label: "Personal Information", order: 1 },
    { key: "email", label: "Email Verification", order: 2 },
    { key: "investor", label: "Investor Category", order: 3 },
    { key: "kyc", label: "Identity Verification (KYC)", order: 4 },
    { key: "review", label: "Application Review", order: 5 },
    { key: "activation", label: "Account Activation", order: 6 },
]

export const STEP_KEYS = ONBOARDING_STEPS.map((s) => s.key)
