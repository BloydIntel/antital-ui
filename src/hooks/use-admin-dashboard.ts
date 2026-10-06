import { useQuery } from "@tanstack/react-query"
import { CACHE_KEY_ADMIN_DASHBOARD } from "@/constants"
import adminDashboardService from "@/services/adminDashboardService"

export function useAdminDashboard(period: string, enabled = true) {
  return useQuery({
    queryKey: [...CACHE_KEY_ADMIN_DASHBOARD, period],
    queryFn: () => adminDashboardService.getDashboard(period),
    enabled: enabled && Boolean(period),
  })
}
