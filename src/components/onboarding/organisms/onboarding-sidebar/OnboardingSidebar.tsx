"use client"

import React, { useEffect, useMemo } from "react"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { ONBOARDING_CONFIG, InvestorUserType, StepKey, isKnownOnboardingStep, OnboardingStep } from "@/components/onboarding/steps"
import { useOnboardingStore } from "@/store/onboardingStore"
import { SubSteps } from "@/components/onboarding/organisms/onboarding-sidebar/subSteps"

export default function OnboardingSidebar() {
    const router = useRouter()
    const pathname = usePathname()


    const {
        currentStep,
        lastAllowedStep,
        investorUserType,
        emailVerified,
        setCurrentStep,
        setLastAllowedStep,
        setInvestorUserType
    } = useOnboardingStore()

    const pathParts = useMemo(() => pathname.split("/"), [pathname])

    const typeFromUrl = pathParts[2] as InvestorUserType
    const stepKeyFromUrl = pathParts[pathParts.length - 1] as StepKey

    const activeType = investorUserType || typeFromUrl || "individual"
    const steps = (ONBOARDING_CONFIG[activeType] || ONBOARDING_CONFIG.individual) as OnboardingStep[]

    useEffect(() => {
        if (typeFromUrl && investorUserType !== typeFromUrl) {
            setInvestorUserType(typeFromUrl);
        }

        if (isKnownOnboardingStep(stepKeyFromUrl, activeType) && stepKeyFromUrl !== currentStep) {
            setCurrentStep(stepKeyFromUrl);
        }

        const basicSteps = ["personal", "company", "email"];
        if (basicSteps.includes(stepKeyFromUrl) && lastAllowedStep !== stepKeyFromUrl) {
            setLastAllowedStep(stepKeyFromUrl as "personal" | "company" | "email");
            sessionStorage.setItem("onboarding_lastAllowedStep", stepKeyFromUrl);
        }

    }, [
        stepKeyFromUrl,
        typeFromUrl,
        investorUserType,
        currentStep,
        lastAllowedStep,
        activeType,
        setInvestorUserType,
        setCurrentStep,
        setLastAllowedStep
    ]);

    const handleMainStepClick = (stepKey: StepKey) => {
        router.push(`/onboarding/${activeType}/${stepKey}`)
    }

    const currentStepIndex = steps.findIndex(s => s.key === currentStep)

    const stepsToShow = emailVerified ? steps : steps.slice(0, 2)

    const getStepAssets = () => {
        if (currentStep === "kyc") return "/onboarding/kyc-illustration.png"
        if (currentStep === "activation") return "/onboarding/account-activation-illustration.png"
        return "/onboarding/Onboarding-page-illustration.png"
    }

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
                {stepsToShow.map((step, index) => {
                    const fullIndex = steps.findIndex(s => s.key === step.key)
                    const isCompletedOrActive = fullIndex <= currentStepIndex
                    const isCurrentPage = currentStep === step.key
                    const isLast = index === stepsToShow.length - 1

                    const hasActiveSubsteps = isCurrentPage && step.hasSubsteps;

                    return (
                        <li
                            key={step.key}
                            className={`relative transition-all duration-300 ${hasActiveSubsteps ? "pb-2" : "pb-4"}`}
                        >
                            {!isLast && (
                                <div
                                    className={`absolute left-[24px] top-[48px] bottom-0 w-[1.5px] -translate-x-1/2 transition-colors duration-500 
                                    ${fullIndex < currentStepIndex ? "bg-[#042E27]" : "bg-[#D1D5DB]"}`}
                                />
                            )}

                            <div className="flex items-center gap-4">
                                <div className={`z-10 w-[48px] h-[48px] rounded-md flex items-center justify-center shrink-0 transition-all duration-300 
                                    ${isCompletedOrActive
                                        ? "bg-[#042E27] text-white shadow-lg shadow-black/5"
                                        : " text-[#042E27] border"
                                    }`}>
                                    <step.icon className="w-6 h-6" />
                                </div>

                                <button
                                    onClick={() => handleMainStepClick(step.key as StepKey)}
                                    className={`transition-colors flex items-center h-[48px] text-left
                                        ${isCompletedOrActive ? "text-[#042E27] font-medium" : "text-[#858585] hover:text-[#042E27]"}`}
                                >
                                    <span className="text-[18px] leading-none block font-[family-name:var(--font-dm-sans)] cursor-pointer tracking-[-1%]">
                                        {step.label}
                                    </span>
                                </button>
                            </div>

                            <SubSteps stepKey={step.key} isActive={isCurrentPage} />
                        </li>
                    )
                })}
            </ul>

            <div className="mt-auto pb-10">
                <div className="w-[198px] h-[168px] relative">
                    <Image
                        src={getStepAssets()}
                        alt="Illustration"
                        fill
                        className="object-contain"
                        priority
                        unoptimized
                    />
                </div>
                <p className="text-[#545C19] leading-tight text-[12px] w-[279px] pt-[24px] opacity-80 font-[family-name:var(--font-dm-sans)]">
                    Tip: Your information helps us verify your account and keep things secure
                </p>
            </div>
        </nav>
    )
}