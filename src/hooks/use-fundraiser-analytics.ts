import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_FUNDRAISER_ANALYTICS } from "@/constants";
import fundraiserAnalyticsService from "@/services/fundraiserAnalyticsService";
import type { FundraiserAnalyticsPeriod } from "@/types/fundraiser-analytics-api";

export function useFundraiserAnalytics(
  period: FundraiserAnalyticsPeriod = "last-7-days",
  enabled = true
) {
  return useQuery({
    queryKey: [...CACHE_KEY_FUNDRAISER_ANALYTICS, period],
    queryFn: () => fundraiserAnalyticsService.getAnalytics(period),
    enabled,
  });
}
