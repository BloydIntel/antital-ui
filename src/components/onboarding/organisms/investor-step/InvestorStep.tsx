"use client"

import React, { useState } from 'react'
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton';
import { InvestorSelectionView } from '@/components/onboarding/organisms/investor-step/InvestorSelectionView';
import { InvestorQuestionnaireView } from '@/components/onboarding/organisms/investor-step/InvestorQuestionnaireView';
import { INVESTOR_CATEGORIES } from '@/constants/investorCategories';

export function InvestorStep({ onNext }: { onNext: () => void }) {
    const [view, setView] = useState<"selection" | "questionnaire">("selection");
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const activeCategory = INVESTOR_CATEGORIES.find(c => c.id === selectedId);

    const handleProceed = () => {
        if (view === "selection" && selectedId) setView("questionnaire");
        else if (view === "questionnaire") onNext();
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
                    title={activeCategory?.title || ""}
                    selectedId={selectedId || ""}
                />
            )}

            <div className="grid grid-cols-2 gap-4 w-full mt-8">
                <OnboardingButton
                    label={view === "selection" ? "Skip for now" : "Go Back"}
                    variant="plain"
                    onClick={() => view === "selection" ? onNext() : setView("selection")}
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