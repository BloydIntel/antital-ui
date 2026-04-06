"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Info } from 'lucide-react'
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton'
import { useOnboardingStore } from '@/store/onboardingStore'
import { tokenStorage } from '@/lib/token-storage'
import authService from '@/services/authService'
import onboardingService from '@/services/onboardingService'
import { ApiError } from '@/lib/api-error'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { buildFormPatchFromOnboarding, mapOnboardingStepToUiStep } from '@/lib/onboarding-hydration'

interface EmailStepProps {
    onNext: () => void;
}

const bodyStyle = {
    fontFamily: "var(--font-dm-sans)",
    letterSpacing: "-1%",
}

const otherMessage = {
    paragraph1: '"Antital undertakes thorough due diligence on all issuers and offerings, assessing key business, compliance, and governance factors to help ensure that only qualified projects are presented to investors. Our processes are designed to promote transparency and uphold regulatory standards in line with Nigerian SEC requirements.',
    paragraph2: '  However, crowdfunding investments remain high-risk and speculative. Returns or profits are not guaranteed, and you may lose some or all of the funds you invest. While offerings on this platform are genuine, undergo rigorous due diligence and are conducted in compliance with Nigerian SEC regulations, these measures do not eliminate investment risk."'
}

const fundraiserMessage = {
    paragraph1: 'By proceeding, you acknowledge that raising funds through this platform is subject to regulatory requirements under the Nigerian SEC Crowdfunding Rules. All issuers must provide complete, accurate, and truthful information during onboarding, due diligence, and throughout the fundraising campaign. Submitting false, misleading, or incomplete disclosures may result in regulatory sanctions, campaign rejection, suspension, or legal consequences.',
    paragraph2: 'Approval to list your offering does not guarantee successful fundraising, investor participation, or future business performance. You are responsible for ongoing compliance,  timely updates, and transparent communication with investors before, during, and after the campaign.'
}

