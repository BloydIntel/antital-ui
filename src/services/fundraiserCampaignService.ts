import { request, unwrap } from "@/services/api-client";
import type { ApiResponse } from "@/types/api";
import type {
  CreateFundraiserCampaignUpdateRequest,
  FundraiserCampaignResponse,
  FundraiserCampaignUpdate,
  FundraiserCampaignUpdatesResponse,
  UpdateFundraiserCampaignUpdateRequest,
} from "@/types/fundraiser-campaign-api";
import { toApiError } from "@/lib/api-error";

const BASE = "/api/fundraisers/me/campaign";

async function getCampaign(): Promise<FundraiserCampaignResponse> {
  try {
    const res = await request.get<ApiResponse<FundraiserCampaignResponse>>(BASE);
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

async function listUpdates(params?: {
  status?: "all" | "draft" | "published";
  page?: number;
  pageSize?: number;
}): Promise<FundraiserCampaignUpdatesResponse> {
  try {
    const res = await request.get<ApiResponse<FundraiserCampaignUpdatesResponse>>(
      `${BASE}/updates`,
      {
        params: {
          status: params?.status ?? "all",
          page: params?.page ?? 1,
          pageSize: params?.pageSize ?? 20,
        },
      }
    );
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

async function createUpdate(
  payload: CreateFundraiserCampaignUpdateRequest
): Promise<FundraiserCampaignUpdate> {
  try {
    const res = await request.post<ApiResponse<FundraiserCampaignUpdate>>(
      `${BASE}/updates`,
      payload
    );
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

async function updateUpdate(
  updateId: number,
  payload: UpdateFundraiserCampaignUpdateRequest
): Promise<FundraiserCampaignUpdate> {
  try {
    const res = await request.patch<ApiResponse<FundraiserCampaignUpdate>>(
      `${BASE}/updates/${updateId}`,
      payload
    );
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

const fundraiserCampaignService = {
  getCampaign,
  listUpdates,
  createUpdate,
  updateUpdate,
};

export default fundraiserCampaignService;
