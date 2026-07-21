import type { UserType } from "@/store/userStore";

/** Maps API login/profile `userType` to persisted store value. */
export function mapApiUserTypeToStoreUserType(apiUserType: string): UserType {
  const normalized = apiUserType.trim().toLowerCase().replace(/[\s_-]/g, "");

  if (normalized === "individualinvestor" || normalized === "individual") return "individual";
  if (normalized === "corporateinvestor" || normalized === "corporate") return "corporate";
  if (normalized === "fundraiser") return "fundraiser";

  return "individual";
}
