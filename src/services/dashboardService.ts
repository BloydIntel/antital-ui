import { request, unwrap } from "@/services/api-client";
import type { ApiResponse } from "@/types/api";
import type { DashboardResponse } from "@/types/dashboard-api";
import { toApiError } from "@/lib/api-error";

const BASE = "/api/investors/me/dashboard";

async function getDashboard(period: string): Promise<DashboardResponse> {
  try {
    const res = await request.get<ApiResponse<DashboardResponse>>(BASE, {
      params: { period },
    });
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

const dashboardService = {
  getDashboard,
};

export default dashboardService;
