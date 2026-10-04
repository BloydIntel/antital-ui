import { useQuery } from "@tanstack/react-query"
import service from "@/services/adminAlertsService"

export function useAdminAlert(flagId: string) {
  return useQuery({
    queryKey: ["admin-flag", flagId],
    queryFn: () => service.getAlert(flagId),
    enabled: Boolean(flagId),
  })
}
