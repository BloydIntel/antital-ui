"use client"

import React, { useEffect, useMemo, useState } from 'react'
import { OnboardingInput } from '@/components/onboarding/molecules/OnboardingInput'
import { TYPOGRAPHY } from '@/constants/styles'
import { useOnboardingStore } from '@/store/onboardingStore'
import { SelectInput } from '@/components/onboarding/molecules/SelectInput'
import { validateEmail } from '@/lib/onboardingValidation'

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

export function AccountRepresentativeDetails({ onValidationChange }: { onValidationChange: (isValid: boolean) => void }) {
    const { formData, updateFormData } = useOnboardingStore()
    const [touched, setTouched] = useState<Record<string, boolean>>({})

    const errors = useMemo(() => {
        return {
            repFullName: !formData.repFullName ? "Full name is required" : "",
            repJobTitle: !formData.repJobTitle ? "Required" : "",
            repPhoneNumber: !formData.repPhoneNumber ? "Required" : "",
            repDob: !formData.repDob ? "Date of birth is required" : "",
            repEmail: !validateEmail(formData.repEmail as string || '') ? "Invalid email" : "",
            repNationality: !formData.repNationality ? "Required" : "",
            repResidence: !formData.repResidence ? "Required" : "",
            repAddress: !formData.repAddress ? "Address is required" : "",
        };
    }, [formData]);

    useEffect(() => {
        const isValid = !Object.values(errors).some(err => err !== "");
        onValidationChange(isValid);
    }, [errors, onValidationChange]);

    const handleBlur = (name: string) => setTouched(prev => ({ ...prev, [name]: true }));

    return (
        <div className="max-w-[558px] w-full mx-auto">
            <div className="mb-8">
                <h2 className="text-[24px] font-semibold text-[#1F1F1F]" style={TYPOGRAPHY.heading}>
                    Account Representative Details
                </h2>
                <p className="text-[16px] text-[#2C2C2C] mt-2" style={TYPOGRAPHY.body}>
                    Person creating this account and representing the business
                </p>
            </div>

            <div className="space-y-6">
                {REPRESENTATIVE_FIELDS.map((fieldGroup, idx) => {

                    if ("isGrid" in fieldGroup) {
                        return (
                            <div key={`grid-${idx}`} className="grid grid-cols-2 gap-4">
                                {fieldGroup.fields.map((field) => {
                                    const fieldName = field.name as keyof typeof formData;
                                    const errorKey = field.name as keyof typeof errors;
                                    const errorMsg = touched[field.name] ? errors[errorKey] : "";

                                    if (field.type === "select") {
                                        return (
                                            <SelectInput
                                                key={field.name}
                                                label={field.label}
                                                placeholder={field.placeholder}
                                                options={field.options}
                                                value={(formData[fieldName] as string) || ''}
                                                error={errorMsg}
                                                onChange={(val) => {
                                                    updateFormData({ [field.name]: val });
                                                    handleBlur(field.name);
                                                }}
                                            />
                                        );
                                    }

                                    return (
                                        <OnboardingInput
                                            key={field.name}
                                            label={field.label}
                                            placeholder={field.placeholder}
                                            type={field.type || "text"}
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
                    const fieldType = 'type' in fieldGroup ? fieldGroup.type : 'text';
                    const errorKey = fieldGroup.name as keyof typeof errors;
                    const errorMsg = touched[fieldGroup.name] ? errors[errorKey] : "";

                    if (fieldType === "select" && 'options' in fieldGroup) {
                        return (
                            <SelectInput
                                key={fieldGroup.name}
                                label={fieldGroup.label}
                                placeholder={fieldGroup.placeholder}
                                options={fieldGroup.options}
                                value={(formData[fieldName] as string) || ''}
                                error={errorMsg}
                                onChange={(val) => {
                                    updateFormData({ [fieldGroup.name]: val });
                                    handleBlur(fieldGroup.name);
                                }}
                            />
                        );
                    }

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