import axios from "axios";
import type { ApiResponse } from "@/types/api";

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "";

export const request = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const apiClient = request;

export function unwrap<U>(data: ApiResponse<U>): U {
  if (!data.isSuccess) {
    const message = data.errors?.length ? data.errors.join(", ") : "Request failed";
    throw new Error(message);
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

export default ApiClient
