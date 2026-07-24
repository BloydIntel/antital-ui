import { request, unwrap } from "@/services/api-client";
import type { ApiResponse } from "@/types/api";
import type {
  FundraiserDocument,
  FundraiserDocumentsResponse,
  UploadFundraiserDocumentInput,
} from "@/types/fundraiser-documents-api";
import { toApiError } from "@/lib/api-error";

const BASE = "/api/fundraisers/me/documents";

async function listDocuments(): Promise<FundraiserDocumentsResponse> {
  try {
    const res = await request.get<ApiResponse<FundraiserDocumentsResponse>>(BASE);
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

async function uploadDocument(
  input: UploadFundraiserDocumentInput
): Promise<FundraiserDocument> {
  try {
    const formData = new FormData();
    formData.append("file", input.file);
    formData.append("category", input.category);
    if (input.title?.trim()) {
      formData.append("title", input.title.trim());
    }

    const res = await request.post<ApiResponse<FundraiserDocument>>(BASE, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

const fundraiserDocumentsService = {
  listDocuments,
  uploadDocument,
};

export default fundraiserDocumentsService;
