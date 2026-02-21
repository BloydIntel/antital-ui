import { StepKey } from "@/components/onboarding/steps"

type dataType = {
    nationality?: string
    state?: string
    verified?: boolean
    category?: string
    documentsUploaded?: boolean
    acceptedTerms?: boolean
}

export function validateStep(step: StepKey, data: dataType): boolean {
    switch (step) {
        case "personal":
            return !!data?.nationality && !!data?.state

        case "email":
            return data?.verified === true

        case "investor":
            return !!data?.category

        case "kyc":
            return data?.documentsUploaded === true

        case "review":
            return data?.acceptedTerms === true

        case "activation":
            return true

        case "company":
            return true

        default:
            return false
    }
}