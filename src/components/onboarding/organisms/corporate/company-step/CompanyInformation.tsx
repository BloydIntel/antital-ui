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
import authService from '@/services/authService';
import { tokenStorage } from '@/lib/token-storage';
import { showApiErrorToast } from '@/lib/error-feedback';

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
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isFundraiser = investorUserType === 'fundraiser';
    const STEPS_TO_USE = isFundraiser ? FUNDRAISER_COMPANY_SUB_STEPS : COMPANY_SUB_STEPS;

    const subStep = isFundraiser ? fundraiserCompanySubStep : companySubStep;
    const setSubStep = isFundraiser ? setFundraiserCompanySubStep : setCompanySubStep;

    const isLastSubStep = subStep === STEPS_TO_USE.length - 1;
    const currentStep = STEPS_TO_USE[subStep];

    const canProceedCurrent = validateSubStep(currentStep.id as CompanySubStepId, store);

    const nextSubStep = async () => {
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

            if (isFundraiser) {
                setIsSubmitting(true);
                try {
                    const [companyFirstName = "Fundraiser", ...companyRest] =
                        (store.formData.companyName || "").trim().split(/\s+/);
                    const companyLastName = companyRest.join(" ").trim() || store.formData.brandName || "Business";

                    const data = await authService.signup({
                        firstName: companyFirstName,
                        lastName: companyLastName,
                        email: store.formData.loginEmail,
                        userType: "Fundraiser",
                        preferredName: store.formData.brandName || undefined,
                        phoneNumber: store.formData.companyPhone || "+2340000000000",
                        dateOfBirth: "1990-01-01",
                        nationality: "Nigerian",
                        countryOfResidence: "Nigeria",
                        stateOfResidence: "Lagos",
                        residentialAddress: store.formData.businessAddress,
                        password: store.formData.password,
                        confirmPassword: store.formData.confirmPassword,
                        hasAgreedToTerms: true,
                        companyLegalName: store.formData.companyName,
                        tradingBrandName: store.formData.brandName || undefined,
                        registrationType: store.formData.registrationType,
                        registrationNumber: store.formData.registrationNumber,
                        companyLoginEmail: store.formData.loginEmail,
                        dateOfRegistration: store.formData.registrationDate || undefined,
                        companyWebsite: store.formData.companyWebsite || undefined,
                        businessAddress: store.formData.businessAddress || undefined,
                        registeredAddress: store.formData.registeredAddress || undefined,
                        companyEmail: store.formData.companyEmail || undefined,
                        companyPhone: store.formData.companyPhone || undefined,
                    });

                    tokenStorage.setAccessToken(data.token);
                    if (data.refreshToken) {
                        tokenStorage.setRefreshToken(data.refreshToken);
                    }
                    store.setEmailVerified(data.isEmailVerified);
                    router.push(`/onboarding/${investorUserType}/email`);
                } catch (error) {
                    showApiErrorToast(error, "Unable to create fundraiser account.");
                    setShowErrors(true);
                } finally {
                    setIsSubmitting(false);
                }
                return;
            }

            setIsSubmitting(true);
            try {
                const [firstName, ...lastNameParts] = (store.formData.repFullName || "").trim().split(/\s+/);
                const lastName = lastNameParts.join(" ").trim();

                const data = await authService.signup({
                    firstName: firstName || store.formData.companyName || "Corporate",
                    lastName: lastName || store.formData.brandName || "Investor",
                    email: store.formData.loginEmail,
                    userType: "CorporateInvestor",
                    preferredName: store.formData.brandName || undefined,
                    phoneNumber: store.formData.repPhoneNumber,
                    dateOfBirth: store.formData.repDob,
                    nationality: store.formData.repNationality,
                    countryOfResidence: store.formData.repResidence,
                    stateOfResidence: store.formData.repResidence,
                    residentialAddress: store.formData.repAddress,
                    password: store.formData.password,
                    confirmPassword: store.formData.confirmPassword,
                    hasAgreedToTerms: true,
                    companyLegalName: store.formData.companyName,
                    tradingBrandName: store.formData.brandName,
                    registrationType: store.formData.registrationType,
                    registrationNumber: store.formData.registrationNumber,
                    companyLoginEmail: store.formData.loginEmail,
                    dateOfRegistration: store.formData.registrationDate || undefined,
                    companyWebsite: store.formData.companyWebsite || undefined,
                    businessAddress: store.formData.businessAddress || undefined,
                    registeredAddress: store.formData.registeredAddress || undefined,
                    companyEmail: store.formData.companyEmail || undefined,
                    companyPhone: store.formData.companyPhone || undefined,
                    representativeFullName: store.formData.repFullName || undefined,
                    representativeJobTitle: store.formData.repJobTitle || undefined,
                    representativePhoneNumber: store.formData.repPhoneNumber || undefined,
                    representativeDateOfBirth: store.formData.repDob || undefined,
                    representativeEmail: store.formData.repEmail || undefined,
                    representativeNationality: store.formData.repNationality || undefined,
                    representativeCountryOfResidence: store.formData.repResidence || undefined,
                    representativeAddress: store.formData.repAddress || undefined,
                });

                tokenStorage.setAccessToken(data.token);
                if (data.refreshToken) {
                    tokenStorage.setRefreshToken(data.refreshToken);
                }
                store.setEmailVerified(data.isEmailVerified);

                router.push(`/onboarding/${investorUserType}/email`);
            } catch (error) {
                showApiErrorToast(error, "Unable to create corporate account.");
            } finally {
                setIsSubmitting(false);
            }
            return;
        }

        if (isFundraiser) {
            setShowErrors(false);
            setSubStep(subStep + 1);
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
                    label={
                        isLastSubStep
                            ? isSubmitting
                                ? "Creating account…"
                                : "Create Account"
                            : isSubmitting
                                ? "Saving…"
                                : "Proceed"
                    }
                    variant="solid"
                    onClick={nextSubStep}
                    loading={isSubmitting}
                    className="w-[230px]"
                />
            </div>



        </div>
    )
}
