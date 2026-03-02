import { UploadSection } from '@/components/onboarding/molecules/UploadSection'
import { CheckboxGroup } from '@/components/onboarding/molecules/CheckboxGroup'
import { KYCData, useOnboardingStore } from '@/store/onboardingStore';

const documentOptions = {
    options: [
        "Salary slip (last 3 months)",
        "Tax Return Certificate",
        "Employment Letter Official",
        "Bank statement (Last 3 months)"
    ],
    optionsSpan: [
        "Recent payslips from your employer",
        "Annual tax assessment from FIRS",
        "Letter from your employer",
        "Showing regular income deposits"
    ]
};

export function IncomeVerification({ showErrors }: { showErrors: boolean }) {
    const { formData, updateFormData } = useOnboardingStore();
    const data = formData.kycData;

    const handleDataChange = <K extends keyof KYCData>(field: K, value: KYCData[K]) => {
        updateFormData({
            kycData: {
                [field]: value
            }
        });
    };

    return (
        <div className="space-y-10">
            <div>
                <p className="text-[16px] text-[#1F1F1F] font-medium font-[family-name:var(--font-dm-sans)]">
                    Select Documents to Upload
                </p>
                <div className={`p-4 mt-2 border rounded-lg transition-colors ${showErrors && data.incomeDocuments.length === 0 ? 'border-red-500 bg-red-50' : 'border-[#EAEAEA]'}`}>
                    <p className="text-[16px] text-[#1F1F1F] font-[family-name:var(--font-dm-sans)] mb-4">
                        Choose one or more document types:
                    </p>
                    <CheckboxGroup
                        options={documentOptions.options}
                        optionsSpan={documentOptions.optionsSpan}
                        className="pb-0"
                        value={data.incomeDocuments}
                        onChange={(selected) => handleDataChange('incomeDocuments', selected)}
                    />
                </div>
                {showErrors && data.incomeDocuments.length === 0 && (
                    <p className="text-red-500 text-xs mt-2">Please select at least one document type.</p>
                )}
            </div>

            <UploadSection
                label="Upload Income Documents"
                desc="You can upload multiple documents as a single PDF or combine them"
                value={data.incomeFile}
                onUpload={(file) => handleDataChange('incomeFile', file)}
                isError={showErrors && !data.incomeFile}
            />
        </div>
    )
}