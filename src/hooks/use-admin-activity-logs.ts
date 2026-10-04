import { useQuery } from "@tanstack/react-query"
import adminActivityLogService, { type AdminActivityLogParams } from "@/services/adminActivityLogService"

export function useAdminActivityLogs(params: AdminActivityLogParams, enabled = true) {
  return useQuery({
    queryKey: ["admin-activity-logs", params],
    queryFn: () => adminActivityLogService.getActivityLogs(params),
    enabled,
  })
}
