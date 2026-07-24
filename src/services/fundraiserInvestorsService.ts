import { request, unwrap } from "@/services/api-client";
import type { ApiResponse } from "@/types/api";
import type {
  FundraiserInvestorAnalyticsResponse,
  FundraiserInvestorMessage,
  FundraiserInvestorMessagesResponse,
  FundraiserQiiParticipationResponse,
  ReplyFundraiserInvestorMessageRequest,
  UpdateFundraiserInvestorMessageRequest,
} from "@/types/fundraiser-investors-api";
import { toApiError } from "@/lib/api-error";

const BASE = "/api/fundraisers/me/investors";

async function getQiiParticipation(): Promise<FundraiserQiiParticipationResponse> {
  try {
    const res = await request.get<ApiResponse<FundraiserQiiParticipationResponse>>(`${BASE}/qii`);
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

async function listMessages(params?: {
  status?: "all" | "answered" | "unanswered";
  page?: number;
  pageSize?: number;
}): Promise<FundraiserInvestorMessagesResponse> {
  try {
    const res = await request.get<ApiResponse<FundraiserInvestorMessagesResponse>>(
      `${BASE}/messages`,
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

async function replyMessage(
  messageId: number,
  payload: ReplyFundraiserInvestorMessageRequest
): Promise<FundraiserInvestorMessage> {
  try {
    const res = await request.post<ApiResponse<FundraiserInvestorMessage>>(
      `${BASE}/messages/${messageId}/reply`,
      payload
    );
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

async function updateMessage(
  messageId: number,
  payload: UpdateFundraiserInvestorMessageRequest
): Promise<FundraiserInvestorMessage> {
  try {
    const res = await request.patch<ApiResponse<FundraiserInvestorMessage>>(
      `${BASE}/messages/${messageId}`,
      payload
    );
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

async function getAnalytics(): Promise<FundraiserInvestorAnalyticsResponse> {
  try {
    const res = await request.get<ApiResponse<FundraiserInvestorAnalyticsResponse>>(
      `${BASE}/analytics`
    );
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

const fundraiserInvestorsService = {
  getQiiParticipation,
  listMessages,
  replyMessage,
  updateMessage,
  getAnalytics,
};

export default fundraiserInvestorsService;
