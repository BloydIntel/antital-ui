import { PersonalStep } from "@/components/onboarding/organisms/PersonalStep"
import { EmailStep } from "./EmailStep"
import { InvestorStep } from "./InvestorStep"
import { IdentityVerification } from "./IdentityVerification"
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