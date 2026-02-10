"use client"

import React from 'react'
import { OnboardingInput } from '@/components/onboarding/molecules/OnboardingInput'
import { RadioGroup } from '@/components/onboarding/molecules/RadioGroup'
import { CheckboxGroup } from '@/components/onboarding/molecules/CheckboxGroup'
import { Info } from 'lucide-react'
import investorQuestionnaire from '@/data/investorQuestionnaire.json'


interface Question {
    label: string;
    inputType: string | string[];
    placeholder?: string;
    options?: string[];
    info?: string
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
const QuestionWrapper = ({ label, children, index, info }: { label: string; children: React.ReactNode; index: number; info?: string; }) => {
    // Generates alphabetical numbering (a, b, c...)
    const letter = String.fromCharCode(97 + index);
    return (
        <div className="animate-in fade-in duration-500 mb-2">

            <div className="flex items-start justify-between">

                <p className="text-[16px] text-[#1F1F1F] font-medium leading-tight font-[family-name:var(--font-dm-sans)]">
                    {letter}. {label}
                </p>

                {/* Info Icon & Tooltip */}
                {info && (
                    <div className="relative group ml-2 mt-1 shrink-0">
                        <Info className="w-5 h-5 text-[#3E82D5] cursor-pointer" />

                        {/* Tooltip Box */}
                        <div className="absolute right-0 top-7 z-50 w-[345px] p-4 bg-[#F0F7FF] border border-[#D1E4F9] rounded-lg shadow-sm 
                                        opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            <p className="text-[12px] leading-relaxed text-[#4A5568] font-[family-name:var(--font-dm-sans)]">
                                {info}
                            </p>
                        </div>
                    </div>
                )}

            </div>
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
                    <QuestionWrapper key={idx} index={idx} label={q.label} info={q.info}>

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
                            <div>
                                <CheckboxGroup options={q.options} />

                                {isCombo && (
                                    <div>
                                        <OnboardingInput
                                            label=""
                                            placeholder="Please enter an estimate"
                                            className="-mt-4 pb-0"
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