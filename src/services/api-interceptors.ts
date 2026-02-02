import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { tokenStorage } from "@/lib/token-storage";
import { request } from "@/services/api-client";
import authService from "@/services/authService";

const LOGIN_URL = "/api/auth/login";
const REFRESH_URL = "/api/auth/refresh";

let refreshingPromise: Promise<string> | null = null;

async function doRefresh(): Promise<string> {
  const refreshToken = tokenStorage.getRefreshToken();
  if (!refreshToken) {
    tokenStorage.clear();
    throw new Error("No refresh token");
  }
  const data = await authService.refresh(refreshToken);
  tokenStorage.setAccessToken(data.token);
  if (data.refreshToken) tokenStorage.setRefreshToken(data.refreshToken);
  return data.token;
}

function isAuthEndpoint(url?: string): boolean {
  if (!url) return false;
  return url.includes(LOGIN_URL) || url.includes(REFRESH_URL);
}

export function setupInterceptors(instance: AxiosInstance): void {
  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (!isAuthEndpoint(config.url)) {
      const token = tokenStorage.getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  });

  instance.interceptors.response.use(
    (res) => res,
    async (err: AxiosError) => {
      const originalConfig = err.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };
      if (
        err.response?.status !== 401 ||
        originalConfig._retry ||
        isAuthEndpoint(originalConfig.url)
      ) {
        return Promise.reject(err);
      }
      try {
        if (!refreshingPromise) {
          refreshingPromise = doRefresh().finally(() => {
            refreshingPromise = null;
          });
        }
        const newToken = await refreshingPromise;
        originalConfig._retry = true;
        originalConfig.headers.Authorization = `Bearer ${newToken}`;
        return request(originalConfig);
      } catch (refreshErr) {
        tokenStorage.clear();
        if (typeof window !== "undefined") {
          window.location.href = "/sign-in";
        }
        return Promise.reject(refreshErr);
      }
    }
  );
}

// Attach to the shared request instance when this module loads (client-only)
if (typeof window !== "undefined") {
  setupInterceptors(request);
}
