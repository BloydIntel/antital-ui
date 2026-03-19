"use client"

import { useOnboardingStore } from '@/store/onboardingStore';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { CompanyDetails } from '@/components/onboarding/organisms/corporate/company-step/CompanyDetails';
import { CompanyAddress } from '@/components/onboarding/organisms/corporate/company-step/CompanyAddress';
import { AccountRepresentativeDetails } from '@/components/onboarding/organisms/corporate/company-step/AccountRepresentativeDetails';
import { COMPANY_SUB_STEPS, FUNDRAISER_COMPANY_SUB_STEPS } from '@/constants/subSteps';
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton';
import { CompanySubStepId, validateFullStep, validateSubStep } from '@/lib/onboardingValidation';

const corporateHeaderLabels = [
    { id: 'details', title: 'Corporate Investment Account', desc: 'Register your organization to invest in vetted Nigerian startups' },
    { id: 'address', title: 'Company Address' },
    { id: 'representative', title: 'Account Representative Details', desc: 'Person creating this account and representing the business' }
]

const fundraiserHeaderLabels = [
    { id: 'details', title: 'Fundraiser Registration', desc: 'Raise Capital for Your Business' },
    { id: 'address', title: 'Company Address', desc: 'Registered location of the organization' },
]

export function CompanyInformation() {
    const router = useRouter()
    const store = useOnboardingStore();
    const {
        investorUserType,
        companySubStep,
        setCompanySubStep,
        fundraiserCompanySubStep,
        setFundraiserCompanySubStep,
    } = store;

    const [showErrors, setShowErrors] = useState(false);

    const isFundraiser = investorUserType === 'fundraiser';
    const STEPS_TO_USE = isFundraiser ? FUNDRAISER_COMPANY_SUB_STEPS : COMPANY_SUB_STEPS;

    const subStep = isFundraiser ? fundraiserCompanySubStep : companySubStep;
    const setSubStep = isFundraiser ? setFundraiserCompanySubStep : setCompanySubStep;

    const isLastSubStep = subStep === STEPS_TO_USE.length - 1;
    const currentStep = STEPS_TO_USE[subStep];

    const canProceedCurrent = validateSubStep(currentStep.id as CompanySubStepId, store);

    const nextSubStep = () => {
        // 1. Always validate the current view first
        if (!canProceedCurrent) {
            setShowErrors(true);
            return; // Stay here and show the red borders
        }

        if (isLastSubStep) {
            const isFullyValid = validateFullStep(isFundraiser ? 'fundraiser' : 'corporate', store);

            if (!isFullyValid) {

                const firstInvalidIndex = STEPS_TO_USE.findIndex(
                    (step) => !validateSubStep(step.id as CompanySubStepId, store)
                );

                setShowErrors(true);
                setSubStep(firstInvalidIndex !== -1 ? firstInvalidIndex : 0);
                return;
            }

            router.push(`/onboarding/${investorUserType}/email`);
            return;
        }

        setShowErrors(false);
        setSubStep(subStep + 1);
    };

    const backSubstep = () => {
        if (subStep > 0) {
            setShowErrors(false);
            setSubStep(subStep - 1);
        }
    };

    const headerLabels = isFundraiser ? fundraiserHeaderLabels : corporateHeaderLabels
    const currentHeader = headerLabels[subStep]

    const renderStepContent = () => {
        switch (currentStep?.id) {
            case 'details':
                return <CompanyDetails showErrors={showErrors} title={currentHeader.title} desc={currentHeader.desc || ''} />;
            case 'address':
                return <CompanyAddress showErrors={showErrors} title={currentHeader.title} desc={currentHeader.desc} />;
            case 'representative':
                return <AccountRepresentativeDetails showErrors={showErrors} />;
            default:
                return null;
        }
    }

    return (
        <div className="w-full lg:w-[558px] flex flex-col gap-4">

            <div className="min-h-[300px]">
                {renderStepContent()}
            </div>

            <div className="flex items-center justify-between pt-8 pb-10">
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
                    onClick={nextSubStep}
                    className="w-[230px]"
                />
            </div>



        </div>
    )
}