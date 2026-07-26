import { request, unwrap } from "@/services/api-client";
import type { ApiResponse } from "@/types/api";
import { toApiError } from "@/lib/api-error";
import type {
  OnboardingResponse,
  SaveInvestmentProfilePayload,
  SaveKycPayload,
  SaveOnboardingRequest,
} from "@/types/onboarding";
import { tokenStorage } from "@/lib/token-storage";

const ONBOARDING_ENDPOINT = "/api/onboarding";

function getAuthHeaders(): Record<string, string> {
  const token = tokenStorage.getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function getOnboarding(): Promise<OnboardingResponse> {
  try {
    const res = await request.get<ApiResponse<OnboardingResponse>>(
      ONBOARDING_ENDPOINT,
      {
        headers: getAuthHeaders(),
      }
    );
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

async function saveOnboarding(requestBody: SaveOnboardingRequest): Promise<void> {
  try {
    const res = await request.put<ApiResponse<void>>(ONBOARDING_ENDPOINT, requestBody, {
      headers: getAuthHeaders(),
    });
    unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

async function saveInvestorCategory(
  investorCategory:
    | "Retail"
    | "Sophisticated"
    | "HighNetWorth"
    | "QualifiedInstitutionalInvestor"
    | "OtherCorporateInvestor"
): Promise<void> {
  await saveOnboarding({
    step: "InvestorCategory",
    investorCategoryPayload: { investorCategory },
    investmentProfilePayload: null,
    kycPayload: null,
    corporateQiiProfilePayload: null,
    corporateOciProfilePayload: null,
    corporateQiiDocumentsPayload: null,
    corporateOciDocumentsPayload: null,
    fundraiserBusinessDocumentsPayload: null,
  });
}

async function saveInvestmentProfile(
  investmentProfilePayload: SaveInvestmentProfilePayload
): Promise<void> {
  await saveOnboarding({
    step: "InvestmentProfile",
    investorCategoryPayload: null,
    investmentProfilePayload,
    kycPayload: null,
    corporateQiiProfilePayload: null,
    corporateOciProfilePayload: null,
    corporateQiiDocumentsPayload: null,
    corporateOciDocumentsPayload: null,
    fundraiserBusinessDocumentsPayload: null,
  });
}

async function saveCorporateQiiProfile(
  corporateQiiProfilePayload: NonNullable<SaveOnboardingRequest["corporateQiiProfilePayload"]>
): Promise<void> {
  await saveOnboarding({
    step: "InvestmentProfile",
    investorCategoryPayload: null,
    investmentProfilePayload: null,
    kycPayload: null,
    corporateQiiProfilePayload,
    corporateOciProfilePayload: null,
    corporateQiiDocumentsPayload: null,
    corporateOciDocumentsPayload: null,
    fundraiserBusinessDocumentsPayload: null,
  });
}

async function saveCorporateOciProfile(
  corporateOciProfilePayload: NonNullable<SaveOnboardingRequest["corporateOciProfilePayload"]>
): Promise<void> {
  await saveOnboarding({
    step: "InvestmentProfile",
    investorCategoryPayload: null,
    investmentProfilePayload: null,
    kycPayload: null,
    corporateQiiProfilePayload: null,
    corporateOciProfilePayload,
    corporateQiiDocumentsPayload: null,
    corporateOciDocumentsPayload: null,
    fundraiserBusinessDocumentsPayload: null,
  });
}

async function saveKyc(
  kycPayload: SaveKycPayload,
  payloads?: Pick<
    SaveOnboardingRequest,
    "corporateQiiDocumentsPayload" | "corporateOciDocumentsPayload"
  >
): Promise<void> {
  await saveOnboarding({
    step: "Kyc",
    investorCategoryPayload: null,
    investmentProfilePayload: null,
    kycPayload,
    corporateQiiProfilePayload: null,
    corporateOciProfilePayload: null,
    corporateQiiDocumentsPayload: payloads?.corporateQiiDocumentsPayload ?? null,
    corporateOciDocumentsPayload: payloads?.corporateOciDocumentsPayload ?? null,
    fundraiserBusinessDocumentsPayload: null,
  });
}

async function saveCorporateCompany(
  corporateCompanyPayload: NonNullable<SaveOnboardingRequest["corporateCompanyPayload"]>
): Promise<void> {
  await saveOnboarding({
    step: "InvestmentProfile",
    investorCategoryPayload: null,
    investmentProfilePayload: null,
    kycPayload: null,
    corporateQiiProfilePayload: null,
    corporateCompanyPayload,
    corporateAddressPayload: null,
    corporateRepresentativePayload: null,
    corporateOciProfilePayload: null,
    corporateQiiDocumentsPayload: null,
    corporateOciDocumentsPayload: null,
    fundraiserBusinessDocumentsPayload: null,
  });
}

async function saveCorporateAddress(
  corporateAddressPayload: NonNullable<SaveOnboardingRequest["corporateAddressPayload"]>
): Promise<void> {
  await saveOnboarding({
    step: "InvestmentProfile",
    investorCategoryPayload: null,
    investmentProfilePayload: null,
    kycPayload: null,
    corporateQiiProfilePayload: null,
    corporateCompanyPayload: null,
    corporateAddressPayload,
    corporateRepresentativePayload: null,
    corporateOciProfilePayload: null,
    corporateQiiDocumentsPayload: null,
    corporateOciDocumentsPayload: null,
    fundraiserBusinessDocumentsPayload: null,
  });
}

async function saveCorporateRepresentative(
  corporateRepresentativePayload: NonNullable<
    SaveOnboardingRequest["corporateRepresentativePayload"]
  >
): Promise<void> {
  await saveOnboarding({
    step: "InvestmentProfile",
    investorCategoryPayload: null,
    investmentProfilePayload: null,
    kycPayload: null,
    corporateQiiProfilePayload: null,
    corporateCompanyPayload: null,
    corporateAddressPayload: null,
    corporateRepresentativePayload,
    corporateOciProfilePayload: null,
    corporateQiiDocumentsPayload: null,
    corporateOciDocumentsPayload: null,
    fundraiserBusinessDocumentsPayload: null,
  });
}

async function saveFundraiserBusinessDocuments(
  fundraiserBusinessDocumentsPayload: NonNullable<
    SaveOnboardingRequest["fundraiserBusinessDocumentsPayload"]
  >
): Promise<void> {
  await saveOnboarding({
    step: "Kyc",
    investorCategoryPayload: null,
    investmentProfilePayload: null,
    kycPayload: null,
    corporateQiiProfilePayload: null,
    corporateCompanyPayload: null,
    corporateAddressPayload: null,
    corporateRepresentativePayload: null,
    corporateOciProfilePayload: null,
    corporateQiiDocumentsPayload: null,
    corporateOciDocumentsPayload: null,
    fundraiserBusinessDocumentsPayload,
  });
}

async function saveFundraiserCompany(
  fundRaiserCompanyPayload: NonNullable<SaveOnboardingRequest["fundRaiserCompanyPayload"]>
): Promise<void> {
  await saveOnboarding({
    step: "InvestorCategory",
    investorCategoryPayload: null,
    investmentProfilePayload: null,
    kycPayload: null,
    corporateQiiProfilePayload: null,
    corporateCompanyPayload: null,
    corporateAddressPayload: null,
    corporateRepresentativePayload: null,
    fundRaiserCompanyPayload,
    fundRaiserRepresentativePayload: null,
    corporateOciProfilePayload: null,
    corporateQiiDocumentsPayload: null,
    corporateOciDocumentsPayload: null,
    fundraiserBusinessDocumentsPayload: null,
  });
}

async function saveFundraiserKycBundle(
  kycPayload: NonNullable<SaveOnboardingRequest["kycPayload"]>,
  fundRaiserRepresentativePayload: NonNullable<
    SaveOnboardingRequest["fundRaiserRepresentativePayload"]
  >,
  fundraiserBusinessDocumentsPayload: SaveOnboardingRequest["fundraiserBusinessDocumentsPayload"]
): Promise<void> {
  await saveOnboarding({
    step: "Kyc",
    investorCategoryPayload: null,
    investmentProfilePayload: null,
    kycPayload,
    corporateQiiProfilePayload: null,
    corporateCompanyPayload: null,
    corporateAddressPayload: null,
    corporateRepresentativePayload: null,
    fundRaiserRepresentativePayload,
    corporateOciProfilePayload: null,
    corporateQiiDocumentsPayload: null,
    corporateOciDocumentsPayload: null,
    fundraiserBusinessDocumentsPayload: fundraiserBusinessDocumentsPayload ?? null,
  });
}

async function saveFundraiserPayment(
  fundRaiserPaymentPayload: NonNullable<SaveOnboardingRequest["fundRaiserPaymentPayload"]>
): Promise<void> {
  await saveOnboarding({
    step: "Review",
    investorCategoryPayload: null,
    investmentProfilePayload: null,
    kycPayload: null,
    corporateQiiProfilePayload: null,
    corporateCompanyPayload: null,
    corporateAddressPayload: null,
    corporateRepresentativePayload: null,
    fundRaiserCompanyPayload: null,
    fundRaiserRepresentativePayload: null,
    corporateOciProfilePayload: null,
    corporateQiiDocumentsPayload: null,
    corporateOciDocumentsPayload: null,
    fundraiserBusinessDocumentsPayload: null,
    fundRaiserPaymentPayload,
  });
}

async function confirmSelfieVerification(referenceId: string): Promise<{
  referenceId: string;
  selfieCompleted: boolean;
  selfieUrl: string | null;
}> {
  try {
    const res = await request.post<
      ApiResponse<{
        referenceId: string;
        selfieCompleted: boolean;
        selfieUrl: string | null;
      }>
    >(
      `${ONBOARDING_ENDPOINT}/kyc/confirm-selfie`,
      { referenceId },
      { headers: getAuthHeaders() }
    );
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

async function getDojahWidgetConfig(): Promise<{
  enabled: boolean;
  appId: string;
  publicKey: string;
  widgetId: string;
}> {
  try {
    const res = await request.get<
      ApiResponse<{
        enabled: boolean;
        appId: string;
        publicKey: string;
        widgetId: string;
      }>
    >(`${ONBOARDING_ENDPOINT}/kyc/dojah-widget-config`, {
      headers: getAuthHeaders(),
    });
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

async function submitOnboarding(): Promise<void> {
  try {
    const res = await request.post<ApiResponse<void>>(
      `${ONBOARDING_ENDPOINT}/submit`,
      undefined,
      {
        headers: getAuthHeaders(),
      }
    );
    unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

const onboardingService = {
  getOnboarding,
  saveInvestorCategory,
  saveInvestmentProfile,
  saveCorporateQiiProfile,
  saveCorporateOciProfile,
  saveCorporateCompany,
  saveCorporateAddress,
  saveCorporateRepresentative,
  saveFundraiserCompany,
  saveFundraiserBusinessDocuments,
  saveFundraiserKycBundle,
  saveFundraiserPayment,
  saveKyc,
  getDojahWidgetConfig,
  confirmSelfieVerification,
  submitOnboarding,
};

export default onboardingService;
