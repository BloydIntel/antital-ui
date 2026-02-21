"use client"

import React from 'react'
import { OnboardingInput } from '@/components/onboarding/molecules/OnboardingInput'
import { TYPOGRAPHY } from '@/constants/styles'
import { useOnboardingStore } from '@/store/onboardingStore'

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
        icon: "home"
    },
    {
        name: "registeredAddress",
        label: "Registered Address",
        placeholder: "23A Unity Crescent Lekki Phase 1, Lagos State, Nigeria.",
        icon: "home"
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

export function CompanyAddress({ onNext }: { onNext: () => void }) {
    const { formData, updateFormData } = useOnboardingStore()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onNext()
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-[558px] w-full mx-auto">
            <div className="mb-8">
                <h2 className="text-[24px] text-[#1F1F1F]" style={TYPOGRAPHY.heading}>
                    Company Address
                </h2>
            </div>

            <div>
                {ADDRESS_FIELDS.map((fieldGroup, idx) => {
                    // --- HANDLE GRID ITEMS (Email & Phone) ---
                    if ("isGrid" in fieldGroup) {
                        return (
                            <div key={`grid-${idx}`} className="grid grid-cols-2 gap-4">
                                {fieldGroup.fields.map((field) => (
                                    <OnboardingInput
                                        key={field.name}
                                        label={field.label}
                                        placeholder={field.placeholder}
                                        className="pb-0"
                                        type={field.type}
                                        value={(formData[field.name as keyof typeof formData] as string) || ''}
                                        onChange={(e) => updateFormData({ [field.name]: e.target.value })}
                                    />
                                ))}
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
                            type={'type' in fieldGroup ? fieldGroup.type : "text"}
                            value={(formData[fieldName] as string) || ''}
                            onChange={(e) => updateFormData({ [fieldGroup.name]: e.target.value })}
                        />
                    );
                })}
            </div>
        </form>
    )
}