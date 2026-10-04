import { useQuery } from "@tanstack/react-query"
import service, { type AdminAlertsParams } from "@/services/adminAlertsService"
export function useAdminAlerts(params: AdminAlertsParams, enabled = true) {
  return useQuery({ queryKey: ["admin-flags-and-alerts", params], queryFn: () => service.getAlerts(params), enabled })
}
