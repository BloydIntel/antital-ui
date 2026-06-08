# Individual Dashboard Integration (#169)

**Issue:** [BloydIntel/antital-ui#169](https://github.com/BloydIntel/antital-ui/issues/169) — BE API + FE Integration — Individual Dashboard  
**UI entry:** [https://antital-ui.netlify.app/dashboard](https://antital-ui.netlify.app/dashboard)  
**Route:** `/dashboard` only

## Goal

Replace hardcoded/mock data on the **Individual Dashboard** with authenticated API data, without changing layout or touching other app routes.

## Scope (dashboard widgets only)

| # | Widget | Component | Current source |
|---|--------|-----------|----------------|
| 1 | Welcome header | `DashboardSubHeader` | `GET /api/users/{id}` via `useCurrentUser` |
| 2 | Summary cards | `SectionCards` | API `summary` |
| 3 | Portfolio stat chart | `PortfolioStatChart` | API `portfolioPerformance` |
| 4 | Active deals panel | `PortfolioStatChart` (right column) | API `activeDeals` |
| 5 | Investment holdings table | `DataTable` on `/dashboard` | API `holdings` |
| 6 | New investment CTA | `DashboardSubHeader` | navigates to `/marketplace` |

**Period filter** drives **one** `period` query param for all widgets (summary, chart, deals preview, holdings). Mock `"Active"` option and `uiState` removed from `/dashboard`.

## Out Of Scope (#169)

- `/portfolio`, `/marketplace`, `/balance-funding`, sidebar, settings, auth pages
- Secondary market, invest/watchlist **write** actions
- Fixing 404 sidebar links
- Marketing `/explore` (already integrated separately)
- Full watchlist page — only the **Active Deals preview** on the dashboard chart card

## Period filter (target design)

Single dropdown in `DashboardSubHeader`. **Not** related to the **Active Deals** widget title (that panel shows watchlist/deal preview for the selected period).

### UI options (labels)

| Order | Label | API `period` |
|------|--------|----------------|
| 1 (default) | This month | `this-month` |
| 2 | Last month | `last-month` |
| 3 | Last 3 months | `last-3-months` |
| 4 | Last 6 months | `last-6-months` |
| 5 | Last 12 months | `last-12-months` |

Rolling windows include the **current calendar month** (e.g. Last 3 months in June = Apr–Jun).

### FE mapping

`src/lib/dashboard-period.ts` — `DASHBOARD_PERIOD_OPTIONS`, `buildDashboardMonthOptions()`, `toDashboardPeriod()`

### Backend resolution

`DashboardPeriodResolver` — `Africa/Lagos` timezone; invalid period → `400`.

## API contract

```
GET /api/investors/me/dashboard?period=this-month
Authorization: Bearer {token}
```

**Period query values:** `this-month` | `last-month` | `last-3-months` | `last-6-months` | `last-12-months`

**Empty states:** New investor → zeros + empty arrays.

## Checkpoints

| # | Checkpoint | Repo | Status |
|---|------------|------|--------|
| 1 | Dashboard API contract + `GET /api/investors/me/dashboard` | antital-api | completed |
| 2 | Types, service, hook (`useDashboard`) | antital-ui | completed |
| 3 | Wire header + summary cards + period filter | antital-ui | completed |
| 4 | Wire portfolio chart + active deals panel | antital-ui | completed |
| 5 | Wire investment holdings table | antital-ui | completed |
| 6 | New investment → `/marketplace` + loading/error states | antital-ui | completed |
| 7 | Browser verify vs Render API + Netlify | antital-ui | pending |

## Permission rule

Implement checkpoints sequentially; update status when complete. Stop after each checkpoint for approval.

---

## Checkpoint 1 — Dashboard API (backend)

- [x] Status: completed

**Implemented:** `InvestorsController`, `GetInvestorDashboardQuery`, domain models (`InvestorWallet`, `InvestorHolding`, `InvestorWatchlistItem`, `InvestorPortfolioPerformancePoint`), `InvestorDashboardRepository`, `InvestorDashboardSeed`, migration `AddInvestorDashboard`, integration tests.

---

## Checkpoint 2 — FE types, service, hook

- [x] Status: completed

**Files:** `src/types/dashboard-api.ts`, `src/services/dashboardService.ts`, `src/hooks/use-dashboard.ts`, `src/constants.ts`, `src/lib/dashboard-period.ts`

---

## Checkpoint 3 — Header + summary cards

- [x] Status: completed

**Files:** `Dashboard.tsx`, `section-cards.tsx` — dynamic month list, API summary, no mock toggle on `/dashboard`.

---

## Checkpoint 4 — Chart + active deals

- [x] Status: completed

**Files:** `chart-area-interactive.tsx` — `portfolioPerformance` + `activeDeals` from API on `/dashboard`.

---

## Checkpoint 5 — Holdings table

- [x] Status: completed

**Files:** `data-table.tsx` — `/dashboard` uses `holdings` prop; portfolio/marketplace unchanged (mock JSON).

---

## Checkpoint 6 — New investment CTA + states

- [x] Status: completed

**Files:** `Dashboard.tsx` — `/marketplace` navigation; `showApiErrorToast` on fetch failure; loading states on widgets.

---

## Checkpoint 7 — Browser verification

- [ ] Status: pending

**Done criteria:** Signed-in user on `/dashboard` shows API data (or empty states); changing period refetches all widgets; verified against Render API URL.

## Readiness checklist

- [x] Dashboard UI structure documented (Playwright)
- [x] Period filter design agreed (`this-month` | `last-month` | `last-3-months` | `last-6-months` | `last-12-months`; remove mock **Active**)
- [x] Backend seeds sample holdings for first verified individual investor (`InvestorDashboardSeed`)
- [ ] Netlify `NEXT_PUBLIC_API_URL=https://antital-api.onrender.com` (confirm on deploy)
- [x] Auth: dashboard hook uses JWT via interceptors (401 → refresh/redirect)

## Related work (not #169)

- Portfolio page reuse of `DataTable` → separate issue
- Marketplace / Balance & Funding → separate issues
- Auth middleware for all `/dashboard/*` → may be prerequisite; track separately if not in #169
