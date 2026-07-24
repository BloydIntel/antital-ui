import { request, unwrap } from "@/services/api-client";
import type { ApiResponse } from "@/types/api";
import type { FileUploadInput, FileUploadResponse } from "@/types/file-upload-api";
import { toApiError } from "@/lib/api-error";

const BASE = "/api/files/upload";

/**
 * Shared Cloudinary-backed upload client.
 * Use from documents, onboarding, and other flows that need binary upload.
 */
async function upload(input: FileUploadInput): Promise<FileUploadResponse> {
  try {
    const formData = new FormData();
    formData.append("file", input.file);
    if (input.folder) {
      formData.append("folder", input.folder);
    }

    const res = await request.post<ApiResponse<FileUploadResponse>>(BASE, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

const fileUploadService = {
  upload,
};

export default fileUploadService;
