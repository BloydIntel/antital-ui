import fileUploadService from "@/services/fileUploadService";
import type { InvestorUserType } from "@/constants/steps";

export type OnboardingUploadUserType = InvestorUserType;

/** Cloudinary folder: antital/onboarding/{userType}/{docKind} */
export function buildOnboardingUploadFolder(
  userType: OnboardingUploadUserType,
  docKind: string
): string {
  const safeType = userType || "individual";
  const safeKind = docKind.trim().replace(/^\/+|\/+$/g, "") || "document";
  return `antital/onboarding/${safeType}/${safeKind}`;
}

/**
 * Eager-upload a file for onboarding and return the Cloudinary secure URL
 * (stored in PathOrKey fields).
 */
export async function uploadOnboardingFile(
  file: File,
  options: { userType: OnboardingUploadUserType; docKind: string }
): Promise<string> {
  const folder = buildOnboardingUploadFolder(options.userType, options.docKind);
  const uploaded = await fileUploadService.upload({ file, folder });
  if (!uploaded.url) {
    throw new Error("Upload succeeded but no file URL was returned.");
  }
  return uploaded.url;
}

/** Prefer an already-uploaded URL; otherwise null (caller should upload File first). */
export function pathOrKeyOrNull(value: string | null | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export function hasOnboardingDocument(
  file: File | null | undefined,
  pathOrKey: string | null | undefined
): boolean {
  const hasFileObject =
    typeof File !== "undefined" &&
    file instanceof File &&
    file.size > 0;

  return Boolean(pathOrKeyOrNull(pathOrKey) || hasFileObject);
}

export function displayNameFromPathOrKey(pathOrKey: string): string {
  try {
    const path = new URL(pathOrKey).pathname;
    const segment = path.split("/").filter(Boolean).pop();
    return segment ? decodeURIComponent(segment) : "Uploaded document";
  } catch {
    const segment = pathOrKey.split("/").filter(Boolean).pop();
    return segment || "Uploaded document";
  }
}
