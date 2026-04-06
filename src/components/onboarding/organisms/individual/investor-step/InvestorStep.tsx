"use client"

import React, { useState } from 'react'
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton';
import { InvestorSelectionView } from '@/components/onboarding/organisms/individual/investor-step/InvestorSelectionView';
import { InvestorQuestionnaireView } from '@/components/onboarding/organisms/individual/investor-step/InvestorQuestionnaireView';
import { INVESTOR_CATEGORIES } from '@/constants/investorCategories';
import { useOnboardingStore } from '@/store/onboardingStore';
import onboardingService from '@/services/onboardingService';
import { mapToInvestmentProfilePayload } from '@/lib/onboarding-payload-mappers';
import { showApiErrorToast } from '@/lib/error-feedback';

export function InvestorStep({ onNext }: { onNext: () => void }) {
    const { formData } = useOnboardingStore();
    const [view, setView] = useState<"selection" | "questionnaire">(
        formData.selectedCategoryId ? "questionnaire" : "selection"
    );
    const [selectedId, setSelectedId] = useState<string | null>(formData.selectedCategoryId);

    const [isQuestionnaireValid, setIsQuestionnaireValid] = useState(false);
    const [showErrors, setShowErrors] = useState(false);
    const [isSavingCategory, setIsSavingCategory] = useState(false);
    const [isSavingProfile, setIsSavingProfile] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const activeCategory = INVESTOR_CATEGORIES.find(c => c.id === selectedId);

    const toApiInvestorCategory = (id: string): "Retail" | "Sophisticated" | "HighNetWorth" | null => {
        switch (id) {
            case "retail":
                return "Retail";
            case "sophisticated":
                return "Sophisticated";
            case "hni":
                return "HighNetWorth";
            default:
                return null;
        }
    };

    const handleProceed = async () => {
        if (view === "selection" && selectedId) {
            const category = toApiInvestorCategory(selectedId);
            if (!category) {
                setSubmitError("Invalid investor category selected.");
                return;
            }

            setIsSavingCategory(true);
            setSubmitError(null);
            try {
                await onboardingService.saveInvestorCategory(category);
                setView("questionnaire");
            } catch (error) {
                showApiErrorToast(error, "Unable to save investor category.");
            } finally {
                setIsSavingCategory(false);
            }
        } else if (view === "questionnaire") {
            if (isQuestionnaireValid) {
                if (!selectedId) {
                    setSubmitError("Please select an investor category.");
                    return;
                }

                setIsSavingProfile(true);
                setSubmitError(null);
                try {
                    const payload = mapToInvestmentProfilePayload(
                        selectedId,
                        formData.questionnaireAnswers
                    );
                    await onboardingService.saveInvestmentProfile(payload);
                    onNext();
                } catch (error) {
                    showApiErrorToast(error, "Unable to save investment profile.");
                } finally {
                    setIsSavingProfile(false);
                }
            } else {
                setShowErrors(true);
            }
        }
    };

    return (
        <section className="max-w-[558px]">
            {view === "selection" ? (
                <InvestorSelectionView
                    title="Select Your Investor Category"
                    description="Choose the category that best describe your investment experience and financial position"
                    categories={INVESTOR_CATEGORIES}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                />
            ) : (
                <InvestorQuestionnaireView
                    title={activeCategory?.jsonKey || ""}
                    selectedId={selectedId || ""}
                    onValidationChange={setIsQuestionnaireValid}
                    showAllErrors={showErrors}
                />
            )}

            {submitError && (
                <p className="text-sm text-red-600 mt-2">{submitError}</p>
            )}

            <div className="grid grid-cols-2 gap-4 w-full mt-8">
                <OnboardingButton
                    label={view === "selection" ? "Skip for now" : "Go Back"}
                    variant="plain"
                    disabled={isSavingCategory || isSavingProfile}
                    onClick={() => {
                        if (view === "selection") onNext();
                        else {
                            setView("selection");
                            setShowErrors(false);
                        }
                    }}
                />
                <OnboardingButton
                    label={isSavingCategory || isSavingProfile ? "Saving..." : "Proceed"}
                    onClick={handleProceed}
                    disabled={!selectedId || isSavingCategory || isSavingProfile}
                />
            </div>
        </section>
    );
}