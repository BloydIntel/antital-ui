import { BadgeCheck, Mail, User, FileUser, TableOfContents, Lightbulb } from "lucide-react"

export const ONBOARDING_STEPS = [
    { key: "personal", label: "Personal Information", order: 1, icon: User },
    { key: "email", label: "Email Verification", order: 2, icon: Mail },
    { key: "investor", label: "Investor Category", order: 3, icon: BadgeCheck },
    { key: "kyc", label: "Identity Verification (KYC)", order: 4, icon: FileUser },
    { key: "review", label: "Application Review", order: 5, icon: TableOfContents },
    { key: "activation", label: "Account Activation", order: 6, icon: Lightbulb },
] as const

export const STEP_KEYS = ONBOARDING_STEPS.map((s) => s.key)

export type StepKey = (typeof ONBOARDING_STEPS)[number]["key"]
