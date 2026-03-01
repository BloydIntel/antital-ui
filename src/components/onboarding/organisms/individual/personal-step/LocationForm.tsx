"use client"

import { useEffect, useMemo, useState } from "react";
import { OnboardingInput } from "@/components/onboarding/molecules/OnboardingInput";
import { SelectInput } from "@/components/onboarding/molecules/SelectInput";
import { House } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { TYPOGRAPHY } from "@/constants/styles";
import { useOnboardingStore } from "@/store/onboardingStore";

const COUNTRIES = [
    { label: "Nigeria", value: "nigeria" },
    { label: "Ghana", value: "ghana" },
    { label: "Kenya", value: "kenya" },
    { label: "South Africa", value: "south_africa" },
    { label: "Egypt", value: "egypt" },
    { label: "Cameroon", value: "cameroon" },
];

const NIGERIAN_STATES = [
    { label: "Lagos", value: "lagos" },
    { label: "Abuja", value: "abuja" },
    { label: "Rivers", value: "rivers" },
    { label: "Kano", value: "kano" },
    { label: "Oyo", value: "oyo" },
    { label: "Kaduna", value: "kaduna" },
    { label: "Ogun", value: "ogun" },
    { label: "Edo", value: "edo" },
];

export function LocationForm({ onValidationChange }: { onValidationChange: (isValid: boolean) => void }) {
    const formData = useOnboardingStore((s) => s.formData);
    const updateFormData = useOnboardingStore((s) => s.updateFormData);

    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const handleChange = (field: keyof typeof formData, value: string | boolean) => {
        updateFormData({ [field]: value });
    };

    const handleBlur = (field: string) => {
        setTouched(prev => ({ ...prev, [field]: true }));
    };

    const errors = useMemo(() => ({
        nationality: !formData.nationality ? "Nationality is required" : "",
        residence: !formData.residence ? "Country of residence is required" : "",
        state: !formData.state ? "State is required" : "",
        address: formData.address.trim().length <= 5 ? "Please enter a full residential address" : "",
        password: formData.password.length < 8 ? "Password must be at least 8 characters" : "",
        confirmPassword: formData.confirmPassword !== formData.password ? "Passwords do not match" : "",
        agreed: !formData.agreed ? "You must agree to the terms" : ""
    }), [formData]);

    useEffect(() => {
        const isValid = !Object.values(errors).some(err => err !== "");
        onValidationChange(isValid);
    }, [errors, onValidationChange, formData, updateFormData]);

    return (
        <div>
            <section className="max-w-[558px]">
                <div>
                    <h2 className="text-[36px] text-[#1B1B1B] leading-tight" style={TYPOGRAPHY.heading}>
                        Start Your Investment Journey
                    </h2>
                    <p className="text-[16px] text-[#2C2C2C] leading-tight" style={TYPOGRAPHY.body}>
                        Join Nigerians building wealth through startup investing
                    </p>
                </div>

                <div className="pt-[32px] flex flex-col gap-1">
                    <p className="text-[24px] text-[#1B1B1B] leading-tight pb-[9px]" style={TYPOGRAPHY.heading}>
                        Location Information
                    </p>

                    <SelectInput
                        label="Nationality"
                        options={COUNTRIES}
                        value={formData.nationality}
                        placeholder="Select nationality"
                        error={touched.nationality ? errors.nationality : ""}
                        onChange={(val) => {
                            handleChange("nationality", val);
                            handleBlur("nationality");
                        }}
                    />

                    <div className="grid lg:grid-cols-2 lg:gap-4">
                        <SelectInput
                            label="Country of Residence"
                            options={COUNTRIES}
                            value={formData.residence}
                            placeholder="Select country"
                            error={touched.residence ? errors.residence : ""}
                            onChange={(val) => {
                                handleChange("residence", val);
                                handleBlur("residence");
                            }}
                        />
                        <SelectInput
                            label="State of Residence"
                            options={NIGERIAN_STATES}
                            value={formData.state}
                            placeholder="Select state"
                            error={touched.state ? errors.state : ""}
                            onChange={(val) => {
                                handleChange("state", val);
                                handleBlur("state");
                            }}
                        />
                    </div>

                    <OnboardingInput
                        label="Residential Address"
                        value={formData.address}
                        placeholder="23A Unity Crescent Lekki Phase 1..."
                        icon={House}
                        error={touched.address ? errors.address : ""}
                        onChange={(e) => handleChange("address", e.target.value)}
                        onBlur={() => handleBlur("address")}
                    />

                    <div className="grid lg:grid-cols-2 lg:gap-4">
                        <OnboardingInput
                            label="Create Password"
                            type="password"
                            value={formData.password}
                            placeholder="********"
                            error={touched.password ? errors.password : ""}
                            onChange={(e) => handleChange("password", e.target.value)}
                            onBlur={() => handleBlur("password")}
                        />
                        <OnboardingInput
                            label="Confirm Password"
                            type="password"
                            value={formData.confirmPassword}
                            placeholder="********"
                            error={touched.confirmPassword ? errors.confirmPassword : ""}
                            onChange={(e) => handleChange("confirmPassword", e.target.value)}
                            onBlur={() => handleBlur("confirmPassword")}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="terms"
                                className="border-[#042E27] data-[state=checked]:bg-[#042E27]"
                                checked={formData.agreed}
                                onCheckedChange={(checked) => handleChange("agreed", !!checked)}
                            />
                            <label htmlFor="terms" className="text-[14px] text-[#505050] cursor-pointer" style={TYPOGRAPHY.body}>
                                I agree to the Terms of Service and acknowledge the Trading Policies.
                            </label>
                        </div>
                        {touched.agreed && errors.agreed && (
                            <span className="text-red-500 text-[12px]">{errors.agreed}</span>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}