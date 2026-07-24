import { request, unwrap } from "@/services/api-client";
import type { ApiResponse } from "@/types/api";
import type {
  FundraiserAnalyticsPeriod,
  FundraiserAnalyticsResponse,
} from "@/types/fundraiser-analytics-api";
import { toApiError } from "@/lib/api-error";

const BASE = "/api/fundraisers/me/analytics";

async function getAnalytics(
  period: FundraiserAnalyticsPeriod = "last-7-days"
): Promise<FundraiserAnalyticsResponse> {
  try {
    const res = await request.get<ApiResponse<FundraiserAnalyticsResponse>>(BASE, {
      params: { period },
    });
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

const fundraiserAnalyticsService = {
  getAnalytics,
};

export default fundraiserAnalyticsService;
