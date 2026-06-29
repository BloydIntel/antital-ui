import { request, unwrap } from "@/services/api-client";
import type { ApiResponse } from "@/types/api";
import type { InvestorProfile, InvestorAccount, UpdateInvestorProfileRequest } from "@/types/settings";
import { toApiError } from "@/lib/api-error";

const PROFILE_BASE = "/api/investors/me/profile";
const ACCOUNT_BASE = "/api/investors/me/account";

async function getProfile(): Promise<InvestorProfile> {
  try {
    const res = await request.get<ApiResponse<InvestorProfile>>(PROFILE_BASE);
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

async function updateProfile(payload: UpdateInvestorProfileRequest): Promise<InvestorProfile> {
  try {
    const res = await request.put<ApiResponse<InvestorProfile>>(PROFILE_BASE, payload);
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

async function getAccount(): Promise<InvestorAccount> {
  try {
    const res = await request.get<ApiResponse<InvestorAccount>>(ACCOUNT_BASE);
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

const settingsService = {
  getProfile,
  updateProfile,
  getAccount,
};

export default settingsService;
