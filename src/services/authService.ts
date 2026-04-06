import ApiClient from "@/services/api-client";
import { tokenStorage } from "@/lib/token-storage";
import type {
  LoginRequest,
  LoginResponse,
  RefreshRequest,
  ResendVerificationRequest,
  SignupRequest,
  VerifyEmailRequest,
} from "@/types/auth";

export type {
  LoginRequest,
  LoginResponse,
  RefreshRequest,
  ResendVerificationRequest,
  SignupRequest,
  VerifyEmailRequest,
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
  deleteAccount: (userId: number) => usersApi.delete(String(userId)),
  logout,
};

export default authService;
