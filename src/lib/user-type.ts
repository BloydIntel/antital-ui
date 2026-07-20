import type { UserType } from "@/store/userStore";

/** Maps API login/profile `userType` to persisted store value. */
export function mapApiUserTypeToStoreUserType(apiUserType: string): UserType {
  const t = apiUserType.trim();
  if (t === "IndividualInvestor" || t === "individualInvestor") return "individual";
  if (t === "CorporateInvestor" || t === "corporateInvestor") return "corporate";
  if (t === "FundRaiser" || t === "fundRaiser" || t === "Fundraiser") return "fundraiser";
  return "individual";
}
