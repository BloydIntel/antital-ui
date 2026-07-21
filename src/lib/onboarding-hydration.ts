import type { StepKey, InvestorUserType } from "@/constants/steps";
import type { PaymentMethod } from "@/types/payment";
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
import type { UserProfile } from "@/types/user-api";

const INVESTOR_CATEGORY_TO_UI: Record<string, OnboardingFormData["selectedCategoryId"]> =
  {
    Retail: "retail",
    Sophisticated: "sophisticated",
    HighNetWorth: "hni",
    QualifiedInstitutionalInvestor: "qii",
    OtherCorporateInvestor: "oci",
    "0": "retail",
    "1": "sophisticated",
    "2": "hni",
  };

const KYC_ID_TYPE_TO_UI: Record<string, KYCData["idType"]> = {
  NationalIdCard: "national_id",
  InternationalPassport: "passport",
  DriversLicence: "drivers_licence",
  "0": "national_id",
  "1": "passport",
  "2": "drivers_licence",
};

const API_STEP_TO_UI_STEP_INDIVIDUAL: Record<string, StepKey> = {
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

const API_STEP_TO_UI_STEP_CORPORATE: Record<string, StepKey> = {
  InvestorCategory: "categorization",
  InvestmentProfile: "profile",
  Kyc: "kyc",
  Review: "review",
  Submitted: "activation",
  "0": "categorization",
  "1": "profile",
  "2": "kyc",
  "3": "review",
  "4": "activation",
};

const API_STEP_TO_UI_STEP_FUNDRAISER: Record<string, StepKey> = {
  InvestorCategory: "company-documentation",
  InvestmentProfile: "representative-kyc",
  Kyc: "representative-kyc",
  Review: "application-fee",
  Submitted: "application-submitted",
  "0": "company-documentation",
  "1": "representative-kyc",
  "2": "representative-kyc",
  "3": "application-fee",
  "4": "application-submitted",
};

const FUNDRAISER_PAYMENT_STATE_KEY = "fundraiser_application_fee_state";

function normalizePaymentMethod(value: string | null | undefined): PaymentMethod | null {
  if (!value) return null;
  const normalized = value.toLowerCase();
  if (normalized === "card" || normalized === "transfer" || normalized === "opay") {
    return normalized;
  }
  return null;
}

/** @deprecated use the overload that accepts investorType for correctness */
const API_STEP_TO_UI_STEP = API_STEP_TO_UI_STEP_INDIVIDUAL;

function mapInvestorCategory(category: ApiInvestorCategory): OnboardingFormData["selectedCategoryId"] {
  if (category === null || category === undefined) return null;
  return INVESTOR_CATEGORY_TO_UI[String(category)] ?? null;
}

function mapKycIdType(idType: ApiKycIdType): KYCData["idType"] {
  if (idType === null || idType === undefined) return "";
  return KYC_ID_TYPE_TO_UI[String(idType)] ?? "";
}

export function mapOnboardingStepToUiStep(
  step: ApiOnboardingStep,
  investorType?: InvestorUserType
): StepKey {
  const map =
    investorType === "corporate"
      ? API_STEP_TO_UI_STEP_CORPORATE
      : investorType === "fundraiser"
        ? API_STEP_TO_UI_STEP_FUNDRAISER
      : API_STEP_TO_UI_STEP;
  return map[String(step)] ??
    (investorType === "corporate"
      ? "categorization"
      : investorType === "fundraiser"
        ? "company-documentation"
        : "investor");
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

  if (response.corporateProfile?.company) {
    patch.companyName = response.corporateProfile.company.companyLegalName ?? "";
    patch.brandName = response.corporateProfile.company.tradingBrandName ?? "";
    patch.registrationType = response.corporateProfile.company.registrationType ?? "";
    patch.registrationNumber = response.corporateProfile.company.registrationNumber ?? "";
    patch.loginEmail = response.corporateProfile.company.companyLoginEmail ?? "";
  }

  if (response.corporateProfile?.address) {
    patch.registrationDate = response.corporateProfile.address.dateOfRegistration
      ? response.corporateProfile.address.dateOfRegistration.slice(0, 10)
      : "";
    patch.companyWebsite = response.corporateProfile.address.companyWebsite ?? "";
    patch.businessAddress = response.corporateProfile.address.businessAddress ?? "";
    patch.registeredAddress = response.corporateProfile.address.registeredAddress ?? "";
    patch.companyEmail = response.corporateProfile.address.companyEmail ?? "";
    patch.companyPhone = response.corporateProfile.address.companyPhone ?? "";
  }

  if (response.corporateProfile?.representative) {
    patch.repFullName = response.corporateProfile.representative.representativeFullName ?? "";
    patch.repJobTitle = response.corporateProfile.representative.representativeJobTitle ?? "";
    patch.repPhoneNumber = response.corporateProfile.representative.representativePhoneNumber ?? "";
    patch.repDob = response.corporateProfile.representative.representativeDateOfBirth
      ? response.corporateProfile.representative.representativeDateOfBirth.slice(0, 10)
      : "";
    patch.repEmail = response.corporateProfile.representative.representativeEmail ?? "";
    patch.repNationality = response.corporateProfile.representative.representativeNationality ?? "";
    patch.repResidence = response.corporateProfile.representative.representativeCountryOfResidence ?? "";
    patch.repAddress = response.corporateProfile.representative.representativeAddress ?? "";
  }

  if (response.fundRaiserProfile?.company) {
    patch.companyName = response.fundRaiserProfile.company.companyLegalName ?? "";
    patch.brandName = response.fundRaiserProfile.company.tradingBrandName ?? "";
    patch.registrationType = response.fundRaiserProfile.company.registrationType ?? "";
    patch.registrationNumber = response.fundRaiserProfile.company.registrationNumber ?? "";
    patch.loginEmail = response.fundRaiserProfile.company.companyLoginEmail ?? "";
    patch.registrationDate = response.fundRaiserProfile.company.dateOfRegistration
      ? response.fundRaiserProfile.company.dateOfRegistration.slice(0, 10)
      : "";
    patch.companyWebsite = response.fundRaiserProfile.company.companyWebsite ?? "";
    patch.businessAddress = response.fundRaiserProfile.company.businessAddress ?? "";
    patch.registeredAddress = response.fundRaiserProfile.company.registeredAddress ?? "";
    patch.companyEmail = response.fundRaiserProfile.company.companyEmail ?? "";
    patch.companyPhone = response.fundRaiserProfile.company.companyPhone ?? "";
  }

  if (response.fundRaiserProfile?.representative) {
    patch.repFullName = response.fundRaiserProfile.representative.representativeFullName ?? "";
    patch.repJobTitle = response.fundRaiserProfile.representative.representativeJobTitle ?? "";
    patch.repPhoneNumber = response.fundRaiserProfile.representative.representativePhoneNumber ?? "";
    patch.repDob = response.fundRaiserProfile.representative.representativeDateOfBirth
      ? response.fundRaiserProfile.representative.representativeDateOfBirth.slice(0, 10)
      : "";
    patch.repEmail = response.fundRaiserProfile.representative.representativeEmail ?? "";
    patch.repNationality = response.fundRaiserProfile.representative.representativeNationality ?? "";
    patch.repResidence = response.fundRaiserProfile.representative.representativeCountryOfResidence ?? "";
    patch.repAddress = response.fundRaiserProfile.representative.representativeAddress ?? "";
  }

  if (response.fundRaiserProfile?.businessDocuments) {
    patch.businessDescription = response.fundRaiserProfile.businessDocuments.businessDescription ?? "";
    patch.businessSector = response.fundRaiserProfile.businessDocuments.businessSector ?? "";
    patch.instrumentType = response.fundRaiserProfile.businessDocuments.instrumentType ?? "";
    patch.businessSize = response.fundRaiserProfile.businessDocuments.businessSize ?? "";
    patch.fundingTarget = response.fundRaiserProfile.businessDocuments.fundingTarget != null
      ? String(response.fundRaiserProfile.businessDocuments.fundingTarget)
      : "";
    patch.investmentRound = response.fundRaiserProfile.businessDocuments.investmentRound ?? "";
  }

  if (response.fundRaiserProfile?.payment) {
    patch.paymentMethod = normalizePaymentMethod(response.fundRaiserProfile.payment.paymentMethod);
    patch.paymentReference = response.fundRaiserProfile.payment.paymentReference ?? null;
    patch.paymentStatus =
      response.fundRaiserProfile.payment.paymentStatus === "success"
        || response.fundRaiserProfile.payment.paymentStatus === "failed"
        ? response.fundRaiserProfile.payment.paymentStatus
        : "pending";
    patch.applicationFeePaid = response.fundRaiserProfile.payment.applicationFeePaid === true;
  }

  // Temporary fallback while backend payment persistence is being finalized:
  // keep fundraiser payment completion from session state so review/submit can continue.
  if (typeof window !== "undefined") {
    try {
      const raw = window.sessionStorage.getItem(FUNDRAISER_PAYMENT_STATE_KEY);
      if (raw) {
        const persisted = JSON.parse(raw) as {
          paymentMethod?: string | null;
          applicationFeePaid?: boolean;
        };

        if (!patch.paymentMethod && persisted.paymentMethod) {
          patch.paymentMethod = normalizePaymentMethod(persisted.paymentMethod);
        }

        if (persisted.applicationFeePaid === true) {
          patch.applicationFeePaid = true;
          patch.paymentStatus = "success";
        }
      }
    } catch {
      // Ignore malformed session cache.
    }
  }

  const questionnairePatch: Record<string, string | string[] | { selections: string[]; amount: string }> = {};
  if (response.corporateProfile?.qiiProfile) {
    const enumToLabel: Record<string, string> = {
      Bank: "Bank",
      AssetManagementCompany: "Asset management company",
      PensionFundAdministrator: "Pension fund administrator",
      InsuranceCompany: "Insurance company",
      VentureCapitalOrPrivateEquityFund: "Venture capital/private equity fund",
      CorporateFinanceInstitution: "Corporate finance institution",
      OtherRegulatedInstitution: "Other regulated institution (specify)",
    };

    const institutionLabels = (response.corporateProfile.qiiProfile.institutionTypesCommaSeparated ?? "")
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean)
      .map((v) => enumToLabel[v] ?? v);

    questionnairePatch["What type of institutional entity do you represent?"] = {
      selections: institutionLabels,
      amount: response.corporateProfile.qiiProfile.otherInstitutionType ?? "",
    };
    questionnairePatch["Does your institution have a valid registration or license as Qualified Institutional Investor?"] =
      response.corporateProfile.qiiProfile.hasValidQiiRegistrationOrLicense === true ? "Yes" :
      response.corporateProfile.qiiProfile.hasValidQiiRegistrationOrLicense === false ? "No" : "";
    questionnairePatch["Does your institution have an approved investment mandate that allows participation in alternative or high-risk investments such as crowdfunding?"] =
      response.corporateProfile.qiiProfile.hasApprovedAlternativeInvestmentMandate === true ? "Yes" :
      response.corporateProfile.qiiProfile.hasApprovedAlternativeInvestmentMandate === false ? "No" : "";
    questionnairePatch["Do you confirm that your institution meets the SEC Nigeria criteria for a Qualified Institutional Investor and consent to be categorized as such on Antital?"] =
      response.corporateProfile.qiiProfile.confirmsSecNigeriaQiiCriteria === true ? "Yes" :
      response.corporateProfile.qiiProfile.confirmsSecNigeriaQiiCriteria === false ? "No" : "";
  }

  if (response.corporateProfile?.ociProfile) {
    const rangeToLabel: Record<string, string> = {
      Below10Million: "Below ₦10 million",
      Range10To50Million: "₦10 million - ₦50 million",
      Range50To100Million: "₦50 million - ₦100 million",
      Range100To500Million: "₦100 million - ₦500 million",
      Above500Million: "Above ₦500 million",
    };
    questionnairePatch["Does the company have a Board resolution or internal approval mandate permitting investment in private, alternative, or high-risk opportunities?"] =
      response.corporateProfile.ociProfile.hasBoardResolutionOrInternalMandate === true ? "Yes" :
      response.corporateProfile.ociProfile.hasBoardResolutionOrInternalMandate === false ? "No" : "";
    questionnairePatch["What is the company’s approximate net asset value?"] =
      response.corporateProfile.ociProfile.netAssetValueRange
        ? (rangeToLabel[String(response.corporateProfile.ociProfile.netAssetValueRange)] ?? "")
        : "";
    questionnairePatch["Does the company have the financial capacity to withstand loss of invested funds without impairing operations or liquidity?"] =
      response.corporateProfile.ociProfile.hasFinancialCapacityToWithstandLoss === true ? "Yes" :
      response.corporateProfile.ociProfile.hasFinancialCapacityToWithstandLoss === false ? "No" : "";
    questionnairePatch["Does the company understand that crowdfunding investments are high-risk and may result in partial or total loss of capital?"] =
      response.corporateProfile.ociProfile.understandsCrowdfundingHighRiskLoss === true ? "Yes" :
      response.corporateProfile.ociProfile.understandsCrowdfundingHighRiskLoss === false ? "No" : "";
    questionnairePatch["Does your institution employ or have access to qualified investment professionals who can evaluate high-risk or complex offerings?"] =
      response.corporateProfile.ociProfile.hasQualifiedInvestmentProfessionalsAccess === true ? "Yes" :
      response.corporateProfile.ociProfile.hasQualifiedInvestmentProfessionalsAccess === false ? "No" : "";
  }
  if (Object.keys(questionnairePatch).length > 0) patch.questionnaireAnswers = questionnairePatch;

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

/** Hydrate signup/personal (and company) fields from GET /api/users/{id} — used before email verify. */
export function buildFormPatchFromUserProfile(
  profile: UserProfile
): Parameters<OnboardingState["updateFormData"]>[0] {
  const patch: Parameters<OnboardingState["updateFormData"]>[0] = {};

  if (profile.firstName) patch.firstName = profile.firstName;
  if (profile.lastName) patch.lastName = profile.lastName;
  if (profile.email) patch.email = profile.email;
  if (profile.preferredName) patch.alias = profile.preferredName;
  if (profile.phoneNumber) patch.phone = profile.phoneNumber;
  if (profile.dateOfBirth) patch.dob = String(profile.dateOfBirth).slice(0, 10);
  if (profile.nationality) patch.nationality = profile.nationality;
  if (profile.countryOfResidence) patch.residence = profile.countryOfResidence;
  if (profile.stateOfResidence) patch.state = profile.stateOfResidence;
  if (profile.residentialAddress) patch.address = profile.residentialAddress;
  if (profile.hasAgreedToTerms === true) patch.agreed = true;

  const company = profile.company;
  if (company) {
    if (company.companyLegalName) patch.companyName = company.companyLegalName;
    if (company.tradingBrandName) patch.brandName = company.tradingBrandName;
    if (company.registrationType) patch.registrationType = company.registrationType;
    if (company.registrationNumber) patch.registrationNumber = company.registrationNumber;
    if (company.companyLoginEmail) patch.loginEmail = company.companyLoginEmail;
    else if (profile.email) patch.loginEmail = profile.email;
    if (company.dateOfRegistration) {
      patch.registrationDate = String(company.dateOfRegistration).slice(0, 10);
    }
    if (company.companyWebsite) patch.companyWebsite = company.companyWebsite;
    if (company.businessAddress) patch.businessAddress = company.businessAddress;
    if (company.registeredAddress) patch.registeredAddress = company.registeredAddress;
    if (company.companyEmail) patch.companyEmail = company.companyEmail;
    if (company.companyPhone) patch.companyPhone = company.companyPhone;
    if (company.representativeFullName) patch.repFullName = company.representativeFullName;
    if (company.representativeJobTitle) patch.repJobTitle = company.representativeJobTitle;
    if (company.representativePhoneNumber) patch.repPhoneNumber = company.representativePhoneNumber;
    if (company.representativeDateOfBirth) {
      patch.repDob = String(company.representativeDateOfBirth).slice(0, 10);
    }
    if (company.representativeEmail) patch.repEmail = company.representativeEmail;
    if (company.representativeNationality) patch.repNationality = company.representativeNationality;
    if (company.representativeCountryOfResidence) {
      patch.repResidence = company.representativeCountryOfResidence;
    }
    if (company.representativeAddress) patch.repAddress = company.representativeAddress;
  } else if (profile.email) {
    // Corporate login email often mirrors user email at signup.
    patch.loginEmail = profile.email;
  }

  return patch;
}
