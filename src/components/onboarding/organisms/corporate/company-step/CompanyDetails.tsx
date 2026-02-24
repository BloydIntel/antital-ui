"use client"

import React, { useEffect, useMemo, useState } from 'react'
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

export function CompanyDetails({ onValidationChange }: { onValidationChange: (isValid: boolean) => void }) {
    const { formData, updateFormData } = useOnboardingStore()
    const [touched, setTouched] = useState<Record<string, boolean>>({})

    const errors = useMemo(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return {
            companyName: !formData.companyName ? "Company legal name is required" : "",
            brandName: !formData.brandName ? "Trading name is required" : "",
            registrationType: !formData.registrationType ? "Required" : "",
            registrationNumber: !formData.registrationNumber ? "Required" : "",
            loginEmail: !emailRegex.test(formData.loginEmail as string || '') ? "Invalid email" : "",
            password: (formData.password as string || '').length < 8 ? "Min 8 characters" : "",
            confirmPassword: formData.confirmPassword !== formData.password ? "Passwords do not match" : ""
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
                <h2 className="text-[36px] text-[#1B1B1B]" style={TYPOGRAPHY.heading}>
                    Corporate Investment Account
                </h2>
                <p className="text-[16px] text-[#2C2C2C] mt-2" style={TYPOGRAPHY.body}>
                    Register your organization to invest in vetted Nigerian startups
                </p>
            </div>

            <div className="space-y-6">
                <div className="pt-2">
                    {COMPANY_FIELDS.map((fieldGroup, idx) => {
                        if ("isGrid" in fieldGroup) {
                            return (
                                <div key={`grid-${idx}`} className="grid grid-cols-2 gap-4">
                                    {fieldGroup.fields.map((field) => {
                                        const fieldName = field.name as keyof typeof formData;
                                        const fieldType = "type" in field ? field.type : "text";

                                        const errorKey = field.name as keyof typeof errors;
                                        const errorMsg = touched[field.name] ? errors[errorKey] : "";

                                        if (fieldType === "select" && "options" in field) {
                                            return (
                                                <SelectInput
                                                    key={field.name}
                                                    label={field.label}
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
                                                type={fieldType}
                                                placeholder={field.placeholder}
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
                        const fieldType = "type" in fieldGroup ? fieldGroup.type : "text";
                        const errorKey = fieldGroup.name as keyof typeof errors;
                        const errorMsg = touched[fieldGroup.name] ? errors[errorKey] : "";

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
        </div>

    )
}