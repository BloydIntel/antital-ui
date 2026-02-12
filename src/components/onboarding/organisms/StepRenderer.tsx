"use client"

import { StepKey } from "@/components/onboarding/steps"
import { PersonalStep } from "@/components/onboarding/organisms/personal-step/PersonalStep"
import { EmailStep } from "@/components/onboarding/organisms/EmailStep"
import { InvestorStep } from "@/components/onboarding/organisms/investor-step/InvestorStep"
import { IdentityVerification } from "@/components/onboarding/organisms/kyc/IdentityVerification"
import { Review } from "@/components/onboarding/organisms/Review"
import { useRouter } from "next/navigation"
import { AccountActivation } from "@/components/onboarding/organisms/AccountActivation"

interface StepRendererProps {
    step: StepKey
}

export default function StepRenderer({ step }: StepRendererProps) {

    const router = useRouter()

    switch (step) {
        case "personal":
            return <PersonalStep />
        case "email":
            return <EmailStep onNext={() => router.push('/onboarding/investor')} />
        case "investor":
            return <InvestorStep onNext={() => router.push('/onboarding/kyc')} />
        case "kyc":
            return <IdentityVerification onNext={() => router.push('/onboarding/review')} />
        case "review":
            return <Review onBack={() => router.push('/onboarding/kyc')} onNext={() => router.push('/onboarding/activation')} />
        case "activation":
            return <AccountActivation />
        default:
            return null
    }
}