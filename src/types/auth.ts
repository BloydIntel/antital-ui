export interface LoginRequest {
  email: string;
  password: string;
  remember?: boolean;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  userType?: "IndividualInvestor" | "CorporateInvestor" | "Fundraiser";
  preferredName?: string;
  phoneNumber?: string | null;
  dateOfBirth?: string | null;
  nationality?: string | null;
  countryOfResidence?: string | null;
  stateOfResidence?: string | null;
  residentialAddress?: string | null;
  password: string;
  confirmPassword: string;
  hasAgreedToTerms: boolean;
  companyLegalName?: string;
  tradingBrandName?: string;
  registrationType?: string;
  registrationNumber?: string;
  companyLoginEmail?: string;
  dateOfRegistration?: string;
  companyWebsite?: string;
  businessAddress?: string;
  registeredAddress?: string;
  companyEmail?: string;
  companyPhone?: string;
  representativeFullName?: string;
  representativeJobTitle?: string;
  representativePhoneNumber?: string;
  representativeDateOfBirth?: string;
  representativeEmail?: string;
  representativeNationality?: string;
  representativeCountryOfResidence?: string;
  representativeAddress?: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string | null;
  userId: number;
  email: string;
  userType: string;
  role: string;
  isEmailVerified: boolean;
  requiresOtp: boolean;
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

export interface RequestUnverifiedOtpRequest {
  email: string;
}

export interface DeleteUnverifiedRequest {
  email: string;
  otp: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}
