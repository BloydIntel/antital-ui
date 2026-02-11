import { UploadSection } from '@/components/onboarding/molecules/UploadSection'
import { CheckboxGroup } from '@/components/onboarding/molecules/CheckboxGroup'

const documentOptions = {
    options: [
        "Salary slip (last 3 months)",
        "Tax Return Certificate",
        "Employment Letter Official",
        "Bank statement (Last 3 months)"
    ],
    optionsSpan: [
        "Recent payslips frm your employee",
        "Annual tax assessment from FRIS",
        "letter from your employee",
        "Showing regular income deposits"
    ]
};

export function IncomeVerification() {
    return (
        <div className="space-y-10">
            <div>
                <p className="text-[16px] text-[#1F1F1F]"
                    style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontWeight: 500,
                        letterSpacing: "-1%",
                    }}
                >
                    Select Documents to Upload
                </p>
                <div className="p-4 mt-2 border border-[#EAEAEA] rounded-lg">
                    <p className="text-[16px] text-[#1F1F1F]"
                        style={{
                            fontFamily: "var(--font-dm-sans)",
                            fontWeight: 400,
                            letterSpacing: "-1%",
                        }}
                    >
                        Choose one or more document types:
                    </p>
                    <CheckboxGroup options={documentOptions.options} optionsSpan={documentOptions.optionsSpan} className="pb-0" />
                </div>
            </div>
            <UploadSection label="Upload Income Documents" desc="You can upload multiple documents as a single PDF or combine them" />
        </div>
    )
}
