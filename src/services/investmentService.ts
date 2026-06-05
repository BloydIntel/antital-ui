import { request, unwrap } from "@/services/api-client";
import type { ApiResponse } from "@/types/api";
import type {
  ContentBlock,
  Highlight,
  InvestmentDetailBundle,
  InvestmentListResponse,
  MediaAsset,
  OfferingDocument,
  OfferingFinancials,
  OfferingRisk,
  OfferingShell,
  OfferingUpdatesResponse,
  TeamMember,
  Testimonial,
} from "@/types/investment";
import { toApiError } from "@/lib/api-error";

const BASE = "/api/investments";

async function getList(params?: {
  page?: number;
  pageSize?: number;
  category?: string;
  risk?: string;
  search?: string;
}): Promise<InvestmentListResponse> {
  try {
    const res = await request.get<ApiResponse<InvestmentListResponse>>(BASE, {
      params,
    });
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

async function getShell(idOrSlug: string): Promise<OfferingShell> {
  try {
    const res = await request.get<ApiResponse<OfferingShell>>(`${BASE}/${idOrSlug}`);
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

async function getHighlights(idOrSlug: string): Promise<Highlight[]> {
  const res = await request.get<ApiResponse<Highlight[]>>(`${BASE}/${idOrSlug}/highlights`);
  return unwrap(res.data);
}

async function getContentBlocks(idOrSlug: string): Promise<ContentBlock[]> {
  const res = await request.get<ApiResponse<ContentBlock[]>>(`${BASE}/${idOrSlug}/content-blocks`);
  return unwrap(res.data);
}

async function getTeam(idOrSlug: string): Promise<TeamMember[]> {
  const res = await request.get<ApiResponse<TeamMember[]>>(`${BASE}/${idOrSlug}/team`);
  return unwrap(res.data);
}

async function getFinancials(idOrSlug: string): Promise<OfferingFinancials> {
  const res = await request.get<ApiResponse<OfferingFinancials>>(`${BASE}/${idOrSlug}/financials`);
  return unwrap(res.data);
}

async function getRisks(idOrSlug: string): Promise<OfferingRisk[]> {
  const res = await request.get<ApiResponse<OfferingRisk[]>>(`${BASE}/${idOrSlug}/risks`);
  return unwrap(res.data);
}

async function getDocuments(idOrSlug: string): Promise<OfferingDocument[]> {
  const res = await request.get<ApiResponse<OfferingDocument[]>>(`${BASE}/${idOrSlug}/documents`);
  return unwrap(res.data);
}

async function getMedia(idOrSlug: string): Promise<MediaAsset[]> {
  const res = await request.get<ApiResponse<MediaAsset[]>>(`${BASE}/${idOrSlug}/media`);
  return unwrap(res.data);
}

async function getUpdates(idOrSlug: string, page = 1, pageSize = 20): Promise<OfferingUpdatesResponse> {
  const res = await request.get<ApiResponse<OfferingUpdatesResponse>>(`${BASE}/${idOrSlug}/updates`, {
    params: { page, pageSize },
  });
  return unwrap(res.data);
}

async function getTestimonials(idOrSlug: string): Promise<Testimonial[]> {
  const res = await request.get<ApiResponse<Testimonial[]>>(`${BASE}/${idOrSlug}/testimonials`);
  return unwrap(res.data);
}

async function getDetailBundle(idOrSlug: string): Promise<InvestmentDetailBundle> {
  try {
    const [
      shell,
      highlights,
      contentBlocks,
      team,
      financials,
      risks,
      documents,
      media,
      updates,
      testimonials,
    ] = await Promise.all([
      getShell(idOrSlug),
      getHighlights(idOrSlug),
      getContentBlocks(idOrSlug),
      getTeam(idOrSlug),
      getFinancials(idOrSlug),
      getRisks(idOrSlug),
      getDocuments(idOrSlug),
      getMedia(idOrSlug),
      getUpdates(idOrSlug),
      getTestimonials(idOrSlug),
    ]);

    return {
      shell,
      highlights,
      contentBlocks,
      team,
      financials,
      risks,
      documents,
      media,
      updates,
      testimonials,
    };
  } catch (error) {
    throw toApiError(error);
  }
}

const investmentService = {
  getList,
  getShell,
  getDetailBundle,
};

export default investmentService;
