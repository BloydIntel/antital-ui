"use client"

import { useEffect, useMemo, useState } from "react"
import { OnboardingInput } from '@/components/onboarding/molecules/OnboardingInput'
import { Calendar } from 'lucide-react'
import { TYPOGRAPHY } from "@/constants/styles"
import { useOnboardingStore } from "@/store/onboardingStore"
import { validateEmail } from "@/lib/onboardingValidation"

interface PersonalDetailsFormProps {
    onValidationChange: (isValid: boolean) => void
}

export function PersonalDetailsForm({ onValidationChange }: PersonalDetailsFormProps) {
    const formData = useOnboardingStore((s) => s.formData);
    const updateFormData = useOnboardingStore((s) => s.updateFormData);

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
            firstName: formData.firstName.trim().length < 2 ? "First name is too short" : "",
            lastName: formData.lastName.trim().length < 2 ? "Last name is too short" : "",
            email: !validateEmail(formData.email) ? "Please enter a valid email address" : "",
            phone: formData.phone.trim().length < 10 ? "Enter a valid phone number" : "",
            dob: !formData.dob ? "Date of birth is required" : ""
        };
    }, [formData]);

    useEffect(() => {
        const isValid = !Object.values(errors).some(error => error !== "");
        onValidationChange(isValid);
    }, [formData, errors, updateFormData, onValidationChange]);

    return (
        <section>
            <div>
                <h2 className="text-[36px] text-[#1B1B1B] leading-tight" style={TYPOGRAPHY.heading}>
                    Start Your Investment Journey
                </h2>
                <p className="text-[16px] text-[#2C2C2C] leading-tight" style={TYPOGRAPHY.body}>
                    Join Nigerians building wealth through startup investing
                </p>
            </div>

            <div className="pt-[32px]">
                <p className="text-[24px] text-[#1B1B1B] leading-tight pb-[25px]" style={TYPOGRAPHY.heading}>
                    Personal Details
                </p>

                <div className="grid lg:grid-cols-2 lg:gap-4">
                    <OnboardingInput
                        label="First Name"
                        placeholder="John"
                        value={formData.firstName}
                        error={touched.firstName ? errors.firstName : ""}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                        onBlur={() => handleBlur("firstName")}
                    />
                    <OnboardingInput
                        label="Last Name"
                        placeholder="Doe"
                        value={formData.lastName}
                        error={touched.lastName ? errors.lastName : ""}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                        onBlur={() => handleBlur("lastName")}
                    />
                </div>

                <OnboardingInput
                    label="Email"
                    type="email"
                    placeholder="johndoe@email.com"
                    value={formData.email}
                    error={touched.email ? errors.email : ""}
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
                        error={touched.phone ? errors.phone : ""}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        onBlur={() => handleBlur("phone")}
                    />
                    <OnboardingInput
                        label="Date of Birth"
                        type="date"
                        value={formData.dob || ""}
                        placeholder="DD/MM/YYYY"
                        icon={Calendar}
                        error={touched.dob ? errors.dob : ""}
                        onChange={(e) => handleChange("dob", e.target.value)}
                        onBlur={() => handleBlur("dob")}
                    />
                </div>
            </div>
        </section>
    );
}