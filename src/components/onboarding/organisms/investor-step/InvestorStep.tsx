"use client"

import React, { useState } from 'react'
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton';
import { InvestorSelectionView } from '@/components/onboarding/organisms/investor-step/InvestorSelectionView';
import { InvestorQuestionnaireView } from '@/components/onboarding/organisms/investor-step/InvestorQuestionnaireView';
import { INVESTOR_CATEGORIES } from '@/constants/investorCategories';

export function InvestorStep({ onNext }: { onNext: () => void }) {
    const [view, setView] = useState<"selection" | "questionnaire">("selection");
    const [selectedId, setSelectedId] = useState<string | null>(null);

    // NEW: Track validation and submission attempt
    const [isQuestionnaireValid, setIsQuestionnaireValid] = useState(false);
    const [showErrors, setShowErrors] = useState(false);

    const activeCategory = INVESTOR_CATEGORIES.find(c => c.id === selectedId);

    const handleProceed = () => {
        if (view === "selection" && selectedId) {
            setView("questionnaire");
        } else if (view === "questionnaire") {
            if (isQuestionnaireValid) {
                onNext();
            } else {
                setShowErrors(true);
            }
        }
    };

    return (
        <section className="max-w-[558px]">
            {view === "selection" ? (
                <InvestorSelectionView
                    categories={INVESTOR_CATEGORIES}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                />
            ) : (
                <InvestorQuestionnaireView
                    title={activeCategory?.jsonKey || ""}
                    selectedId={selectedId || ""}
                    // NEW PROPS
                    onValidationChange={setIsQuestionnaireValid}
                    showAllErrors={showErrors}
                />
            )}

            <div className="grid grid-cols-2 gap-4 w-full mt-8">
                <OnboardingButton
                    label={view === "selection" ? "Skip for now" : "Go Back"}
                    variant="plain"
                    onClick={() => {
                        if (view === "selection") onNext();
                        else {
                            setView("selection");
                            setShowErrors(false); // Reset errors when going back
                        }
                    }}
                />
                <OnboardingButton
                    label="Proceed"
                    onClick={handleProceed}
                    disabled={!selectedId}
                />
            </div>
        </section>
    );
}