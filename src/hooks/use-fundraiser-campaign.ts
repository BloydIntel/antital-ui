import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CACHE_KEY_FUNDRAISER_CAMPAIGN,
  CACHE_KEY_FUNDRAISER_CAMPAIGN_UPDATES,
} from "@/constants";
import fundraiserCampaignService from "@/services/fundraiserCampaignService";
import type { CreateFundraiserCampaignUpdateRequest } from "@/types/fundraiser-campaign-api";
import { showApiErrorToast } from "@/lib/error-feedback";
import { toast } from "sonner";

export function useFundraiserCampaign(enabled = true) {
  return useQuery({
    queryKey: CACHE_KEY_FUNDRAISER_CAMPAIGN,
    queryFn: () => fundraiserCampaignService.getCampaign(),
    enabled,
  });
}

export function useFundraiserCampaignUpdates(
  status: "all" | "draft" | "published" = "all",
  enabled = true
) {
  return useQuery({
    queryKey: [...CACHE_KEY_FUNDRAISER_CAMPAIGN_UPDATES, status],
    queryFn: () => fundraiserCampaignService.listUpdates({ status }),
    enabled,
  });
}

export function useCreateFundraiserCampaignUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateFundraiserCampaignUpdateRequest) =>
      fundraiserCampaignService.createUpdate(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: CACHE_KEY_FUNDRAISER_CAMPAIGN_UPDATES });
      toast.success(data.status === "published" ? "Update published" : "Draft saved");
    },
    onError: (error) => {
      showApiErrorToast(error, "Unable to save campaign update.");
    },
  });
}
