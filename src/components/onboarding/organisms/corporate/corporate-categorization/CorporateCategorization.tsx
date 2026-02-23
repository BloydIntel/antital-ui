"use client"

import React from 'react'
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton';
import { InvestorSelectionView } from '@/components/onboarding/organisms/individual/investor-step/InvestorSelectionView';
import { CORPORATE_CATEGORIES } from '@/constants/investorCategories';
import { useOnboardingStore } from '@/store/onboardingStore';

export function CorporateCategorization({ onNext }: { onNext: () => void }) {

    const { formData, updateFormData } = useOnboardingStore();
    const [selectedId, setSelectedId] = React.useState<string | null>(null);

    const handleProceed = () => {
        if (selectedId) {
            updateFormData({
                questionnaireAnswers: { ...formData.questionnaireAnswers, selectedCategoryId: selectedId }
            });
            onNext();
        }
    };

    return (
        <section className="max-w-[558px] w-full mx-auto">
            <InvestorSelectionView
                categories={CORPORATE_CATEGORIES}
                selectedId={selectedId}
                onSelect={setSelectedId}
            />

            <div className="grid grid-cols-2 gap-4 w-full mt-8">
                <OnboardingButton
                    label="Skip for now"
                    variant="plain"
                    onClick={onNext}
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