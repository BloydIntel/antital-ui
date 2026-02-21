"use client"

import { useRouter } from "next/navigation"
import { StepKey, ONBOARDING_CONFIG, InvestorUserType } from "@/components/onboarding/steps"

// Individual Components
import { PersonalStep } from "@/components/onboarding/organisms/individual/personal-step/PersonalStep"
import { InvestorStep } from "@/components/onboarding/organisms/individual/investor-step/InvestorStep"

// Shared Components
import { EmailStep } from "@/components/onboarding/organisms/EmailStep"
import { IdentityVerification } from "@/components/onboarding/organisms/kyc/IdentityVerification"
import { Review } from "@/components/onboarding/organisms/Review"
import { AccountActivation } from "@/components/onboarding/organisms/AccountActivation"

// Corporate Components
import { CompanyInformation } from "@/components/onboarding/organisms/corporate/company-step/CompanyInformation"
import { CorporateCategorization } from "@/components/onboarding/organisms/corporate/CorporateCategorization"


interface StepRendererProps {
    step: StepKey;
    investorUserTypeFromUrl: InvestorUserType;
}

export default function StepRenderer({ step, investorUserTypeFromUrl }: StepRendererProps) {
    const router = useRouter()

    const navigateToNext = () => {
        const steps = ONBOARDING_CONFIG[investorUserTypeFromUrl];
        const currentIndex = steps.findIndex(s => s.key === step);

        if (currentIndex !== -1 && currentIndex < steps.length - 1) {
            const nextStepKey = steps[currentIndex + 1].key;
            router.push(`/onboarding/${investorUserTypeFromUrl}/${nextStepKey}`);
        }
    }

    const navigateToBack = () => {
        const steps = ONBOARDING_CONFIG[investorUserTypeFromUrl];
        const currentIndex = steps.findIndex(s => s.key === step);

        if (currentIndex > 0) {
            const prevStepKey = steps[currentIndex - 1].key;
            router.push(`/onboarding/${investorUserTypeFromUrl}/${prevStepKey}`);
        }
    }

    switch (step) {
        case "personal":
            return <PersonalStep />;
        case "company":
            return <CompanyInformation />

        case "email":
            return <EmailStep onNext={navigateToNext} />;

        case "investor":
            return <InvestorStep onNext={navigateToNext} />;
        case "categorization":
            return <CorporateCategorization />;

        case "kyc":
            return <IdentityVerification onNext={navigateToNext} />;

        case "review":
            return <Review onBack={navigateToBack} onNext={navigateToNext} />;

        case "activation":
            return <AccountActivation />;

        default:
            return (
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                    <p className="text-gray-500">
                        Step &ldquo{step}&ldquo is under construction for {investorUserTypeFromUrl} flow.
                    </p>
                </div>
            );
    }
}