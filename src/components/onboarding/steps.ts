import { BadgeCheck, Mail, User, FileUser, TableOfContents, Lightbulb, LucideIcon } from "lucide-react"

export type InvestorUserType = 'individual' | 'corporate' | 'fundraiser';

export interface OnboardingStep {
    readonly key: string;
    readonly label: string;
    readonly icon: LucideIcon;
    readonly hasSubsteps?: boolean;
}

export const ONBOARDING_CONFIG = {
    individual: [
        { key: "personal", label: "Personal Information", icon: User, hasSubsteps: true },
        { key: "email", label: "Email Verification", icon: Mail },
        { key: "investor", label: "Select Your Investor Category", icon: BadgeCheck },
        { key: "kyc", label: "Identity Verification (KYC)", icon: FileUser, hasSubsteps: true },
        { key: "review", label: "Application Review", icon: TableOfContents },
        { key: "activation", label: "Account Activation", icon: Lightbulb },
    ],
    corporate: [
        { key: "company", label: "Company Information", icon: User, hasSubsteps: true },
        { key: "email", label: "Email Verification", icon: Mail },
        { key: "categorization", label: "Corporate Categorization", icon: BadgeCheck },
        { key: "profile", label: "Investment Profile", icon: User },
        { key: "kyc", label: "Account Verification KYC", icon: FileUser, hasSubsteps: true },
        { key: "review", label: "Application Review", icon: TableOfContents },
        { key: "activation", label: "Account Activation", icon: Lightbulb },
    ],
    fundraiser: [
        { key: "personal", label: "Personal Information", icon: User, hasSubsteps: true },
        { key: "email", label: "Email Verification", icon: Mail },
    ]
} satisfies Record<InvestorUserType, OnboardingStep[]>;

export type StepKey = typeof ONBOARDING_CONFIG['individual' | 'corporate'][number]['key'];

export const isKnownOnboardingStep = (
    key: string,
    type: InvestorUserType
): key is StepKey => {
    return (ONBOARDING_CONFIG[type] as OnboardingStep[]).some(s => s.key === key);
}