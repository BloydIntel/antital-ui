import ApiClient from "@/services/api-client";
import { request } from "@/services/api-client";
import { unwrap } from "@/services/api-client";
import { tokenStorage } from "@/lib/token-storage";
import { toApiError } from "@/lib/api-error";
import type {
  DeleteUnverifiedRequest,
  LoginRequest,
  LoginResponse,
  RefreshRequest,
  RequestUnverifiedOtpRequest,
  ResendVerificationRequest,
  SignupRequest,
  VerifyEmailRequest,
  ChangePasswordRequest,
} from "@/types/auth";
import type { ApiResponse } from "@/types/api";

export type {
  LoginRequest,
  LoginResponse,
  RefreshRequest,
  RequestUnverifiedOtpRequest,
  DeleteUnverifiedRequest,
  ResendVerificationRequest,
  SignupRequest,
  VerifyEmailRequest,
  ChangePasswordRequest,
};

const loginApi = new ApiClient<LoginRequest, LoginResponse>("/api/auth/login");
const signupApi = new ApiClient<SignupRequest, LoginResponse>("/api/auth/signup");
const refreshApi = new ApiClient<RefreshRequest, LoginResponse>(
  "/api/auth/refresh"
);
const verifyEmailApi = new ApiClient<VerifyEmailRequest, void>(
  "/api/auth/verify-email"
);
const resendVerificationApi = new ApiClient<ResendVerificationRequest, void>(
  "/api/auth/resend-verification"
);
const requestUnverifiedOtpApi = new ApiClient<RequestUnverifiedOtpRequest, void>(
  "/api/auth/unverified/otp"
);
const logoutApi = new ApiClient<RefreshRequest, void>("/api/auth/logout");
const usersApi = new ApiClient<unknown, void>("/api/users");
let refreshInFlight: Promise<LoginResponse> | null = null;

async function logout(): Promise<void> {
  const refreshToken = tokenStorage.getRefreshToken();
  if (refreshToken) {
    await logoutApi.post({ refreshToken });
  }
}

function refresh(refreshToken: string): Promise<LoginResponse> {
  if (!refreshInFlight) {
    refreshInFlight = refreshApi
      .post({ refreshToken })
      .finally(() => {
        refreshInFlight = null;
      });
  }
  return refreshInFlight;
}

const authService = {
  signup: (payload: SignupRequest) => signupApi.post(payload),
  login: (credentials: LoginRequest) => loginApi.post(credentials),
  refresh,
  verifyEmail: (payload: VerifyEmailRequest) => verifyEmailApi.post(payload),
  resendVerification: (email: string) => resendVerificationApi.post({ email }),
  requestUnverifiedOtp: (payload: RequestUnverifiedOtpRequest) =>
    requestUnverifiedOtpApi.post(payload),
  deleteUnverified: async (payload: DeleteUnverifiedRequest): Promise<void> => {
    try {
      const response = await request.delete<ApiResponse<void>>("/api/auth/unverified", {
        data: payload,
      });
      unwrap(response.data);
    } catch (error) {
      throw toApiError(error);
    }
  },
  deleteAccount: (userId: number) => usersApi.delete(String(userId)),
  changePassword: async (payload: ChangePasswordRequest): Promise<void> => {
    try {
      const response = await request.post<ApiResponse<void>>(
        "/api/auth/change-password",
        payload
      );
      unwrap(response.data);
    } catch (error) {
      throw toApiError(error);
    }
  },
  logout,
};

export default authService;
