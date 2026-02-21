"use client"

import React from 'react'
import { OnboardingInput } from '@/components/onboarding/molecules/OnboardingInput'
import { TYPOGRAPHY } from '@/constants/styles'
import { useOnboardingStore } from '@/store/onboardingStore'
import { SelectInput } from '@/components/onboarding/molecules/SelectInput'

const COMPANY_FIELDS = [
    {
        name: "companyName",
        label: "Company Legal Name",
        placeholder: "Exactly as registered with CAC"
    },
    {
        name: "brandName",
        label: "Trading/Brand Name",
        placeholder: "Public business name"
    },
    {
        isGrid: true,
        fields: [
            {
                name: "registrationType",
                label: "Registration Type",
                placeholder: "BN (Business Name)",
                type: "select",
                options: [
                    { label: 'BN (Business Name)', value: 'BN' },
                    { label: 'LTD (Limited Liability)', value: 'LTD' },
                    { label: 'PLC (Public Limited)', value: 'PLC' }
                ] as const
            },
            {
                name: "registrationNumber",
                label: "Registration Number",
                placeholder: "BN1234567"
            }
        ]
    },
    {
        name: "loginEmail",
        label: "Email",
        placeholder: "Enter email",
        type: "email"
    },
    {
        isGrid: true,
        fields: [
            {
                name: "password",
                label: "Create Password",
                placeholder: "***********",
                type: "password"
            },
            {
                name: "confirmPassword",
                label: "Confirm Password",
                placeholder: "***********",
                type: "password"
            }
        ]
    }
] as const;

export function CompanyDetails({ onNext }: { onNext: () => void }) {
    const { formData, updateFormData } = useOnboardingStore()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onNext()
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-[558px] w-full mx-auto">
            <div className="mb-8">
                <h2 className="text-[36px] text-[#1B1B1B]" style={TYPOGRAPHY.heading}>
                    Corporate Investment Account
                </h2>
                <p className="text-[16px] text-[#2C2C2C] mt-2" style={TYPOGRAPHY.body}>
                    Register your organization to invest in vetted Nigerian startups
                </p>
            </div>

            <div className="space-y-6">
                <p className="text-[24px] font-semibold text-[#1F1F1F]" style={TYPOGRAPHY.heading}>
                    Company Details
                </p>

                <div className="pt-2">
                    {COMPANY_FIELDS.map((fieldGroup, idx) => {
                        // --- HANDLE GRID ITEMS ---
                        if ("isGrid" in fieldGroup) {
                            return (
                                <div key={`grid-${idx}`} className="grid grid-cols-2 gap-4">
                                    {fieldGroup.fields.map((field) => {
                                        const fieldName = field.name as keyof typeof formData;
                                        const baseProps = {
                                            label: field.label,
                                            placeholder: field.placeholder,
                                            className: "pb-0",
                                            value: (formData[fieldName] as string) || '',
                                        };

                                        const fieldType = 'type' in field ? field.type : 'text';

                                        if (fieldType === "select" && 'options' in field) {
                                            return (
                                                <SelectInput
                                                    key={field.name}
                                                    {...baseProps}
                                                    options={field.options}
                                                    onChange={(value) => updateFormData({ [field.name]: value })}
                                                />
                                            );
                                        }

                                        return (
                                            <OnboardingInput
                                                key={field.name}
                                                {...baseProps}
                                                type={fieldType}
                                                onChange={(e) => updateFormData({ [field.name]: e.target.value })}
                                            />
                                        );
                                    })}
                                </div>
                            );
                        }

                        // --- HANDLE FULL WIDTH ITEMS ---
                        const fieldName = fieldGroup.name as keyof typeof formData;
                        return (
                            <OnboardingInput
                                key={fieldGroup.name}
                                label={fieldGroup.label}
                                placeholder={fieldGroup.placeholder}
                                className="pb-0"
                                // FIX: Narrowed field type check
                                type={'type' in fieldGroup ? fieldGroup.type : "text"}
                                value={(formData[fieldName] as string) || ''}
                                onChange={(e) => updateFormData({ [fieldGroup.name]: e.target.value })}
                            />
                        );
                    })}
                </div>
            </div>
        </form>
    )
}