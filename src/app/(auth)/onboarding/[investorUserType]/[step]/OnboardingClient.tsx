"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import StepRenderer from "@/components/onboarding/organisms/StepRenderer"
import { ONBOARDING_CONFIG, StepKey, isKnownOnboardingStep, InvestorUserType, isInvestorUserType, ALLOWED_STEP_BEFORE_VERIFICATION } from "@/constants/steps"
import { AllowedStepBeforeVerify, useOnboardingStore } from "@/store/onboardingStore"
import { useUserStore } from "@/store/userStore"
import { tokenStorage } from "@/lib/token-storage"
import { getUserIdFromAccessToken } from "@/lib/jwt"
import authService from "@/services/authService"
import onboardingService from "@/services/onboardingService"
import userService from "@/services/userService"
import {
    buildFormPatchFromOnboarding,
    buildFormPatchFromUserProfile,
    mapOnboardingStepToUiStep,
} from "@/lib/onboarding-hydration"

const LAST_ALLOWED_STEP_KEY = "onboarding_lastAllowedStep"

interface Props {
    step: string;
    investorUserType: string;
}

export function OnboardingClient({ step, investorUserType }: Props) {
    const router = useRouter()

    const type: InvestorUserType = isInvestorUserType(investorUserType)
        ? investorUserType
        : "individual"

    const {
        setCurrentStep,
        setLastAllowedStep,
        emailVerified,
        setEmailVerified,
        setInvestorUserType,
        updateFormData,
        formData,
    } = useOnboardingStore()
    const [isAuthResolved, setIsAuthResolved] = useState(false);
    const [isHydrationResolved, setIsHydrationResolved] = useState(false);

    const configData = useMemo(() => {
        const STEPS = ONBOARDING_CONFIG[type]
        const FIRST_STEP = STEPS[0].key as StepKey;
        const REQUIRING_VERIFICATION = STEPS
            .map(s => s.key as StepKey)
            .filter(key => !ALLOWED_STEP_BEFORE_VERIFICATION.includes(key));

        return { FIRST_STEP, ALLOWED_STEP_BEFORE_VERIFICATION, REQUIRING_VERIFICATION }
    }, [type])

    const isValid = isKnownOnboardingStep(step, type);
    const stepKey = step as StepKey;
    const isRestricted = !emailVerified && configData.REQUIRING_VERIFICATION.includes(stepKey);

    useEffect(() => {
        let cancelled = false;

        const bootstrapAuth = async () => {
            const refreshToken = tokenStorage.getRefreshToken();
            if (!refreshToken) {
                if (!cancelled) setIsAuthResolved(true);
                return;
            }

            try {
                const data = await authService.refresh(refreshToken);
                tokenStorage.setAccessToken(data.token);
                if (data.refreshToken) tokenStorage.setRefreshToken(data.refreshToken);
                if (!cancelled) {
                    setEmailVerified(data.isEmailVerified);
                    useUserStore.getState().updateProfile({
                        isEmailVerified: data.isEmailVerified,
                        emailAddress: data.email,
                    });
                }
            } catch {
                // Ignore bootstrap errors; existing route guard will handle access.
            } finally {
                if (!cancelled) setIsAuthResolved(true);
            }
        };

        void bootstrapAuth();

        return () => {
            cancelled = true;
        };
    }, [setEmailVerified, stepKey]);

    useEffect(() => {
        let cancelled = false;

        const hydrateOnboarding = async () => {
            if (!isAuthResolved) return;

            if (type !== "individual" && type !== "corporate" && type !== "fundraiser") {
                if (!cancelled) setIsHydrationResolved(true);
                return;
            }

            if (!cancelled) setIsHydrationResolved(false);

            try {
                if (emailVerified && configData.REQUIRING_VERIFICATION.includes(stepKey)) {
                    const onboarding = await onboardingService.getOnboarding();
                    if (!cancelled) {
                        updateFormData(buildFormPatchFromOnboarding(onboarding));
                        const serverStep = mapOnboardingStepToUiStep(onboarding.currentStep, type);
                        setCurrentStep(serverStep);
                    }
                } else if (
                    configData.ALLOWED_STEP_BEFORE_VERIFICATION.includes(stepKey)
                    && !formData.email
                    && !formData.loginEmail
                    && !formData.firstName
                    && !formData.companyName
                ) {
                    // After logout/login (or store reset), refill signup details from the user API.
                    const userId = getUserIdFromAccessToken(tokenStorage.getAccessToken());
                    if (userId != null) {
                        const profile = await userService.getById(userId);
                        if (!cancelled) {
                            updateFormData(buildFormPatchFromUserProfile(profile));
                            useUserStore.getState().updateProfile({
                                emailAddress: profile.email,
                                firstName: profile.firstName,
                                lastName: profile.lastName,
                                isEmailVerified: profile.isEmailVerified,
                                userType: type,
                            });
                            setEmailVerified(profile.isEmailVerified);
                        }
                    }
                }
            } catch {
                // Keep the current route even if hydration fails; user can continue.
            } finally {
                if (!cancelled) setIsHydrationResolved(true);
            }
        };

        void hydrateOnboarding();

        return () => {
            cancelled = true;
        };
    }, [
        isAuthResolved,
        type,
        emailVerified,
        configData,
        stepKey,
        updateFormData,
        setCurrentStep,
        setEmailVerified,
        formData.email,
        formData.loginEmail,
        formData.firstName,
        formData.companyName,
    ]);

    useEffect(() => {
        if (!isAuthResolved || !isHydrationResolved) return;

        setInvestorUserType(type)

        // If route is nonsense, go to start
        if (!isValid) {
            router.replace(`/onboarding/${type}/${configData.FIRST_STEP}`)
            return
        }

        // If route is valid but locked behind email verification
        if (isRestricted) {
            const stored = typeof window !== "undefined" ? sessionStorage.getItem(LAST_ALLOWED_STEP_KEY) : null

            const targetStep = (stored && isKnownOnboardingStep(stored, type) && configData.ALLOWED_STEP_BEFORE_VERIFICATION.includes(stored as StepKey))
                ? (stored as StepKey)
                : configData.FIRST_STEP

            router.replace(`/onboarding/${type}/${targetStep}`)
            return
        }

        // Only update store if we are on a valid, allowed step
        setCurrentStep(stepKey)

        if (configData.ALLOWED_STEP_BEFORE_VERIFICATION.includes(stepKey)) {
            setLastAllowedStep(stepKey as AllowedStepBeforeVerify)
            sessionStorage.setItem(LAST_ALLOWED_STEP_KEY, stepKey)
        }
    }, [
        isValid,
        isRestricted,
        stepKey,
        type,
        emailVerified,
        router,
        configData,
        setCurrentStep,
        setInvestorUserType,
        setLastAllowedStep,
        isAuthResolved,
        isHydrationResolved
    ])

    if (!isAuthResolved || !isHydrationResolved || !isValid || isRestricted) return null;

    return (
        <StepRenderer
            step={stepKey}
            investorUserTypeFromUrl={type}
        />
    )
}
