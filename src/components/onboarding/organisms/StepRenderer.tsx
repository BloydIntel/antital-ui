import { PersonalStep } from "@/components/onboarding/organisms/personal-step/PersonalStep"
import { EmailStep } from "@/components/onboarding/organisms/EmailStep"
import { InvestorStep } from "@/components/onboarding/organisms/investor-step/InvestorStep"
import { IdentityVerification } from "@/components/onboarding/organisms//kyc/IdentityVerification"
import { useRouter } from "next/navigation"

export default function StepRenderer({ step }: { step: string }) {

    const router = useRouter()

    switch (step) {
        case "personal":
            return <PersonalStep />
        case "email":
            return <EmailStep onNext={() => router.push('/onboarding/investor')} />
        case "investor":
            return <InvestorStep onNext={() => router.push('/onboarding/kyc')} />
        case "kyc":
            return <IdentityVerification />
        default:
            return <div>Step UI not ready</div>
    }
}