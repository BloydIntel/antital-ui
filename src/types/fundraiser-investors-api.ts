export type FundraiserInvestorMessageVisibility = "public" | "private";
export type FundraiserInvestorMessageStatus = "answered" | "unanswered";
export type FundraiserQiiParticipationStatus = "confirmed" | "pending";

export interface FundraiserInvestorMessageAuthor {
  userId: number;
  displayName: string;
  avatarUrl: string | null;
}

export interface FundraiserInvestorMessage {
  id: number;
  author: FundraiserInvestorMessageAuthor;
  question: string;
  askedAt: string;
  visibility: FundraiserInvestorMessageVisibility;
  reply: string | null;
  repliedAt: string | null;
  status: FundraiserInvestorMessageStatus;
}

export interface FundraiserInvestorMessagesResponse {
  items: FundraiserInvestorMessage[];
  page: number;
  pageSize: number;
  totalCount: number;
  newCount: number;
}

export interface ReplyFundraiserInvestorMessageRequest {
  reply: string;
}

export interface UpdateFundraiserInvestorMessageRequest {
  visibility?: FundraiserInvestorMessageVisibility;
  reply?: string;
}

export interface FundraiserInvestorAnalyticsResponse {
  responseRate: number;
  averageResponseTimeHours: number | null;
  totalMessages: number;
  answeredCount: number;
  unansweredCount: number;
}

export interface FundraiserQiiParticipationItem {
  id: number;
  institution: string;
  type: string;
  commitmentAmount: number;
  currency: string;
  committedAt: string;
  status: FundraiserQiiParticipationStatus;
}

export interface FundraiserQiiParticipationResponse {
  offeringId: number | null;
  items: FundraiserQiiParticipationItem[];
}
