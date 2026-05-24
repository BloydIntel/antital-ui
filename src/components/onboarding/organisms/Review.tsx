"use client"

import React, { useState } from 'react'
import { Info } from "lucide-react"
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton'
import { useOnboardingStore } from '@/store/onboardingStore'
import { IndividualInvestorReview } from '@/components/onboarding/organisms/individual/IndividualInvestorReview'
import { CorporateInvestorReview } from '@/components/onboarding/organisms/corporate/CorporateInvestorReview'
import { FundraiserReview } from '@/components/onboarding/organisms/fundraiser/FundraiserReview'
import onboardingService from '@/services/onboardingService'
import { showApiErrorToast } from '@/lib/error-feedback'
import { toast } from 'sonner'

export function Review({ onBack, onNext }: { onBack: () => void, onNext: () => void }) {
    const { investorUserType, formData } = useOnboardingStore();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isFundraiserPaymentIncomplete = investorUserType === "fundraiser" && !formData.applicationFeePaid;

    const ReviewComponents = {
        individual: <IndividualInvestorReview />,
        corporate: <CorporateInvestorReview />,
        fundraiser: <FundraiserReview />
    };

    const handleSubmit = async () => {
        if (investorUserType === "fundraiser" && !formData.applicationFeePaid) {
            toast.error("Complete application fee payment before submitting.");
            return;
        }

        setIsSubmitting(true);
        try {
            if (investorUserType === "fundraiser" && formData.applicationFeePaid) {
                await onboardingService.saveFundraiserPayment({
                    paymentMethod: formData.paymentMethod ?? "card",
                    paymentReference: formData.paymentReference ?? `FR-${Date.now()}`,
                    paymentStatus: formData.paymentStatus === "failed" ? "failed" : "success",
                    applicationFeePaid: true,
                });
            }
            await onboardingService.submitOnboarding();
            onNext();
        } catch (error) {
            showApiErrorToast(error, "Unable to submit onboarding.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full lg:w-[558px] flex flex-col gap-5">
            <div>
                <h2 className="text-[28px] text-[#1B1B1B] leading-tight font-medium font-[family-name:var(--font-rethink-sans)] tracking-[-1%]">
                    Review & Submit
                </h2>
                <p className="text-[18px] text-[#505050] leading-tight mt-1 font-[family-name:var(--font-dm-sans)] tracking-[-1%]">
                    Double check all information before submitting
                </p>
            </div>

            {/* Dynamic Content Switching */}
            {investorUserType && ReviewComponents[investorUserType]}

            {/* Shared Info Box */}
            <div className="flex flex-row bg-[#EDF4FC] border border-[#C7DDF6] rounded-lg p-4 font-[family-name:var(--font-dm-sans)]">
                <Info className="h-5 w-5 text-[#3B73B5] shrink-0 mt-0.5" />
                <div className="ml-3">
                    <p className="text-[14px] font-medium text-[#3B73B5] mb-1">Final Submission Notice</p>
                    {investorUserType === "fundraiser" ?
                        (
                            <p className="text-[12px] text-[#3B73B5] leading-relaxed">
                                By submitting this application, you authorize Antital to verify all provided information and conduct background checks on directors and key shareholders.
                            </p>
                        ) : (
                            <p className="text-[12px] text-[#3B73B5] leading-relaxed">
                                By submitting this application, you authorize Antital to verify all provided information and conduct background checks.
                            </p>
                        )}
                </div>
            </div>

            <div className="flex items-center justify-between pt-8 pb-10">
                <OnboardingButton
                    label='Back'
                    variant="plain"
                    onClick={onBack}
                    className="w-[115px]"
                    disabled={isSubmitting}
                />
                <OnboardingButton
                    label={isSubmitting ? "Submitting…" : "Submit"}
                    variant="solid"
                    onClick={handleSubmit}
                    className="w-[230px]"
                    loading={isSubmitting}
                    disabled={isSubmitting || isFundraiserPaymentIncomplete}
                />
            </div>
        </div>
    )
}
