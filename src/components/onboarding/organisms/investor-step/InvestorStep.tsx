"use client"

import React, { useState } from 'react'
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton';
import { InvestorSelectionView } from './InvestorSelectionView';
import { InvestorQuestionnaireView } from './InvestorQuestionnaireView';

const investorCategories = [
    {
        id: "retail",
        title: "Retail Investor ",
        subTitle: "(Restricted investment - person)",
        description: "Assets below ₦100m with limited investment experience. Investment caps apply to protect retail investors from overexposure to high-risk investments.",
        iconType: "user"

    },
    {
        id: "sophisticated",
        title: "Sophisticated Investor ",
        subTitle: "(self-acclaimed)",
        description: "3+ years of investment experience with demonstrated understanding of financial markets and risk-return tradeoffs. Comfortable evaluating complex investment opportunities.",
        iconType: "globe"
    },
    {
        id: "hni",
        title: "High Net-worth investor ",
        subTitle: "(HNI)",
        description: "Assets above N100m with the financial capacity to absorb potential losses. Eligible to participate in high-risk, high-reward offerings with fewer restrictions.",
        iconType: "naira"
    }
] as const;

export function InvestorStep({ onNext }: { onNext: () => void }) {
    const [view, setView] = useState<"selection" | "questionnaire">("selection");
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const activeCategory = investorCategories.find(c => c.id === selectedId);

    const handleProceed = () => {
        if (view === "selection" && selectedId) setView("questionnaire");
        else if (view === "questionnaire") onNext();
    };

    return (
        <section className="max-w-[558px]">
            {view === "selection" ? (
                <InvestorSelectionView
                    categories={[...investorCategories]}
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
                    Label={view === "selection" ? "Skip for now" : "Go Back"}
                    variant="plain"
                    onClick={() => view === "selection" ? onNext() : setView("selection")}
                />
                <OnboardingButton
                    Label="Proceed"
                    onClick={handleProceed}
                    disabled={!selectedId}
                />
            </div>
        </section>
    );
}