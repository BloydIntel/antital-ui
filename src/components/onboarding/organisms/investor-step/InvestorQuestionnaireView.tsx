import { Info } from 'lucide-react';
import { QuestionnaireFormSwitcher } from '@/components/onboarding/organisms/investor-step/QuestionnaireFormSwitcher';

interface Props {
    title: string;
    selectedId: string;
    onValidationChange: (isValid: boolean) => void; // New
    showAllErrors: boolean; // New
}

export function InvestorQuestionnaireView({ title, selectedId, onValidationChange, showAllErrors }: Props) {
    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="mb-6">
                <h2 className="text-[36px] font-medium text-[#1B1B1B] leading-tight font-[family-name:var(--font-rethink-sans)]">
                    Investment Profile
                </h2>
                <p className="text-[16px] text-[#2C2C2C] font-[family-name:var(--font-dm-sans)]">
                    Tell us more about your investment experience and financial position
                </p>

                {/* Category Badge */}
                <div className="mt-4 flex items-center gap-2 bg-[#F0F7FF] p-3 rounded-lg border border-[#D0E5FF]">
                    <Info className="h-5 w-5 text-[#3B73B5]" />
                    <span className="text-[14px] text-[#3B73B5]">
                        Category: <strong className="font-bold text-[#3B73B5]">{title}</strong>
                    </span>
                </div>
            </div>

            {/* The Switcher handles the JSON mapping */}
            <QuestionnaireFormSwitcher
                type={selectedId}
                onValidationChange={onValidationChange}
                showAllErrors={showAllErrors}
            />
        </div>
    );
}