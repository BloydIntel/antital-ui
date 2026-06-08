# Individual Portfolio Integration (#173)

**Issue:** [BloydIntel/antital-ui#173](https://github.com/BloydIntel/antital-ui/issues/173)  
**UI:** [antital-ui.netlify.app/portfolio](https://antital-ui.netlify.app/portfolio)  
**Route:** `/portfolio`  
**Branch:** `features/portfolio-integration`

## Goal

Wire `/portfolio` to live investor data, reusing the dashboard API from #169.

## Scope

| Widget | Component | Source |
|--------|-----------|--------|
| Header | `DashboardSubHeader` | static + period + CTA |
| Summary cards | `SectionCards` | API `summary` |
| Chart | `PortfolioStatChart` | API `portfolioPerformance` |
| Table | `DataTable` | API `holdings` (period-filtered) |
| CTA | `DashboardSubHeader` | `/marketplace` |

Remove mock `Active` toggle and legacy months (`October`, `September`).

## Out Of Scope

- Other routes, table search/filter logic, row actions, sticky nav bug
- All-time holdings scope (use dashboard behavior)
- New `/api/investors/me/portfolio` endpoint

## Decisions

| Question | Decision |
|----------|----------|
| Holdings scope | **Same as dashboard** — period-filtered summary, chart, and table |
| Branch slug | `features/portfolio-integration` |

## API contracts and endpoints available

```
GET /api/investors/me/dashboard?period=this-month
Authorization: Bearer {token}
```

**Period values:** `this-month` | `last-month` | `last-3-months` | `last-6-months` | `last-12-months`

**Holdings extension for portfolio table columns:**
- `fundingGoal` ← `OfferingFunding.FundingGoal`
- `raisedAmount` ← `OfferingFunding.RaisedAmount`

## Checkpoints

| # | Checkpoint | Repo | Status |
|---|------------|------|--------|
| 1 | Holdings DTO: `fundingGoal` + `raisedAmount` | antital-api | completed |
| 2 | All-time holdings scope | — | skipped |
| 3 | Wire `Portfolio.tsx` | antital-ui | completed |
| 4 | Chart + summary on `/portfolio` | antital-ui | completed |
| 5 | `DataTable` holdings on `/portfolio` | antital-ui | completed |
| 6 | Browser verify | antital-ui | pending |

## Permission rule

Implement only the next `pending` checkpoint. Stop and request explicit permission before the next one.
