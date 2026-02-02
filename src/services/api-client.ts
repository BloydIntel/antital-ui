import axios from "axios";
import type { ApiResponse } from "@/types/api";
import { ApiError } from "@/lib/api-error";

/**
 * API base URL. When unset (empty string), requests are relative to the current
 * origin (e.g. /api/auth/login) — useful when the API is on the same host
 * (Next.js API routes or same-domain backend). Set NEXT_PUBLIC_API_URL for a
 * separate API host (e.g. http://localhost:5274).
 */
const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "";

if (typeof window !== "undefined" && !baseURL && process.env.NODE_ENV === "development") {
  console.warn(
    "[api-client] NEXT_PUBLIC_API_URL is not set. Requests will use the current origin (relative URLs). Set it in .env.local for a separate API host."
  );
}

export const request = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const apiClient = request;

export function unwrap<U>(data: ApiResponse<U>): U {
  if (!data.isSuccess) {
    const message =
      data.errors?.length ? data.errors.join(", ") : "Request failed";
    throw new ApiError(
      message,
      data.errors ?? [],
      data.validationErrors ?? {}
    );
  }
  return data.value as U;
}

class ApiClient<T, U = T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async (): Promise<U[]> => {
    const res = await apiClient.get<ApiResponse<U[]>>(this.endpoint);
    return unwrap(res.data);
  };

  get = async (id: string): Promise<U> => {
    const res = await apiClient.get<ApiResponse<U>>(`${this.endpoint}/${id}`);
    return unwrap(res.data);
  };

  post = async (data: T): Promise<U> => {
    const res = await apiClient.post<ApiResponse<U>>(this.endpoint, data);
    return unwrap(res.data);
  };

  put = async (data: T): Promise<U> => {
    const res = await apiClient.put<ApiResponse<U>>(this.endpoint, data);
    return unwrap(res.data);
  };

  delete = async (id: string): Promise<void> => {
    const res = await apiClient.delete<ApiResponse<void>>(`${this.endpoint}/${id}`);
    unwrap(res.data);
  };
}

export default ApiClient;
