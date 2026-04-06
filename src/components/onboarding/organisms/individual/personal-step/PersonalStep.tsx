"use client"

import React, { useState } from 'react'
import { PersonalDetailsForm } from "@/components/onboarding/organisms/individual/personal-step/PersonalDetailsForm";
import { LocationForm } from "@/components/onboarding/organisms/individual/personal-step/LocationForm";
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton'
import { useRouter } from "next/navigation";
import { useOnboardingStore } from '@/store/onboardingStore';
import { PERSONAL_SUB_STEPS } from '@/constants/subSteps';
import { TYPOGRAPHY } from '@/constants/styles';
import { PersonalSubStepId, validatePersonalStep } from '@/lib/onboardingValidation';
import authService from '@/services/authService';
import { tokenStorage } from '@/lib/token-storage';
import { showApiErrorToast } from '@/lib/error-feedback';

export function PersonalStep() {
    const { personalSubStep: subStep, setPersonalSubStep: setSubStep, formData, setEmailVerified } = useOnboardingStore();
    const [showErrors, setShowErrors] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter()

    const stepContent: Record<string, React.ReactNode> = {
        details: <PersonalDetailsForm showErrors={showErrors} levelLabel='Personal Details' />,
        location: <LocationForm showErrors={showErrors} levelLabel='Location Information' />,
    }

    const currentStep = PERSONAL_SUB_STEPS[subStep]
    const isLastSubStep = subStep === PERSONAL_SUB_STEPS.length - 1

    const canProceed = validatePersonalStep(currentStep.id as PersonalSubStepId, formData);

    const handleNext = async () => {
        if (!canProceed) {
            setShowErrors(true);
            return;
        }

        setShowErrors(false);
        if (isLastSubStep) {
            setIsSubmitting(true);

            try {
                const data = await authService.signup({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    preferredName: formData.alias || undefined,
                    phoneNumber: formData.phone,
                    dateOfBirth: formData.dob,
                    nationality: formData.nationality,
                    countryOfResidence: formData.residence,
                    stateOfResidence: formData.state,
                    residentialAddress: formData.address,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,
                    hasAgreedToTerms: formData.agreed,
                });

                tokenStorage.setAccessToken(data.token);
                if (data.refreshToken) {
                    tokenStorage.setRefreshToken(data.refreshToken);
                }
                setEmailVerified(data.isEmailVerified);

                router.push('/onboarding/individual/email');
            } catch (error) {
                showApiErrorToast(error, "Unable to create account.");
            } finally {
                setIsSubmitting(false);
            }
        } else {
            setSubStep(subStep + 1);
        }
    };

    return (
        <div className="w-full lg:w-[558px] flex flex-col gap-4">

            {/* Dynamic Content Area */}
            <div className="min-h-[300px]">
                <div>
                    <h2 className="text-[36px] text-[#1B1B1B] leading-tight" style={TYPOGRAPHY.heading}>
                        Start Your Investment Journey
                    </h2>
                    <p className="text-[16px] text-[#2C2C2C] leading-tight" style={TYPOGRAPHY.body}>
                        Join Nigerians building wealth through startup investing
                    </p>
                </div>
                {currentStep && stepContent[currentStep.id]}
            </div>

            <OnboardingButton
                label={subStep === 0 ? "Proceed" : "Create Account"}
                variant="solid"
                onClick={handleNext}
                disabled={isSubmitting}
            />
        </div>
    )
}