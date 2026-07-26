import type { InvestorProfile, InvestorAccount } from "@/types/settings";
import type {
  AccountDataProfile,
  ComplianceCheckItem,
  InvestmentLimitsMetrics,
} from "@/components/settings/organisms/investors/Account";
import { parseDateValue } from "@/lib/date";

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  userId: string;
  emailAddress: string;
  phoneNumber: string;
  streetAddress: string;
  city: string;
  state: string;
  profilePictureUrl: string;
}

export function mapProfileToFormData(profile: InvestorProfile): ProfileFormData {
  return {
    firstName: profile.firstName,
    lastName: profile.lastName,
    userId: String(profile.id),
    emailAddress: profile.email,
    phoneNumber: profile.phoneNumber,
    streetAddress: profile.residentialAddress,
    city: profile.countryOfResidence,
    state: profile.stateOfResidence,
    profilePictureUrl: "/dashboard/User-Avatar.png",
  };
}

export function mapFormDataToUpdateRequest(
  formData: ProfileFormData,
  profile: InvestorProfile
) {
  return {
    firstName: formData.firstName,
    lastName: formData.lastName,
    preferredName: profile.preferredName ?? null,
    phoneNumber: formData.phoneNumber,
    residentialAddress: formData.streetAddress,
    stateOfResidence: formData.state,
    countryOfResidence: formData.city,
  };
}

function formatAccountDate(value: string): string {
  const date = parseDateValue(value);
  if (!date) {
    return value;
  }

  return date.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
}

export function mapAccountToProfile(account: InvestorAccount): AccountDataProfile {
  return {
    accountType: account.accountType,
    accountStatus: account.accountStatus as AccountDataProfile["accountStatus"],
    kycStatus: account.kycStatus as AccountDataProfile["kycStatus"],
    kycCompletedDate: account.kycCompletedDate
      ? formatAccountDate(account.kycCompletedDate)
      : "",
    investorClassification: account.investorClassification,
    verificationStatus: account.verificationStatus as AccountDataProfile["verificationStatus"],
    memberSince: formatAccountDate(account.memberSince),
    riskRating: account.riskRating as AccountDataProfile["riskRating"],
  };
}

const DEFAULT_LIMITS: InvestmentLimitsMetrics = {
  annualLimit: 5_000_000,
  usedPercentage: 0,
  perProjectLimit: 1_000_000,
  lifetimeLimit: 20_000_000,
};

export function mapAccountLimits(
  account: InvestorAccount
): InvestmentLimitsMetrics {
  if (!account.investmentLimits) {
    return DEFAULT_LIMITS;
  }

  return {
    annualLimit: account.investmentLimits.annualLimit,
    usedPercentage: account.investmentLimits.usedPercentage,
    perProjectLimit: account.investmentLimits.perProjectLimit,
    lifetimeLimit: account.investmentLimits.lifetimeLimit,
  };
}

export function mapAccountCompliance(
  account: InvestorAccount
): ComplianceCheckItem[] {
  return account.complianceChecks.map((item) => ({
    id: item.id,
    label: item.label,
    status: item.status as ComplianceCheckItem["status"],
  }));
}
