"use client"

import Image from "next/image"
import Link from "next/link"
import { ONBOARDING_STEPS } from "./steps"
import { useOnboardingStore } from "@/store/onboardingStore"

export default function OnboardingSidebar() {

    const currentStep = useOnboardingStore((s) => s.currentStep)

    return (
        <nav className="pl-[66px] pt-[62px]">
            <Image src="/antital_logo.png" alt="Antital Logo" width={80} height={80} className="pb-[50px]" />

            <ul className="space-y-0 lg:h-[516px]">
                {ONBOARDING_STEPS.map((step, index) => {
                    const isActive = currentStep === step.key;
                    const isLast = index === ONBOARDING_STEPS.length - 1;

                    return (
                        <li key={step.key} className="relative pb-8">
                            {/* The Connector Line */}
                            {!isLast && (
                                <div className="absolute left-[15px] top-8 w-[1px] h-full bg-gray-200" />
                            )}

                            <Link
                                href={`/onboarding/${step.key}`}
                                className={`flex items-start gap-4 group ${isActive ? "text-[#0F3D2E] font-semibold" : "text-gray-400"
                                    }`}
                            >
                                {/* Icon Box */}
                                <span
                                    className={`z-10 w-8 h-8 rounded-md flex items-center justify-center shrink-0 transition-colors
              ${isActive ? "bg-[#0F3D2E] text-white" : "text-[#0F3D2E]"}`}
                                >
                                    {/* {step.icon} Assuming your ONBOARDING_STEPS has icon components */}
                                </span>

                                <div className="flex flex-col">
                                    <span className="text-lg leading-7">{step.label}</span>

                                    {/* Sub-paragraphs for Personal step */}
                                    {step.key === "personal" && isActive && (
                                        <div className="mt-2 flex flex-col space-y-1">
                                            <p className="text-sm font-medium text-gray-700">Personal Details</p>
                                            <p className="text-sm text-gray-400">Location Information</p>
                                        </div>
                                    )}
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>

            <Image src="/Onboarding-page-illustration.png" alt="Antital Logo" width={248} height={210} className="pb-[68px]" />

            <p className="text-[#545C19] leading-tight text-[12px]"
                style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontWeight: 400,
                    letterSpacing: "-1%",
                }}

            >Tip: Your information helps us verify your account and keep things secure</p>
        </nav>
    )
}