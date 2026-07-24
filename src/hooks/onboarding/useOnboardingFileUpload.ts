"use client";

import { useCallback, useState } from "react";
import { useOnboardingStore, type KYCData, type OnboardingFormData } from "@/store/onboardingStore";
import { uploadOnboardingFile } from "@/lib/onboarding-file-upload";
import { showApiErrorToast } from "@/lib/error-feedback";
import type { InvestorUserType } from "@/constants/steps";

type KycFileField =
  | "idFile"
  | "addressFile"
  | "selfie"
  | "incomeFile"
  | "incorporationCertificate"
  | "qiiLicense"
  | "statusReport"
  | "boardResolution";

type KycPathField =
  | "idFilePathOrKey"
  | "addressFilePathOrKey"
  | "selfiePathOrKey"
  | "incomeFilePathOrKey"
  | "incorporationCertificatePathOrKey"
  | "qiiLicensePathOrKey"
  | "statusReportPathOrKey"
  | "boardResolutionPathOrKey";

type BusinessFileField =
  | "founderAndTeamIntroduction"
  | "fundraisingDeck"
  | "investmentMemo"
  | "termsOfOffering"
  | "productDemo";

type BusinessPathField =
  | "founderAndTeamIntroductionPathOrKey"
  | "fundraisingDeckPathOrKey"
  | "investmentMemoPathOrKey"
  | "termsOfOfferingPathOrKey"
  | "productDemoPathOrKey";

const KYC_DOC_KIND: Record<KycFileField, string> = {
  idFile: "government-id",
  addressFile: "proof-of-address",
  selfie: "selfie",
  incomeFile: "income-verification",
  incorporationCertificate: "incorporation-certificate",
  qiiLicense: "qii-license",
  statusReport: "status-report",
  boardResolution: "board-resolution",
};

const BUSINESS_DOC_KIND: Record<BusinessFileField, string> = {
  founderAndTeamIntroduction: "founder-team-intro",
  fundraisingDeck: "fundraising-deck",
  investmentMemo: "investment-memo",
  termsOfOffering: "terms-of-offering",
  productDemo: "product-demo",
};

function resolveUserType(userType: InvestorUserType | null): InvestorUserType {
  return userType ?? "individual";
}

export function useOnboardingFileUpload() {
  const updateFormData = useOnboardingStore((s) => s.updateFormData);
  const investorUserType = useOnboardingStore((s) => s.investorUserType);
  const [uploadingKeys, setUploadingKeys] = useState<Record<string, boolean>>({});

  const setUploading = useCallback((key: string, value: boolean) => {
    setUploadingKeys((prev) => {
      if (Boolean(prev[key]) === value) return prev;
      return { ...prev, [key]: value };
    });
  }, []);

  const uploadKycDocument = useCallback(
    async (fileField: KycFileField, pathField: KycPathField, file: File | null) => {
      if (!file) {
        updateFormData({
          kycData: {
            [fileField]: null,
            [pathField]: null,
          } as Partial<KYCData>,
        });
        return;
      }

      updateFormData({
        kycData: { [fileField]: file } as Partial<KYCData>,
      });
      setUploading(fileField, true);
      try {
        const url = await uploadOnboardingFile(file, {
          userType: resolveUserType(investorUserType),
          docKind: KYC_DOC_KIND[fileField],
        });
        updateFormData({
          kycData: { [pathField]: url } as Partial<KYCData>,
        });
      } catch (error) {
        updateFormData({
          kycData: {
            [fileField]: null,
            [pathField]: null,
          } as Partial<KYCData>,
        });
        showApiErrorToast(error, "Unable to upload document.");
        throw error;
      } finally {
        setUploading(fileField, false);
      }
    },
    [investorUserType, setUploading, updateFormData]
  );

  const uploadBusinessDocument = useCallback(
    async (fileField: BusinessFileField, pathField: BusinessPathField, file: File | null) => {
      if (!file) {
        updateFormData({
          [fileField]: null,
          [pathField]: null,
        } as Partial<OnboardingFormData>);
        return;
      }

      updateFormData({ [fileField]: file } as Partial<OnboardingFormData>);
      setUploading(fileField, true);
      try {
        const url = await uploadOnboardingFile(file, {
          userType: "fundraiser",
          docKind: BUSINESS_DOC_KIND[fileField],
        });
        updateFormData({ [pathField]: url } as Partial<OnboardingFormData>);
      } catch (error) {
        updateFormData({
          [fileField]: null,
          [pathField]: null,
        } as Partial<OnboardingFormData>);
        showApiErrorToast(error, "Unable to upload document.");
        throw error;
      } finally {
        setUploading(fileField, false);
      }
    },
    [setUploading, updateFormData]
  );

  return {
    uploadingKeys,
    isUploading: (key: string) => Boolean(uploadingKeys[key]),
    uploadKycDocument,
    uploadBusinessDocument,
  };
}
