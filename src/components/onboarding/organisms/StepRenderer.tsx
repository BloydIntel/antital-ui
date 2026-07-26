"use client"

import { useRouter } from "next/navigation"
import { StepKey, ONBOARDING_CONFIG, InvestorUserType } from "@/constants/steps"

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
import { CorporateCategorization } from "@/components/onboarding/organisms/corporate/corporate-categorization/CorporateCategorization"
import { InvestmentProfile } from "@/components/onboarding/organisms/corporate/InvestmentProfile"

// Fundraiser Components
import { UploadBusinessDocument } from "./fundraiser/UploadBusinessDocument"
import { PaymentApplicationFee } from "./fundraiser/payment-application-fee/PaymentApplicationFee"


interface StepRendererProps {
    step: StepKey;
    investorUserTypeFromUrl: InvestorUserType;
}

export default function StepRenderer({ step, investorUserTypeFromUrl }: StepRendererProps) {
    const router = useRouter()

    const steps = ONBOARDING_CONFIG[investorUserTypeFromUrl];
    const currentIndex = steps.findIndex(s => s.key === step);

    const navigateToNext = () => {
        if (currentIndex !== -1 && currentIndex < steps.length - 1) {
            const nextStepKey = steps[currentIndex + 1].key;
            router.push(`/onboarding/${investorUserTypeFromUrl}/${nextStepKey}`);
        }
    };

    // Skip the email step when going back — after verify, return to personal/company.
    const navigateToBack = () => {
        if (currentIndex <= 0) return;

        let targetIndex = currentIndex - 1;
        if (steps[targetIndex]?.key === "email" && targetIndex > 0) {
            targetIndex -= 1;
        }

        const prevStepKey = steps[targetIndex]?.key;
        if (prevStepKey) {
            router.push(`/onboarding/${investorUserTypeFromUrl}/${prevStepKey}`);
        }
    };

    switch (step) {
        case "personal":
            return <PersonalStep />;
        case "company":
            return <CompanyInformation />

        case "email":
            return <EmailStep onBack={navigateToBack} onNext={navigateToNext} />;

        case "company-documentation":
            return <UploadBusinessDocument onBack={navigateToBack} />;

        case "investor":
            return <InvestorStep onBack={navigateToBack} onNext={navigateToNext} />;
        case "categorization":
            return <CorporateCategorization onBack={navigateToBack} onNext={navigateToNext} />;

        case "profile":
            return <InvestmentProfile onBack={navigateToBack} onNext={navigateToNext} />;

        case "kyc":
        case "representative-kyc":
            return <IdentityVerification onBack={navigateToBack} onNext={navigateToNext} />;

        case "application-fee":
            return <PaymentApplicationFee />

        case "review":
            return <Review onBack={navigateToBack} onNext={navigateToNext} />;

        case "activation":
        case "application-submitted":
            return <AccountActivation />;

        default:
            return (
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                    <p className="text-gray-500">
                        Step &ldquo;{step}&ldquo; is under construction for {investorUserTypeFromUrl} flow.
                    </p>
                </div>
            );
    }
}
