import { request, unwrap } from "@/services/api-client";
import type { ApiResponse } from "@/types/api";
import type { FundraiserDashboardResponse } from "@/types/fundraiser-dashboard-api";
import { toApiError } from "@/lib/api-error";

const BASE = "/api/fundraisers/me/dashboard";

async function getDashboard(period: string): Promise<FundraiserDashboardResponse> {
  try {
    const res = await request.get<ApiResponse<FundraiserDashboardResponse>>(BASE, {
      params: { period },
    });
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

const fundraiserDashboardService = {
  getDashboard,
};

export default fundraiserDashboardService;
