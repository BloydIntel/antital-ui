import axios from "axios";
import type { ApiResponse } from "@/types/api";
import { ApiError, toApiError } from "@/lib/api-error";

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
    const validationMessages = Object.values(data.validationErrors ?? {}).flat();
    const message =
      validationMessages[0] ??
      data.errors?.[0] ??
      "Request failed";
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
    try {
      const res = await apiClient.get<ApiResponse<U[]>>(this.endpoint);
      return unwrap(res.data);
    } catch (error) {
      throw toApiError(error);
    }
  };

  get = async (id: string): Promise<U> => {
    try {
      const res = await apiClient.get<ApiResponse<U>>(`${this.endpoint}/${id}`);
      return unwrap(res.data);
    } catch (error) {
      throw toApiError(error);
    }
  };

  post = async (data: T): Promise<U> => {
    try {
      const res = await apiClient.post<ApiResponse<U>>(this.endpoint, data);
      return unwrap(res.data);
    } catch (error) {
      throw toApiError(error);
    }
  };

  put = async (data: T): Promise<U> => {
    try {
      const res = await apiClient.put<ApiResponse<U>>(this.endpoint, data);
      return unwrap(res.data);
    } catch (error) {
      throw toApiError(error);
    }
  };

  delete = async (id: string): Promise<void> => {
    try {
      const res = await apiClient.delete<ApiResponse<void>>(`${this.endpoint}/${id}`);
      unwrap(res.data);
    } catch (error) {
      throw toApiError(error);
    }
  };
}

export default ApiClient;
