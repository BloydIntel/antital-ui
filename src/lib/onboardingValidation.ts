import { StepKey } from "@/constants/steps";
import { OnboardingFormData, OnboardingState } from "@/store/onboardingStore";
import { hasOnboardingDocument } from "@/lib/onboarding-file-upload";

export function validateStep(step: StepKey, state: OnboardingState): boolean {
    const { formData, investorUserType, emailVerified } = state;
    const { kycData } = formData;

    switch (step) {
        case "personal":
            return !!(
                formData.firstName &&
                formData.lastName &&
                formData.phone &&
                formData.nationality &&
                formData.residence
            );

        case "company":
            const baseCompany = !!(
                formData.companyName &&
                formData.registrationNumber &&
                formData.companyEmail &&
                formData.registrationDate &&
                formData.businessAddress &&
                formData.registeredAddress &&
                formData.companyPhone
            );

            // Fundraisers don't have the "Representative" sub-step
            if (investorUserType === 'fundraiser') {
                return baseCompany;
            }
            // Corporate needs Representative details
            return baseCompany && !!(
                formData.repFullName &&
                formData.repEmail &&
                formData.repJobTitle &&
                formData.repPhoneNumber &&
                formData.repDob &&
                formData.repNationality &&
                formData.repResidence &&
                formData.repAddress
            );

        case "email":
            return emailVerified;

        case "company-documentation":
            // Check if essential fundraiser documents are uploaded (Cloudinary PathOrKey or File)
            return !!(
                hasOnboardingDocument(
                    formData.fundraisingDeck,
                    formData.fundraisingDeckPathOrKey
                ) &&
                hasOnboardingDocument(
                    formData.founderAndTeamIntroduction,
                    formData.founderAndTeamIntroductionPathOrKey
                ) &&
                hasOnboardingDocument(
                    formData.investmentMemo,
                    formData.investmentMemoPathOrKey
                ) &&
                hasOnboardingDocument(
                    formData.termsOfOffering,
                    formData.termsOfOfferingPathOrKey
                ) &&
                formData.businessDescription &&
                formData.businessSector &&
                formData.instrumentType &&
                formData.businessSize &&
                formData.fundingTarget &&
                formData.investmentRound
            );

        case "investor":
        case "categorization":
            return !!formData.selectedCategoryId;

        case "profile":
            return Object.keys(formData.questionnaireAnswers).length > 4;

        case "kyc":
        case "representative-kyc":
            const baseKyc = !!(
                kycData.idNumber &&
                kycData.idType &&
                hasOnboardingDocument(kycData.idFile, kycData.idFilePathOrKey) &&
                kycData.bvn &&
                kycData.address &&
                hasOnboardingDocument(kycData.addressFile, kycData.addressFilePathOrKey)
            );

            if (investorUserType === 'corporate') {
                const isQII = formData.selectedCategoryId === "qii";
                return isQII
                    ? baseKyc &&
                      !!(
                          hasOnboardingDocument(kycData.qiiLicense, kycData.qiiLicensePathOrKey) &&
                          hasOnboardingDocument(kycData.statusReport, kycData.statusReportPathOrKey) &&
                          hasOnboardingDocument(
                              kycData.boardResolution,
                              kycData.boardResolutionPathOrKey
                          ) &&
                          hasOnboardingDocument(kycData.selfie, kycData.selfiePathOrKey)
                      )
                    : baseKyc &&
                      !!(
                          hasOnboardingDocument(
                              kycData.incorporationCertificate,
                              kycData.incorporationCertificatePathOrKey
                          ) &&
                          hasOnboardingDocument(kycData.statusReport, kycData.statusReportPathOrKey) &&
                          hasOnboardingDocument(
                              kycData.boardResolution,
                              kycData.boardResolutionPathOrKey
                          ) &&
                          hasOnboardingDocument(kycData.selfie, kycData.selfiePathOrKey)
                      );
            }

            // Fundraiser KYC (usually similar to Corporate or base)
            if (investorUserType === 'fundraiser') return baseKyc && !!(
                formData.repFullName &&
                formData.repEmail &&
                formData.repJobTitle &&
                formData.repPhoneNumber &&
                formData.repDob &&
                formData.repNationality &&
                formData.repResidence &&
                formData.repAddress
            );;

            // Individual KYC
            return (
                baseKyc &&
                hasOnboardingDocument(kycData.selfie, kycData.selfiePathOrKey) &&
                kycData.incomeDocuments.length > 0 &&
                hasOnboardingDocument(kycData.incomeFile, kycData.incomeFilePathOrKey)
            );

        case "application-fee":
            const { paymentMethod, applicationFeePaid } = formData;

            if (applicationFeePaid) return true;

            return !!paymentMethod;

        case "review":
            if (investorUserType === "fundraiser") {
                return formData.applicationFeePaid;
            }
            return true;
        case "activation":
        case "application-submitted":
            return true;

        default: {
            const _exhaustiveCheck: never = step;
            return _exhaustiveCheck;
        }
    }
}

export type CompanySubStepId = 'details' | 'address' | 'representative';

export function validateSubStep(
    stepId: 'details' | 'address' | 'representative',
    state: OnboardingState
): boolean {
    const { formData } = state;

    switch (stepId) {
        case 'details':
            return !!(
                formData.companyName &&
                formData.registrationNumber &&
                formData.registrationType &&
                validateEmail(formData.loginEmail) &&
                (formData.password?.length >= 8) &&
                formData.password === formData.confirmPassword
            );

        case 'address':
            return !!(
                formData.registrationDate &&
                formData.businessAddress &&
                formData.registeredAddress &&
                validateEmail(formData.companyEmail) &&
                formData.companyPhone
            );

        case 'representative':
            return !!(
                formData.repFullName &&
                formData.repEmail &&
                formData.repJobTitle &&
                formData.repPhoneNumber &&
                formData.repDob &&
                formData.repNationality &&
                formData.repResidence &&
                formData.repAddress
            );

        default:
            return false;
    }
}

export type PersonalSubStepId = 'details' | 'location';

export function validatePersonalStep(stepId: PersonalSubStepId, formData: OnboardingFormData): boolean {
    switch (stepId) {
        case 'details':
            return !!(
                formData.firstName?.length >= 2 &&
                formData.lastName?.length >= 2 &&
                validateEmail(formData.email) &&
                formData.phone?.length >= 10 &&
                formData.dob
            );
        case 'location':
            return !!(
                formData.nationality &&
                formData.residence &&
                formData.state &&
                formData.address?.length > 5 &&
                formData.password?.length >= 8 &&
                formData.password === formData.confirmPassword &&
                formData.agreed
            );
        default:
            return false;
    }
}

export function validateFullStep(type: 'corporate' | 'fundraiser', store: OnboardingState): boolean {
    if (type === 'fundraiser') {
        return (
            validateSubStep('details', store) &&
            validateSubStep('address', store)
        );
    }

    return (
        validateSubStep('details', store) &&
        validateSubStep('address', store) &&
        validateSubStep('representative', store)
    );
}

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email: string | undefined | null): boolean => {
    return EMAIL_REGEX.test(email || '');
};
