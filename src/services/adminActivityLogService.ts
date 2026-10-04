import { toApiError } from "@/lib/api-error"
import { request, unwrap } from "@/services/api-client"
import type { ApiResponse } from "@/types/api"
import type { AdminActivityLogResponse } from "@/types/admin-activity-log-api"

export interface AdminActivityLogParams {
  page: number
  pageSize: number
  search?: string
  eventType?: string
  module?: string
  priority?: string
  status?: string
}

async function getActivityLogs(params: AdminActivityLogParams): Promise<AdminActivityLogResponse> {
  try {
    const response = await request.get<ApiResponse<AdminActivityLogResponse>>("/api/admin/activity-logs", { params })
    return unwrap(response.data)
  } catch (error) {
    throw toApiError(error)
  }
}

const adminActivityLogService = { getActivityLogs }
export default adminActivityLogService
