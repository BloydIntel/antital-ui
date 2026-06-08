import type { UserProfile } from "@/types/user-api";

export function resolveUserDisplayName(user?: UserProfile | null): string {
  if (!user) {
    return "Investor";
  }

  if (user.preferredName?.trim()) {
    return user.preferredName.trim();
  }

  const fullName = `${user.firstName} ${user.lastName}`.trim();
  return fullName || user.email || "Investor";
}
