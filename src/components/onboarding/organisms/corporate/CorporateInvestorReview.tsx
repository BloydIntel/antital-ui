"use client"

import React from "react"
import { useParams, useRouter } from "next/navigation"
import { useOnboardingStore } from "@/store/onboardingStore"
import { ReviewCard } from "@/components/onboarding/molecules/ReviewCard"
import { InvestorUserType } from "@/constants/steps"

function formatTextField(value: string | undefined | null): string {
    return value?.trim() ? value : "Pending";
}

function formatUploadField(value: File | string | null | undefined): string {
    if (value instanceof File && value.size > 0) return "Uploaded";
    if (typeof value === "string" && value.trim()) return "Uploaded";
    return "Pending";
}

export function CorporateInvestorReview() {
    const router = useRouter();
    const params = useParams();

    const {
        formData,
        investorUserType,
        setCurrentStep,
        setCompanySubStep,
        setKycSubStep
    } = useOnboardingStore();

    const activeType = (params?.investorUserType as InvestorUserType) || investorUserType || "corporate";

    const isQII = formData.selectedCategoryId === "qii";
    const answers = formData.questionnaireAnswers;

    const getAnswer = (partialLabel: string) => {
        const fullKey = Object.keys(answers).find(key =>
            key.toLowerCase().includes(partialLabel.toLowerCase())
        );
        return fullKey ? answers[fullKey] : "Not set";
    };

    const handleEdit = (section: "company" | "categorization" | "kyc") => {
        const baseUrl = `/onboarding/${activeType}`;

        switch (section) {
            case "kyc":
                setCurrentStep("kyc");
                setKycSubStep(0);
                router.push(`${baseUrl}/kyc`);
                break;

            case "categorization":
                setCurrentStep("categorization");
                router.push(`${baseUrl}/categorization`);
                break;

            case "company":
                setCurrentStep("company");
                setCompanySubStep(0);
                router.push(`${baseUrl}/company`);
                break;

            default:
                break;
        }
    };

    return (
        <div className="flex flex-col gap-6 w-full font-[family-name:var(--font-dm-sans)]">
            {/* Section 1: Company Information */}
            <ReviewCard
                title="Company Information"
                sectionId="company"
                onEditClick={() => handleEdit("company")}
                items={[
                    { label: "Legal Name", value: formData.companyName },
                    { label: "Registration", value: formData.registrationNumber },
                    { label: "Sector", value: "No input field" },
                    { label: "Website", value: formData.companyWebsite },
                    { label: "Categorization Type", value: isQII ? "Qualified Institutional Investor" : "Other Corporate Investor" },
                ]}
            />

            {/* Section 2: Dynamic Investment Profile */}
            <ReviewCard
                title="Corporate Categorization / Investment Profile"
                sectionId="categorization"
                onEditClick={() => handleEdit("categorization")}
                items={isQII ? [
                    { label: "Categorization Type", value: "Qualified Institutional Investor" },
                    { label: "Institution Type", value: getAnswer("type of institutional entity") },
                    { label: "Licensed QII", value: getAnswer("valid registration or license") },
                    { label: "Investment Mandate", value: getAnswer("approved investment mandate") },
                    { label: "SEC Nigeria Confirmation", value: getAnswer("meets the SEC Nigeria criteria") },
                ] : [
                    { label: "Categorization Type", value: "Other Corporate Investor" },
                    { label: "Board Mandate", value: getAnswer("Board resolution or internal approval") },
                    { label: "Net Asset Value", value: getAnswer("approximate net asset value") },
                    { label: "Financial Capacity", value: getAnswer("financial capacity to withstand loss") },
                    { label: "Risk Understanding", value: getAnswer("understand that crowdfunding investments are high-risk") },
                    { label: "Professional Access", value: getAnswer("access to qualified investment professionals") },
                ]}
            />

            {/* Section 3: Shared KYC/Docs */}
            <ReviewCard
                title="Account Verification KYC"
                sectionId="kyc"
                isStatusType
                onEditClick={() => handleEdit("kyc")}
                items={[
                    { label: "ID Type", value: formatTextField(formData.kycData.idType) },
                    { label: "ID Number", value: formatTextField(formData.kycData.idNumber) },
                    { label: "Address", value: formatTextField(formData.kycData.address) },
                    ...(isQII ? [{ label: "Proof of Address", value: formatUploadField(formData.kycData.addressFile) }] : []),
                    { label: "Selfie", value: formatUploadField(formData.kycData.selfie) },
                ]}
            />

            <ReviewCard
                title="Documentation"
                sectionId="kyc"
                isStatusType
                onEditClick={() => handleEdit("kyc")}
                items={[
                    { label: "Government ID", value: formatUploadField(formData.kycData.idFile) },
                    { label: "Proof of Address", value: formatUploadField(formData.kycData.addressFile) },
                    { label: "Recent status report document", value: formatUploadField(formData.kycData.statusReport) },
                    ...(isQII
                        ? [{ label: "Proof of QII License", value: formatUploadField(formData.kycData.qiiLicense) }]
                        : [{ label: "Incorporation Certificate", value: formatUploadField(formData.kycData.incorporationCertificate) }]),
                    { label: "Board Resolution", value: formatUploadField(formData.kycData.boardResolution) },
                ]}
            />


        </div>
    );
}