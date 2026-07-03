import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Info } from 'lucide-react';

import { CollapsibleUpload } from '@/components/onboarding/molecules/CollapsibleUpload';
import { TYPOGRAPHY } from '@/constants/styles';
import { useOnboardingStore } from '@/store/onboardingStore';
import { SelectInput, SelectOption } from '@/components/onboarding/molecules/SelectInput';
import { OnboardingInput } from '@/components/onboarding/molecules/OnboardingInput';
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton';
import { cn } from '@/lib/utils';
import { showApiErrorToast } from '@/lib/error-feedback';
import { useFundraiserOnboardingApi } from '@/hooks/onboarding/useFundraiserOnboardingApi';
import { AddNewInvestmentFormPayload } from '@/types/investment';

interface OfferingField {
    id: keyof AddNewInvestmentFormPayload;
    label: string;
    type: 'textarea' | 'select' | 'number' | 'text';
    placeholder?: string;
    options?: readonly SelectOption[];
    info?: string;
}

const businessDocuments = [
    { id: 'founderAndTeamIntroduction', field: 'founderAndTeamIntroduction' as keyof AddNewInvestmentFormPayload, title: 'Founder and Team Introduction', required: true },
    { id: 'fundraisingDeck', field: 'fundraisingDeck' as keyof AddNewInvestmentFormPayload, title: 'Fundraising deck (high-level pitch)', required: true },
    { id: 'investmentMemo', field: 'investmentMemo' as keyof AddNewInvestmentFormPayload, title: 'Investment memo/prospectus (thorough analysis)', required: true },
    { id: 'termsOfOffering', field: 'termsOfOffering' as keyof AddNewInvestmentFormPayload, title: 'Terms of offering', required: true },
    { id: 'productDemo', field: 'productDemo' as keyof AddNewInvestmentFormPayload, title: 'Product Demo (optional)', required: false },
] as const;

const OFFERING_FIELDS: readonly OfferingField[] = [
    {
        id: 'businessDescription',
        label: 'Business Description',
        type: 'textarea',
        placeholder: 'Tell us about your business'
    },
    {
        id: 'businessSector',
        label: 'Business Sector',
        type: 'select',
        placeholder: '--Select business sector--',
        options: [
            { label: 'Fintech', value: 'Fintech' },
            { label: 'Agritech', value: 'Agritech' },
            { label: 'Healthcare', value: 'Healthcare' },
            { label: 'Edtech', value: 'Edtech' }
        ]
    },
    {
        id: 'instrumentType',
        label: 'Type of instrument',
        type: 'select',
        options: [
            { label: 'Equity Investment Contracts', value: 'equity' },
            { label: 'Debt Investment Contracts', value: 'debt' },
            { label: 'simple Investment Contracts (SIC)', value: 'sic' }
        ]
    },
    {
        id: 'businessSize',
        label: 'Business Size',
        type: 'select',
        options: [
            { label: 'Micro', value: 'Micro' },
            { label: 'Small', value: 'Small' },
            { label: 'Medium', value: 'Medium' }
        ],
    },
    {
        id: 'fundingTarget',
        label: 'Funding Target',
        type: 'number',
        placeholder: 'Enter amount',
    },
    {
        id: 'investmentRound',
        label: 'Investment Round',
        type: 'select',
        options: [
            { label: 'Pre-Seed Round', value: 'Pre-Seed Round' },
            { label: 'Seed Round', value: 'Seed Round' },
            { label: 'Series A', value: 'Series A' },
            { label: 'Series B', value: 'Series B' },
            { label: 'Series C', value: 'Series C' },
            { label: 'Initial Public Offering (IPO)', value: 'Initial Public Offering (IPO)' },
        ]
    },
];

const getBusinessSizeInfo = (size: string | undefined) => {
    switch (size) {
        case 'Micro':
            return 'Choosing the "micro" option will restrict the maximum annual cap to ₦50 million.';
        case 'Small':
            return 'Please specify the funding target within the permitted range: ₦25,000,000 and not more than ₦100,000,000.';
        case 'Medium':
            return 'Choosing the "medium" option restrict the maximum annual cap to ₦100 million.';
        default:
            return null;
    }
};

const getFundingError = (amount: string | undefined, size: string | undefined): string | null => {
    if (!amount) return "Required";
    const val = Number(amount);

    switch (size) {
        case 'Micro':
            return val > 50000000 ? "Please input a different amount less than or equal to ₦50 million" : null;
        case 'Small':
            if (val < 25000000 || val > 100000000) {
                return "Please specify the funding target within the permitted range: ₦25,000,000 to ₦100,000,000";
            }
            return null;
        case 'Medium':
            return val > 100000000 ? "Please input a different amount less than or equal to ₦100 million" : null;
        default:
            return null;
    }
};

