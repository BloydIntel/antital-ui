import { useOnboardingStore } from '@/store/onboardingStore';
import { useRouter } from 'next/navigation';
import React from 'react'
import { CompanyDetails } from '@/components/onboarding/organisms/corporate/company-step/CompanyDetails';
import { CompanyAddress } from '@/components/onboarding/organisms/corporate/company-step/CompanyAddress';
import { AccountRepresentativeDetails } from '@/components/onboarding/organisms/corporate/company-step/AccountRepresentativeDetails';
import { COMPANY_SUB_STEPS } from '@/components/onboarding/subSteps';
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton';

export function CompanyInformation() {

    const router = useRouter()

    const subStep = useOnboardingStore((s) => s.personalSubStep);
    const setSubStep = useOnboardingStore((s) => s.setPersonalSubStep);
    const investorUserType = useOnboardingStore((s) => s.investorUserType)

    const isLastSubStep = subStep === COMPANY_SUB_STEPS.length - 1
    const currentStep = COMPANY_SUB_STEPS[subStep]

    const nextSubStep = () => {
        if (isLastSubStep) {
            router.push(`/onboarding/${investorUserType}/email`)
        } else {
            setSubStep(subStep + 1)
        }
    }


    const stepContent: Record<string, React.ReactNode> = {
        details: <CompanyDetails onNext={nextSubStep} />,
        address: <CompanyAddress onNext={nextSubStep} />,
        representative: <AccountRepresentativeDetails onNext={nextSubStep} />,
    }

    return (
        <div className="w-full lg:w-[558px] flex flex-col gap-4">

            {/* Dynamic Content Area */}
            <div className="min-h-[300px]">
                {currentStep && stepContent[currentStep.id]}
            </div>

            <OnboardingButton
                label="Proceed"
                variant="solid"
                onClick={nextSubStep}
            />
        </div>
    )
}
