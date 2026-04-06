import type { LoginResponse } from "@/services/authService";
import { ONBOARDING_CONFIG, type InvestorUserType } from "@/constants/steps";
import onboardingService from "@/services/onboardingService";
import { mapOnboardingStepToUiStep } from "@/lib/onboarding-hydration";
import type { OnboardingResponse } from "@/types/onboarding";

/** Maps API login `userType` (camelCase or PascalCase) to onboarding URL segment. */
export function mapLoginUserTypeToInvestorPathSegment(userType: string): InvestorUserType {
  const t = userType.trim();
  if (t === "IndividualInvestor" || t === "individualInvestor") return "individual";
  if (t === "CorporateInvestor" || t === "corporateInvestor") return "corporate";
  if (t === "FundRaiser" || t === "fundRaiser") return "fundraiser";
  return "individual";
}

function firstStepKeyForType(type: InvestorUserType): string {
  return ONBOARDING_CONFIG[type][0].key;
}

function isOnboardingCompleteStatus(status: OnboardingResponse["status"]): boolean {
  if (status === undefined || status === null) return false;
  const s = String(status).toLowerCase().replace(/\s/g, "");
  return (
    s === "submitted" ||
    s === "underreview" ||
    s === "activated" ||
    s === "1" ||
    s === "2" ||
    s === "3"
  );
}

/**
 * Where to send the user immediately after a successful login (tokens not yet required for this function;
 * callers must persist tokens before calling `getOnboarding` inside here).
 */
export async function resolvePostLoginPath(login: LoginResponse): Promise<string> {
  const type = mapLoginUserTypeToInvestorPathSegment(login.userType);

  if (!login.isEmailVerified) {
    return `/onboarding/${type}/email`;
  }

  try {
    const onboarding = await onboardingService.getOnboarding();
    if (isOnboardingCompleteStatus(onboarding.status)) {
      return "/dashboard";
    }
    const stepKey = mapOnboardingStepToUiStep(onboarding.currentStep);
    return `/onboarding/${type}/${stepKey}`;
  } catch {
    return `/onboarding/${type}/${firstStepKeyForType(type)}`;
  }
}
