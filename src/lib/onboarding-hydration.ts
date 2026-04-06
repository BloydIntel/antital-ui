import type { StepKey } from "@/constants/steps";
import type {
  KYCData,
  OnboardingFormData,
  OnboardingState,
} from "@/store/onboardingStore";
import type {
  ApiInvestorCategory,
  ApiKycIdType,
  ApiOnboardingStep,
  OnboardingResponse,
} from "@/types/onboarding";

const INVESTOR_CATEGORY_TO_UI: Record<string, OnboardingFormData["selectedCategoryId"]> =
  {
    Retail: "retail",
    Sophisticated: "sophisticated",
    HighNetWorth: "hni",
    "0": "retail",
    "1": "sophisticated",
    "2": "hni",
  };

const KYC_ID_TYPE_TO_UI: Record<string, KYCData["idType"]> = {
  NationalIdCard: "national_id",
  InternationalPassport: "passport",
  VotersCard: "voters_card",
  "0": "national_id",
  "1": "passport",
  "2": "voters_card",
};

const API_STEP_TO_UI_STEP: Record<string, StepKey> = {
  InvestorCategory: "investor",
  InvestmentProfile: "investor",
  Kyc: "kyc",
  Review: "review",
  Submitted: "activation",
  "0": "investor",
  "1": "investor",
  "2": "kyc",
  "3": "review",
  "4": "activation",
};

function mapInvestorCategory(category: ApiInvestorCategory): OnboardingFormData["selectedCategoryId"] {
  if (category === null || category === undefined) return null;
  return INVESTOR_CATEGORY_TO_UI[String(category)] ?? null;
}

function mapKycIdType(idType: ApiKycIdType): KYCData["idType"] {
  if (idType === null || idType === undefined) return "";
  return KYC_ID_TYPE_TO_UI[String(idType)] ?? "";
}

export function mapOnboardingStepToUiStep(step: ApiOnboardingStep): StepKey {
  return API_STEP_TO_UI_STEP[String(step)] ?? "investor";
}

export function buildFormPatchFromOnboarding(
  response: OnboardingResponse
): Parameters<OnboardingState["updateFormData"]>[0] {
  const fullName = response.personalInfo?.fullName?.trim() ?? "";
  const [firstName = "", ...rest] = fullName.split(" ");
  const lastName = rest.join(" ").trim();

  const selectedCategoryId = mapInvestorCategory(
    response.investorProfile?.investorCategory
  );

  const incomeDocCodeToLabel: Record<string, string> = {
    SS: "Salary slip (last 3 months)",
    TR: "Tax Return Certificate",
    EL: "Employment Letter Official",
    BS: "Bank statement (Last 3 months)",
  };

  const incomeTypes =
    response.kyc?.incomeVerificationDocumentTypesCommaSeparated
      ?.split(",")
      .map((v) => v.trim())
      .filter(Boolean)
      .map((v) => incomeDocCodeToLabel[v] ?? v) ?? [];

  const patch: Parameters<OnboardingState["updateFormData"]>[0] = {};

  if (response.personalInfo?.fullName) {
    patch.firstName = firstName;
    patch.lastName = lastName;
  }
  if (response.personalInfo?.email) patch.email = response.personalInfo.email;
  if (response.personalInfo?.preferredName) patch.alias = response.personalInfo.preferredName;
  if (response.personalInfo?.phoneNumber) patch.phone = response.personalInfo.phoneNumber;
  if (response.personalInfo?.dateOfBirth) {
    patch.dob = response.personalInfo.dateOfBirth.slice(0, 10);
  }

  if (response.locationInfo?.nationality) patch.nationality = response.locationInfo.nationality;
  if (response.locationInfo?.countryOfResidence) {
    patch.residence = response.locationInfo.countryOfResidence;
  }
  if (response.locationInfo?.stateOfResidence) patch.state = response.locationInfo.stateOfResidence;
  if (response.locationInfo?.residentialAddress) {
    patch.address = response.locationInfo.residentialAddress;
  }

  if (selectedCategoryId) patch.selectedCategoryId = selectedCategoryId;

  const kycPatch: Partial<KYCData> = {};
  if (response.kyc?.idType !== null && response.kyc?.idType !== undefined) {
    kycPatch.idType = mapKycIdType(response.kyc.idType);
  }
  if (response.kyc?.nin) kycPatch.idNumber = response.kyc.nin;
  if (response.kyc?.bvn) kycPatch.bvn = response.kyc.bvn;
  if (response.locationInfo?.residentialAddress) {
    kycPatch.address = response.locationInfo.residentialAddress;
  }
  if (incomeTypes.length > 0) kycPatch.incomeDocuments = incomeTypes;
  if (Object.keys(kycPatch).length > 0) patch.kycData = kycPatch;

  return patch;
}
