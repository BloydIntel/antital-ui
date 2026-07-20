# Feedback from testing — bugfix plan

## Goal

Fix guest, KYC, dashboard, and marketplace issues reported from QA testing so public browsing and core authenticated flows work as expected.

## Scope

- Guest homepage / landing CTAs and campaign detail actions.
- Guest About Us CTA.
- KYC validation for first two stages (non-skip path).
- Dashboard/portfolio chart toggle, kebab menu, and graph/data alignment.
- Marketplace sidebar label rename.
- Login: sync `userType` from API into persisted store (correct investor vs fundraiser dashboard).
- Preserve prior fix: explore detail stays public for guests (no forced login on load).

## Out Of Scope

- Building a real secondary-market trading product (MVP: Coming Soon only).
- Building a full founder “apply to list” product (MVP: fix dead link only).
- Backend watchlist/invest API contract changes.
- Unrelated footer 404s (`/investments`, `/fixed-savings`, etc.) unless they appear in this feedback list.

## Checkpoints

| # | Checkpoint | Status |
|---|---|---|
| 0 | Explore detail public for guests (watchlist status + 401 interceptor) | completed |
| 1 | Guest homepage CTAs + secondary market Coming Soon | completed |
| 2 | Guest campaign detail actions (share, watchlist, Start trading ×N) | completed |
| 3 | Guest About Us — Explore investment | completed |
| 4 | KYC — require first 2 stages before proceed (non-skip) | completed |
| 5 | Dashboard — portfolio toggle, kebab, graph vs holdings | completed |
| 6 | Sidebar — rename Trade & Market → Marketplace | completed |
| 7 | Login — sync userType from API to localStorage | completed |
| 8 | Playwright / browser verification of fixed flows | completed |

## Permission rule

All checkpoints implemented in this branch per user approval.

---

## Issue tracker (QA feedback)

| ID | Area | Issue | Status |
|---|---|---|---|
| G1 | Guest homepage | Share button on campaigns unresponsive | fixed |
| G2 | Guest homepage | Add to watchlist on guest campaign unresponsive | fixed |
| G3 | Guest homepage | Start trading buttons on guest campaign | fixed (via checkout hook) |
| G4 | Guest homepage | Hero Invest now → 404 | fixed → `/create-account` |
| G5 | Guest homepage | Secondary market Start trading → 404 | fixed → `/secondary-market` + Coming Soon |
| G6 | Guest homepage | Apply to list → 404 | fixed → `/create-account` |
| A1 | Guest About Us | Explore investment unresponsive | fixed → `/explore` |
| K1 | Sign up KYC | Proceed without first 2 KYC stages | fixed validation + review labels |
| D1 | Dashboard | Portfolio stat / distribution toggle | fixed controlled select |
| D2 | Dashboard | Three-dot does nothing | fixed (removed) |
| D3 | Dashboard | Graph vs portfolio mismatch | fixed currency + holdings dist |
| M1 | Trade & market | Rename sidebar to Marketplace | fixed |
| U1 | Login / dashboard | Wrong userType (fundraiser default) | fixed API sync |
| P0 | Explore detail | Guest forced to login | fixed |
