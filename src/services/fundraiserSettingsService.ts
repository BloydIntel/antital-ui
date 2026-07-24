import { request, unwrap } from "@/services/api-client";
import type { ApiResponse } from "@/types/api";
import type {
  FundraiserNotificationPreferences,
  FundraiserSettingsProfile,
  UpdateFundraiserNotificationPreferencesRequest,
  UpdateFundraiserSettingsProfileRequest,
} from "@/types/settings";
import { toApiError } from "@/lib/api-error";

const PROFILE_BASE = "/api/fundraisers/me/settings/profile";
const NOTIFICATIONS_BASE = "/api/fundraisers/me/settings/notifications";

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

const fundraiserSettingsService = {
  getProfile,
  updateProfile,
  getNotifications,
  updateNotifications,
};

export default fundraiserSettingsService;
