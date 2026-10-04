import { toApiError } from "@/lib/api-error"
import { request, unwrap } from "@/services/api-client"
import type { ApiResponse } from "@/types/api"
import type { AdminAlertDetail, AdminAlertsResponse } from "@/types/admin-alerts-api"

export interface AdminAlertsParams { type?: string; severity?: string; status?: string; search?: string; page: number; pageSize: number }
export interface AdminAlertUpdate { status?: string; assigneeUserId?: number; resolutionNote?: string }
async function getAlerts(params: AdminAlertsParams) {
  try { return unwrap((await request.get<ApiResponse<AdminAlertsResponse>>("/api/admin/flags-and-alerts", { params })).data) }
  catch (error) { throw toApiError(error) }
}
async function getAlert(flagId: string) {
  try { return unwrap((await request.get<ApiResponse<AdminAlertDetail>>(`/api/admin/flags-and-alerts/${encodeURIComponent(flagId)}`)).data) }
  catch (error) { throw toApiError(error) }
}
async function updateAlert(flagId: string, update: AdminAlertUpdate) {
  try { return unwrap((await request.patch<ApiResponse<AdminAlertDetail>>(`/api/admin/flags-and-alerts/${encodeURIComponent(flagId)}`, update)).data) }
  catch (error) { throw toApiError(error) }
}
const adminAlertsService = { getAlerts, getAlert, updateAlert }

export default adminAlertsService
