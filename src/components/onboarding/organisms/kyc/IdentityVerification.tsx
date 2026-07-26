"use client"

import React, { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { DocumentUpload, type DocumentUploadFieldErrors } from '@/components/onboarding/organisms/kyc/DocumentUpload'
import { SelfieUpload } from '@/components/onboarding/organisms/kyc/SelfieUpload'
import { IncomeVerification } from '@/components/onboarding/organisms/kyc/IncomeVerification'
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton'
import { useOnboardingStore } from '@/store/onboardingStore'
import { CORPORATE_CATEGORY_STEPS, CORPORATE_BASE_KYC, INDIVIDUAL_KYC_SUB_STEPS, FUNDRAISER_ACCOUNT_REP_KYC_SUB_STEPS } from '@/constants/subSteps'
import { OtherCorporateInvestor } from '@/components/onboarding/organisms/corporate/OtherCorporateInvestor'
import { AccountRepresentativeDetails } from '@/components/onboarding/organisms/corporate/company-step/AccountRepresentativeDetails'
import onboardingService from '@/services/onboardingService'
import { mapToCorporateDocsPayload, mapToKycPayload } from '@/lib/onboarding-payload-mappers'
import { showApiErrorToast } from '@/lib/error-feedback'
import { ApiError, toApiError } from '@/lib/api-error'
import { useFundraiserOnboardingApi } from '@/hooks/onboarding/useFundraiserOnboardingApi'
import { hasOnboardingDocument } from '@/lib/onboarding-file-upload'
import { isValidBvn, isValidKycIdNumber } from '@/lib/kyc-id-validation'

interface IdentityVerificationProps {
    onNext: () => void
    onBack: () => void
}

export function IdentityVerification({ onNext, onBack }: IdentityVerificationProps) {

    const userType = useOnboardingStore((s) => s.investorUserType);
    const subStep = useOnboardingStore((s) => s.kycSubStep);
    const setSubStep = useOnboardingStore((s) => s.setKycSubStep);
    const kycData = useOnboardingStore((s) => s.formData.kycData);
    const formData = useOnboardingStore((s) => s.formData);
    const categoryId = useOnboardingStore((s) => s.formData.selectedCategoryId);
    const [showErrors, setShowErrors] = useState(false);
    const [isSavingKyc, setIsSavingKyc] = useState(false);
    const [apiFieldErrors, setApiFieldErrors] = useState<DocumentUploadFieldErrors>({});
    const { saveCombinedKycBundle } = useFundraiserOnboardingApi();

    const isCorporate = userType === 'corporate';
    const isFundraiser = userType === 'fundraiser';

    const currentSteps = useMemo(() => {
        if (isFundraiser) return FUNDRAISER_ACCOUNT_REP_KYC_SUB_STEPS;
        if (!isCorporate) return INDIVIDUAL_KYC_SUB_STEPS;

        const steps = [...CORPORATE_BASE_KYC];
        if (categoryId && CORPORATE_CATEGORY_STEPS[categoryId]) {
            steps.push(CORPORATE_CATEGORY_STEPS[categoryId]);
        }
        return steps;
    }, [isCorporate, isFundraiser, categoryId]);

    const currentHeader = currentSteps[subStep];
    const docsSubStepIndex = currentSteps.findIndex((step) => step.id === 'docs');

    const isDocsValid = useMemo(() => {
        return !!(
            kycData.idType &&
            isValidKycIdNumber(kycData.idType, kycData.idNumber) &&
            hasOnboardingDocument(kycData.idFile, kycData.idFilePathOrKey) &&
            isValidBvn(kycData.bvn) &&
            kycData.address &&
            hasOnboardingDocument(kycData.addressFile, kycData.addressFilePathOrKey)
        );
    }, [kycData]);

    const isStep0Valid = useMemo(() => {
        if (isFundraiser) {
            return !!(
                formData.repFullName &&
                formData.repEmail &&
                formData.repPhoneNumber &&
                formData.repJobTitle &&
                formData.repDob &&
                formData.repNationality &&
                formData.repResidence &&
                formData.repAddress
            );
        }
        return isDocsValid;
    }, [isFundraiser, formData, isDocsValid]);

    const isStep1Valid = useMemo(() => {
        if (isFundraiser) {
            return isDocsValid;
        }
        return Boolean(kycData.selfieCompleted || kycData.selfiePathOrKey);
    }, [isFundraiser, isDocsValid, kycData]);

    const isStep2Valid = useMemo(() => {
        if (isFundraiser) return true;
        if (isCorporate) {
            if (categoryId === "qii") {
                return !!(
                    hasOnboardingDocument(kycData.statusReport, kycData.statusReportPathOrKey) &&
                    hasOnboardingDocument(kycData.qiiLicense, kycData.qiiLicensePathOrKey) &&
                    hasOnboardingDocument(kycData.boardResolution, kycData.boardResolutionPathOrKey)
                );
            }
            return !!(
                hasOnboardingDocument(
                    kycData.incorporationCertificate,
                    kycData.incorporationCertificatePathOrKey
                ) &&
                hasOnboardingDocument(kycData.statusReport, kycData.statusReportPathOrKey) &&
                hasOnboardingDocument(kycData.boardResolution, kycData.boardResolutionPathOrKey)
            );
        }
        return (
            kycData.incomeDocuments.length > 0 &&
            hasOnboardingDocument(kycData.incomeFile, kycData.incomeFilePathOrKey)
        );
    }, [isCorporate, isFundraiser, categoryId, kycData]);

    const isAllKycValid = isStep0Valid && isStep1Valid && isStep2Valid;

    const applyApiFieldErrors = (error: unknown) => {
        const normalized = toApiError(error);
        if (!(normalized instanceof ApiError)) return;

        const nextErrors: DocumentUploadFieldErrors = {
            idNumber: normalized.getFieldError("nin") || normalized.getFieldError("idNumber"),
            bvn: normalized.getFieldError("bvn"),
        };

        setApiFieldErrors(nextErrors);

        if ((nextErrors.idNumber || nextErrors.bvn) && docsSubStepIndex >= 0) {
            setSubStep(docsSubStepIndex);
        }
    };

    const handleNext = async () => {
        const maxSubStep = currentSteps.length - 1;
        if (subStep < maxSubStep) {
            if (isFundraiser && currentHeader?.id === 'representative') {
                if (!isStep0Valid) {
                    setShowErrors(true);
                    return;
                }
                setSubStep(subStep + 1);
                return;
            }

            if (currentHeader?.id === 'docs' && !isDocsValid) {
                setShowErrors(true);
                return;
            }

            if (!isFundraiser) {
                if (subStep === 0 && !isStep0Valid) {
                    setShowErrors(true);
                    return;
                }
                if (subStep === 1 && !isStep1Valid) {
                    setShowErrors(true);
                    return;
                }
            }

            setSubStep(subStep + 1);
        } else {
            const isCurrentFlowValid = isFundraiser
                ? (isStep0Valid && isStep1Valid)
                : (isStep0Valid && isStep1Valid && isStep2Valid);

            if (!isCurrentFlowValid) {
                setShowErrors(true);
                return;
            }

            setIsSavingKyc(true);
            try {
                if (isFundraiser) {
                    await saveCombinedKycBundle();
                } else {
                    await onboardingService.saveKyc(
                        mapToKycPayload(kycData),
                        isCorporate ? mapToCorporateDocsPayload(categoryId, kycData) : undefined
                    );
                }
                setApiFieldErrors({});
                onNext();
            } catch (error) {
                showApiErrorToast(error, "Unable to save KYC details.");
                setShowErrors(true);
                applyApiFieldErrors(error);
            } finally {
                setIsSavingKyc(false);
            }
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
            {currentHeader.title && <div className="flex flex-col gap-2">
                <div className="flex flex-col-reverse lg:flex-row justify-between items-start">
                    <h2 className="text-[28px] text-[#1B1B1B] leading-tight font-[family-name:var(--font-rethink-sans)] font-medium tracking-[-1%]">
                        {currentHeader.title}
                        {currentHeader.span && (
                            <span className="text-[14px] text-[#858585] ml-2 font-normal">
                                {currentHeader.span}
                            </span>
                        )}
                    </h2>

                    {((!isFundraiser && (subStep === 0 || subStep === 2)) || (isFundraiser && subStep === 1)) && (
                        <button
                            className="text-[#0F3D2E] text-sm font-semibold hover:underline"
                            onClick={() => onNext()}
                        >
                            Skip to complete KYC later
                        </button>
                    )}
                </div>

                {currentHeader.description &&
                    (<p className="text-[16px] text-[#2C2C2C] leading-tight max-w-[500px] font-[family-name:var(--font-dm-sans)] tracking-[-1%]">
                        {currentHeader.description}
                    </p>
                    )}
            </div>}

            <div>
                {currentHeader?.id === 'representative' && <AccountRepresentativeDetails showErrors={showErrors} />}

                {currentHeader?.id === 'docs' && (
                    <DocumentUpload
                        showErrors={showErrors}
                        apiFieldErrors={apiFieldErrors}
                        onClearApiFieldError={(field) =>
                            setApiFieldErrors((prev) => ({ ...prev, [field]: undefined }))
                        }
                    />
                )}
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
                    disabled={isSavingKyc}
                />

                <div className="flex gap-2">
                    {currentSteps.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-300 ${i === subStep ? 'w-8 bg-[#042E27]' : 'w-2 bg-[#E6EEDC]'}`}
                        />
                    ))}
                </div>

                <OnboardingButton
                    label={isSavingKyc ? "Saving…" : "Next"}
                    onClick={handleNext}
                    icon={<ArrowRight size={20} />}
                    className="flex-row-reverse w-fit"
                    loading={isSavingKyc}
                />

            </div>
        </div>
    )
}
