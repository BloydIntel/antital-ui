"use client"

import React, { useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { ONBOARDING_CONFIG, InvestorUserType, StepKey, isKnownOnboardingStep, OnboardingStep, ALLOWED_STEP_BEFORE_VERIFICATION } from "@/constants/steps"
import { AllowedStepBeforeVerify, useOnboardingStore } from "@/store/onboardingStore"
import { SubSteps } from "@/components/onboarding/organisms/onboarding-sidebar/subSteps"
import { toast } from "sonner"
import { LogOut } from "lucide-react"
import useLogout from "@/hooks/use-logout"

const HIGHEST_STEP_KEY = "onboarding_highestStepIndex"

export default function OnboardingSidebar() {
    const router = useRouter()
    const pathname = usePathname()
    const logoutMutation = useLogout()


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
    const steps = (ONBOARDING_CONFIG[activeType] || ONBOARDING_CONFIG.individual) as readonly OnboardingStep[];

    useEffect(() => {
        if (typeFromUrl && investorUserType !== typeFromUrl) {
            setInvestorUserType(typeFromUrl);
        }

        if (isKnownOnboardingStep(stepKeyFromUrl, activeType) && stepKeyFromUrl !== currentStep) {
            setCurrentStep(stepKeyFromUrl);
        }

        if (ALLOWED_STEP_BEFORE_VERIFICATION.includes(stepKeyFromUrl) && lastAllowedStep !== stepKeyFromUrl) {
            setLastAllowedStep(stepKeyFromUrl as AllowedStepBeforeVerify);
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

    const isInReviewLockPhase = ["review", "activation", "application-submitted"].includes(currentStep);

    const currentStepIndex = steps.findIndex(s => s.key === currentStep);

    // Keep the farthest step reached so users can edit earlier steps (e.g. personal)
    // after email verify without locking later steps in the sidebar.
    const [highestStepIndex, setHighestStepIndex] = React.useState(currentStepIndex);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const stored = Number(sessionStorage.getItem(HIGHEST_STEP_KEY) ?? "-1");
        const fromStorage = Number.isFinite(stored) ? stored : -1;
        const next = Math.max(currentStepIndex, fromStorage, highestStepIndex);
        if (next !== highestStepIndex) {
            setHighestStepIndex(next);
        }
        if (currentStepIndex >= 0 && currentStepIndex > fromStorage) {
            sessionStorage.setItem(HIGHEST_STEP_KEY, String(currentStepIndex));
        }
    }, [currentStepIndex, highestStepIndex]);

    const isMenuLockedStep = (stepKey: StepKey): boolean => {
        // After email verify, personal/company/email stay editable from the menu.
        if (emailVerified && ALLOWED_STEP_BEFORE_VERIFICATION.includes(stepKey)) {
            return false;
        }

        // Once user reaches review/final stage, keep navigation on the current stage.
        if (isInReviewLockPhase && stepKey !== currentStep) {
            return true;
        }

        // Prevent navigating to future steps that haven't been reached yet.
        const stepIndex = steps.findIndex(s => s.key === stepKey);
        if (stepIndex > highestStepIndex) {
            return true;
        }

        return false;
    };

    const handleMainStepClick = (stepKey: StepKey) => {
        const stepIndex = steps.findIndex(s => s.key === stepKey);
        if (isMenuLockedStep(stepKey)) {
            if (isInReviewLockPhase) {
                toast.info("Navigation is locked at application review stage.");
            } else if (stepIndex > highestStepIndex) {
                toast.info("Please complete the current step before proceeding.");
            }
            return;
        }
        router.push(`/onboarding/${activeType}/${stepKey}`)
    }

    const stepsToShow = emailVerified ? steps : steps.slice(0, 2)

    const getStepAssets = () => {

        const fundraiserPaymentSteps = ["application-fee", "application-submitted"];


        if (activeType === "fundraiser") {
            if (fundraiserPaymentSteps.includes(currentStep) || currentStep === "review") {
                return "/onboarding/onboading-payment-stage.png";
            }
        }

        if (currentStep === "kyc") return "/onboarding/kyc-illustration.png";
        if (currentStep === "activation") return "/onboarding/account-activation-illustration.png";


        return "/onboarding/Onboarding-page-illustration.png";
    };

    return (
        <nav className="flex flex-col justify-items-start pl-[66px] pt-[20px] pr-[34px] bg-[#F7FBF4] min-h-screen border-r border-gray-100">
            <Link href="/" aria-label="Go to landing page" className="inline-flex pb-[20px]">
                <Image
                    src="/icons/antital.svg"
                    alt="Antital Logo"
                    width={80}
                    height={80}
                />
            </Link>

            <ul className="space-y-0">
                {stepsToShow.map((step, index) => {
                    const fullIndex = steps.findIndex(s => s.key === step.key)
                    const isCompletedOrActive = fullIndex <= currentStepIndex
                    const isCurrentPage = currentStep === step.key
                    const isLast = index === stepsToShow.length - 1
                    const isLocked = isMenuLockedStep(step.key as StepKey)

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
                                    disabled={isLocked}
                                    className={`transition-colors flex items-center h-[48px] text-left
                                        ${isCompletedOrActive ? "text-[#042E27] font-medium" : "text-[#858585] hover:text-[#042E27]"}
                                        ${isLocked ? "opacity-50 cursor-not-allowed hover:text-[#858585]" : ""}`}
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

            <div className="mt-auto pb-10 pl-6">
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
                <button
                    type="button"
                    onClick={() => logoutMutation.mutate()}
                    disabled={logoutMutation.isPending}
                    className="mt-6 flex items-center gap-2 text-[14px] text-[#042E27] hover:underline disabled:opacity-60 font-[family-name:var(--font-dm-sans)] cursor-pointer"
                >
                    <LogOut className="h-4 w-4" />
                    {logoutMutation.isPending ? "Logging out…" : "Log out"}
                </button>
            </div>
        </nav>
    )
}