export type ApiOnboardingStep =
  | "InvestorCategory"
  | "InvestmentProfile"
  | "Kyc"
  | "Review"
  | "Submitted"
  | number;

/** Matches API `OnboardingStatus` (JSON camelCase + numeric enum fallback). */
export type ApiOnboardingStatus =
  | "draft"
  | "submitted"
  | "underReview"
  | "activated"
  | "Draft"
  | "Submitted"
  | "UnderReview"
  | "Activated"
  | number;

export type ApiInvestorCategory =
  | "Retail"
  | "Sophisticated"
  | "HighNetWorth"
  | "QualifiedInstitutionalInvestor"
  | "OtherCorporateInvestor"
  | number
  | null
  | undefined;

export type ApiKycIdType =
  | "NationalIdCard"
  | "InternationalPassport"
  | "VotersCard"
  | number
  | null
  | undefined;

export interface OnboardingPersonalInfoDto {
  fullName: string;
  email: string;
  preferredName?: string | null;
  phoneNumber: string;
  dateOfBirth: string;
}

export interface OnboardingLocationInfoDto {
  nationality: string;
  countryOfResidence: string;
  stateOfResidence: string;
  residentialAddress: string;
}

export interface OnboardingInvestorProfileDto {
  investorCategory?: ApiInvestorCategory;
}

export interface OnboardingKycDto {
  idType?: ApiKycIdType;
  nin?: string | null;
  bvn?: string | null;
  governmentIdDocumentPathOrKey?: string | null;
  proofOfAddressDocumentPathOrKey?: string | null;
  selfieVerificationPathOrKey?: string | null;
  incomeVerificationPathOrKey?: string | null;
  incomeVerificationDocumentTypesCommaSeparated?: string | null;
}

export interface OnboardingResponse {
  currentStep: ApiOnboardingStep;
  status?: ApiOnboardingStatus;
  submittedAt?: string | null;
  personalInfo?: OnboardingPersonalInfoDto | null;
  locationInfo?: OnboardingLocationInfoDto | null;
  investorProfile?: OnboardingInvestorProfileDto | null;
  kyc?: OnboardingKycDto | null;
}

export interface SaveInvestorCategoryPayload {
  investorCategory: Exclude<ApiInvestorCategory, number | null | undefined>;
}

export type ApiNetInvestmentAssetsRange =
  | "Range100_250M"
  | "Range250_500M"
  | "Above500M";

export interface SaveInvestmentProfilePayload {
  investorCategory: Exclude<ApiInvestorCategory, number | null | undefined>;
  // Individual – Retail fields
  highRiskAllocationPast12MonthsPercent: number | null;
  highRiskAllocationNext12MonthsPercent: number | null;
  annualIncomeRange: string | null;
  netInvestmentAssetsValue: number | null;
  canAffordToLoseWithoutAffectingStability: boolean | null;
  understandsCrowdfundingIsHighRisk: boolean | null;
  readRiskDisclosureAndSecRules: boolean | null;
  understandsPastPerformanceNoGuarantee: boolean | null;
  awareOfLimitedLiquidity: boolean | null;
  // Individual – Sophisticated fields
  yearsActivelyInvesting: number | null;
  investmentTypesCommaSeparated: string | null;
  investedInPrivateMarketsBefore: boolean | null;
  awareOfLimitedLiquiditySophisticated: boolean | null;
  confirmCrowdfundingAssessment: boolean | null;
  sourceOfWealthCommaSeparated: string | null;
  sourceOfWealthOther: string | null;
  confirmSecSophisticatedCriteria: boolean | null;
  // Individual – High Net Worth fields
  netAssetsExceed100m: boolean | null;
  netInvestmentAssetsRange: ApiNetInvestmentAssetsRange | null;
  adequateLiquidityForLosses: boolean | null;
  awareOfLimitedLiquidityHni: boolean | null;
  confirmSecHniCriteria: boolean | null;
  // Corporate – QII fields (optional)
  entityType?: string | null;
  entityTypeOther?: string | null;
  hasQiiLicense?: boolean | null;
  hasInvestmentMandate?: boolean | null;
  confirmSecQiiCriteria?: boolean | null;
  // Corporate – OCI fields (optional)
  hasBoardResolutionForInvestment?: boolean | null;
  companyNetAssetValueRange?: string | null;
  canWithstandLoss?: boolean | null;
  corporateUnderstandsCrowdfundingRisk?: boolean | null;
  hasQualifiedInvestmentProfessionals?: boolean | null;
}

export type SaveKycIdType = "NationalIdCard" | "InternationalPassport" | "VotersCard";

export interface SaveKycPayload {
  idType: SaveKycIdType;
  nin: string | null;
  bvn: string | null;
  governmentIdDocumentPathOrKey: string | null;
  proofOfAddressDocumentPathOrKey: string | null;
  selfieVerificationPathOrKey: string | null;
  incomeVerificationPathOrKey: string | null;
  incomeVerificationDocumentTypesCommaSeparated: string | null;
}

export interface SaveOnboardingRequest {
  step: "InvestorCategory" | "InvestmentProfile" | "Kyc";
  investorCategoryPayload: SaveInvestorCategoryPayload | null;
  investmentProfilePayload: SaveInvestmentProfilePayload | null;
  kycPayload: SaveKycPayload | null;
}
