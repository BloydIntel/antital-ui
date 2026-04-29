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
  });
}

async function saveKyc(kycPayload: SaveKycPayload): Promise<void> {
  await saveOnboarding({
    step: "Kyc",
    investorCategoryPayload: null,
    investmentProfilePayload: null,
    kycPayload,
    corporateQiiProfilePayload: null,
    corporateOciProfilePayload: null,
    corporateQiiDocumentsPayload: null,
    corporateOciDocumentsPayload: null,
  });
}

async function saveCorporateDocuments(payloads: Pick<
  SaveOnboardingRequest,
  "corporateQiiDocumentsPayload" | "corporateOciDocumentsPayload"
>): Promise<void> {
  await saveOnboarding({
    step: "Kyc",
    investorCategoryPayload: null,
    investmentProfilePayload: null,
    kycPayload: null,
    corporateQiiProfilePayload: null,
    corporateOciProfilePayload: null,
    corporateQiiDocumentsPayload: payloads.corporateQiiDocumentsPayload,
    corporateOciDocumentsPayload: payloads.corporateOciDocumentsPayload,
  });
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
  saveKyc,
  saveCorporateDocuments,
  submitOnboarding,
};

export default onboardingService;
