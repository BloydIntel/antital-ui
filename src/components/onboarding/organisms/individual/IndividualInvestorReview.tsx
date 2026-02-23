"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useOnboardingStore } from "@/store/onboardingStore"
import { ReviewCard } from "@/components/onboarding/molecules/ReviewCard"
import { PERSONAL_SUB_STEPS, KYC_SUB_STEPS } from "@/components/onboarding/subSteps"

export function IndividualInvestorReview() {
    const router = useRouter();
    const {
        formData,
        investorUserType,
        setCurrentStep,
        setPersonalSubStep,
        setKycSubStep
    } = useOnboardingStore();

    const handleEdit = (sectionId: string) => {
        const baseUrl = `/onboarding/${investorUserType}`;

        if (sectionId === "kyc") {
            setCurrentStep("kyc");
            setKycSubStep(0);
            router.push(`${baseUrl}/kyc`);
        } else {
            setCurrentStep("personal");
            // If section is location, go to sub-step 1, else sub-step 0
            setPersonalSubStep(sectionId === "location" ? 1 : 0);
            router.push(`${baseUrl}/personal`);
        }
    };

    return (
        <div className="flex flex-col gap-6 w-full font-[family-name:var(--font-dm-sans)]">
            {/* Section 1: Personal Details */}
            <ReviewCard
                title={PERSONAL_SUB_STEPS[0].title}
                sectionId="personal"
                onEditClick={() => handleEdit("personal")}
                items={[
                    { label: "Full Name", value: `${formData.firstName} ${formData.lastName}`.trim() || "Not set" },
                    { label: "Email", value: formData.email },
                    { label: "Preferred Name/Alias", value: formData.alias },
                    { label: "Phone Number", value: formData.phone },
                    { label: "Date of Birth", value: formData.dob },
                ]}
            />

            {/* Section 2: Location Information */}
            <ReviewCard
                title={PERSONAL_SUB_STEPS[1].title}
                sectionId="location"
                onEditClick={() => handleEdit("location")}
                items={[
                    { label: "Nationality", value: formData.nationality },
                    { label: "Country of Residence", value: formData.residence },
                    { label: "State of Residence", value: formData.state },
                    { label: "Residential Address", value: formData.address },
                ]}
            />

            {/* Section 3: Identity Verification */}
            <ReviewCard
                title="Identity Verification"
                sectionId="kyc"
                isStatusType
                onEditClick={() => handleEdit("kyc")}
                items={[
                    { label: KYC_SUB_STEPS[0].title, value: "Completed" },
                    { label: KYC_SUB_STEPS[1].title, value: "Completed" },
                    { label: KYC_SUB_STEPS[2].title, value: "Completed" },
                ]}
            />
        </div>
    );
}