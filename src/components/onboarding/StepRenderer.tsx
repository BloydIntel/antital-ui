import { PersonalStep } from "@/components/onboarding/steps/PersonalStep"
import { EmailStep } from "./steps/EmailStep"
import { InvestorStep } from "./steps/InvestorStep"

export default function StepRenderer({ step }: { step: string }) {
    switch (step) {
        case "personal":
            return <PersonalStep />
        case "email":
            return <EmailStep />
        case "investor":
            return <InvestorStep />
        default:
            return <div>Step UI not ready</div>
    }
}