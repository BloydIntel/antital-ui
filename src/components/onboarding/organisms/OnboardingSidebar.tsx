"use client"

import React, { useEffect } from "react"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { ONBOARDING_STEPS, StepKey, isKnownOnboardingStep } from "@/components/onboarding/steps"
import { useOnboardingStore } from "@/store/onboardingStore"
import { KYC_SUB_STEPS } from "@/components/onboarding/subSteps"

const LAST_ALLOWED_STEP_KEY = "onboarding_lastAllowedStep"

export default function OnboardingSidebar() {
    const router = useRouter()
    const pathname = usePathname()

    const currentStep = useOnboardingStore((state) => state.currentStep)
    const personalSubStep = useOnboardingStore((state) => state.personalSubStep)
    const kycSubStep = useOnboardingStore((state) => state.kycSubStep)
    const emailVerified = useOnboardingStore((state) => state.emailVerified)

    const setCurrentStep = useOnboardingStore((state) => state.setCurrentStep)
    const setPersonalSubStep = useOnboardingStore((state) => state.setPersonalSubStep)
    const setKycSubStep = useOnboardingStore((state) => state.setKycSubStep)
    const setLastAllowedStep = useOnboardingStore((state) => state.setLastAllowedStep)

    useEffect(() => {
        const urlPathParts = pathname.split("/")
        const stepKeyFromUrl = urlPathParts[urlPathParts.length - 1]

        if (isKnownOnboardingStep(stepKeyFromUrl) && stepKeyFromUrl !== currentStep) {
            setCurrentStep(stepKeyFromUrl)
        }

        if (stepKeyFromUrl === "personal" || stepKeyFromUrl === "email") {
            setLastAllowedStep(stepKeyFromUrl)
            sessionStorage.setItem(LAST_ALLOWED_STEP_KEY, stepKeyFromUrl)
        }
    }, [pathname, currentStep, setCurrentStep, setLastAllowedStep])

    const handleMainStepClick = (stepKey: StepKey) => {
        setCurrentStep(stepKey)
        router.push(`/onboarding/individual/${stepKey}`)
    }

    const currentStepIndex = ONBOARDING_STEPS.findIndex(s => s.key === currentStep)

    const stepsToShow = emailVerified
        ? ONBOARDING_STEPS
        : ONBOARDING_STEPS.slice(0, 2)

    const isShowingSubSteps = currentStep === "personal" || currentStep === "kyc"

    const getStepAssets = () => {
        switch (currentStep) {
            case "kyc":
                return { src: "/onboarding/kyc-illustration.png" }
            case "activation":
                return { src: "/onboarding/account-activation-illustration.png" }
            default:
                return { src: "/onboarding/Onboarding-page-illustration.png" }
        }
    }

    return (
        <nav className="flex flex-col justify-items-start pl-[66px] pt-[20px] pr-[34px] bg-[#F7FBF4] min-h-screen border-r border-gray-100">
            <Image src="/antital.png" alt="Antital Logo" width={80} height={80} className="pb-[20px]" />

            <ul className="space-y-0">
                {stepsToShow.map((step, index) => {
                    const fullIndex = ONBOARDING_STEPS.findIndex(s => s.key === step.key)
                    const isCompletedOrActive = fullIndex <= currentStepIndex
                    const isCurrentPage = currentStep === step.key
                    const isLast = index === stepsToShow.length - 1

                    return (
                        <li
                            key={step.key}
                            className={`relative transition-all duration-300 ${isShowingSubSteps ? "pb-2" : "pb-6"}`}
                        >
                            {!isLast && (
                                <div className={`absolute left-[24px] top-[48px] bottom-0 w-[1.5px] -translate-x-1/2 ${fullIndex < currentStepIndex ? "bg-[#042E27]" : "bg-[#D1D5DB]"}`} />
                            )}

                            <div className="flex items-center gap-4">
                                <div className={`z-10 w-[48px] h-[48px] rounded-md flex items-center justify-center shrink-0 transition-all duration-300 ${isCompletedOrActive ? "bg-[#042E27] text-white shadow-lg shadow-black/5" : "text-[#042E27]"}`}>
                                    <step.icon className="w-6 h-6" />
                                </div>

                                <button
                                    onClick={() => handleMainStepClick(step.key)}
                                    className={`transition-colors flex items-center h-[48px] ${isCompletedOrActive ? "text-[#042E27] font-semibold" : "text-[#858585] hover:text-[#042E27]"}`}
                                >
                                    <span className="text-[18px] leading-none block font-[family-name:var(--font-dm-sans)] cursor-pointer tracking-[-1%] text-left">
                                        {step.label}
                                    </span>
                                </button>
                            </div>

                            {/* Sub-steps Logic */}
                            {step.key === "personal" && isCurrentPage && (
                                <div className="ml-[64px] mt-1 flex flex-col space-y-1 items-start">
                                    <button onClick={() => setPersonalSubStep(0)} className={`text-[15px] transition-colors ${personalSubStep >= 0 ? "font-medium text-[#4A4A4A]" : "text-[#A8A8A8]"}`}>Personal Details</button>
                                    <button onClick={() => setPersonalSubStep(1)} className={`text-[15px] transition-colors ${personalSubStep >= 1 ? "font-medium text-[#4A4A4A]" : "text-[#A8A8A8]"}`}>Location Information</button>
                                </div>
                            )}

                            {step.key === "kyc" && isCurrentPage && (
                                <div className="ml-[64px] mt-1 flex flex-col space-y-1 items-start">
                                    {KYC_SUB_STEPS.map((step, idx) => (
                                        <button key={idx} onClick={() => setKycSubStep(idx)} className={`text-[15px] text-left transition-colors ${kycSubStep >= idx ? "font-medium text-[#4A4A4A]" : "text-[#A8A8A8]"}`}>
                                            {step.title}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </li>
                    )
                })}
            </ul>

            <div className="mt-auto pb-10">
                <div className="w-[198px] h-[168px] relative">
                    <Image src={getStepAssets().src} alt="Illustration" fill className="object-contain" priority unoptimized />
                </div>
                <p className="text-[#545C19] leading-tight text-[12px] w-[279px] pt-[24px] opacity-80">
                    Tip: Your information helps us verify your account and keep things secure
                </p>
            </div>
        </nav>
    )
}