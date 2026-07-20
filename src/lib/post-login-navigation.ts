import type { LoginResponse } from "@/services/authService";
import { ONBOARDING_CONFIG, type InvestorUserType } from "@/constants/steps";
import onboardingService from "@/services/onboardingService";
import { mapOnboardingStepToUiStep } from "@/lib/onboarding-hydration";
import { mapApiUserTypeToStoreUserType } from "@/lib/user-type";
import type { OnboardingResponse } from "@/types/onboarding";
import {
  buildCheckoutPath,
  clearPendingInvestment,
  readPendingInvestment,
} from "@/lib/investment-checkout";

/** Maps API login `userType` (camelCase or PascalCase) to onboarding URL segment. */
export function mapLoginUserTypeToInvestorPathSegment(userType: string): InvestorUserType {
  return mapApiUserTypeToStoreUserType(userType);
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

export interface PostLoginNavigationOptions {
  fromTrading?: boolean;
}

/**
 * Where to send the user immediately after a successful login (tokens not yet required for this function;
 * callers must persist tokens before calling `getOnboarding` inside here).
 */
export async function resolvePostLoginPath(
  login: LoginResponse,
  options?: PostLoginNavigationOptions
): Promise<string> {
  const type = mapLoginUserTypeToInvestorPathSegment(login.userType);
  const pendingInvestment = readPendingInvestment();

  if (!login.isEmailVerified) {
    return `/onboarding/${type}/email`;
  }

  try {
    const onboarding = await onboardingService.getOnboarding();
    if (isOnboardingCompleteStatus(onboarding.status)) {
      if (options?.fromTrading && pendingInvestment) {
        const checkoutPath = buildCheckoutPath(pendingInvestment);
        clearPendingInvestment();
        return checkoutPath;
      }
      return "/dashboard";
    }
    const stepKey = mapOnboardingStepToUiStep(onboarding.currentStep, type);
    return `/onboarding/${type}/${stepKey}`;
  } catch {
    return `/onboarding/${type}/${firstStepKeyForType(type)}`;
  }
}
