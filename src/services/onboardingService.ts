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

async function saveInvestorCategory(investorCategory: "Retail" | "Sophisticated" | "HighNetWorth"): Promise<void> {
  await saveOnboarding({
    step: "InvestorCategory",
    investorCategoryPayload: { investorCategory },
    investmentProfilePayload: null,
    kycPayload: null,
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
  });
}

async function saveKyc(kycPayload: SaveKycPayload): Promise<void> {
  await saveOnboarding({
    step: "Kyc",
    investorCategoryPayload: null,
    investmentProfilePayload: null,
    kycPayload,
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
  saveKyc,
  submitOnboarding,
};

export default onboardingService;
