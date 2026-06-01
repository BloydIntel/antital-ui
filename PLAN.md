# Investment Explore UI Integration

## Goal

Replace static `investments.json` and hardcoded detail sections with the domain-first `/api/investments` backend.

## Scope

- Types, service, React Query hooks for list + detail bundle.
- Landing/explore cards, new launches carousel.
- Detail page composes domain resources (highlights, content-blocks, team, financials, etc.).

## Out Of Scope

- Invest / watchlist / ask-question authenticated actions.
- Admin listing CRUD.

## API contracts and endpoints available

See `antital-api/PLAN.md`. UI consumes:

- `GET /api/investments`
- `GET /api/investments/{idOrSlug}` + sub-resources (parallel fetch in one hook)

## Checkpoints

| # | Checkpoint | Status |
|---|------------|--------|
| 1 | Types, service, mappers, hooks | completed |
| 2 | List integration (landing, explore, new launches) | completed |
| 3 | Detail page + section props from API | completed |
| 4 | Browser verification (Playwright) | completed |

## Permission rule

Implement checkpoints sequentially; update status when complete.

---

## Checkpoint 1 — Types, service, mappers, hooks

- [x] Status: completed

**Files:** `src/types/investment.ts`, `src/services/investmentService.ts`, `src/lib/investment-mappers.ts`, `src/hooks/use-investments.ts`, `src/hooks/use-investment-detail.ts`, `src/constants.ts`

**Done criteria:** Service calls all public investment routes; hooks expose list + detail bundle.

---

## Checkpoint 2 — List integration

- [x] Status: completed

**UI entry:** Landing `InvestmentOpportunities`, explore page, `NewLaunches`.

**Files:** `investment-opportunities.tsx`, `new-launches.tsx`

**Done criteria:** Cards render from API with loading/error states; links use slug.

**Verified:** Landing at `http://localhost:3000/` shows AgriTech Innovations, AquaPure Innovations, EcoBuild Materials from API.

---

## Checkpoint 3 — Detail page

- [x] Status: completed

**UI entry:** `/explore/[id]`

**Files:** `explore/[id]/page.tsx`, `investment-detail-page-client.tsx`, `investment-detail-page-content.tsx`, investment section components

**Done criteria:** Page fetches shell + sub-resources; no hardcoded NEXUS AI copy; UI composes domain data.

**Verified:** `/explore/greentech-solutions` renders GreenTech Solutions with API highlights, team, financials, deal terms, and funding panel.

---

## Checkpoint 4 — Browser verification

- [x] Status: completed

**Done criteria:** Landing shows API cards; detail page for `greentech-solutions` shows GreenTech data from API.

**Test notes (Playwright, 2026-05-31):**

- Landing cards load after React Query fetch (no static JSON).
- Detail overview: problem statement, ₦675M ARR highlight, proprietary edge, market traction, TL;DR.
- Detail tab: Dr. Eleanor Vance / Alex Chen team, financial metrics table, use of proceeds, risks, documents.
- Investment panel: ₦7,381,254 raised, 341 investors, target rating 4.5.
- Minor: seed media thumbnails (`/investments/thumb*.jpg`) 404 in Next image optimizer — assets not in `public/` yet.

## Readiness checklist

- [x] API running with investment routes (`https://localhost:7008`)
- [x] UI `NEXT_PUBLIC_API_URL` points at API
- [x] GreenTech full detail seeded on backend
- [ ] Optional follow-up: add thumbnail assets to `public/investments/` or update seed URLs
