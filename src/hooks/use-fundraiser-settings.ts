import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CACHE_KEY_FUNDRAISER_SETTINGS_NOTIFICATIONS,
  CACHE_KEY_FUNDRAISER_SETTINGS_PROFILE,
} from "@/constants";
import fundraiserSettingsService from "@/services/fundraiserSettingsService";
import type {
  UpdateFundraiserNotificationPreferencesRequest,
  UpdateFundraiserSettingsProfileRequest,
} from "@/types/settings";

export function useFundraiserSettingsProfile() {
  return useQuery({
    queryKey: CACHE_KEY_FUNDRAISER_SETTINGS_PROFILE,
    queryFn: () => fundraiserSettingsService.getProfile(),
  });
}

export function useUpdateFundraiserSettingsProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateFundraiserSettingsProfileRequest) =>
      fundraiserSettingsService.updateProfile(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(CACHE_KEY_FUNDRAISER_SETTINGS_PROFILE, data);
    },
  });
}

export function useFundraiserNotificationPreferences() {
  return useQuery({
    queryKey: CACHE_KEY_FUNDRAISER_SETTINGS_NOTIFICATIONS,
    queryFn: () => fundraiserSettingsService.getNotifications(),
  });
}

export function useUpdateFundraiserNotificationPreferences() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateFundraiserNotificationPreferencesRequest) =>
      fundraiserSettingsService.updateNotifications(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(CACHE_KEY_FUNDRAISER_SETTINGS_NOTIFICATIONS, data);
    },
  });
}
