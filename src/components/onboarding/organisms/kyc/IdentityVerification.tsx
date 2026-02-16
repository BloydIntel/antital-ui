"use client"

import React from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { DocumentUpload } from '@/components/onboarding/organisms/kyc/DocumentUpload'
import { SelfieUpload } from '@/components/onboarding/organisms/kyc/SelfieUpload'
import { IncomeVerification } from '@/components/onboarding/organisms/kyc/IncomeVerification'
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton'
import { useOnboardingStore } from '@/store/onboardingStore'
import { KYC_SUB_STEPS } from '@/components/onboarding/subSteps'

interface IdentityVerificationProps {
    onNext: () => void
}



export function IdentityVerification({ onNext }: IdentityVerificationProps) {

    const subStep = useOnboardingStore((s) => s.kycSubStep);
    const setSubStep = useOnboardingStore((s) => s.setKycSubStep);

    const nextSubStep = () => setSubStep(Math.min(subStep + 1, KYC_SUB_STEPS.length - 1))
    const prevSubStep = () => setSubStep(Math.max(subStep - 1, 0))

    const currentHeader = KYC_SUB_STEPS[subStep]

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

                    {subStep === 0 && (
                        <button className="text-[#0F3D2E] text-sm pl-42 lg:pl-0 font-semibold hover:underline">
                            Skip to complete KYC later
                        </button>
                    )}
                </div>

                <p className="text-[16px] text-[#2C2C2C] leading-tight max-w-[500px] font-[family-name:var(--font-dm-sans)] tracking-[-1%]">
                    {currentHeader.description}
                </p>
            </div>

            <div>
                {subStep === 0 && <DocumentUpload />}
                {subStep === 1 && <SelfieUpload />}
                {subStep === 2 && <IncomeVerification />}
            </div>

            <div className="flex max-w-[558px] items-center justify-between pt-8 pb-10 border-t border-gray-50">
                <OnboardingButton
                    label='Back'
                    variant="plain"
                    onClick={prevSubStep}
                    disabled={subStep === 0}
                    icon={<ArrowLeft size={20} />}
                    className="w-fit"
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
                    variant="solid"
                    onClick={subStep === 2 ? onNext : nextSubStep}
                    icon={<ArrowRight size={20} />}
                    className="flex-row-reverse w-fit"
                />
            </div>
        </div>
    )
}