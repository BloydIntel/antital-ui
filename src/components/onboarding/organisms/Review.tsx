"use client"

import React from 'react'
import { SquarePen, Trash, CheckCircle2, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton'
import { PERSONAL_SUB_STEPS, KYC_SUB_STEPS } from '@/components/onboarding/subSteps'
import { InvestorUserType, ONBOARDING_CONFIG } from '@/components/onboarding/steps'
import { useOnboardingStore } from '@/store/onboardingStore'
import { useRouter } from 'next/navigation'

interface ReviewProps {
    onBack: () => void
    onNext: () => void
}

export function Review({ onBack, onNext }: ReviewProps) {
    const router = useRouter();

    // Get state and actions from store
    const { formData, setCurrentStep, setPersonalSubStep, setKycSubStep, investorUserType } = useOnboardingStore();

    const stepsConfig = ONBOARDING_CONFIG[investorUserType as InvestorUserType];

    const kycStepLabel = stepsConfig.find(s => s.key === 'kyc')?.label || "Identity Verification";

    const baseUrl = `/onboarding/${investorUserType}`

    const handleEdit = (sectionId: string) => {
        switch (sectionId) {
            case "personal":
                setCurrentStep("personal");
                setPersonalSubStep(0);
                router.push(`${baseUrl}/personal`);
                break;
            case "location":
                setCurrentStep("personal");
                setPersonalSubStep(1);
                router.push(`${baseUrl}/personal`);
                break;
            case "kyc":
                setCurrentStep("kyc");
                setKycSubStep(0); // This won't crash now!
                router.push(`${baseUrl}/kyc`);
                break;
            default:
                console.warn(`No route defined for section: ${sectionId}`);
        }
    };

    const profileData = [
        {
            id: "personal",
            title: PERSONAL_SUB_STEPS[0].title,
            showEdit: true,
            showEditText: true,
            showDelete: false,
            items: [
                { label: "Full Name", value: `${formData.firstName} ${formData.lastName}`.trim() || "Not set" },
                { label: "Email", value: formData.email || "Not set" },
                { label: "Preferred Name/Alias", value: formData.alias || "Not set" },
                { label: "Phone Number", value: formData.phone || "Not set" },
                { label: "Date of Birth", value: formData.dob || "Not set" },
            ],
        },
        {
            id: "location",
            title: PERSONAL_SUB_STEPS[1].title,
            showEdit: true,
            showEditText: true,
            showDelete: false,
            items: [
                { label: "Nationality", value: formData.nationality || "Not set" },
                { label: "Country of Residence", value: formData.residence || "Not set" },
                { label: "State of Residence", value: formData.state || "Not set" },
                { label: "Residential Address", value: formData.address || "Not set" },
            ],
        },
        {
            id: "kyc",
            title: kycStepLabel,
            showEdit: true,
            showEditText: false,
            showDelete: true,
            isStatusType: true,
            items: [
                { label: KYC_SUB_STEPS[0].title, value: "Completed" },
                { label: KYC_SUB_STEPS[1].title, value: "Completed" },
                { label: KYC_SUB_STEPS[2].title, value: "Completed" },
            ],
        },
    ];

    return (
        <div className="w-full lg:w-[558px] flex flex-col gap-5">
            <div>
                <h2 className="text-[28px] text-[#1B1B1B] leading-tight font-medium"
                    style={{ fontFamily: "var(--font-rethink-sans)", letterSpacing: "-1%" }}>
                    Review & Submit
                </h2>
                <p className="text-[18px] text-[#505050] leading-tight mt-1"
                    style={{ fontFamily: "var(--font-dm-sans)", letterSpacing: "-1%" }}>
                    Double check all information before submitting
                </p>
            </div>

            <div className="flex flex-col gap-6 w-full" style={{ fontFamily: "var(--font-dm-sans)" }}>
                {profileData.map((section) => (
                    <div key={section.id} className="p-4 border border-[#EAEAEA] rounded-xl bg-white">
                        <div className="flex justify-between items-center mb-4 pb-[18px] border-b border-[#EAEAEA]">
                            <h3 className="text-[16px] font-medium text-[#2C2C2C]">{section.title}</h3>
                            <div className="flex items-center gap-3">
                                {section.showEdit && (
                                    <button
                                        onClick={() => handleEdit(section.id)}
                                        className={cn(
                                            "flex items-center gap-2 text-[#A7B832] hover:opacity-70 transition-all",
                                            !section.showEditText && "text-[#2C2C2C]"
                                        )}
                                    >
                                        {section.showEditText && <span className="text-sm font-medium">Edit</span>}
                                        <SquarePen size={16} />
                                    </button>
                                )}
                                {section.showDelete && (
                                    <button className="text-[#2C2C2C] hover:text-red-500 transition-colors">
                                        <Trash size={18} />
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            {section.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-start gap-4">
                                    <span className="text-[#858585] text-[14px] whitespace-nowrap">{item.label}</span>
                                    <div className="flex items-center gap-2">
                                        <span className={cn(
                                            "text-[14px] text-right break-words",
                                            section.isStatusType ? "text-[#4A4A4A]" : "text-[#2C2C2C] font-medium"
                                        )}>
                                            {item.value}
                                        </span>
                                        {section.isStatusType && item.value === "Completed" && (
                                            <CheckCircle2 size={16} className="text-[#3EA34B]" />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Info Box */}
            <div className="flex flex-row bg-[#EDF4FC] border border-[#C7DDF6] rounded-lg p-4">
                <Info className="h-5 w-5 text-[#3B73B5] shrink-0 mt-0.5" />
                <div className="ml-3">
                    <p className="text-[14px] font-medium text-[#3B73B5] mb-1">Final Submission Notice</p>
                    <p className="text-[12px] text-[#3B73B5] leading-relaxed">
                        By submitting this application, you authorize Antital to verify all provided information and conduct background checks on directors and key shareholders.
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between pt-8 pb-10 border-t border-[#EAEAEA]">
                <OnboardingButton
                    label='Back'
                    variant="plain"
                    onClick={onBack}
                    className="w-[115px]"
                />
                <OnboardingButton
                    label="Submit"
                    variant="solid"
                    onClick={onNext}
                    className="w-[230px]"
                />
            </div>
        </div>
    )
}