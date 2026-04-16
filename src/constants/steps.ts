import { BadgeCheck, Mail, User, FileUser, TableOfContents, Lightbulb, LucideIcon, BadgeDollarSign } from "lucide-react"

export type InvestorUserType = 'individual' | 'corporate' | 'fundraiser';

export interface OnboardingStep<K extends string = string> {
    readonly key: K;
    readonly label: string;
    readonly icon: LucideIcon;
    readonly hasSubsteps?: boolean;
}

export function isInvestorUserType(s: string): s is InvestorUserType {
    return ['individual', 'corporate', 'fundraiser'].includes(s);
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
        { key: "company", label: "Company Information", icon: User, hasSubsteps: true },
        { key: "email", label: "Email Verification", icon: Mail },
        { key: "company-documentation", label: "Upload Business Documents", icon: FileUser },
        { key: "representative-kyc", label: "Account Representative KYC", icon: FileUser, hasSubsteps: true },
        { key: "application-fee", label: "Payment of Application Fee", icon: BadgeDollarSign },
        { key: "review", label: "Application Review", icon: TableOfContents },
        { key: "application-submitted", label: "Application Submitted", icon: FileUser },
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

export const ALLOWED_STEP_BEFORE_VERIFICATION = ["personal", "company", "email"];



export type OnboardingStatus = 'IN_PROGRESS' | 'PENDING_REVIEW' | 'ACTIVE' | 'REJECTED';

export interface AppUser {
    id: string;
    type: InvestorUserType;
    currentStep: StepKey;
    onboardingStatus: OnboardingStatus;
    // Data collected from steps
    profile?: {
        firstName: string;
        lastName: string;
        isVerified: boolean;
    };
}