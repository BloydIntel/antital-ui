"use client"

import React, { useEffect } from "react"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { ONBOARDING_STEPS } from "../steps"
import { useOnboardingStore } from "@/store/onboardingStore"

export default function OnboardingSidebar() {
    const router = useRouter()
    const pathname = usePathname()

    const {
        currentStep,
        personalSubStep,
        kycSubStep,
        setPersonalSubStep,
        setKycSubStep,
        setCurrentStep
    } = useOnboardingStore()

    useEffect(() => {
        const pathSegments = pathname.split("/")
        const lastSegment = pathSegments[pathSegments.length - 1]
        const isValidStep = ONBOARDING_STEPS.some(s => s.key === lastSegment)

        if (isValidStep && lastSegment !== currentStep) {
            setCurrentStep(lastSegment)
        }
    }, [pathname, currentStep, setCurrentStep])

    const handleMainStepClick = (stepKey: string) => {
        setCurrentStep(stepKey)
        router.push(`/onboarding/${stepKey}`)
    }

    const getStepAssets = () => {
        switch (currentStep) {
            case "email":
                return { src: "/onboarding/account-activation-illustration.png" }
            case "kyc":
                return { src: "/onboarding/kyc-illustration.png" }
            case "activation":
                return { src: "/onboarding/account-activation-illustration.png" }
            default:
                return { src: "/onboarding/Onboarding-page-illustration.png" }
        }
    }

    const { src: illustrationSrc } = getStepAssets()

    const currentStepIndex = ONBOARDING_STEPS.findIndex(s => s.key === currentStep)

    // GLOBAL CHECK: If the current page is one that shows sub-steps, 
    // we set the padding for ALL labels to pb-2. Otherwise, pb-6.
    const isShowingSubSteps = currentStep === "personal" || currentStep === "kyc"

    return (
        <nav className="flex flex-col justify-items-start pl-[66px] pt-[20px] pr-[34px] bg-[#F7FBF4] min-h-screen border-r border-gray-100">
            <Image
                src="/antital_logo.png"
                alt="Antital Logo"
                width={80}
                height={80}
                className="pb-[20px]"
            />

            <ul className="space-y-0">
                {ONBOARDING_STEPS.map((step, index) => {
                    const isCompletedOrActive = index <= currentStepIndex
                    const isCurrentPage = currentStep === step.key
                    const isLast = index === ONBOARDING_STEPS.length - 1

                    return (
                        <li
                            key={step.key}
                            // Every label now shares the same padding state
                            className={`relative transition-all duration-300 ${isShowingSubSteps ? "pb-2" : "pb-6"}`}
                        >
                            {!isLast && (
                                <div className={`absolute left-[24px] top-[48px] bottom-0 w-[1.5px] -translate-x-1/2 ${index < currentStepIndex ? "bg-[#042E27]" : "bg-[#D1D5DB]"}`} />
                            )}

                            <div className="flex items-center gap-4">
                                <div
                                    className={`z-10 w-[48px] h-[48px] rounded-md flex items-center justify-center shrink-0 transition-all duration-300
                                        ${isCompletedOrActive ? "bg-[#042E27] text-white shadow-lg shadow-black/5" : "text-[#042E27]"}`}
                                >
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

                            {/* Personal Sub-steps */}
                            {step.key === "personal" && isCurrentPage && (
                                <div className="ml-[64px] mt-1 flex flex-col space-y-1 items-start">
                                    <button
                                        onClick={() => setPersonalSubStep(0)}
                                        className={`text-[15px] transition-colors cursor-pointer ${personalSubStep >= 0 ? "font-medium text-[#4A4A4A]" : "text-[#A8A8A8] hover:text-[#4A4A4A]"}`}
                                    >
                                        Personal Details
                                    </button>
                                    <button
                                        onClick={() => setPersonalSubStep(1)}
                                        className={`text-[15px] transition-colors cursor-pointer ${personalSubStep >= 1 ? "font-medium text-[#4A4A4A]" : "text-[#A8A8A8] hover:text-[#4A4A4A]"}`}
                                    >
                                        Location Information
                                    </button>
                                </div>
                            )}

                            {/* KYC Sub-steps */}
                            {step.key === "kyc" && isCurrentPage && (
                                <div className="ml-[64px] mt-1 flex flex-col space-y-1 items-start">
                                    {[
                                        { label: 'Upload your document', idx: 0 },
                                        { label: 'Selfie verification', idx: 1 },
                                        { label: 'Income verification', idx: 2 }
                                    ].map((sub) => (
                                        <button
                                            key={sub.idx}
                                            onClick={() => setKycSubStep(sub.idx)}
                                            className={`text-[15px] text-left transition-colors cursor-pointer ${kycSubStep >= sub.idx ? "font-medium text-[#4A4A4A]" : "text-[#A8A8A8] hover:text-[#4A4A4A]"}`}
                                        >
                                            {sub.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </li>
                    )
                })}
            </ul>

            <div className="mt-auto pb-10">
                <div className=" w-[198px] h-[168px] relative ml-8">
                    <Image
                        src={illustrationSrc}
                        alt="Onboarding Illustration"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
                <p className="text-[#545C19] leading-tight text-[12px] w-[279px] pt-[24px] opacity-80 font-[family-name:var(--font-dm-sans)] tracking-[-1%]">
                    Tip: Your information helps us verify your account and keep things secure
                </p>
            </div>
        </nav>
    )
}