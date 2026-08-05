## Context

The Portfolio Valuation tab (`PortfolioValuation.tsx`) currently shows three top-level KPIs (current value, available funds, XIRR), two SVG charts (Wealth Velocity gauge, XIRR Projection), and a Cash Flow Ledger table. All data flows from a single API call to `/api/portfolio-valuation` which returns `current_value`, `available_funds`, `xirr`, and `transactions[]`.

The tab is missing a capital narrative — the user cannot see how much total money they have deployed, what they've taken out, and what the unrealised gain is in absolute terms. The ledger table shows individual events but not an aggregated story.

## Goals / Non-Goals

**Goals:**
- Add a Capital Story Card aggregating deposits, withdrawals, net invested, unrealised gain, and gain %
- Add a Capital Efficiency Bar showing deployed vs idle cash ratio
- Add a Monthly Cash Flow Bar Chart as a visual layer above the existing ledger table
- Add a Portfolio Tenure Badge (age since first deposit)
- All additions use only data already present in the API response — zero backend changes

**Non-Goals:**
- Benchmark comparison vs Nifty 50 (deferred — requires external data)
- Risk metrics (drawdown, Sharpe) — requires historical snapshots not yet available
- Tax estimation — requires per-holding cost basis dates
- Any changes to the backend, gRPC layer, or database

## Decisions

### 1. Pure frontend derivation — no backend changes

All new data points are computed client-side from `transactions[]` and `current_value`/`available_funds`:

| Metric | Derivation |
|---|---|
| Total Deposited | `sum(tx.amount where tx.type === 'deposit')` |
| Total Withdrawn | `sum(abs(tx.amount) where tx.type === 'withdrawal')` |
| Net Invested | `Total Deposited - Total Withdrawn` |
| Unrealised Gain | `current_value - Net Invested` |
| Gain % | `(Unrealised Gain / Net Invested) * 100` |
| Deployed | `current_value` |
| Idle | `available_funds` |
| Total Capital | `current_value + available_funds` |
| Deployed % | `current_value / (current_value + available_funds) * 100` |
| Portfolio Age | `today - min(tx.date)` |

**Rationale:** Avoids any backend work, ships faster, and the math is straightforward.

### 2. Inline SVG for Monthly Cash Flow Chart — consistent with existing pattern

The existing charts (`WealthVelocity`, `GhostXIRR`) are hand-rolled SVG components. The monthly cash flow bar chart will follow the same pattern — inline SVG in the component, no new chart library dependency.

**Alternative considered:** Recharts or Chart.js. Rejected to avoid adding a dependency and to maintain visual consistency with the existing dark-themed SVG charts.

### 3. Layout — new sections inserted between KPI row and existing charts

```
[KPI row: Current Value | Available Funds | XIRR]   ← existing
[Capital Story Card]                                 ← NEW
[Capital Efficiency Bar + Portfolio Tenure]          ← NEW
[Wealth Velocity | XIRR Projection]                 ← existing
[Monthly Cash Flow Chart]                            ← NEW
[Cash Flow Ledger Table]                             ← existing
```

**Rationale:** Capital context should be understood before looking at the charts. The monthly chart naturally sits above the detailed table as a visual summary.

### 4. Colour system — consistent with existing design tokens

The component uses Tailwind with a specific dark palette (`#16161D`, `#0D0D12`, `#2C2C35`). New components use the same palette. Gain/positive values use `text-green-400`, loss/negative uses `text-red-400`, neutral uses `text-neutral-300`.

## Risks / Trade-offs

- **Transactions not loaded yet** → All new sections guard against empty `transactions[]` and show `--` or `0` gracefully. No crash risk.
- **Negative unrealised gain** → Gain display uses conditional colour (red/green) same as existing XIRR display.
- **Large transaction history** → Monthly chart aggregation is O(n) over transactions; no performance concern for personal-scale data.
- **No withdrawal transactions** → Capital efficiency and net invested still render correctly; gain % shows full `current_value` as gain.
