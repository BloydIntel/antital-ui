import type { LoginResponse } from "@/services/authService";
import { ONBOARDING_CONFIG, type InvestorUserType } from "@/constants/steps";
import onboardingService from "@/services/onboardingService";
import { mapOnboardingStepToUiStep } from "@/lib/onboarding-hydration";
import { mapApiIdentityToStoreUserType, mapApiUserTypeToStoreUserType } from "@/lib/user-type";
import type { OnboardingResponse } from "@/types/onboarding";
import {
  buildCheckoutPath,
  clearPendingInvestment,
  readPendingInvestment,
} from "@/lib/investment-checkout";

/** Maps API login `userType` (camelCase or PascalCase) to onboarding URL segment. */
export function mapLoginUserTypeToInvestorPathSegment(userType: string): InvestorUserType {
  const mappedType = mapApiUserTypeToStoreUserType(userType);
  return mappedType === "admin" ? "individual" : mappedType;
}

function firstStepKeyForType(type: InvestorUserType): string {
  return ONBOARDING_CONFIG[type][0].key;
}

export function isOnboardingCompleteStatus(status: OnboardingResponse["status"]): boolean {
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

export type SessionResumeKind = "email" | "onboarding" | "dashboard" | "checkout";

export interface SessionResume {
  path: string;
  kind: SessionResumeKind;
}

/**
 * Same destination rules as post-login: email verify → resume onboarding → dashboard.
 * Safe to call from marketing chrome when a session token already exists.
 */
export async function resolveSessionResumePath(input: {
  userType: string;
  role?: string;
  isEmailVerified: boolean;
  fromTrading?: boolean;
}): Promise<SessionResume> {
  if (mapApiIdentityToStoreUserType(input.userType, input.role) === "admin") {
    return { path: "/dashboard", kind: "dashboard" };
  }

  const type = mapLoginUserTypeToInvestorPathSegment(input.userType);
  const pendingInvestment = readPendingInvestment();

  if (!input.isEmailVerified) {
    return { path: `/onboarding/${type}/email`, kind: "email" };
  }

  try {
    const onboarding = await onboardingService.getOnboarding();
    if (isOnboardingCompleteStatus(onboarding.status)) {
      if (input.fromTrading && pendingInvestment) {
        const checkoutPath = buildCheckoutPath(pendingInvestment);
        clearPendingInvestment();
        return { path: checkoutPath, kind: "checkout" };
      }
      return { path: "/dashboard", kind: "dashboard" };
    }
    const stepKey = mapOnboardingStepToUiStep(onboarding.currentStep, type);
    return { path: `/onboarding/${type}/${stepKey}`, kind: "onboarding" };
  } catch {
    return {
      path: `/onboarding/${type}/${firstStepKeyForType(type)}`,
      kind: "onboarding",
    };
  }
}

/**
 * Where to send the user immediately after a successful login (tokens not yet required for this function;
 * callers must persist tokens before calling `getOnboarding` inside here).
 */
export async function resolvePostLoginPath(
  login: LoginResponse,
  options?: PostLoginNavigationOptions
): Promise<string> {
  const resume = await resolveSessionResumePath({
    userType: login.userType,
    role: login.role,
    isEmailVerified: login.isEmailVerified,
    fromTrading: options?.fromTrading,
  });
  return resume.path;
}
