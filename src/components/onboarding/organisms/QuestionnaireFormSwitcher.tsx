"use client"

import React from 'react'
import { OnboardingInput } from '@/components/onboarding/molecules/OnboardingInput'
import { RadioGroup } from '@/components/onboarding/molecules/RadioGroup'
import { CheckboxGroup } from '@/components/onboarding/molecules/CheckboxGroup'
import investorQuestionnaire from '@/data/investorQuestionnaire.json'


interface Question {
    label: string;
    inputType: string | string[];
    placeholder?: string;
    options?: string[];
}

interface CategoryData {
    questionnaire: Question[];
}

const typedData = investorQuestionnaire as Record<string, CategoryData>;

const JSON_MAP: Record<string, string> = {
    retail: "Retail Investor",
    sophisticated: "Sophisticated Investor",
    hni: "High Net-worth investor (HNI)"
}

// --- Question UI Wrapper ---
const QuestionWrapper = ({ label, children, index }: { label: string; children: React.ReactNode; index: number }) => {
    // Generates alphabetical numbering (a, b, c...)
    const letter = String.fromCharCode(97 + index);
    return (
        <div className="animate-in fade-in duration-500 mb-2">
            <p className="text-[16px] text-[#1F1F1F] font-medium leading-tight font-[family-name:var(--font-dm-sans)]">
                {letter}. {label}
            </p>
            {children}
        </div>
    );
};

export function QuestionnaireFormSwitcher({ type }: { type: string }) {
    const categoryKey = JSON_MAP[type];
    const data = typedData[categoryKey];

    // Fallback if the category ID doesn't match the JSON keys
    if (!data) {
        return <div className="text-gray-400 py-10">Loading questionnaire fields...</div>;
    }

    return (
        <div className="py-1">
            {data.questionnaire.map((q: Question, idx: number) => {
                const isCombo = Array.isArray(q.inputType);

                return (
                    <QuestionWrapper key={idx} index={idx} label={q.label}>

                        {q.inputType === "text" && (

                            <OnboardingInput
                                label=""
                                placeholder={q.placeholder}
                            />

                        )}

                        {q.inputType === "radio" && q.options && (
                            <RadioGroup
                                name={`question-${idx}`}
                                options={q.options}
                            />
                        )}

                        {(q.inputType === "checkbox" || isCombo) && q.options && (
                            <div className="mb-8">
                                <CheckboxGroup options={q.options} />

                                {isCombo && (
                                    <div className="mt-2">
                                        <OnboardingInput
                                            label="If other, please specify"
                                            placeholder="Type here..."
                                            className="pb-0"
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </QuestionWrapper>
                );
            })}
        </div>
    );
}