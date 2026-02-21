import { useOnboardingStore } from "@/store/onboardingStore";
import { KYC_SUB_STEPS } from "@/components/onboarding/subSteps";

export const SubSteps = ({ stepKey, isActive }: { stepKey: string, isActive: boolean }) => {
    const { personalSubStep, setPersonalSubStep, kycSubStep, setKycSubStep } = useOnboardingStore();

    if (!isActive) return null;

    if (stepKey === "personal" || stepKey === "company") {
        const labels = stepKey === "company"
            ? ["Company Details", "Company Address", "Account representative details"]
            : ["Personal Details", "Location Information"];

        return (
            <div className="ml-[64px] mt-1 flex flex-col space-y-1 items-start">
                {labels.map((label, idx) => (
                    <button
                        key={label}
                        onClick={() => setPersonalSubStep(idx)}
                        className={`text-[15px] transition-colors ${personalSubStep >= idx ? "font-medium text-[#4A4A4A]" : "text-[#A8A8A8]"}`}
                    >
                        {label}
                    </button>
                ))}
            </div>
        );
    }

    if (stepKey === "kyc") {
        return (
            <div className="ml-[64px] mt-1 flex flex-col space-y-1 items-start">
                {KYC_SUB_STEPS.map((step, idx) => (
                    <button key={idx} onClick={() => setKycSubStep(idx)} className={`text-[15px] text-left transition-colors ${kycSubStep >= idx ? "font-medium text-[#4A4A4A]" : "text-[#A8A8A8]"}`}>
                        {step.title}
                    </button>
                ))}
            </div>
        );
    }

    return null;
}