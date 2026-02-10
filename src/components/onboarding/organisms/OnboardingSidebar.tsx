"use client"

import Image from "next/image"
import Link from "next/link"
import { ONBOARDING_STEPS } from "../steps"
import { useOnboardingStore } from "@/store/onboardingStore"

export default function OnboardingSidebar() {
    const currentStep = useOnboardingStore((s) => s.currentStep)

    const isKYCStage = currentStep === "kyc"
    const illustrationSrc = isKYCStage
        ? "/onboarding/kyc-illustration.png"
        : "/onboarding/Onboarding-page-illustration.png"

    return (
        <nav className="flex flex-col justify-items-start pl-[66px] pt-[20px] pr-[34px] bg-[#F7FBF4] min-h-screen">
            <Image
                src="/antital_logo.png"
                alt="Antital Logo"
                width={80}
                height={80}
                className="pb-[20px]"
            />

            <ul className="space-y-0">
                {ONBOARDING_STEPS.map((step, index) => {
                    const isActive = currentStep === step.key
                    const isLast = index === ONBOARDING_STEPS.length - 1

                    return (
                        <li key={step.key} className="relative pb-4">
                            {!isLast && (
                                <div
                                    className="absolute left-[24px] top-[48px] bottom-0 w-[1.5px] bg-[#D1D5DB] -translate-x-1/2"
                                />
                            )}

                            <div className="flex items-center gap-4">
                                <div
                                    className={`z-10 w-[48px] h-[48px] rounded-md flex items-center justify-center shrink-0 transition-colors
                                        ${isActive ? "bg-[#042E27] text-white" : "text-[#042E27]"}`}
                                >
                                    <step.icon className="w-6 h-6" />
                                </div>

                                <Link
                                    href={`/onboarding/${step.key}`}
                                    className={`transition-colors flex items-center h-[48px] ${isActive ? "text-[#042E27] font-semibold" : "text-[#858585]"
                                        }`}
                                >
                                    <span
                                        className="text-[18px] leading-none block"
                                        style={{
                                            fontFamily: "var(--font-dm-sans)",
                                            letterSpacing: "-1%",
                                        }}
                                    >
                                        {step.label}
                                    </span>
                                </Link>
                            </div>

                            {/* --- CONDITIONAL SUB-LABELS --- */}

                            {/* Personal Details Sub-labels */}
                            {step.key === "personal" && isActive && (
                                <div className="ml-[64px] mt-1 flex flex-col space-y-2">
                                    <p className="text-[15px] font-medium text-[#4A4A4A]">Personal Details</p>
                                    <p className="text-[15px] text-[#A8A8A8]">Location Information</p>
                                </div>
                            )}

                            {/* KYC Sub-labels */}
                            {step.key === "kyc" && isActive && (
                                <div className="ml-[64px] mt-1 flex flex-col space-y-2">
                                    <p className="text-[15px] font-medium text-[#4A4A4A]">Upload your document</p>
                                    <p className="text-[15px] text-[#A8A8A8]">Selfie verification</p>
                                    <p className="text-[15px] text-[#A8A8A8]">Income verification</p>
                                </div>
                            )}
                        </li>
                    )
                })}
            </ul>

            <div className="mt-auto pb-10">
                <div className="w-[198px] h-[168px] relative">
                    <Image
                        src={illustrationSrc}
                        alt="Onboarding Illustration"
                        fill
                        className="object-contain"
                    />
                </div>
                <p
                    className="text-[#545C19] leading-tight text-[12px] w-[279px] pt-[24px] opacity-80"
                    style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontWeight: 400,
                        letterSpacing: "-1%",
                    }}
                >
                    &quot;Tip: Ensure your documents are valid and not expired for faster verification.&quot;
                </p>
            </div>
        </nav>
    )
}