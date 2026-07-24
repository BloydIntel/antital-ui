import onboardingService from "@/services/onboardingService";
import { useOnboardingStore } from "@/store/onboardingStore";
import type { SaveOnboardingRequest } from "@/types/onboarding";
import { toElevenDigitsOrNull } from "@/lib/onboarding-payload-mappers";
import { pathOrKeyOrNull } from "@/lib/onboarding-file-upload";

function toNullable(value: string): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function toNullableIsoDate(value: string): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;

  // Already ISO-like date
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;

  // Convert DD/MM/YYYY -> YYYY-MM-DD
  const dmy = trimmed.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (dmy) {
    const [, dd, mm, yyyy] = dmy;
    return `${yyyy}-${mm}-${dd}`;
  }

  return trimmed;
}

function toNullableNumber(value: unknown): number | null {
  if (value === null || value === undefined) return null;

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  const raw = String(value).trim();
  if (!raw) return null;

  // Accept values like "₦50,000,000", "50 000 000", "50000000".
  const normalized = raw.replace(/[^0-9.-]/g, "");
  if (!normalized) return null;

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

export function useFundraiserOnboardingApi() {
  const formData = useOnboardingStore((state) => state.formData);

  const mapCompanyPayload = (): NonNullable<SaveOnboardingRequest["corporateCompanyPayload"]> => ({
    companyLegalName: formData.companyName,
    tradingBrandName: formData.brandName,
    registrationType: formData.registrationType,
    registrationNumber: formData.registrationNumber,
    companyLoginEmail: formData.loginEmail,
  });

  const mapCompanyAddressPayload = (): NonNullable<
    SaveOnboardingRequest["corporateAddressPayload"]
  > => ({
    dateOfRegistration: toNullable(formData.registrationDate),
    companyWebsite: toNullable(formData.companyWebsite),
    businessAddress: toNullable(formData.businessAddress),
    registeredAddress: toNullable(formData.registeredAddress),
    companyEmail: toNullable(formData.companyEmail),
    companyPhone: toNullable(formData.companyPhone),
  });

  const mapRepresentativePayload = (): NonNullable<
    SaveOnboardingRequest["corporateRepresentativePayload"]
  > => ({
    representativeFullName: formData.repFullName,
    representativeJobTitle: formData.repJobTitle,
    representativePhoneNumber: formData.repPhoneNumber,
    representativeDateOfBirth: toNullableIsoDate(formData.repDob),
    representativeEmail: formData.repEmail,
    representativeNationality: formData.repNationality,
    representativeCountryOfResidence: formData.repResidence,
    representativeAddress: formData.repAddress,
  });

  const mapBusinessDocumentsPayload = (): NonNullable<
    SaveOnboardingRequest["fundraiserBusinessDocumentsPayload"]
  > => ({
    founderAndTeamIntroductionDocumentPathOrKey:
      pathOrKeyOrNull(formData.founderAndTeamIntroductionPathOrKey) ?? "",
    fundraisingDeckDocumentPathOrKey:
      pathOrKeyOrNull(formData.fundraisingDeckPathOrKey) ?? "",
    investmentMemoDocumentPathOrKey:
      pathOrKeyOrNull(formData.investmentMemoPathOrKey) ?? "",
    termsOfOfferingDocumentPathOrKey:
      pathOrKeyOrNull(formData.termsOfOfferingPathOrKey) ?? "",
    productDemoDocumentPathOrKey: pathOrKeyOrNull(formData.productDemoPathOrKey),
    businessDescription: toNullable(formData.businessDescription),
    businessSector: toNullable(formData.businessSector),
    instrumentType: toNullable(formData.instrumentType),
    businessSize: toNullable(formData.businessSize),
    fundingTarget: toNullableNumber(formData.fundingTarget),
    investmentRound: toNullable(formData.investmentRound),
  });

  const hasCompleteBusinessDocumentsPayload = (): boolean => {
    const payload = mapBusinessDocumentsPayload();
    return Boolean(
      payload.founderAndTeamIntroductionDocumentPathOrKey &&
      payload.fundraisingDeckDocumentPathOrKey &&
      payload.investmentMemoDocumentPathOrKey &&
      payload.termsOfOfferingDocumentPathOrKey &&
      payload.businessDescription &&
      payload.businessSector &&
      payload.instrumentType &&
      payload.businessSize &&
      payload.investmentRound &&
      typeof payload.fundingTarget === "number" &&
      payload.fundingTarget > 0
    );
  };

  const mapRepresentativeKycPayload = (): NonNullable<SaveOnboardingRequest["kycPayload"]> => ({
    idType:
      formData.kycData.idType === "passport"
        ? "InternationalPassport"
        : formData.kycData.idType === "drivers_licence"
          ? "DriversLicence"
          : "NationalIdCard",
    nin: toElevenDigitsOrNull(formData.kycData.idNumber ?? ""),
    bvn: toElevenDigitsOrNull(formData.kycData.bvn ?? ""),
    governmentIdDocumentPathOrKey: pathOrKeyOrNull(formData.kycData.idFilePathOrKey),
    proofOfAddressDocumentPathOrKey: pathOrKeyOrNull(formData.kycData.addressFilePathOrKey),
    selfieVerificationPathOrKey: pathOrKeyOrNull(formData.kycData.selfiePathOrKey),
    incomeVerificationPathOrKey: null,
    incomeVerificationDocumentTypesCommaSeparated: null,
  });

  const mapFundraiserCompanyPayload = (): NonNullable<
    SaveOnboardingRequest["fundRaiserCompanyPayload"]
  > => ({
    companyLegalName: formData.companyName,
    tradingBrandName: toNullable(formData.brandName),
    registrationType: formData.registrationType,
    registrationNumber: formData.registrationNumber,
    companyLoginEmail: formData.loginEmail,
    dateOfRegistration: toNullableIsoDate(formData.registrationDate),
    companyWebsite: toNullable(formData.companyWebsite),
    businessAddress: formData.businessAddress,
    registeredAddress: formData.registeredAddress,
    companyEmail: formData.companyEmail,
    companyPhone: formData.companyPhone,
  });

  return {
    mapCompanyPayload,
    mapCompanyAddressPayload,
    mapRepresentativePayload,
    mapBusinessDocumentsPayload,
    mapRepresentativeKycPayload,
    saveCompany: () => onboardingService.saveCorporateCompany(mapCompanyPayload()),
    saveCompanyAddress: () => onboardingService.saveCorporateAddress(mapCompanyAddressPayload()),
    saveFundraiserCompany: () => onboardingService.saveFundraiserCompany(mapFundraiserCompanyPayload()),
    saveRepresentative: () => onboardingService.saveCorporateRepresentative(mapRepresentativePayload()),
    saveBusinessDocuments: () =>
      onboardingService.saveFundraiserBusinessDocuments(mapBusinessDocumentsPayload()),
    saveRepresentativeKyc: () => onboardingService.saveKyc(mapRepresentativeKycPayload()),
    saveCombinedKycBundle: () =>
      onboardingService.saveFundraiserKycBundle(
        mapRepresentativeKycPayload(),
        mapRepresentativePayload(),
        hasCompleteBusinessDocumentsPayload() ? mapBusinessDocumentsPayload() : null
      ),
  };
}
