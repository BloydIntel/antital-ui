import ApiClient from "@/services/api-client";
import { tokenStorage } from "@/lib/token-storage";
import type {
  LoginRequest,
  LoginResponse,
  RefreshRequest,
} from "@/types/auth";

export type { LoginRequest, LoginResponse, RefreshRequest };

const loginApi = new ApiClient<LoginRequest, LoginResponse>("/api/auth/login");
const refreshApi = new ApiClient<RefreshRequest, LoginResponse>(
  "/api/auth/refresh"
);
const logoutApi = new ApiClient<RefreshRequest, void>("/api/auth/logout");

async function logout(): Promise<void> {
  const refreshToken = tokenStorage.getRefreshToken();
  if (refreshToken) {
    await logoutApi.post({ refreshToken });
  }
}

const authService = {
  login: (credentials: LoginRequest) => loginApi.post(credentials),
  refresh: (refreshToken: string) => refreshApi.post({ refreshToken }),
  logout,
};

export default authService;
