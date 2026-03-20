"use client"

import { useMemo, useState } from "react"
import { OnboardingInput } from '@/components/onboarding/molecules/OnboardingInput'
import { Calendar } from 'lucide-react'
import { TYPOGRAPHY } from "@/constants/styles"
import { useOnboardingStore } from "@/store/onboardingStore"
import { validateEmail } from "@/lib/onboardingValidation"

interface PersonalDetailsFormProps {
    showErrors?: boolean
    levelLabel?: string
}

type DetailsFields = 'firstName' | 'lastName' | 'email' | 'phone' | 'dob';

export function PersonalDetailsForm({ showErrors, levelLabel }: PersonalDetailsFormProps) {
    const { formData, updateFormData } = useOnboardingStore();

    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const handleChange = (field: keyof typeof formData, value: string) => {
        updateFormData({ [field]: value });
    };

    const handleBlur = (field: string) => {
        setTouched(prev => ({ ...prev, [field]: true }));
    };

    // Validation Rules
    const errors = useMemo(() => {
        return {
            firstName: !formData.firstName ? "First name is required" : "",
            lastName: !formData.lastName ? "Last name is required" : "",
            email: !validateEmail(formData.email) ? "Please enter a valid email address" : "",
            phone: formData.phone.trim().length < 10 ? "Enter a valid phone number" : "",
            dob: !formData.dob ? "Date of birth is required" : ""
        };
    }, [formData]);

    const getError = (field: DetailsFields): string =>
        (touched[field] || showErrors) ? errors[field] : "";

    return (
        <section>

            <div className="pt-[32px]">
                {levelLabel &&
                    (<p className="text-[24px] text-[#1B1B1B] leading-tight pb-[25px]" style={TYPOGRAPHY.heading}>
                        {levelLabel}
                    </p>)
                }

                <div className="grid lg:grid-cols-2 lg:gap-4">
                    <OnboardingInput
                        label="First Name"
                        placeholder="John"
                        value={formData.firstName}
                        error={getError('firstName')}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                        onBlur={() => handleBlur("firstName")}
                    />
                    <OnboardingInput
                        label="Last Name"
                        placeholder="Doe"
                        value={formData.lastName}
                        error={getError('lastName')}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                        onBlur={() => handleBlur("lastName")}
                    />
                </div>

                <OnboardingInput
                    label="Email"
                    type="email"
                    placeholder="johndoe@email.com"
                    value={formData.email}
                    error={getError('email')}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                />

                <OnboardingInput
                    label="Preferred Name/Alias"
                    placeholder="John Doe"
                    value={formData.alias}
                    onChange={(e) => handleChange("alias", e.target.value)}
                />

                <div className="grid lg:grid-cols-2 lg:gap-4">
                    <OnboardingInput
                        label="Phone Number"
                        type="tel"
                        placeholder="+234 90 1234 5678"
                        value={formData.phone}
                        error={getError('phone')}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        onBlur={() => handleBlur("phone")}
                    />
                    <OnboardingInput
                        label="Date of Birth"
                        type="date"
                        value={formData.dob || ""}
                        placeholder="DD/MM/YYYY"
                        icon={Calendar}
                        error={getError('dob')}
                        onChange={(e) => handleChange("dob", e.target.value)}
                        onBlur={() => handleBlur("dob")}
                    />
                </div>
            </div>
        </section>
    );
}