import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_DASHBOARD } from "@/constants";
import dashboardService from "@/services/dashboardService";

export function useDashboard(period: string) {
  return useQuery({
    queryKey: [...CACHE_KEY_DASHBOARD, period],
    queryFn: () => dashboardService.getDashboard(period),
    enabled: Boolean(period),
  });
}
