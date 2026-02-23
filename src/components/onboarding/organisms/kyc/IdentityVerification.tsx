"use client"

import React, { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { DocumentUpload } from '@/components/onboarding/organisms/kyc/DocumentUpload'
import { SelfieUpload } from '@/components/onboarding/organisms/kyc/SelfieUpload'
import { IncomeVerification } from '@/components/onboarding/organisms/kyc/IncomeVerification'
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton'
import { useOnboardingStore } from '@/store/onboardingStore'
import { CORPORATE_KYC_HEADERS, KYC_SUB_STEPS } from '@/components/onboarding/subSteps'
import { OtherCorporateInvestor } from '@/components/onboarding/organisms/corporate/OtherCorporateInvestor'

interface IdentityVerificationProps {
    onNext: () => void
}

export function IdentityVerification({ onNext }: IdentityVerificationProps) {

    // Get user type and sub-steps from store
    const userType = useOnboardingStore((s) => s.investorUserType);
    const subStep = useOnboardingStore((s) => s.kycSubStep);
    const setSubStep = useOnboardingStore((s) => s.setKycSubStep);
    const kycData = useOnboardingStore((s) => s.formData.kycData);
    const [showErrors, setShowErrors] = useState(false);

    // 1. Determine which Header to show
    const isCorporate = userType === 'corporate';
    const currentHeader = isCorporate
        ? CORPORATE_KYC_HEADERS[subStep]
        : KYC_SUB_STEPS[subStep];

    // 2. Validation (Step 2 logic might change for Corporate)
    const isStep0Valid = kycData.idNumber && kycData.idFile && kycData.bvn && kycData.address && kycData.addressFile;
    const isStep1Valid = !!kycData.selfie;

    // Add logic here for the Corporate 3rd page validation if different
    const isStep2Valid = isCorporate
        ? true // Replace with specific Corporate OCI validation
        : (kycData.incomeDocuments.length > 0 && kycData.incomeFile);

    const isAllKycValid = isStep0Valid && isStep1Valid && isStep2Valid;

    const handleNext = () => {
        if (subStep < 2) {
            setSubStep(subStep + 1);
        } else {
            if (isAllKycValid) onNext();
            else setShowErrors(true);
        }
    };

    return (
        <div className="w-full lg:w-[558px] flex flex-col gap-10">
            <div className="flex flex-col gap-2">
                <div className="flex flex-col-reverse lg:flex-row justify-between items-start">
                    <h2 className="text-[28px] text-[#1B1B1B] leading-tight font-[family-name:var(--font-rethink-sans)] font-medium tracking-[-1%]">
                        {currentHeader.title}
                        {currentHeader.span && (
                            <span className="text-[14px] text-[#858585] ml-2 font-normal">
                                {currentHeader.span}
                            </span>
                        )}
                    </h2>

                    {(subStep === 0 || subStep === 2) && (
                        <button
                            className="text-[#0F3D2E] text-sm pl-42 lg:pl-0 font-semibold hover:underline"
                            onClick={() => onNext()}
                        >
                            Skip to complete KYC later
                        </button>
                    )}
                </div>

                <p className="text-[16px] text-[#2C2C2C] leading-tight max-w-[500px] font-[family-name:var(--font-dm-sans)] tracking-[-1%]">
                    {currentHeader.description}
                </p>
            </div>

            <div>
                {/* Steps 0 and 1 are shared */}
                {subStep === 0 && <DocumentUpload showErrors={showErrors} />}
                {subStep === 1 && <SelfieUpload showErrors={showErrors} />}

                {/* Step 2 switches components based on userType */}
                {subStep === 2 && (
                    isCorporate
                        ? <OtherCorporateInvestor showErrors={showErrors} />
                        : <IncomeVerification showErrors={showErrors} />
                )}
            </div>

            {!isAllKycValid && showErrors && (
                <p className="text-red-500 text-sm text-center">Please complete all required fields in all sections.</p>
            )}

            <div className="flex max-w-[558px] items-center justify-between pb-10 border-t border-gray-50">
                <OnboardingButton
                    label='Back'
                    variant="plain"
                    onClick={() => setSubStep(subStep - 1)}
                    disabled={subStep === 0}
                    icon={<ArrowLeft size={20} />}
                    className='w-fit'
                />

                <div className="flex gap-2">
                    {KYC_SUB_STEPS.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-300 ${i === subStep ? 'w-8 bg-[#042E27]' : 'w-2 bg-[#E6EEDC]'}`}
                        />
                    ))}
                </div>

                <OnboardingButton
                    label="Next"
                    onClick={handleNext}
                    icon={<ArrowRight size={20} />}
                    className="flex-row-reverse w-fit"
                />

            </div>
        </div>
    )
}