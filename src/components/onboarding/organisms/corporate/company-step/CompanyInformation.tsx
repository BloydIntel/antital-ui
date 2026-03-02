"use client"

import { useOnboardingStore } from '@/store/onboardingStore';
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react'
import { CompanyDetails } from '@/components/onboarding/organisms/corporate/company-step/CompanyDetails';
import { CompanyAddress } from '@/components/onboarding/organisms/corporate/company-step/CompanyAddress';
import { AccountRepresentativeDetails } from '@/components/onboarding/organisms/corporate/company-step/AccountRepresentativeDetails';
import { COMPANY_SUB_STEPS } from '@/components/onboarding/subSteps';
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton';
import { validateStep } from '@/lib/onboardingValidation';

export function CompanyInformation() {
    const router = useRouter()

    const subStep = useOnboardingStore((s) => s.companySubStep);
    const setSubStep = useOnboardingStore((s) => s.setCompanySubStep);
    const investorUserType = useOnboardingStore((s) => s.investorUserType)

    const [isStepValid, setIsStepValid] = useState(false);

    const isLastSubStep = subStep === COMPANY_SUB_STEPS.length - 1
    const currentStep = COMPANY_SUB_STEPS[subStep]

    const isGlobalStepValid = useMemo(() => {
        if (isLastSubStep) {
            const state = useOnboardingStore.getState();
            return validateStep("company", state);
        }
        return isStepValid;
    }, [isStepValid, isLastSubStep]);

    const nextSubStep = () => {
        if (!isGlobalStepValid) return;

        if (isLastSubStep) {
            const safeType = investorUserType || 'corporate';
            router.push(`/onboarding/${safeType}/email`)
        } else {
            setSubStep(subStep + 1)
            setIsStepValid(false)
        }
    }

    const backSubstep = () => {
        if (subStep > 0) {
            setSubStep(subStep - 1);
            setIsStepValid(true);
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

            <div className="flex items-center justify-between pt-8 pb-10 border-t border-[#EAEAEA]">
                <OnboardingButton
                    label='Back'
                    variant="plain"
                    disabled={subStep === 0}
                    onClick={backSubstep}
                    className="w-[115px]"
                />

                <OnboardingButton
                    label={isLastSubStep ? "Create Account" : "Proceed"}
                    variant="solid"
                    disabled={isLastSubStep ? !isGlobalStepValid : !isStepValid}
                    onClick={nextSubStep}
                    className="w-[230px]"
                />
            </div>



        </div>
    )
}