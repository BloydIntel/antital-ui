"use client"

import React, { useState } from 'react'
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton';
import { InvestorSelectionView } from '@/components/onboarding/organisms/individual/investor-step/InvestorSelectionView';
import { CORPORATE_CATEGORIES } from '@/constants/investorCategories';
import { useOnboardingStore } from '@/store/onboardingStore';
import onboardingService from '@/services/onboardingService';
import { showApiErrorToast } from '@/lib/error-feedback';

const toApiCorporateCategory = (
  id: string
): "QualifiedInstitutionalInvestor" | "OtherCorporateInvestor" | null => {
  if (id === "qii") return "QualifiedInstitutionalInvestor";
  if (id === "oci") return "OtherCorporateInvestor";
  return null;
};

export function CorporateCategorization({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {

  const { formData, updateFormData } = useOnboardingStore();
  const [selectedId, setSelectedId] = useState<string | null>(formData.selectedCategoryId || null);
  const [isSaving, setIsSaving] = useState(false);

  const handleProceed = async () => {
    if (!selectedId) return;

    const category = toApiCorporateCategory(selectedId);
    if (!category) {
      showApiErrorToast(new Error("Invalid corporate category selected."));
      return;
    }

    setIsSaving(true);
    try {
      await onboardingService.saveInvestorCategory(category);
      updateFormData({ selectedCategoryId: selectedId });
      onNext();
    } catch (error) {
      showApiErrorToast(error, "Unable to save corporate category.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="max-w-[558px] w-full mx-auto">
      <InvestorSelectionView
        title="Corporate Categorization"
        description="Choose the category that best describe your corporate investment experience and financial position"
        categories={CORPORATE_CATEGORIES}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />

      <div className="grid grid-cols-2 gap-4 w-full mt-8">
        <OnboardingButton
          label="Back"
          variant="plain"
          onClick={onBack}
          disabled={isSaving}
        />
        <OnboardingButton
          label={isSaving ? "Saving…" : "Proceed"}
          onClick={handleProceed}
          disabled={!selectedId}
          loading={isSaving}
        />
      </div>
      <button
        type="button"
        className="mt-3 text-sm text-[#858585] hover:text-[#042E27] hover:underline"
        disabled={isSaving}
        onClick={onNext}
      >
        Skip for now
      </button>
    </section>
  );
}
