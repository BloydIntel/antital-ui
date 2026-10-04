import { request, unwrap } from "@/services/api-client"
import { toApiError } from "@/lib/api-error"
import type { ApiResponse } from "@/types/api"
import type { AdminDashboardResponse } from "@/types/admin-dashboard-api"

async function getDashboard(period: string): Promise<AdminDashboardResponse> {
  try {
    const response = await request.get<ApiResponse<AdminDashboardResponse>>("/api/admin/dashboard", { params: { period } })
    return unwrap(response.data)
  } catch (error) {
    throw toApiError(error)
  }
}

const adminDashboardService = { getDashboard }
export default adminDashboardService
