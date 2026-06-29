export const PENDING_INVESTMENT_SESSION_KEY = "pending_investment_checkout";
export const CHECKOUT_ORDER_ID_SESSION_KEY = "investment_checkout_order_id";

export interface PendingInvestmentContext {
  offeringId: number;
  slug: string;
}

export function buildCheckoutPath({ offeringId, slug }: PendingInvestmentContext): string {
  const params = new URLSearchParams({
    offeringId: String(offeringId),
    slug,
  });
  return `/marketplace/invest?${params.toString()}`;
}

export function savePendingInvestment(context: PendingInvestmentContext): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(PENDING_INVESTMENT_SESSION_KEY, JSON.stringify(context));
}

export function readPendingInvestment(): PendingInvestmentContext | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.sessionStorage.getItem(PENDING_INVESTMENT_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<PendingInvestmentContext>;
    if (
      typeof parsed.offeringId !== "number" ||
      !Number.isFinite(parsed.offeringId) ||
      typeof parsed.slug !== "string" ||
      !parsed.slug.trim()
    ) {
      return null;
    }
    return { offeringId: parsed.offeringId, slug: parsed.slug.trim() };
  } catch {
    return null;
  }
}

export function clearPendingInvestment(): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(PENDING_INVESTMENT_SESSION_KEY);
}

export function buildTradingSignInPath(context: PendingInvestmentContext): string {
  savePendingInvestment(context);
  return "/sign-in?from=trading";
}

export function parseCheckoutSearchParams(
  searchParams: URLSearchParams
): PendingInvestmentContext | null {
  const offeringIdRaw = searchParams.get("offeringId");
  const slug = searchParams.get("slug")?.trim();

  if (!offeringIdRaw || !slug) {
    return null;
  }

  const offeringId = Number.parseInt(offeringIdRaw, 10);
  if (!Number.isFinite(offeringId) || offeringId <= 0) {
    return null;
  }

  return { offeringId, slug };
}

export function parseOrderIdFromPaystackReference(reference: string | null): number | null {
  if (!reference) return null;
  const match = /^ANT-ORD-(\d+)-/.exec(reference);
  if (!match) return null;
  const orderId = Number.parseInt(match[1], 10);
  return Number.isFinite(orderId) ? orderId : null;
}

export function saveCheckoutOrderId(orderId: number): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(CHECKOUT_ORDER_ID_SESSION_KEY, String(orderId));
}

export function readCheckoutOrderId(): number | null {
  if (typeof window === "undefined") return null;
  const raw = window.sessionStorage.getItem(CHECKOUT_ORDER_ID_SESSION_KEY);
  if (!raw) return null;
  const orderId = Number.parseInt(raw, 10);
  return Number.isFinite(orderId) ? orderId : null;
}

export function clearCheckoutOrderId(): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(CHECKOUT_ORDER_ID_SESSION_KEY);
}
