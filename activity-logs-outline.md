# Activity Logs API-First Implementation Outline

## Goal

Replace the hard-coded Activity Logs demo with a real, authenticated, paginated activity-log experience. Preserve the existing Figma layout and interactions: summary cards, category tabs, search, filters, export, pagination, row details, and the dashboard **View Log** entry point.

## Current UI findings

- `/activity-logs` already exists and is admin-only.
- The page currently uses hard-coded summary totals and fourteen demo rows.
- Existing interactions include tabs, search, event/module/priority/status filters, export CSV, pagination, and a row detail dialog/timeline.
- The dashboard **View Log** link now points to `/activity-logs`; its API data and detail behavior are still pending.
- The deployed branch may lag the latest branch until Netlify deploys the pushed commit.

## Data boundary

Use only events that can be sourced from current persisted entities. The existing database can support investor registrations, onboarding submissions, campaign publications, and successful investments, plus the existing payment-failure records. Do not fabricate support tickets, account flags, compliance cases, administrator actions, escrow events, or a durable audit trail. Unsupported categories must be omitted or reported as zero/empty rather than presented as real activity.

## API contract to implement first

Add an authenticated admin endpoint such as `GET /api/admin/activity-logs` with:

- `page` and `pageSize` (bounded, server-enforced maximum).
- `search` applied to supported event subject/description/entity fields.
- `eventType`, `module`, `priority`, and `status` filters using stable API discriminators.
- Optional `from`/`to` UTC date range if the existing UI needs date filtering.
- A response envelope containing `summary`, `items`, `page`, `pageSize`, `totalCount`, and `totalPages`.
- A detail endpoint or detail payload sufficient for the existing row dialog; do not invent timeline stages that are not persisted.
- `401` unauthenticated, `403` non-admin, `400` invalid/bounded query values, and `200` for valid empty results.

## Ordered checklist

### Backend first

- [ ] Audit existing entities, dashboard event projections, authorization policy, pagination conventions, and response envelopes. Identify reusable event projections rather than copying dashboard queries.
- [ ] Freeze the event/type/module/status mapping and document which Figma categories are supported, omitted, or always empty based on real data.
- [ ] Add DTOs, query objects, validators, and focused tests for paging, filters, search, UTC boundaries, empty data, and invalid values.
- [ ] Add a read-only repository/query implementation with `AsNoTracking`, soft-delete filters, bounded projections, cancellation tokens, deterministic ordering, and total-count support.
- [ ] Add the admin controller endpoint(s), Swagger documentation, and server-side `AdminPolicy` authorization.
- [ ] Add integration coverage for `401`, `403`, `400`, `200`, pagination, filters, and detail lookup.
- [ ] Run full backend tests/build and smoke-test the endpoint through Aspire for supported filter combinations.

### Frontend after backend acceptance

- [ ] Add typed API models, service, React Query hooks, cache keys, and query-string mappings using the existing dashboard client/error conventions.
- [ ] Replace hard-coded summary totals and rows while preserving the current Figma structure and responsive table layout.
- [ ] Wire tabs, search, filters, pagination, export, and detail dialog to API state; reset page when filters change and preserve URL/query state where appropriate.
- [ ] Render only API-supported categories and show intentional empty states for unsupported/empty data.
- [ ] Keep dashboard **View Log** navigating to `/activity-logs`, and ensure the activity page receives the selected period/context if the API contract requires it.
- [ ] Add loading skeletons, retry/error state, accessible empty states, and shared auth/forbidden behavior without duplicate toasts.

### Acceptance

- [ ] Verify admin login, all supported filters, pagination, search, export, detail view, refresh, responsive layouts, and no console errors with Playwright.
- [ ] Verify non-admin and unauthenticated access cannot read activity logs.
- [ ] Run backend tests/build and frontend lint/type-check/build.
- [ ] Confirm no hard-coded business totals, demo rows, unsupported operational claims, or duplicated dashboard event logic remain.

## Explicitly out of scope unless the data model is approved

- Creating a persistent audit/event store.
- Fabricating support, compliance, flags, escrow, or administrator-action records.
- Mutation endpoints from the detail dialog.
- Rebuilding the existing Figma layout instead of wiring its existing controls.
