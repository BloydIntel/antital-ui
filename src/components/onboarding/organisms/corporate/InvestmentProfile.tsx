"use client"

import React, { useState } from 'react'
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton';
import { InvestorQuestionnaireView } from '@/components/onboarding/organisms/individual/investor-step/InvestorQuestionnaireView';
import { CORPORATE_CATEGORIES } from '@/constants/investorCategories';
import { useOnboardingStore } from '@/store/onboardingStore';

export function InvestmentProfile({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
    const { formData } = useOnboardingStore();
    const [isValid, setIsValid] = useState(false);
    const [showErrors, setShowErrors] = useState(false);

    // Retrieve the ID saved in the previous step
    const selectedId = formData.selectedCategoryId;
    const activeCategory = CORPORATE_CATEGORIES.find(c => c.id === selectedId);

    const handleProceed = () => {
        if (isValid) {
            onNext();
        } else {
            setShowErrors(true);
        }
    };

    if (!selectedId) {
        return (
            <div className="text-center py-10">
                <p className="mb-4">Please go back and select a category.</p>
                <OnboardingButton label="Go Back" onClick={onBack} variant="plain" />
            </div>
        );
    }

    return (
        <section className="max-w-[558px] w-full mx-auto">
            <InvestorQuestionnaireView
                title={activeCategory?.jsonKey || ""}
                selectedId={selectedId}
                onValidationChange={setIsValid}
                showAllErrors={showErrors}
            />

            <div className="grid grid-cols-2 gap-4 w-full mt-8">
                <OnboardingButton
                    label="Go Back"
                    variant="plain"
                    onClick={onBack}
                />
                <OnboardingButton
                    label="Proceed"
                    onClick={handleProceed}
                />
            </div>
        </section>
    );
}