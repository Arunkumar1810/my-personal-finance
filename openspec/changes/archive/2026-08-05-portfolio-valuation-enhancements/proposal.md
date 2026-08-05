## Why

The Portfolio Valuation tab shows XIRR, current value, and available funds but lacks the capital narrative — users cannot see total money deployed, total withdrawn, unrealised gain, or how efficiently their capital is working. Without this, the tab answers "what is my return rate?" but not "what has my money actually done?"

## What Changes

- Add a **Capital Story Card** that summarises total deposited, total withdrawn, net invested, unrealised gain, and gain % — all derived from existing `transactions[]` and `current_value` data; no backend changes required.
- Add a **Capital Efficiency Bar** showing the proportion of capital deployed in the market vs sitting as idle available funds — derived from `available_funds` and `current_value`.
- Add a **Monthly Cash Flow Bar Chart** visualising deposits and withdrawals by month as a grouped bar chart — a scannable visual upgrade over the raw ledger table, using the same `transactions[]` data.
- Add a **Portfolio Tenure Badge** showing when the portfolio was started (oldest transaction date) and total portfolio age — derived from `transactions[]`.

## Capabilities

### New Capabilities

- `capital-story-card`: Summary card aggregating total deposits, total withdrawals, net invested capital, unrealised gain (absolute + %), and portfolio age from transaction history and current portfolio value.
- `capital-efficiency-bar`: Visual bar showing the ratio of capital currently in-market vs idle available funds, giving a quick read on cash deployment.
- `monthly-cashflow-chart`: Grouped bar chart of deposits and withdrawals by calendar month, replacing the current ledger-only view with a scannable visual summary above the detailed table.

### Modified Capabilities

- `portfolio-valuation-view`: New UI sections (capital story card, capital efficiency bar, monthly cash flow chart, portfolio tenure badge) added to the existing valuation tab layout.

## Impact

- `frontend/src/components/PortfolioValuation.tsx` — primary file; all new sections added here
- No backend changes required; all new data is derived from existing API response fields (`transactions`, `current_value`, `available_funds`, `xirr`)
- No new dependencies needed; chart uses inline SVG (consistent with existing `WealthVelocity` and `GhostXIRR` components)
