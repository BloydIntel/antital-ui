import type { UserType } from "@/store/userStore";

/** Maps API login/profile `userType` to persisted store value. */
export function mapApiUserTypeToStoreUserType(apiUserType: string): UserType {
  const normalized = apiUserType.trim().toLowerCase().replace(/[\s_-]/g, "");

  if (normalized === "individualinvestor" || normalized === "individual") return "individual";
  if (normalized === "corporateinvestor" || normalized === "corporate") return "corporate";
  if (normalized === "fundraiser") return "fundraiser";
  if (normalized === "admin" || normalized === "administrator") return "admin";

  return "individual";
}

/** Resolves the dashboard identity from the API's separate user-type and role fields. */
export function mapApiIdentityToStoreUserType(apiUserType: string, apiRole?: string): UserType {
  const normalizedRole = apiRole?.trim().toLowerCase().replace(/[\s_-]/g, "");
  if (normalizedRole === "admin" || normalizedRole === "administrator") return "admin";

  return mapApiUserTypeToStoreUserType(apiUserType);
}
