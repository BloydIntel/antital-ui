import { StepKey } from "@/components/onboarding/steps";
import { OnboardingState } from "@/store/onboardingStore";

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
            return !!(
                formData.companyName &&
                formData.registrationNumber &&
                formData.companyEmail &&
                formData.repFullName &&
                formData.repEmail
            );

        case "email":
            return emailVerified;

        case "investor":
        case "categorization":

            return !!formData.selectedCategoryId;

        case "profile":
            return Object.keys(formData.questionnaireAnswers).length > 4;

        case "kyc":
            const baseKyc = !!(kycData.idNumber && kycData.idFile && kycData.selfie && kycData.bvn);

            if (investorUserType === 'corporate') {
                const isQII = formData.selectedCategoryId === "qii";
                if (isQII) {
                    return baseKyc && !!(kycData.qiiLicense && kycData.statusReport);
                }
                return baseKyc && !!(kycData.incorporationCertificate && kycData.boardResolution);
            }

            // Individual KYC
            return baseKyc && kycData.incomeDocuments.length > 0 && !!kycData.incomeFile;

        case "review":
            return true;

        case "activation":
            return true;

        default: {
            const _exhaustiveCheck: never = step;
            return _exhaustiveCheck;
        }
    }
}