import { useOnboardingStore } from "@/store/onboardingStore";
import { CORPORATE_BASE_KYC, CORPORATE_CATEGORY_STEPS, INDIVIDUAL_KYC_SUB_STEPS } from "@/components/onboarding/subSteps";
import { CORPORATE_CATEGORIES } from "@/constants/investorCategories"
import { COMPANY_SUB_STEPS, PERSONAL_SUB_STEPS } from "@/components/onboarding/subSteps"
import { useMemo } from "react";


export const SubSteps = ({ stepKey, isActive }: { stepKey: string, isActive: boolean }) => {
    const {
        personalSubStep, setPersonalSubStep,
        companySubStep, setCompanySubStep,
        kycSubStep, setKycSubStep,
        formData, investorUserType
    } = useOnboardingStore();

    const activeKycSteps = useMemo(() => {
        if (investorUserType !== "corporate") return INDIVIDUAL_KYC_SUB_STEPS;

        const steps = [...CORPORATE_BASE_KYC];
        const selectedId = formData.selectedCategoryId;
        if (selectedId && CORPORATE_CATEGORY_STEPS[selectedId]) {
            steps.push(CORPORATE_CATEGORY_STEPS[selectedId]);
        }
        return steps;
    }, [investorUserType, formData.selectedCategoryId]);

    if (!isActive) return null;

    if (stepKey === "personal" || stepKey === "company") {
        const isCompany = stepKey === "company";
        const labels = isCompany
            ? COMPANY_SUB_STEPS.map(step => step.title)
            : PERSONAL_SUB_STEPS.map(step => step.title);

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

        return (
            <div className="ml-[64px] mt-1 flex flex-col space-y-1 items-start">
                {activeKycSteps.map((step, idx) => (
                    <button
                        key={step.id}
                        onClick={() => setKycSubStep(idx)}
                        className={`text-[15px] text-left transition-colors ${kycSubStep >= idx ? "font-medium text-[#4A4A4A]" : "text-[#A8A8A8]"
                            }`}
                    >
                        {step.sideBarTitle}
                    </button>
                ))}
            </div>
        );
    }

    return null;
}