export function EmailStep({ onNext }: EmailStepProps) {
    const { setEmailVerified, investorUserType, formData, updateFormData, setCurrentStep } = useOnboardingStore()
    const [isVerifying, setIsVerifying] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleVerifyEmail = async () => {
        const refreshToken = tokenStorage.getRefreshToken();
        if (!refreshToken) {
            toast.error("Session expired. Please sign in again.");
            return;
        }

        setIsVerifying(true);
        try {
            const data = await authService.refresh(refreshToken);
            tokenStorage.setAccessToken(data.token);
            if (data.refreshToken) tokenStorage.setRefreshToken(data.refreshToken);

            if (data.isEmailVerified) {
                setEmailVerified(true);

                // For this integration slice, hydrate only individual onboarding from backend progress.
                if (investorUserType !== "individual") {
                    onNext();
                    return;
                }

                try {
                    const onboarding = await onboardingService.getOnboarding();
                    updateFormData(buildFormPatchFromOnboarding(onboarding));
                    const nextStep = mapOnboardingStepToUiStep(onboarding.currentStep);
                    setCurrentStep(nextStep);
                    router.push(`/onboarding/individual/${nextStep}`);
                } catch (hydrateError) {
                    if (hydrateError instanceof ApiError) toast.error(hydrateError.primaryMessage);
                    else if (hydrateError instanceof Error) toast.error(hydrateError.message);
                    else toast.error("Could not load saved onboarding data. Continuing with current flow.");
                    onNext();
                }
            } else {
                toast.error("Email not verified yet. Check your inbox and click the verification link.");
            }
        } catch (error) {
            if (error instanceof ApiError) toast.error(error.primaryMessage);
            else if (error instanceof Error) toast.error(error.message);
            else toast.error("Unable to verify email status.");
        } finally {
            setIsVerifying(false);
        }
    }

    const handleResendVerification = async () => {
        if (!formData.email) {
            toast.error("Email address is missing. Go back and complete personal details.");
            return;
        }

        setIsResending(true);
        try {
            await authService.resendVerification(formData.email);
            toast.success("Verification email resent. Check your inbox.");
        } catch (error) {
            if (error instanceof ApiError) toast.error(error.primaryMessage);
            else if (error instanceof Error) toast.error(error.message);
            else toast.error("Unable to resend verification email.");
        } finally {
            setIsResending(false);
        }
    };

    const handleDeleteAccount = async () => {
        const refreshToken = tokenStorage.getRefreshToken();
        if (!refreshToken) {
            tokenStorage.clear();
            router.push("/sign-in");
            return;
        }

        setIsDeleting(true);
        try {
            const data = await authService.refresh(refreshToken);
            tokenStorage.setAccessToken(data.token);
            if (data.refreshToken) tokenStorage.setRefreshToken(data.refreshToken);

            await authService.deleteAccount(data.userId);
            tokenStorage.clear();
            setEmailVerified(false);
            toast.success("Account deleted.");
            router.push("/sign-in");
        } catch (error) {
            if (error instanceof ApiError) toast.error(error.primaryMessage);
            else if (error instanceof Error) toast.error(error.message);
            else toast.error("Unable to delete account.");
        } finally {
            setIsDeleting(false);
        }
    }

    const isFundraiser = investorUserType === 'fundraiser';

    return (
        <section>
            <div className="flex flex-col items-center">
                <Image
                    src="/onboarding/caution-icon.png"
                    alt="Caution Illustration"
                    width={80}
                    height={80}
                />

                <h4 className="text-[24px] text-[#1F1F1F] leading-none pt-[16px]"
                    style={{
                        fontWeight: 500,
                        ...bodyStyle,
                    }}

                >
                    Caution
                </h4>

                <p className="text-[16px] text-[#858585] leading-none py-[8px]"
                    style={{
                        ...bodyStyle,
                    }}
                >
                    Important Information please read carefully before proceeding
                </p>

                <div className="max-w-[558px] p-[24px] text-center border border-[#E6E6E6] rounded-lg mt-2 gap-6 flex flex-col">
                    <p className="text-[15px] text-[#858585] leading-tight"
                        style={{
                            ...bodyStyle,
                        }}
                    >
                        {isFundraiser ? fundraiserMessage.paragraph1 : otherMessage.paragraph1}
                    </p>

                    <p className="text-[15px] text-[#858585] leading-tight"
                        style={{
                            ...bodyStyle,
                        }}
                    >
                        {isFundraiser ? fundraiserMessage.paragraph2 : otherMessage.paragraph2}
                    </p>
                </div>

                {/* Info Container */}
                <div className="flex flex-row mt-[24px] bg-[#EDF4FC] border border-[#C7DDF6] rounded-sm p-[8px] max-w-[558px]">

                    <div className="h-[24px] w-[24px]">
                        <Info className="h-4 lg:h-6 w-4 lg:w-6 text-[#3B73B5] shrink-0" />
                    </div>

                    <div className="flex flex-col gap-3 ml-2">

                        <p className="text-[12px] lg:text-[14px] text-[#3B73B5] leading-tight"
                            style={{
                                ...bodyStyle,
                            }}
                        >
                            We&apos;ve sent a verification link to your email address. Please check your inbox and click the link to verify your email address.
                        </p>
                        <p className="text-[14px] text-[#3B73B5] leading-tight"
                            style={{
                                ...bodyStyle,
                            }}
                        >
                            Didn&apos;t receive the email? Check your spam folder or click{" "}
                            <button
                                type="button"
                                onClick={handleResendVerification}
                                disabled={isResending || isVerifying || isDeleting}
                                style={{ fontWeight: 700 }}
                            >
                                here
                            </button>{" "}
                            to resend
                        </p>

                    </div>

                </div>

                <div className="grid grid-cols-2 gap-4 w-full">
                    <OnboardingButton
                        label={isDeleting ? "Deleting..." : "Delete Account"}
                        variant="plain"
                        onClick={handleDeleteAccount}
                        disabled={isDeleting || isVerifying || isResending}
                    />
                    <OnboardingButton
                        label={isVerifying ? "Checking..." : "Verify Email"}
                        onClick={handleVerifyEmail}
                        disabled={isVerifying || isResending || isDeleting}
                    />
                </div>

            </div>

        </section>
    )
}