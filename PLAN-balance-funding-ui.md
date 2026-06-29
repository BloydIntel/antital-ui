# Balance & Funding — UI Integration

## Goal

Replace mock data on `/balance-funding` with live API data. UI work only; backend contracts are owned by `antital-api` branch `feature/balance-funding-api` (`PLAN-balance-funding-api.md`).

## Scope

- **Overview tab**: balance (done), recent activity preview, refresh.
- **Transactions tab**: paginated/filterable ledger + invoice links.
- **Payment Methods tab**: wire to API when available.
- Reuse `useDashboard`, `apiClient`, React Query patterns.

## Out Of Scope

- Secondary market buy/sell rows and filters (product not planned).
- Crypto payment methods UI.
- Export CSV/PDF (console.log stubs).
- Add Funds flow until API + product decision.
- API implementation (separate repo/plan).

## API contracts and endpoints available

| Method | Route | Status | UI use |
|--------|-------|--------|--------|
| `GET` | `/api/investors/me/dashboard` | **Live** | Overview balance (`summary.availableBalance`) |
| `GET` | `/api/investors/me/wallet/transactions` | **Live (API branch)** | Recent activity + Transactions tab |
| `GET` | `/api/investors/me/wallet/transactions/{id}` | **Live (API branch)** | Invoice page |
| `GET/POST/PATCH/DELETE` | `/api/investors/me/payment-methods` | **Live (API branch)** | Payment Methods tab |

**Envelope:** `Result<T>` for all investor endpoints.

**Recent activity:** same transactions list with `pageSize=3` — not a separate endpoint. Notifications (`/notifications`) remain a separate surface long term.

## Checkpoints

| # | Checkpoint | Status |
|---|------------|--------|
| 1 | Wire Overview balance to existing dashboard API | completed |
| 2 | Wire recent activity + Transactions tab to wallet transactions API | completed |
| 3 | Wire Payment Methods tab to payment-methods API | completed |
| 4 | Wire invoice page to transaction detail API | completed |
| 5 | Add Funds UI — blocked on API/product | pending |

## Permission rule

Implement only the next `pending` checkpoint. Stop and request explicit approval before the next checkpoint.

**Dependency:** Checkpoint 2 requires API checkpoint 1 merged or deployed (wallet transactions list).

---

## Checkpoint 1 — Wire Overview balance to existing dashboard API

- [x] Status: completed

**UI trigger / entry point**

- `/balance-funding` → Overview → `BalanceSection`.

**API contract needed**

- `GET /api/investors/me/dashboard?period=this-month` → `summary.availableBalance`, `summary.currency`.

**Files changed**

- `src/components/balance-funding/molecules/BalanceSection.tsx`
- `src/components/balance-funding/molecules/Overview.tsx`

**Done criteria**

- Balance from API; refresh refetches; recent activity still mock until checkpoint 2.

---

## Checkpoint 2 — Wire recent activity + Transactions tab

- [x] Status: completed

**UI trigger / entry point**

- Overview → Recent Activity (3 rows)
- `/balance-funding?tab=Transactions`

**API contract needed**

- `GET /api/investors/me/wallet/transactions?page=&pageSize=&type=&status=&from=&to=`
- Types in UI: `Investment` | `Deposit` | `Withdrawal` | `Fee` only (no Buy/Sell).

**Files to change**

- `src/services/walletTransactionService.ts` (new)
- `src/hooks/use-wallet-transactions.ts` (new)
- `src/types/wallet-transaction.ts` (new)
- `src/components/balance-funding/molecules/RecentActivitySection.tsx`
- `src/components/balance-funding/molecules/TransactionHistory.tsx`
- `src/app/(dashboard)/balance-funding/components/BalanceFunding.tsx`
- `src/data/transactionsMockData.ts` — remove from list views; trim Buy/Sell from types when unused

**Code plan**

1. Add service + hook mapping API DTO → `TransactionItem`.
2. Overview: `pageSize=3`; Transactions: full pagination/filters.
3. Remove Buy/Sell filter chips; empty state for unsupported types.

**Done criteria**

- Staging user sees paid primary investments from checkout; no mock `INV-001` rows.

**Current observed behavior (pre-integration baseline)**

- All activity from `transactionsMockData.ts` including secondary-market mocks.

---

## Checkpoint 3 — Wire Payment Methods tab

- [x] Status: completed

**UI trigger / entry point**

- Payment Methods tab; Add Payment Method modal.

**API contract needed**

- Payment-methods CRUD (see API plan).

**Files to change**

- `src/components/balance-funding/molecules/PaymentMethodsSettings.tsx`
- `src/components/balance-funding/molecules/AddPaymentModal.tsx`
- `src/services/paymentMethodService.ts` (new)
- `src/hooks/use-payment-methods.ts` (new)

**Done criteria**

- List/add/delete/set-default persists across refresh.

---

## Checkpoint 4 — Wire invoice page

- [x] Status: completed

**UI trigger / entry point**

- Transaction row → `/balance-funding/invoice/[id]`

**API contract needed**

- `GET /api/investors/me/wallet/transactions/{id}`

**Files to change**

- `src/app/(dashboard)/balance-funding/invoice/components/TransactionInvoice.tsx`
- `src/services/walletTransactionService.ts`
- `src/hooks/use-wallet-transaction.ts`
- `src/types/wallet-transaction.ts`

**Done criteria**

- Paid investment opens printable invoice; unknown id → not found.

---

## Checkpoint 5 — Add Funds UI (blocked)

- [ ] Status: pending

**Blocked on:** API plan checkpoint 4 + product decision.

---

## Readiness checklist

| Item | Status |
|------|--------|
| Dashboard API for balance | Ready |
| Wallet transactions API | Ready (API branch checkpoint 1) |
| Payment methods API | Ready (API branch checkpoint 3) |
| Transaction detail API | Ready (API branch checkpoint 2) |
