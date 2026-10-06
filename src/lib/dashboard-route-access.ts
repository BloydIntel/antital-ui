/**
 * Dashboard routes that are backed by authenticated API calls.
 *
 * Routes not listed here are currently UI-only demos and intentionally remain
 * accessible without a session until their APIs are connected.
 */
const AUTHENTICATED_DASHBOARD_ROUTES = [
  "/analytics",
  "/balance-funding",
  "/campaigns",
  "/dashboard",
  "/documents",
  "/investors",
  "/marketplace",
  "/portfolio",
  "/settings",
  "/watchlist",
] as const;

export function isAuthenticatedDashboardRoute(pathname: string): boolean {
  return AUTHENTICATED_DASHBOARD_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}
