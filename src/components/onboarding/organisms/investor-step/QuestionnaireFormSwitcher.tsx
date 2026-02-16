"use client"

import React from 'react'
import { OnboardingInput } from '@/components/onboarding/molecules/OnboardingInput'
import { RadioGroup } from '@/components/onboarding/molecules/RadioGroup'
import { CheckboxGroup } from '@/components/onboarding/molecules/CheckboxGroup'
import { Info } from 'lucide-react'
import investorQuestionnaire from '@/data/investorQuestionnaire.json'
import { INVESTOR_CATEGORIES, type InvestorCategoryId as InvestorType } from '@/constants/investorCategories'


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

type QuestionnaireData = Record<typeof INVESTOR_CATEGORIES[number]["jsonKey"], CategoryData>;
const typedData = investorQuestionnaire as QuestionnaireData;



// --- Question UI Wrapper ---
const QuestionWrapper = ({ label, children, index, info }: { label: string; children: React.ReactNode; index: number; info?: string; }) => {

    const [isOpen, setIsOpen] = React.useState(false);



    // Generates alphabetical numbering (a, b, c...)
    const letter = String.fromCharCode(97 + index);
    return (
        <div className="animate-in fade-in duration-500 mb-2">

            <div className="flex items-start justify-between">

                <p className="text-[14px] lg:text-[16px] text-[#1F1F1F] leading-tight font-[family-name:var(--font-dm-sans)]">
                    {letter}. {label}
                </p>

                {/* Info Icon & Tooltip */}
                {info && (
                    <div
                        className="relative group ml-2 mt-1 shrink-0"
                        onMouseEnter={() => setIsOpen(true)}
                        onMouseLeave={() => setIsOpen(false)}
                    >
                        <button
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            className="focus:outline-none"
                            aria-label="More information"
                        >
                            <Info className={`w-5 h-5 transition-colors ${isOpen ? 'text-[#A7B832]' : 'text-[#3E82D5]'} cursor-pointer`} />
                        </button>

                        {/* Tooltip Box */}
                        {isOpen && (
                            <div className="absolute right-0 top-7 z-50 w-[280px] lg:w-[345px] p-4 bg-[#F0F7FF] border border-[#D1E4F9] rounded-lg shadow-lg animate-in fade-in zoom-in-95 duration-200">
                                <p className="text-[12px] leading-relaxed text-[#4A5568] font-[family-name:var(--font-dm-sans)]">
                                    {info}
                                </p>
                            </div>
                        )}
                    </div>
                )}

            </div>
            {children}
        </div>
    );
};

export function QuestionnaireFormSwitcher({ type }: { type: InvestorType }) {

    const categoryConfig = INVESTOR_CATEGORIES.find(c => c.id === type);
    const categoryKey = categoryConfig?.jsonKey;

    const data = typedData[categoryKey as keyof QuestionnaireData];

    if (!data) {
        return <div className="text-gray-400 py-10">Loading questionnaire fields...</div>;
    }

    return (
        <div className="py-1">
            {data.questionnaire.map((q: Question, idx: number) => {
                const isCombo = Array.isArray(q.inputType);

                return (
                    <QuestionWrapper key={q.label} index={idx} label={q.label} info={q.info}>

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