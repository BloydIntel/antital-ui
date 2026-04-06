export interface LoginRequest {
  email: string;
  password: string;
  remember?: boolean;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  preferredName?: string;
  phoneNumber: string;
  dateOfBirth: string;
  nationality: string;
  countryOfResidence: string;
  stateOfResidence: string;
  residentialAddress: string;
  password: string;
  confirmPassword: string;
  hasAgreedToTerms: boolean;
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

export interface VerifyEmailRequest {
  email: string;
  token: string;
}

export interface ResendVerificationRequest {
  email: string;
}