import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_FUNDRAISER_DASHBOARD } from "@/constants";
import fundraiserDashboardService from "@/services/fundraiserDashboardService";

export function useFundraiserDashboard(period: string, enabled = true) {
  return useQuery({
    queryKey: [...CACHE_KEY_FUNDRAISER_DASHBOARD, period],
    queryFn: () => fundraiserDashboardService.getDashboard(period),
    enabled: enabled && Boolean(period),
  });
}
