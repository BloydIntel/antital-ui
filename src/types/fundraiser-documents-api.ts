export type FundraiserDocumentCategory =
  | "Core"
  | "Financial"
  | "Analytics"
  | "Regulatory";

export type FundraiserDocumentStatus =
  | "Approved"
  | "Pending Approval"
  | "Revision Requested";

export interface FundraiserDocument {
  id: number;
  title: string;
  category: FundraiserDocumentCategory | string;
  status: FundraiserDocumentStatus | string;
  fileUrl: string;
  fileSizeBytes: number;
  contentType: string;
  lastUpdatedAt: string;
}

export interface FundraiserDocumentsResponse {
  offeringId: number | null;
  offeringSlug: string | null;
  items: FundraiserDocument[];
}

export interface UploadFundraiserDocumentInput {
  file: File;
  title?: string;
  category: FundraiserDocumentCategory;
}
