"use client"

import React from "react"
import { useParams, useRouter } from "next/navigation"
import { useOnboardingStore } from "@/store/onboardingStore"
import { ReviewCard } from "@/components/onboarding/molecules/ReviewCard"
import { InvestorUserType } from "@/constants/steps"

export function FundraiserReview() {
    const router = useRouter();
    const params = useParams();

    const {
        formData,
        investorUserType,
        setCurrentStep,
        setFundraiserCompanySubStep,
        setKycSubStep
    } = useOnboardingStore();

    const activeType = (params?.investorUserType as InvestorUserType) || investorUserType || "fundraiser";


    const handleEdit = (section: "representative-kyc" | "company-documentation" | "details" | "address") => {
        const baseUrl = `/onboarding/${activeType}`;

        switch (section) {
            case "representative-kyc":
                setCurrentStep("representative-kyc");
                setKycSubStep(1);
                router.push(`${baseUrl}/representative-kyc`);
                break;

            case "company-documentation":
                setCurrentStep("company-documentation");
                router.push(`${baseUrl}/company-documentation`);
                break;

            case "details":
                setCurrentStep("company");
                setFundraiserCompanySubStep(0);
                router.push(`${baseUrl}/company`);
                break;

            case "address":
                setCurrentStep("company");
                setFundraiserCompanySubStep(1);
                router.push(`${baseUrl}/company`);
                break;

            default:
                break;
        }
    };

    return (
        <div className="flex flex-col gap-6 w-full font-[family-name:var(--font-dm-sans)]">

            <ReviewCard
                title="Company Detail"
                sectionId="details"
                onEditClick={() => handleEdit("details")}
                items={[
                    { label: "Company Legal Name", value: formData.companyName },
                    { label: "Trading/Brand Name", value: formData.brandName },
                    { label: "Registration Type", value: formData.registrationType },
                    { label: "Registration Number", value: formData.registrationNumber },
                ]}
            />

            <ReviewCard
                title="Company Address"
                sectionId="address"
                onEditClick={() => handleEdit("address")}
                items={[
                    { label: "Date of Registration", value: formData.registrationDate },
                    { label: "Company Website", value: formData.companyWebsite },
                    { label: "Business Address", value: formData.businessAddress },
                    { label: "Registered Business Address", value: formData.registeredAddress },
                    { label: "Company email", value: formData.companyEmail },
                    { label: "Company Phone", value: formData.companyPhone },
                ]}
            />

            <ReviewCard
                title="Offering Documents and Disclosure"
                sectionId="company-documentation"
                isStatusType
                onEditClick={() => handleEdit("company-documentation")}
                items={[
                    { label: "Business Description", value: formData.businessDescription },
                    { label: "Business Sector", value: formData.businessSector },
                    { label: "Business Size", value: formData.businessSize },
                    { label: "Investment Rounds", value: formData.investmentRound },
                ]}
            />

            <ReviewCard
                title="Fundraiser Requirement"
                sectionId="representative-kyc"
                isStatusType
                onEditClick={() => handleEdit("representative-kyc")}
                items={[
                    { label: "Uploaded document", value: "Completed" },
                    { label: "Payment of Application Fee", value: formData.applicationFeePaid ? "Completed" : "Payment Pending" },
                ]}
            />


        </div>
    );
}