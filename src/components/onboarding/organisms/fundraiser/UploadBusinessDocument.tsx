import React, { useMemo, useState } from 'react'
import { CollapsibleUpload } from '@/components/onboarding/molecules/CollapsibleUpload'
import { TYPOGRAPHY } from '@/constants/styles'
import { useOnboardingStore } from '@/store/onboardingStore';
import { useRouter } from 'next/navigation';
import { SelectInput, SelectOption } from '@/components/onboarding/molecules/SelectInput';
import { OnboardingInput } from '@/components/onboarding/molecules/OnboardingInput';
import { ArrowLeft, ArrowRight, Info } from 'lucide-react';
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton';
import { cn } from '@/lib/utils';

interface OfferingField {
    id: string;
    label: string;
    type: 'textarea' | 'select' | 'number' | 'text';
    placeholder?: string;
    options?: readonly SelectOption[];
    info?: string;
}

const businessDocuments = [
    { id: 'founderAndTeamIntroduction', field: 'founderAndTeamItroduction', title: 'Founder and Team Introduction', required: true },
    { id: 'fundraisingDeck', field: 'fundraisingDeck', title: 'Fundraising deck (high-level pitch)', required: true },
    { id: 'investmentMemo', field: 'investmentMemo', title: 'Investment memo/prospectus (thorough analysis)', required: true },
    { id: 'termsOfOffering', field: 'termsOfOffering', title: 'Terms of offering', required: true },
    { id: 'productDemo', field: 'productDemo', title: 'Product Demo (optional)', required: false },
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
]

export function UploadBusinessDocument() {
    const router = useRouter()
    const { formData, updateFormData, investorUserType } = useOnboardingStore();
    const [showErrors, setShowErrors] = useState(false);

    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        founderAndTeamItroduction: true,
        fundraisingDeck: true,
        investmentMemo: true,
        termsOfOffering: true,
        productDemo: true,
    });

    const toggleSection = (id: string) => {
        setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleFileChange = (field: string, value: File | null) => {
        updateFormData({ [field]: value });
        if (showErrors) setShowErrors(false);
    };

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

    const getFundingError = (amount: string, size: string): string | null => {
        const val = Number(amount);
        if (!amount) return "Required";

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

    const businessSizeInfo = useMemo(() =>
        getBusinessSizeInfo(formData.businessSize as string),
        [formData.businessSize]);

    const isStepValid = useMemo(() => {

        const areDocsValid = businessDocuments
            .filter(doc => doc.required)
            .every(doc => !!formData[doc.field as keyof typeof formData]);


        const areFieldsFilled = OFFERING_FIELDS.every(field => {
            const val = formData[field.id as keyof typeof formData];
            return val !== undefined && val !== null && val !== "";
        });

        const fundingError = getFundingError(
            formData.fundingTarget as string,
            formData.businessSize as string
        );
        const isFundingRangeValid = !fundingError;

        return areDocsValid && areFieldsFilled && isFundingRangeValid;
    }, [formData]);

    const handleNext = () => {
        if (!isStepValid) {
            setShowErrors(true);
            return;
        }

        const safeType = investorUserType || 'fundraiser';
        router.push(`/onboarding/${safeType}/representative-kyc`);
    };

    const handleBack = () => {
        router.back();
    };

    const handleUpdate = (field: string, value: string | File | null) => {
        updateFormData({ [field]: value });
        if (showErrors) setShowErrors(false);
    };


    return (
        <div className="lg:w-[558px] w-full mx-auto">

            <div>
                <div className="mb-6">
                    <h2 className="text-[28px] text-[#1B1B1B]" style={TYPOGRAPHY.heading}>
                        Upload Business Documents
                    </h2>
                    <p className="text-[16px] text-[#2C2C2C] mt-2" style={TYPOGRAPHY.body}>
                        These documents verify your company&apos;s legal status and compliance
                    </p>
                </div>

                <div className="flex flex-col">
                    {businessDocuments.map((section, index) => {
                        const fieldValue = formData[section.field as keyof typeof formData] as File | null;

                        return (
                            <CollapsibleUpload
                                key={section.id}
                                title={`${index + 1}. ${section.title}`}
                                isOpen={!!openSections[section.id]}
                                onToggle={() => toggleSection(section.id)}
                                onUpload={(file) => handleFileChange(section.field, file)}
                                value={fieldValue}
                                isError={section.required && showErrors && !fieldValue}
                            />
                        );
                    })}
                </div>
            </div>

            <div>
                <div className='pb-6 pt-[56px]'>
                    <h2 className="text-[20px] text-[#1B1B1B]" style={TYPOGRAPHY.body}>
                        Offering Documents and Disclosure
                    </h2>
                    <p className="text-[16px] text-[#2C2C2C] mt-2" style={TYPOGRAPHY.body}>
                        Official disclosures to ensure transparency and investor clarity.
                    </p>
                </div>

                {/* Dynamic Form Mapping */}
                <div className="flex flex-col">
                    {OFFERING_FIELDS.map((field) => {
                        const commonProps = {
                            label: field.label,
                            value: formData[field.id as keyof typeof formData] as string || "",
                            error: showErrors && !formData[field.id as keyof typeof formData] ? "Required" : undefined,
                        };

                        return (
                            <React.Fragment key={field.id}>
                                {field.type === 'select' ? (
                                    <SelectInput
                                        {...commonProps}
                                        options={field.options || []}
                                        placeholder={field.placeholder}
                                        onChange={(val) => handleUpdate(field.id, val)}
                                        selectAreaStyle='bg-[#FFFFFF] border border-[#A8A8A8]'
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
                                            const fundingError = getFundingError(
                                                formData.fundingTarget as string,
                                                formData.businessSize as string
                                            );
                                            const hasError = showErrors && fundingError;

                                            return (
                                                <>
                                                    <div className='flex items-stretch h-[48px]'>
                                                        <div className={cn(
                                                            'flex items-center justify-center px-4 bg-[#EEEEEE] border border-r-0 border-[#A8A8A8] rounded-l-lg shrink-0 transition-colors',
                                                            hasError && "border-red-500 bg-red-50"
                                                        )}>
                                                            <span className={cn(
                                                                "text-[18px] font-medium text-[#858585]",
                                                                hasError && "text-red-500"
                                                            )}>₦</span>
                                                        </div>
                                                        <OnboardingInput
                                                            value={formData[field.id as keyof typeof formData] as string || ""}
                                                            type={field.type}
                                                            placeholder={field.placeholder}
                                                            onChange={(e) => handleUpdate(field.id, e.target.value)}
                                                            className="pb-0 w-full"
                                                            inputAreaStyle={cn(
                                                                'bg-[#FFFFFF] border border-[#A8A8A8] rounded-l-none',
                                                                hasError && "border-red-500"
                                                            )}
                                                        />
                                                    </div>
                                                    {hasError && (
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
                                        onChange={(e) => handleUpdate(field.id, e.target.value)}
                                        inputAreaStyle='bg-[#FFFFFF] border border-[#A8A8A8]'
                                    />
                                )}

                                {/* Conditional Micro Info Box */}
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

            <div className="flex max-w-[558px] items-center justify-between  pt-16 pb-10 border-t border-gray-50">
                <OnboardingButton
                    label='Back'
                    variant="plain"
                    onClick={handleBack}
                    icon={<ArrowLeft size={20} />}
                    className='w-fit'
                />

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
