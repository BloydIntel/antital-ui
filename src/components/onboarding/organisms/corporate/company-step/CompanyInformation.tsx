"use client"

import { useOnboardingStore } from '@/store/onboardingStore';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { CompanyDetails } from '@/components/onboarding/organisms/corporate/company-step/CompanyDetails';
import { CompanyAddress } from '@/components/onboarding/organisms/corporate/company-step/CompanyAddress';
import { AccountRepresentativeDetails } from '@/components/onboarding/organisms/corporate/company-step/AccountRepresentativeDetails';
import { COMPANY_SUB_STEPS } from '@/components/onboarding/subSteps';
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton';

export function CompanyInformation() {
    const router = useRouter()

    const subStep = useOnboardingStore((s) => s.companySubStep);
    const setSubStep = useOnboardingStore((s) => s.setCompanySubStep);
    const investorUserType = useOnboardingStore((s) => s.investorUserType)

    const [isStepValid, setIsStepValid] = useState(false);

    const isLastSubStep = subStep === COMPANY_SUB_STEPS.length - 1
    const currentStep = COMPANY_SUB_STEPS[subStep]

    const nextSubStep = () => {
        if (!isStepValid) return;

        if (isLastSubStep) {
            const safeType = investorUserType || 'corporate';
            router.push(`/onboarding/${safeType}/email`)
        } else {
            setSubStep(subStep + 1)
            setIsStepValid(false)
        }
    }

    const renderStepContent = () => {
        switch (currentStep?.id) {
            case 'details':
                return <CompanyDetails onValidationChange={setIsStepValid} />;
            case 'address':
                return <CompanyAddress onValidationChange={setIsStepValid} />;
            case 'representative':
                return <AccountRepresentativeDetails onValidationChange={setIsStepValid} />;
            default:
                return null;
        }
    }

    return (
        <div className="w-full lg:w-[558px] flex flex-col gap-4">

            <div className="min-h-[300px]">
                {renderStepContent()}
            </div>

            <OnboardingButton
                label="Proceed"
                variant="solid"
                disabled={!isStepValid}
                onClick={nextSubStep}
            />

        </div>
    )
}