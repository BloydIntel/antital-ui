export type FundraiserCampaignUpdateStatus = "draft" | "published";

export interface FundraiserCampaignResponse {
  offeringId: number | null;
  offeringSlug: string | null;
  offeringName: string | null;
  status: string | null;
  publicPath: string | null;
}

export interface FundraiserCampaignUpdate {
  id: number;
  title: string;
  body: string;
  status: FundraiserCampaignUpdateStatus;
  publishedAt: string | null;
  likeCount: number;
}

export interface FundraiserCampaignUpdatesResponse {
  items: FundraiserCampaignUpdate[];
  page: number;
  pageSize: number;
  totalCount: number;
}

export interface CreateFundraiserCampaignUpdateRequest {
  title: string;
  body: string;
  publish: boolean;
}

export interface UpdateFundraiserCampaignUpdateRequest {
  title?: string;
  body?: string;
  publish?: boolean;
}
