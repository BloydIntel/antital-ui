"use client"

import React, { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { DocumentUpload } from '@/components/onboarding/organisms/kyc/DocumentUpload'
import { SelfieUpload } from '@/components/onboarding/organisms/kyc/SelfieUpload'
import { IncomeVerification } from '@/components/onboarding/organisms/kyc/IncomeVerification'
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton'
import { useOnboardingStore } from '@/store/onboardingStore'
import { CORPORATE_CATEGORY_STEPS, CORPORATE_BASE_KYC, INDIVIDUAL_KYC_SUB_STEPS } from '@/components/onboarding/subSteps'
import { OtherCorporateInvestor } from '@/components/onboarding/organisms/corporate/OtherCorporateInvestor'

interface IdentityVerificationProps {
    onNext: () => void
    onBack: () => void
}

export function IdentityVerification({ onNext, onBack }: IdentityVerificationProps) {

    const userType = useOnboardingStore((s) => s.investorUserType);
    const subStep = useOnboardingStore((s) => s.kycSubStep);
    const setSubStep = useOnboardingStore((s) => s.setKycSubStep);
    const kycData = useOnboardingStore((s) => s.formData.kycData);
    const categoryId = useOnboardingStore((s) => s.formData.selectedCategoryId);
    const [showErrors, setShowErrors] = useState(false);

    const isCorporate = userType === 'corporate';

    const currentSteps = useMemo(() => {
        if (!isCorporate) return INDIVIDUAL_KYC_SUB_STEPS;
        const steps = [...CORPORATE_BASE_KYC];
        if (categoryId && CORPORATE_CATEGORY_STEPS[categoryId]) {
            steps.push(CORPORATE_CATEGORY_STEPS[categoryId]);
        }
        return steps;
    }, [isCorporate, categoryId]);

    const currentHeader = currentSteps[subStep];

    const isStep0Valid = kycData.idNumber && kycData.idFile && kycData.bvn && kycData.address && kycData.addressFile;
    const isStep1Valid = !!kycData.selfie;
    const isStep2Valid = useMemo(() => {
        if (isCorporate) {
            if (categoryId === "qii") {
                return !!(kycData.statusReport && kycData.qiiLicense && kycData.boardResolution);
            }
            return !!(kycData.incorporationCertificate && kycData.statusReport && kycData.boardResolution);
        }
        return kycData.incomeDocuments.length > 0 && !!kycData.incomeFile;
    }, [isCorporate, categoryId, kycData]);

    const isAllKycValid = isStep0Valid && isStep1Valid && isStep2Valid;

    const handleNext = () => {
        if (subStep < 2) {
            setSubStep(subStep + 1);
        } else {
            if (isAllKycValid) onNext();
            else setShowErrors(true);
        }
    };

    const handleBack = () => {
        if (subStep > 0) {
            setSubStep(subStep - 1)
        } else {
            onBack()
        }
    }

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
                {currentHeader?.id === 'docs' && <DocumentUpload showErrors={showErrors} />}
                {currentHeader?.id === 'selfie' && <SelfieUpload showErrors={showErrors} />}

                {currentHeader?.id === 'income' && <IncomeVerification showErrors={showErrors} />}
                {(currentHeader?.id === 'qii' || currentHeader?.id === 'oci') && (
                    <OtherCorporateInvestor showErrors={showErrors} />
                )}
            </div>

            {!isAllKycValid && showErrors && (
                <p className="text-red-500 text-sm text-center">Please complete all required fields in all sections.</p>
            )}

            <div className="flex max-w-[558px] items-center justify-between pb-10 border-t border-gray-50">
                <OnboardingButton
                    label='Back'
                    variant="plain"
                    onClick={handleBack}
                    icon={<ArrowLeft size={20} />}
                    className='w-fit'
                />

                <div className="flex gap-2">
                    {INDIVIDUAL_KYC_SUB_STEPS.map((_, i) => (
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