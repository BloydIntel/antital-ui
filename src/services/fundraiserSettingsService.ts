import { request, unwrap } from "@/services/api-client";
import type { ApiResponse } from "@/types/api";
import type {
  FundraiserNotificationPreferences,
  FundraiserBankAccount,
  FundraiserBankAccountsResponse,
  FundraiserPayoutSettings,
  AddFundraiserBankAccountRequest,
  UpdateFundraiserBankAccountRequest,
  UpdateFundraiserPayoutSettingsRequest,
  FundraiserSettingsProfile,
  UpdateFundraiserNotificationPreferencesRequest,
  UpdateFundraiserSettingsProfileRequest,
} from "@/types/settings";
import { toApiError } from "@/lib/api-error";

const PROFILE_BASE = "/api/fundraisers/me/settings/profile";
const NOTIFICATIONS_BASE = "/api/fundraisers/me/settings/notifications";
const BANK_ACCOUNTS_BASE = "/api/fundraisers/me/settings/bank-accounts";
const PAYOUT_BASE = "/api/fundraisers/me/settings/payout";

async function getProfile(): Promise<FundraiserSettingsProfile> {
  try {
    const res = await request.get<ApiResponse<FundraiserSettingsProfile>>(PROFILE_BASE);
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

async function updateProfile(
  payload: UpdateFundraiserSettingsProfileRequest,
): Promise<FundraiserSettingsProfile> {
  try {
    const res = await request.put<ApiResponse<FundraiserSettingsProfile>>(PROFILE_BASE, payload);
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

async function getNotifications(): Promise<FundraiserNotificationPreferences> {
  try {
    const res = await request.get<ApiResponse<FundraiserNotificationPreferences>>(NOTIFICATIONS_BASE);
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

async function updateNotifications(
  payload: UpdateFundraiserNotificationPreferencesRequest,
): Promise<FundraiserNotificationPreferences> {
  try {
    const res = await request.put<ApiResponse<FundraiserNotificationPreferences>>(
      NOTIFICATIONS_BASE,
      payload,
    );
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

async function getBankAccounts(): Promise<FundraiserBankAccountsResponse> {
  try {
    const res = await request.get<ApiResponse<FundraiserBankAccountsResponse>>(BANK_ACCOUNTS_BASE);
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

async function addBankAccount(payload: AddFundraiserBankAccountRequest): Promise<FundraiserBankAccount> {
  try {
    const res = await request.post<ApiResponse<FundraiserBankAccount>>(BANK_ACCOUNTS_BASE, payload);
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

async function updateBankAccount(
  id: number,
  payload: UpdateFundraiserBankAccountRequest,
): Promise<FundraiserBankAccount> {
  try {
    const res = await request.patch<ApiResponse<FundraiserBankAccount>>(`${BANK_ACCOUNTS_BASE}/${id}`, payload);
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

async function verifyBankAccount(id: number): Promise<FundraiserBankAccount> {
  try {
    const res = await request.post<ApiResponse<FundraiserBankAccount>>(`${BANK_ACCOUNTS_BASE}/${id}/verify`);
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

async function setPrimaryBankAccount(id: number): Promise<FundraiserBankAccountsResponse> {
  try {
    const res = await request.post<ApiResponse<FundraiserBankAccountsResponse>>(`${BANK_ACCOUNTS_BASE}/${id}/primary`);
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

async function deleteBankAccount(id: number): Promise<FundraiserBankAccountsResponse> {
  try {
    const res = await request.delete<ApiResponse<FundraiserBankAccountsResponse>>(`${BANK_ACCOUNTS_BASE}/${id}`);
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

async function getPayoutSettings(): Promise<FundraiserPayoutSettings> {
  try {
    const res = await request.get<ApiResponse<FundraiserPayoutSettings>>(PAYOUT_BASE);
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

async function updatePayoutSettings(
  payload: UpdateFundraiserPayoutSettingsRequest,
): Promise<FundraiserPayoutSettings> {
  try {
    const res = await request.put<ApiResponse<FundraiserPayoutSettings>>(PAYOUT_BASE, payload);
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

const fundraiserSettingsService = {
  getProfile,
  updateProfile,
  getNotifications,
  updateNotifications,
  getBankAccounts,
  addBankAccount,
  updateBankAccount,
  verifyBankAccount,
  setPrimaryBankAccount,
  deleteBankAccount,
  getPayoutSettings,
  updatePayoutSettings,
};

export default fundraiserSettingsService;
