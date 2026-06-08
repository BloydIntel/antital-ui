export function getUserIdFromAccessToken(token: string | null): number | null {
  if (!token) {
    return null;
  }

  const parts = token.split(".");
  if (parts.length < 2) {
    return null;
  }

  try {
    const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = payload + "=".repeat((4 - (payload.length % 4)) % 4);
    const decoded = JSON.parse(atob(padded)) as { UserId?: string | number };
    const raw = decoded.UserId;

    if (typeof raw === "number") {
      return raw;
    }

    if (typeof raw === "string") {
      const parsed = Number.parseInt(raw, 10);
      return Number.isNaN(parsed) ? null : parsed;
    }

    return null;
  } catch {
    return null;
  }
}
