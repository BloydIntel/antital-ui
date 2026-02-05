"use client"

import Image from "next/image"
import Link from "next/link"
import { ONBOARDING_STEPS } from "./steps"
import { useOnboardingStore } from "@/store/onboardingStore"

export default function OnboardingSidebar() {
    const currentStep = useOnboardingStore((s) => s.currentStep)

    return (
        <nav className="pl-[66px] pt-[62px] pr-[34px] bg-[#F7FBF4] min-h-screen">
            <Image
                src="/antital_logo.png"
                alt="Antital Logo"
                width={80}
                height={80}
                className="pb-[50px]"
            />

            <ul className="space-y-0">
                {ONBOARDING_STEPS.map((step, index) => {
                    const isActive = currentStep === step.key
                    const isLast = index === ONBOARDING_STEPS.length - 1

                    return (
                        <li key={step.key} className="relative pb-4">
                            {/* Connector Line - Moved here to span the full LI height */}
                            {!isLast && (
                                <div
                                    className="absolute left-[24px] top-[48px] bottom-0 w-[1.5px] bg-[#D1D5DB] -translate-x-1/2"
                                />
                            )}

                            {/* Main Row: Centered Icon and Label */}
                            <div className="flex items-center gap-4">
                                {/* Icon Square */}
                                <div
                                    className={`z-10 w-[48px] h-[48px] rounded-md flex items-center justify-center shrink-0 transition-colors
                                        ${isActive ? "bg-[#042E27] text-white" : "text-[#042E27]"}`}
                                >
                                    <step.icon className="w-6 h-6" />
                                </div>

                                {/* Label */}
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

                            {/* Sub-labels Row: Offset to align under the Label */}
                            {step.key === "personal" && isActive && (
                                <div className="ml-[64px] mt-1 flex flex-col space-y-2">
                                    <p className="text-[15px] font-medium text-[#4A4A4A]">
                                        Personal Details
                                    </p>
                                    <p className="text-[15px] text-[#A8A8A8]">
                                        Location Information
                                    </p>
                                </div>
                            )}
                        </li>
                    )
                })}
            </ul>

            <div className="mt-10">
                <Image
                    src="/Onboarding-page-illustration.png"
                    alt="Onboarding Illustration"
                    width={248}
                    height={210}
                    className="pb-[40px]"
                />
                <p
                    className="text-[#545C19] leading-tight text-[12px] w-[279px] pb-[24px] opacity-80"
                    style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontWeight: 400,
                        letterSpacing: "-1%",
                    }}
                >
                    Tip: Your information helps us verify your account and keep things secure
                </p>
            </div>
        </nav>
    )
}