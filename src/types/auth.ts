export interface LoginRequest {
  email: string;
  password: string;
  remember?: boolean;
}

export interface LoginResponse {
  token: string;
  refreshToken: string | null;
  userId: number;
  email: string;
  userType: string;
  isEmailVerified: boolean;
}

export interface RefreshRequest {
  refreshToken: string;
}