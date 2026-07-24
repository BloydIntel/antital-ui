export interface FileUploadResponse {
  url: string;
  publicId: string;
  bytes: number;
  contentType: string;
  originalFileName: string;
  resourceType: string;
}

export interface FileUploadInput {
  file: File;
  folder?: string;
}
