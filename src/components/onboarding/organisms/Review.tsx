import React from 'react'
import { SquarePen, Trash, CheckCircle2, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { OnboardingButton } from '../molecules/OnboardingButton';

interface ReviewProps {
    onBack: () => void
    onNext: () => void
}

const profileData = [
    {
        id: "personal",
        title: "Personal Information",
        showEdit: true,
        showEditText: true,
        showDelete: false,
        items: [
            { label: "Full Name", value: "John Doe" },
            { label: "Email", value: "johndoe@email.com" },
            { label: "Preferred Name/Alias", value: "John Doe" },
            { label: "Phone Number", value: "+234 90 1234 5678" },
            { label: "Date of Birth", value: "02/08/2025" },
        ],
    },
    {
        id: "location",
        title: "Location Information",
        showEdit: true,
        showEditText: true,
        showDelete: false,
        items: [
            { label: "Nationality", value: "Nigerian" },
            { label: "Country of Residence", value: "Nigeria" },
            { label: "State of Residence", value: "Lagos" },
            { label: "Residential Address", value: "23A Unity Crescent Lekki Phase 1, Lagos State Nigeria." },
        ],
    },
    {
        id: "kyc",
        title: "Identity Verification (KYC)",
        showEdit: true,
        showEditText: false,
        showDelete: true,
        isStatusType: true,
        items: [
            { label: "Uploaded document", value: "Completed" },
            { label: "Selfie verification", value: "Completed" },
            { label: "Income verification", value: "Completed" },
        ],
    },
];

export function Review({ onBack, onNext }: ReviewProps) {
    return (
        <div className="w-full lg:w-[558px] flex flex-col gap-5">
            <div>
                <h2 className="text-[28px] text-[#1B1B1B] leading-tight"
                    style={{
                        fontFamily: "var(--font-rethink-sans)",
                        fontWeight: 500,
                        letterSpacing: "-1%",
                    }}
                >
                    Review & Submit

                </h2>


                <p className="text-[18px] text-[#505050] leading-tight max-w-[500px]"
                    style={{
                        fontFamily: "var(--font-dm-sans)",
                        letterSpacing: "-1%",
                    }}
                >
                    Double check all information before submitting
                </p>
            </div>

            <div className="flex flex-col gap-6 w-full max-w-2xl"
                style={{
                    fontFamily: "var(--font-dm-sans)",
                    letterSpacing: "-1%",
                }}
            >
                {profileData.map((section) => (
                    <div
                        key={section.id}
                        className="p-4 border border-[#EAEAEA] rounded-xl bg-white"
                    >
                        {/* Section Header */}
                        <div className="flex justify-between items-center mb-4 pb-[18px] border-b border-[#EAEAEA]">
                            <h3 className="text-[16px] font-medium text-[#2C2C2C]">
                                {section.title}
                            </h3>
                            <div className="flex items-center gap-3">
                                {section.showEdit && (
                                    <button className={cn("flex items-center gap-2 text-[#A7B832] hover:opacity-80 transition-opacity", section.showEditText === false && "text-[#2C2C2C]")}>
                                        <span className={cn("text-sm font-medium", section.showEditText === false && "hidden")}>Edit</span>
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

                        {/* Section Items */}
                        <div className="flex flex-col gap-3">
                            {section.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-start">
                                    <span className="text-[#858585] text-[14px]">{item.label}</span>

                                    <div className="flex items-center gap-2">
                                        <span className={cn(
                                            "text-[14px] text-right",
                                            section.isStatusType ? "text-[#4A4A4A]" : "text-[#2C2C2C] font-medium"
                                        )}>
                                            {item.value}
                                        </span>

                                        {/* Status Icon for KYC section */}
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

            {/* Info Container */}
            <div className="flex flex-row bg-[#EDF4FC] border border-[#C7DDF6] rounded-sm p-[8px] max-w-[558px]">

                <div className="h-[24px] w-[24px]">
                    <Info className="h-6 w-6 text-[#1B1B1B] text-[#3B73B5] " />
                </div>

                <div className="flex flex-col gap-3 ml-2">

                    <p className="text-[14px] text-[#3B73B5] leading-tight"
                        style={{
                            fontFamily: "var(--font-dm-sans)",
                            letterSpacing: "-1%",
                        }}
                    >
                        Final Submission Notice
                    </p>
                    <p className="text-[12px] text-[#3B73B5] leading-tight"
                        style={{
                            fontFamily: "var(--font-dm-sans)",
                            letterSpacing: "-1%",
                        }}
                    >
                        By submitting this application, you authorize Antital to verify all provided information and conduct background checks on directors and key shareholders.
                    </p>

                </div>

            </div>

            <div className="flex max-w-[558px] items-center justify-between pt-8 pb-10 border-t border-gray-50">
                <OnboardingButton
                    Label='Back'
                    variant="plain"
                    onClick={onBack}
                    className="w-[115px]"
                />

                <OnboardingButton
                    Label="Submit"
                    variant="solid"
                    onClick={onNext}
                    className="flex-row-reverse w-[230px]"
                />
            </div>
        </div>
    )
}
