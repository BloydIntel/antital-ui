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

export interface FundraiserSettingsContact {
  fullName: string | null;
  emailAddress: string | null;
  phoneNumber: string | null;
  isWhatsAppConnected: boolean;
  hasPublicHelpDesk: boolean;
}

export interface FundraiserSettingsProfile {
  companyName: string | null;
  registrationNumber: string | null;
  cacVerifiedCompanyName: string | null;
  cacVerifiedRegistrationNumber: string | null;
  cacVerifiedCompanyType: string | null;
  cacVerificationStatus: string | null;
  cacVerifiedAt: string | null;
  cacIncorporationDate: string | null;
  bio: string | null;
  website: string | null;
  publicEmail: string | null;
  headquarters: string | null;
  locationLabel: string | null;
  companyAvatarUrl: string | null;
  companyAvatarFallback: string | null;
  completionPercentage: number;
  contact: FundraiserSettingsContact;
}

export interface UpdateFundraiserSettingsContactRequest {
  fullName?: string | null;
  emailAddress?: string | null;
  phoneNumber?: string | null;
}

export interface UpdateFundraiserSettingsProfileRequest {
  companyName: string;
  registrationNumber?: string | null;
  bio?: string | null;
  website?: string | null;
  publicEmail?: string | null;
  headquarters?: string | null;
  contact?: UpdateFundraiserSettingsContactRequest | null;
}

export interface FundraiserEmailNotificationPrefs {
  campaignUpdates: boolean;
  newInvestments: boolean;
  securityAlerts: boolean;
  muted: boolean;
}

export interface FundraiserInAppNotificationPrefs {
  realTimeActivity: boolean;
  chatMessages: boolean;
  systemStatus: boolean;
  muted: boolean;
}

export interface FundraiserMarketingNotificationPrefs {
  productNews: boolean;
  investorTips: boolean;
  partner: boolean;
  muted: boolean;
}

export interface FundraiserNotificationPreferences {
  email: FundraiserEmailNotificationPrefs;
  inApp: FundraiserInAppNotificationPrefs;
  marketing: FundraiserMarketingNotificationPrefs;
}

export type UpdateFundraiserNotificationPreferencesRequest = FundraiserNotificationPreferences;
