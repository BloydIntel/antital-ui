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
  recentStatusReportDocumentPathOrKey?: string | null;
  qiiLicenseEvidenceDocumentPathOrKey?: string | null;
  boardResolutionDocumentPathOrKey?: string | null;
  incorporationCertificateDocumentPathOrKey?: string | null;
}

export interface OnboardingCorporateQiiProfileDto {
  institutionTypesCommaSeparated?: string | null;
  otherInstitutionType?: string | null;
  hasValidQiiRegistrationOrLicense?: boolean | null;
  hasApprovedAlternativeInvestmentMandate?: boolean | null;
  confirmsSecNigeriaQiiCriteria?: boolean | null;
}

export interface OnboardingCorporateOciProfileDto {
  hasBoardResolutionOrInternalMandate?: boolean | null;
  netAssetValueRange?: "Below10Million" | "Range10To50Million" | "Range50To100Million" | "Range100To500Million" | "Above500Million" | null;
  hasFinancialCapacityToWithstandLoss?: boolean | null;
  understandsCrowdfundingHighRiskLoss?: boolean | null;
  hasQualifiedInvestmentProfessionalsAccess?: boolean | null;
}

export interface OnboardingCorporateProfileDto {
  qiiProfile?: OnboardingCorporateQiiProfileDto | null;
  ociProfile?: OnboardingCorporateOciProfileDto | null;
}

export interface OnboardingResponse {
  currentStep: ApiOnboardingStep;
  status?: ApiOnboardingStatus;
  submittedAt?: string | null;
  personalInfo?: OnboardingPersonalInfoDto | null;
  locationInfo?: OnboardingLocationInfoDto | null;
  investorProfile?: OnboardingInvestorProfileDto | null;
  kyc?: OnboardingKycDto | null;
  corporateProfile?: OnboardingCorporateProfileDto | null;
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
  corporateQiiProfilePayload?: {
    institutionTypes: (
      | "Bank"
      | "AssetManagementCompany"
      | "PensionFundAdministrator"
      | "InsuranceCompany"
      | "VentureCapitalOrPrivateEquityFund"
      | "CorporateFinanceInstitution"
      | "OtherRegulatedInstitution"
    )[];
    otherInstitutionType: string | null;
    hasValidQiiRegistrationOrLicense: boolean | null;
    hasApprovedAlternativeInvestmentMandate: boolean | null;
    confirmsSecNigeriaQiiCriteria: boolean | null;
  } | null;
  corporateOciProfilePayload?: {
    hasBoardResolutionOrInternalMandate: boolean | null;
    netAssetValueRange: "Below10Million" | "Range10To50Million" | "Range50To100Million" | "Range100To500Million" | "Above500Million" | null;
    hasFinancialCapacityToWithstandLoss: boolean | null;
    understandsCrowdfundingHighRiskLoss: boolean | null;
    hasQualifiedInvestmentProfessionalsAccess: boolean | null;
  } | null;
  corporateQiiDocumentsPayload?: {
    recentStatusReportDocumentPathOrKey: string | null;
    qiiLicenseEvidenceDocumentPathOrKey: string | null;
    boardResolutionDocumentPathOrKey: string | null;
  } | null;
  corporateOciDocumentsPayload?: {
    incorporationCertificateDocumentPathOrKey: string | null;
    recentStatusReportDocumentPathOrKey: string | null;
    boardResolutionDocumentPathOrKey: string | null;
  } | null;
}
