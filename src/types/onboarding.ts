export type ApiOnboardingStep =
  | "InvestorCategory"
  | "InvestmentProfile"
  | "Kyc"
  | "Review"
  | "Submitted"
  | number;

export type ApiInvestorCategory =
  | "Retail"
  | "Sophisticated"
  | "HighNetWorth"
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
  highRiskAllocationPast12MonthsPercent: number | null;
  highRiskAllocationNext12MonthsPercent: number | null;
  annualIncomeRange: string | null;
  netInvestmentAssetsValue: number | null;
  canAffordToLoseWithoutAffectingStability: boolean | null;
  understandsCrowdfundingIsHighRisk: boolean | null;
  readRiskDisclosureAndSecRules: boolean | null;
  understandsPastPerformanceNoGuarantee: boolean | null;
  awareOfLimitedLiquidity: boolean | null;
  yearsActivelyInvesting: number | null;
  investmentTypesCommaSeparated: string | null;
  investedInPrivateMarketsBefore: boolean | null;
  awareOfLimitedLiquiditySophisticated: boolean | null;
  confirmCrowdfundingAssessment: boolean | null;
  sourceOfWealthCommaSeparated: string | null;
  sourceOfWealthOther: string | null;
  confirmSecSophisticatedCriteria: boolean | null;
  netAssetsExceed100m: boolean | null;
  netInvestmentAssetsRange: ApiNetInvestmentAssetsRange | null;
  adequateLiquidityForLosses: boolean | null;
  awareOfLimitedLiquidityHni: boolean | null;
  confirmSecHniCriteria: boolean | null;
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
