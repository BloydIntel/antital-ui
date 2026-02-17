"use client"

import React from 'react'
import Image from 'next/image'
import { Info } from 'lucide-react'
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton'
import { useOnboardingStore } from '@/store/onboardingStore'

interface EmailStepProps {
    onNext: () => void;
}

const bodyStyle = {
    fontFamily: "var(--font-dm-sans)",
    letterSpacing: "-1%",
}

export function EmailStep({ onNext }: EmailStepProps) {
    const setEmailVerified = useOnboardingStore((state) => state.setEmailVerified)

    const handleVerifyEmail = () => {
        setEmailVerified(true)
        onNext()
    }
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
                        &quot;Antital undertakes thorough due diligence on all issuers and offerings, assessing key business, compliance, and governance factors to help ensure that only qualified projects are presented to investors. Our processes are designed to promote transparency and uphold regulatory standards in line with Nigerian SEC requirements.
                    </p>

                    <p className="text-[15px] text-[#858585] leading-tight"
                        style={{
                            ...bodyStyle,
                        }}
                    >
                        However, crowdfunding investments remain high-risk and speculative. Returns or profits are not guaranteed, and you may lose some or all of the funds you invest. While offerings
                        on this platform are genuine, undergo rigorous due diligence and are conducted in compliance with Nigerian SEC regulations, these measures do not eliminate investment risk.&quot;
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
                            Didn&apos;t receive the email? Check your spam folder or click <a href="#" style={{ fontWeight: 700 }}>here</a> to resend
                        </p>

                    </div>

                </div>

                <div className="grid grid-cols-2 gap-4 w-full">
                    <OnboardingButton label="Delete Account" variant="plain" />
                    <OnboardingButton label="Verify Email" onClick={handleVerifyEmail} />
                </div>

            </div>

        </section>
    )
}