"use client"

import React from 'react'
import { OnboardingInput } from '@/components/onboarding/molecules/OnboardingInput'
import { TYPOGRAPHY } from '@/constants/styles'
import { useOnboardingStore } from '@/store/onboardingStore'
import { SelectInput } from '@/components/onboarding/molecules/SelectInput'

const REPRESENTATIVE_FIELDS = [
    {
        name: "repFullName",
        label: "Full Name",
        placeholder: "John Doe"
    },
    {
        isGrid: true,
        fields: [
            {
                name: "repJobTitle",
                label: "Job Title/Role",
                placeholder: "Director/Partner",
                type: "select",
                options: [
                    { label: 'Director/Partner', value: 'director_partner' },
                    { label: 'CEO/Founder', value: 'ceo_founder' },
                    { label: 'Manager', value: 'manager' }
                ]
            },
            {
                name: "repPhoneNumber",
                label: "Phone Number",
                placeholder: "+234 987654321",
                type: "tel"
            }
        ]
    },
    {
        name: "repDob",
        label: "DOB",
        placeholder: "Enter your date of birth",
        type: "date"
    },
    {
        name: "repEmail",
        label: "Email Address",
        placeholder: "your.email@gmail.com",
        type: "email"
    },
    {
        name: "repNationality",
        label: "Nationality",
        placeholder: "Enter Nationality",
        type: "select",
        options: [
            { label: 'Nigerian', value: 'nigerian' },
            { label: 'Other', value: 'other' }
        ]
    },
    {
        name: "repResidence",
        label: "Enter your country of residence",
        placeholder: "Enter your country of residence",
        type: "select",
        options: [
            { label: 'Nigeria', value: 'nigeria' },
            { label: 'United States', value: 'usa' }
        ]
    },
    {
        name: "repAddress",
        label: "Address",
        placeholder: "23A Unity Crescent Lekki Phase 1, Lagos State, Nigeria.",
        icon: "home"
    }
] as const;

export function AccountRepresentativeDetails({ onNext }: { onNext: () => void }) {
    const { formData, updateFormData } = useOnboardingStore()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onNext()
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-[558px] w-full mx-auto">
            <div className="mb-8">
                <h2 className="text-[24px] font-semibold text-[#1F1F1F]" style={TYPOGRAPHY.heading}>
                    Account Representative Details
                </h2>
                <p className="text-[16px] text-[#2C2C2C] mt-2" style={TYPOGRAPHY.body}>
                    Person creating this account and representing the business
                </p>
            </div>

            <div>
                {REPRESENTATIVE_FIELDS.map((fieldGroup, idx) => {
                    // --- HANDLE GRID ITEMS (Job Title & Phone) ---
                    if ("isGrid" in fieldGroup) {
                        return (
                            <div key={`grid-${idx}`} className="grid grid-cols-2 gap-4">
                                {fieldGroup.fields.map((field) => {
                                    const baseProps = {
                                        label: field.label,
                                        placeholder: field.placeholder,
                                        className: "pb-0",
                                        value: (formData[field.name as keyof typeof formData] as string) || '',
                                    };

                                    if (field.type === "select") {
                                        return (
                                            <SelectInput
                                                key={field.name}
                                                {...baseProps}
                                                options={field.options}
                                                onChange={(val) => updateFormData({ [field.name]: val })}
                                            />
                                        );
                                    }

                                    return (
                                        <OnboardingInput
                                            key={field.name}
                                            {...baseProps}
                                            type={field.type || "text"}
                                            onChange={(e) => updateFormData({ [field.name]: e.target.value })}
                                        />
                                    );
                                })}
                            </div>
                        );
                    }

                    // --- HANDLE FULL WIDTH ITEMS ---
                    const fieldName = fieldGroup.name as keyof typeof formData;
                    const fieldType = 'type' in fieldGroup ? fieldGroup.type : 'text';

                    if (fieldType === "select" && 'options' in fieldGroup) {
                        return (
                            <SelectInput
                                key={fieldGroup.name}
                                label={fieldGroup.label}
                                placeholder={fieldGroup.placeholder}
                                className="pb-0"
                                options={fieldGroup.options}
                                value={(formData[fieldName] as string) || ''}
                                onChange={(val) => updateFormData({ [fieldGroup.name]: val })}
                            />
                        );
                    }

                    return (
                        <OnboardingInput
                            key={fieldGroup.name}
                            label={fieldGroup.label}
                            placeholder={fieldGroup.placeholder}
                            className="pb-0"
                            type={fieldType}
                            value={(formData[fieldName] as string) || ''}
                            onChange={(e) => updateFormData({ [fieldGroup.name]: e.target.value })}
                        />
                    );
                })}
            </div>
        </form>
    )
}