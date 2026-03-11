"use client"

import React, { useMemo, useState } from 'react'
import { OnboardingInput } from '@/components/onboarding/molecules/OnboardingInput'
import { TYPOGRAPHY } from '@/constants/styles'
import { useOnboardingStore } from '@/store/onboardingStore'
import { validateEmail } from '@/lib/onboardingValidation'

const ADDRESS_FIELDS = [
    {
        name: "registrationDate",
        label: "Date of Registration",
        placeholder: "DD/MM/YYYY",
        type: "date"
    },
    {
        name: "companyWebsite",
        label: "Company Website (if available)",
        placeholder: "https://yourcompany.com",
        type: "url"
    },
    {
        name: "businessAddress",
        label: "Business Address",
        placeholder: "23A Unity Crescent Lekki Phase 1, Lagos State, Nigeria.",
    },
    {
        name: "registeredAddress",
        label: "Registered Address",
        placeholder: "23A Unity Crescent Lekki Phase 1, Lagos State, Nigeria.",
    },
    {
        isGrid: true,
        fields: [
            {
                name: "companyEmail",
                label: "Company Email",
                placeholder: "info@yourcompany.com",
                type: "email"
            },
            {
                name: "companyPhone",
                label: "Company Phone",
                placeholder: "+234 987654321",
                type: "tel"
            }
        ]
    }
] as const;

interface CompanyAddressProps {
    showErrors: boolean
    title: string
    desc?: string
}

export function CompanyAddress({ showErrors, title, desc }: CompanyAddressProps) {
    const { formData, updateFormData } = useOnboardingStore()
    const [touched, setTouched] = useState<Record<string, boolean>>({})

    const errors = useMemo(() => {
        return {
            registrationDate: !formData.registrationDate ? "Date is required" : "",
            companyWebsite: "",
            businessAddress: !formData.businessAddress ? "Address is required" : "",
            registeredAddress: !formData.registeredAddress ? "Registered address is required" : "",
            companyEmail: !validateEmail(formData.companyEmail as string || '') ? "Invalid email" : "",
            companyPhone: !formData.companyPhone ? "Phone number is required" : "",
        };
    }, [formData]);

    const handleBlur = (name: string) => setTouched(prev => ({ ...prev, [name]: true }));

    return (
        <div className="max-w-[558px] w-full mx-auto">
            <div className="mb-8">
                <h2 className="text-[24px] text-[#1F1F1F]" style={TYPOGRAPHY.heading}>
                    {title}
                </h2>
                {desc && <p className="text-[16px] text-[#2C2C2C] mt-2" style={TYPOGRAPHY.body}>
                    {desc}
                </p>}
            </div>

            <div className="space-y-1">
                {ADDRESS_FIELDS.map((fieldGroup, idx) => {
                    if ("isGrid" in fieldGroup) {
                        return (
                            <div key={`grid-${idx}`} className="grid grid-cols-2 gap-4">
                                {fieldGroup.fields.map((field) => {
                                    const fieldName = field.name as keyof typeof formData;
                                    const errorKey = field.name as keyof typeof errors;
                                    const errorMsg = (touched[field.name] || showErrors) ? errors[errorKey] : "";

                                    return (
                                        <OnboardingInput
                                            key={field.name}
                                            label={field.label}
                                            placeholder={field.placeholder}
                                            type={field.type}
                                            value={(formData[fieldName] as string) || ''}
                                            error={errorMsg}
                                            onChange={(e) => updateFormData({ [field.name]: e.target.value })}
                                            onBlur={() => handleBlur(field.name)}
                                        />
                                    );
                                })}
                            </div>
                        );
                    }

                    const fieldName = fieldGroup.name as keyof typeof formData;
                    const fieldType = 'type' in fieldGroup ? fieldGroup.type : "text";
                    const errorKey = fieldGroup.name as keyof typeof errors;
                    const errorMsg = (touched[fieldGroup.name] || showErrors) ? errors[errorKey] : "";

                    return (
                        <OnboardingInput
                            key={fieldGroup.name}
                            label={fieldGroup.label}
                            placeholder={fieldGroup.placeholder}
                            type={fieldType}
                            value={(formData[fieldName] as string) || ''}
                            error={errorMsg}
                            onChange={(e) => updateFormData({ [fieldGroup.name]: e.target.value })}
                            onBlur={() => handleBlur(fieldGroup.name)}
                        />
                    );
                })}
            </div>
        </div>
    )
}