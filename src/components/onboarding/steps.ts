import { BadgeCheck, Mail, User, FileUser, TableOfContents, Lightbulb, LucideIcon } from "lucide-react"

export type InvestorUserType = 'individual' | 'corporate' | 'fundraiser';

export interface OnboardingStep<K extends string = string> {
    readonly key: K;
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
} as const;

export type StepKey = (typeof ONBOARDING_CONFIG)[InvestorUserType][number]['key'];


export const isKnownOnboardingStep = (
    key: string,
    type: InvestorUserType
): key is StepKey => {
    const steps = ONBOARDING_CONFIG[type] as readonly OnboardingStep[];
    return steps.some(s => s.key === key);
}