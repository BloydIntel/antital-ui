import { useOnboardingStore } from "@/store/onboardingStore";
import { CORPORATE_KYC_HEADERS, KYC_SUB_STEPS } from "@/components/onboarding/subSteps";
import { CORPORATE_CATEGORIES } from "@/constants/investorCategories"

export const SubSteps = ({ stepKey, isActive }: { stepKey: string, isActive: boolean }) => {
    const {
        personalSubStep, setPersonalSubStep,
        companySubStep, setCompanySubStep,
        kycSubStep, setKycSubStep,
        formData, investorUserType
    } = useOnboardingStore();
    if (!isActive) return null;

    if (!isActive) return null;

    if (stepKey === "personal" || stepKey === "company") {
        const isCompany = stepKey === "company";
        const labels = isCompany
            ? ["Company Details", "Company Address", "Account representative details"]
            : ["Personal Details", "Location Information"];

        // Determine which index and setter to use based on the step
        const currentActiveIdx = isCompany ? companySubStep : personalSubStep;
        const setter = isCompany ? setCompanySubStep : setPersonalSubStep;

        return (
            <div className="ml-[64px] mt-1 flex flex-col space-y-1 items-start">
                {labels.map((label, idx) => (
                    <button
                        key={label}
                        onClick={() => setter(idx)}
                        className={`text-[15px] transition-colors ${currentActiveIdx >= idx ? "font-medium text-[#4A4A4A]" : "text-[#A8A8A8]"
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>
        );
    }
    if (stepKey === "profile") {

        const selectedId = formData.selectedCategoryId as string;

        const selectedCategory = CORPORATE_CATEGORIES.find(
            (c) => c.id === selectedId
        );

        const label = selectedCategory ? selectedCategory.jsonKey : null;

        return (
            <div className="ml-[64px] mt-1 flex flex-col space-y-1 items-start">
                <button className="text-[15px] font-medium text-[#4A4A4A] transition-colors text-left">
                    {label}
                </button>
            </div>
        );
    }

    if (stepKey === "kyc") {
        const isCorporate = investorUserType === "corporate";

        // Decide which list of steps to use
        const activeKycSteps = isCorporate ? CORPORATE_KYC_HEADERS : KYC_SUB_STEPS;

        return (
            <div className="ml-[64px] mt-1 flex flex-col space-y-1 items-start">
                {activeKycSteps.map((step, idx) => (
                    <button
                        key={step.id}
                        onClick={() => setKycSubStep(idx)}
                        className={`text-[15px] text-left transition-colors ${kycSubStep >= idx ? "font-medium text-[#4A4A4A]" : "text-[#A8A8A8]"}`}
                    >
                        {step.title}
                    </button>
                ))}
            </div>
        );
    }

    return null;
}