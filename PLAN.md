## Goal

Replace old text/spinner loading states with layout-matching skeleton loaders across all identified pages and components.

## Scope

- Create reusable skeleton components under `src/components/skeletons/`
- Wire skeletons into all ~35 files previously using `"Loading..."`, spinners, or Suspense text fallbacks
- Keep button/action spinners (form submit, upload) unchanged

## Out Of Scope

- Dashboard cards already using inline `animate-pulse`
- Sidebar skeleton (already implemented)
- New skeleton for empty/error states

## API contracts and endpoints available

N/A — UI-only change; no API contract changes.

## Checkpoints

| # | Checkpoint | Status |
|---|---|---|
| 1 | Shared skeleton components | completed |
| 2 | Marketing, explore, marketplace loaders | completed |
| 3 | Dashboard pages (watchlist, campaigns, documents, analytics, investors, balance-funding) | completed |
| 4 | Settings organisms + auth/route-level loaders | completed |

## Permission rule

Proceed through all checkpoints in this thread per user request for full migration.

### Checkpoint 1 — Shared skeleton components

- [x] Status: completed
- **Files to change**: `src/components/skeletons/*`
- **Done criteria**: Reusable skeleton exports for investment, settings, tables, analytics, balance-funding, campaigns, and page-level loading

### Checkpoint 2 — Marketing / explore / marketplace

- [x] Status: completed
- **Files to change**: explore detail, infinite grid, landing sections, marketplace, checkout pages
- **Done criteria**: No text-only loading placeholders remain in marketing/marketplace flows

### Checkpoint 3 — Dashboard feature pages

- [x] Status: completed
- **Files to change**: watchlist, campaigns, documents, analytics, investors, balance-funding
- **Done criteria**: Each feature page shows layout-matching skeleton while fetching

### Checkpoint 4 — Settings + auth/route loaders

- [x] Status: completed
- **Files to change**: settings organisms, app loading, auth pages, chat, onboarding questionnaire
- **Done criteria**: Settings and global route transitions use skeletons instead of spinners/text

## Readiness checklist

- [x] Skeleton primitive exists at `src/components/ui/skeleton.tsx`
- [x] Target file list identified from prior audit
- [x] No API or data-fetching logic changes required
