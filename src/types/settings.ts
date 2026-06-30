export interface InvestorProfile {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  preferredName?: string | null;
  phoneNumber: string;
  residentialAddress: string;
  stateOfResidence: string;
  countryOfResidence: string;
  dateOfBirth: string;
  nationality: string;
  userType: string;
  isEmailVerified: boolean;
}

export interface UpdateInvestorProfileRequest {
  firstName: string;
  lastName: string;
  preferredName?: string | null;
  phoneNumber: string;
  residentialAddress: string;
  stateOfResidence: string;
  countryOfResidence: string;
}

export interface InvestorInvestmentLimits {
  annualLimit: number;
  usedPercentage: number;
  perProjectLimit: number;
  lifetimeLimit: number;
}

export interface InvestorComplianceCheck {
  id: string;
  label: string;
  status: string;
}

export interface InvestorAccount {
  accountType: string;
  accountStatus: string;
  kycStatus: string;
  kycCompletedDate: string | null;
  investorClassification: string;
  verificationStatus: string;
  memberSince: string;
  riskRating: string;
  investmentLimits: InvestorInvestmentLimits | null;
  complianceChecks: InvestorComplianceCheck[];
}
