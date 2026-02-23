"use client"

import React, { useState, useEffect, useMemo } from 'react'
import { OnboardingInput } from '@/components/onboarding/molecules/OnboardingInput'
import { RadioGroup } from '@/components/onboarding/molecules/RadioGroup'
import { CheckboxGroup } from '@/components/onboarding/molecules/CheckboxGroup'
import { Info } from 'lucide-react'
import investorQuestionnaire from '@/data/investorQuestionnaire.json'
import { CORPORATE_CATEGORIES, INVESTOR_CATEGORIES } from '@/constants/investorCategories'
import { QuestionValue, useOnboardingStore } from '@/store/onboardingStore'

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

const QuestionWrapper = ({ label, children, index, info }: { label: string; children: React.ReactNode; index: number; info?: string; }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const letter = String.fromCharCode(97 + index);
    return (
        <div className="animate-in fade-in duration-500 mb-2">
            <div className="flex items-start justify-between">
                <p className="text-[14px] lg:text-[16px] text-[#1F1F1F] leading-tight font-[family-name:var(--font-dm-sans)]">
                    {letter}. {label}
                </p>
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

export function QuestionnaireFormSwitcher({
    type,
    onValidationChange,
    showAllErrors = false
}: {
    type: string;
    onValidationChange?: (isValid: boolean) => void;
    showAllErrors?: boolean;
}) {
    const updateFormData = useOnboardingStore((s) => s.updateFormData);
    const storedAnswers = useOnboardingStore((s) => s.formData.questionnaireAnswers);

    const [answers, setAnswers] = useState<Record<string, QuestionValue>>(storedAnswers || {});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const allCategories = [...INVESTOR_CATEGORIES, ...CORPORATE_CATEGORIES];
    const categoryConfig = allCategories.find(c => c.id === type);
    const categoryKey = categoryConfig?.jsonKey;
    const data = typedData[categoryKey as keyof QuestionnaireData];

    // --- Validation Engine ---
    const errors = useMemo(() => {
        const newErrors: Record<string, string> = {};
        if (!data) return newErrors;

        data.questionnaire.forEach((q, idx) => {
            const val = answers[q.label];

            const isEmpty = val === undefined ||
                val === null ||
                val === "" ||
                (Array.isArray(val) && val.length === 0) ||
                (typeof val === 'object' && !Array.isArray(val) && (!val.selections || val.selections.length === 0));

            if (isEmpty) {
                newErrors[idx] = "This field is required";
            }

            if (q.inputType === "number" && q.label.toLowerCase().includes("percentage")) {
                const num = typeof val === 'string' ? parseFloat(val) : Number(val);
                if (!isEmpty && (isNaN(num) || num < 0 || num > 100)) {
                    newErrors[idx] = "Please enter a value between 0 and 100";
                }
            }
        });
        return newErrors;
    }, [answers, data]);

    useEffect(() => {
        const isValid = data ? Object.keys(errors).length === 0 : false;
        onValidationChange?.(isValid);
        updateFormData({ questionnaireAnswers: answers });
    }, [answers, errors, updateFormData, onValidationChange, data]);

    const handleValueChange = (key: string, value: QuestionValue) => {
        setAnswers(prev => ({ ...prev, [key]: value }));
        setTouched(prev => ({ ...prev, [key]: true }));
    };

    if (!data) return <div className="text-gray-400 py-10">Loading...</div>;

    return (
        <div className="py-1">
            {data.questionnaire.map((q, idx) => {
                const isCombo = Array.isArray(q.inputType);
                const showError = touched[q.label] || showAllErrors;
                const errorMessage = showError ? errors[q.label] : "";
                const currentVal = answers[q.label];

                return (
                    <QuestionWrapper key={idx} index={idx} label={q.label} info={q.info}>
                        {(q.inputType === "text" || q.inputType === "number") && (
                            <OnboardingInput
                                type={q.inputType as "text" | "number"}
                                label=""
                                placeholder={q.placeholder}
                                value={typeof currentVal === 'string' || typeof currentVal === 'number' ? String(currentVal) : ""}
                                error={errorMessage}
                                onChange={(e) => handleValueChange(q.label, e.target.value)}
                            />
                        )}

                        {q.inputType === "radio" && q.options && (
                            <div className="flex flex-col gap-1">
                                <RadioGroup
                                    name={`question-${idx}`}
                                    options={q.options}
                                    value={typeof currentVal === 'string' ? currentVal : undefined}
                                    onChange={(val) => handleValueChange(q.label, val)}
                                />
                                {errorMessage && (
                                    <span className="text-xs text-red-500 mt-[-10px] mb-2">{errorMessage}</span>
                                )}
                            </div>
                        )}

                        {(q.inputType === "checkbox" || isCombo) && q.options && (
                            <div>
                                <CheckboxGroup
                                    options={q.options}
                                    value={isCombo
                                        ? (typeof currentVal === 'object' && !Array.isArray(currentVal) ? currentVal?.selections : [])
                                        : (Array.isArray(currentVal) ? currentVal : [])
                                    }
                                    onChange={(vals) => {
                                        if (isCombo) {
                                            const existing = (typeof currentVal === 'object' && !Array.isArray(currentVal)) ? currentVal : { amount: "" };
                                            handleValueChange(q.label, { ...existing, selections: vals });
                                        } else {
                                            handleValueChange(q.label, vals);
                                        }
                                    }}
                                />
                                {isCombo && (
                                    <div className="mt-2">
                                        <OnboardingInput
                                            label=""
                                            type="number"
                                            value={(typeof currentVal === 'object' && !Array.isArray(currentVal)) ? currentVal?.amount : ""}
                                            onChange={(e) => {
                                                const existing = (typeof currentVal === 'object' && !Array.isArray(currentVal)) ? currentVal : { selections: [] };
                                                handleValueChange(q.label, { ...existing, amount: e.target.value });
                                            }}
                                            placeholder="Please enter an estimate"
                                            className="-mt-4 pb-0"
                                            error={errorMessage}
                                        />
                                    </div>
                                )}
                                {!isCombo && errorMessage && (
                                    <span className="text-xs text-red-500 mt-[-10px] mb-2 block">{errorMessage}</span>
                                )}
                            </div>
                        )}
                    </QuestionWrapper>
                );
            })}
        </div>
    );
}