"use client"

import React, { useState } from 'react'
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton';
import { InvestorQuestionnaireView } from '@/components/onboarding/organisms/individual/investor-step/InvestorQuestionnaireView';
import { CORPORATE_CATEGORIES } from '@/constants/investorCategories';
import { useOnboardingStore } from '@/store/onboardingStore';
import onboardingService from '@/services/onboardingService';
import {
  mapToCorporateOciProfilePayload,
  mapToCorporateQiiProfilePayload,
} from '@/lib/onboarding-payload-mappers';
import { showApiErrorToast } from '@/lib/error-feedback';

export function InvestmentProfile({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { formData } = useOnboardingStore();
  const [isValid, setIsValid] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const selectedId = formData.selectedCategoryId;
  const activeCategory = CORPORATE_CATEGORIES.find(c => c.id === selectedId);

  const handleProceed = async () => {
    if (!isValid) {
      setShowErrors(true);
      return;
    }

    if (!selectedId) {
      setShowErrors(true);
      return;
    }

    setIsSaving(true);
    try {
      if (selectedId === "qii") {
        const payload = mapToCorporateQiiProfilePayload(
          selectedId,
          formData.questionnaireAnswers
        );
        if (!payload) throw new Error("Invalid QII profile payload");
        await onboardingService.saveCorporateQiiProfile(payload);
      } else {
        const payload = mapToCorporateOciProfilePayload(
          selectedId,
          formData.questionnaireAnswers
        );
        if (!payload) throw new Error("Invalid OCI profile payload");
        await onboardingService.saveCorporateOciProfile(payload);
      }

      onNext();
    } catch (error) {
      showApiErrorToast(error, "Unable to save investment profile.");
    } finally {
      setIsSaving(false);
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
          disabled={isSaving}
        />
        <OnboardingButton
          label={isSaving ? "Saving…" : "Proceed"}
          onClick={handleProceed}
          loading={isSaving}
        />
      </div>
    </section>
  );
}