interface UploadBusinessDocumentProps {
    isModalVariant?: boolean;
    externalFormData?: AddNewInvestmentFormPayload;
    externalUpdateFormData?: (data: Partial<AddNewInvestmentFormPayload>) => void;
    customSubmitAction?: (data: AddNewInvestmentFormPayload) => Promise<void>;
    onSuccessCallback?: () => void;
    onCancelCallback?: () => void;
}

export function UploadBusinessDocument({
    isModalVariant = false,
    externalFormData,
    externalUpdateFormData,
    customSubmitAction,
    onSuccessCallback,
    onCancelCallback,
}: UploadBusinessDocumentProps) {
    const router = useRouter();
    const { saveBusinessDocuments } = useFundraiserOnboardingApi();

    const storeFormData = useOnboardingStore((state) => state.formData) as AddNewInvestmentFormPayload;
    const storeUpdateFormData = useOnboardingStore((state) => state.updateFormData);
    const investorUserType = useOnboardingStore((state) => state.investorUserType);

    const activeFormData = externalFormData ?? storeFormData;
    const activeUpdateFormData = externalUpdateFormData ?? storeUpdateFormData;

    const [showErrors, setShowErrors] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        founderAndTeamIntroduction: true,
        fundraisingDeck: true,
        investmentMemo: true,
        termsOfOffering: true,
        productDemo: true,
    });

    const toggleSection = (id: string) => {
        setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleFieldUpdate = (field: keyof AddNewInvestmentFormPayload, value: string | File | null) => {
        activeUpdateFormData({ [field]: value });
        if (showErrors) setShowErrors(false);
    };

    const businessSizeInfo = useMemo(() =>
        getBusinessSizeInfo(activeFormData.businessSize),
        [activeFormData.businessSize]
    );

    const isStepValid = useMemo(() => {
        const areDocsValid = businessDocuments
            .filter(doc => doc.required)
            .every(doc => !!activeFormData[doc.field]);

        const areFieldsFilled = OFFERING_FIELDS.every(field => {
            const val = activeFormData[field.id];
            return val !== undefined && val !== null && val !== "";
        });

        const fundingError = getFundingError(activeFormData.fundingTarget, activeFormData.businessSize);

        return areDocsValid && areFieldsFilled && !fundingError;
    }, [activeFormData]);

    const handleNext = async () => {
        if (!isStepValid) {
            setShowErrors(true);
            return;
        }

        try {
            setIsSubmitting(true);

            if (customSubmitAction) {
                await customSubmitAction(activeFormData);
            } else {
                await saveBusinessDocuments();
            }

            if (onSuccessCallback) {
                onSuccessCallback();
            } else {
                const safeType = investorUserType || 'fundraiser';
                router.push(`/onboarding/${safeType}/representative-kyc`);
            }
        } catch (error) {
            showApiErrorToast(error, isModalVariant ? "Unable to upload document sets safely." : "Unable to proceed to representative KYC.");
            setShowErrors(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBack = () => {
        if (onCancelCallback) {
            onCancelCallback();
        } else {
            router.back();
        }
    };

    return (
        <div className={cn("w-full mx-auto", !isModalVariant && "lg:w-[558px]")}>
            {!isModalVariant && (
                <div className="mb-6">
                    <h2 className="text-[28px] text-[#1B1B1B]" style={TYPOGRAPHY.heading}>
                        Upload Business Documents
                    </h2>
                    <p className="text-[16px] text-[#2C2C2C] mt-2" style={TYPOGRAPHY.body}>
                        These documents verify your company&apos;s legal status and compliance
                    </p>
                </div>
            )}

            <div className="flex flex-col">
                {businessDocuments.map((section, index) => {
                    const fieldValue = activeFormData[section.field] as File | null | undefined;

                    return (
                        <CollapsibleUpload
                            key={section.id}
                            title={`${index + 1}. ${section.title}`}
                            isOpen={!!openSections[section.id]}
                            onToggle={() => toggleSection(section.id)}
                            onUpload={(file) => handleFieldUpdate(section.field, file)}
                            value={fieldValue ?? null}
                            isError={section.required && showErrors && !fieldValue}
                        />
                    );
                })}
            </div>

            <div>
                <div className="pb-6 pt-[56px]">
                    <h2 className="text-[20px] text-[#1B1B1B]" style={TYPOGRAPHY.body}>
                        Offering Documents and Disclosure
                    </h2>
                    <p className="text-[16px] text-[#2C2C2C] mt-2" style={TYPOGRAPHY.body}>
                        Official disclosures to ensure transparency and investor clarity.
                    </p>
                </div>

                <div className="flex flex-col">
                    {OFFERING_FIELDS.map((field) => {
                        const fieldValue = (activeFormData[field.id] as string) || "";
                        const hasRequiredError = showErrors && !fieldValue;

                        const commonProps = {
                            label: field.label,
                            value: fieldValue,
                            error: hasRequiredError ? "Required" : undefined,
                        };

                        return (
                            <React.Fragment key={field.id}>
                                {field.type === 'select' ? (
                                    <SelectInput
                                        {...commonProps}
                                        options={field.options || []}
                                        placeholder={field.placeholder}
                                        onChange={(val) => handleFieldUpdate(field.id, val)}
                                        selectAreaStyle="bg-[#FFFFFF] border border-[#A8A8A8]"
                                    />
                                ) : field.type === 'number' ? (
                                    <div className="flex flex-col gap-2 pb-[16px]">
                                        <label
                                            className="text-[16px] text-[#1A1A1A] leading-tight"
                                            style={TYPOGRAPHY.body}
                                        >
                                            {field.label}
                                        </label>

                                        {(() => {
                                            const fundingError = getFundingError(activeFormData.fundingTarget, activeFormData.businessSize);
                                            const isTargetError = showErrors && fundingError;

                                            return (
                                                <>
                                                    <div className="flex items-stretch h-[48px]">
                                                        <div className={cn(
                                                            "flex items-center justify-center px-4 bg-[#EEEEEE] border border-r-0 border-[#A8A8A8] rounded-l-lg shrink-0 transition-colors",
                                                            isTargetError && "border-red-500 bg-red-50"
                                                        )}>
                                                            <span className={cn(
                                                                "text-[18px] font-medium text-[#858585]",
                                                                isTargetError && "text-red-500"
                                                            )}>₦</span>
                                                        </div>
                                                        <OnboardingInput
                                                            value={fieldValue}
                                                            type={field.type}
                                                            placeholder={field.placeholder}
                                                            onChange={(e) => handleFieldUpdate(field.id, e.target.value)}
                                                            className="pb-0 w-full"
                                                            inputAreaStyle={cn(
                                                                "bg-[#FFFFFF] border border-[#A8A8A8] rounded-l-none",
                                                                isTargetError && "border-red-500"
                                                            )}
                                                        />
                                                    </div>
                                                    {isTargetError && (
                                                        <span className="text-xs text-red-500 mt-1">{fundingError}</span>
                                                    )}
                                                </>
                                            );
                                        })()}
                                    </div>
                                ) : (
                                    <OnboardingInput
                                        {...commonProps}
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        onChange={(e) => handleFieldUpdate(field.id, e.target.value)}
                                        inputAreaStyle="bg-[#FFFFFF] border border-[#A8A8A8]"
                                    />
                                )}

                                {field.id === 'businessSize' && businessSizeInfo && (
                                    <div className="flex items-center gap-3 p-3 bg-[#F0F7FF] rounded-lg mb-6 border border-[#D1E9FF]">
                                        <Info className="text-[#0052CC] shrink-0" size={18} />
                                        <p className="text-[12px] text-[#0052CC] leading-tight" style={TYPOGRAPHY.body}>
                                            {businessSizeInfo}
                                        </p>
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            <div className={cn("flex items-center justify-between pt-16 pb-10 border-t border-gray-50", !isModalVariant && "max-w-[558px]")}>
                <OnboardingButton
                    label={isModalVariant ? 'Cancel' : 'Back'}
                    variant="plain"
                    onClick={handleBack}
                    icon={!isModalVariant ? <ArrowLeft size={20} /> : undefined}
                    className="w-fit"
                />

                <OnboardingButton
                    label={isSubmitting ? (isModalVariant ? "Uploading..." : "Saving…") : (isModalVariant ? "Submit for Verification" : "Next")}
                    onClick={handleNext}
                    icon={!isModalVariant ? <ArrowRight size={20} /> : undefined}
                    className={cn("w-fit", !isModalVariant && "flex-row-reverse")}
                    loading={isSubmitting}
                />
            </div>
        </div>
    );
}