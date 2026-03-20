"use client"

import { useMemo, useState } from "react";
import { OnboardingInput } from "@/components/onboarding/molecules/OnboardingInput";
import { SelectInput } from "@/components/onboarding/molecules/SelectInput";
import { House } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { TYPOGRAPHY } from "@/constants/styles";
import { useOnboardingStore } from "@/store/onboardingStore";

interface LocationFormProps {
    showErrors: boolean
    levelLabel?: string
}

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

export function LocationForm({ showErrors, levelLabel }: LocationFormProps) {
    const { formData, updateFormData } = useOnboardingStore();
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

    const getError = (field: keyof typeof errors) =>
        (touched[field] || showErrors) ? errors[field] : "";

    return (
        <div>
            <section className="max-w-[558px]">

                <div className="pt-[32px] flex flex-col gap-1">
                    {levelLabel &&
                        (<p className="text-[24px] text-[#1B1B1B] leading-tight pb-[25px]" style={TYPOGRAPHY.heading}>
                            {levelLabel}
                        </p>)
                    }

                    <SelectInput
                        label="Nationality"
                        options={COUNTRIES}
                        value={formData.nationality}
                        placeholder="Select nationality"
                        error={getError('nationality')}
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
                            error={getError('residence')}
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
                            error={getError('state')}
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
                        error={getError('address')}
                        onChange={(e) => handleChange("address", e.target.value)}
                        onBlur={() => handleBlur("address")}
                    />

                    <div className="grid lg:grid-cols-2 lg:gap-4">
                        <OnboardingInput
                            label="Create Password"
                            type="password"
                            value={formData.password}
                            placeholder="********"
                            error={getError('password')}
                            onChange={(e) => handleChange("password", e.target.value)}
                            onBlur={() => handleBlur("password")}
                        />
                        <OnboardingInput
                            label="Confirm Password"
                            type="password"
                            value={formData.confirmPassword}
                            placeholder="********"
                            error={getError('confirmPassword')}
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
                        {getError('agreed') && (
                            <p className="text-red-500 text-[12px] mt-1">{errors.agreed}</p>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}