## 1. Derived Data Computation

- [x] 1.1 In `PortfolioValuation.tsx`, compute `totalDeposited` (sum of deposit transaction amounts) and `totalWithdrawn` (sum of abs(withdrawal amounts)) from `data.transactions`
- [x] 1.2 Compute `netInvested = totalDeposited - totalWithdrawn`
- [x] 1.3 Compute `unrealisedGain = data.current_value - netInvested` and `gainPct = (unrealisedGain / netInvested) * 100`
- [x] 1.4 Compute `totalCapital = data.current_value + data.available_funds`, `deployedPct` and `idlePct` ratios
- [x] 1.5 Compute `portfolioStartDate` as the minimum date in `data.transactions` and `portfolioAge` in years + months

## 2. Capital Story Card

- [x] 2.1 Add a Capital Story Card section below the existing 3-column KPI row in `PortfolioValuation.tsx`
- [x] 2.2 Render six cells: Total Deposited, Total Withdrawn, Net Invested, Current Value, Unrealised Gain, Gain % — using the computed values from Task 1.1–1.3
- [x] 2.3 Apply green colour (`text-green-400`) for positive unrealised gain and red (`text-red-400`) for negative
- [x] 2.4 Show `₹0` / `0.00%` for all cells when `data.transactions` is empty

## 3. Portfolio Tenure Badge

- [x] 3.1 Add a Portfolio Tenure Badge adjacent to the Capital Story Card header (or below it) using `portfolioStartDate` and `portfolioAge` computed in Task 1.5
- [x] 3.2 Format as "Since [Month Year] • [Xy Ym]" — show only months if under 1 year (e.g., "Since Aug 2025 • 11m")
- [x] 3.3 Do not render the badge when `data.transactions` is empty

## 4. Capital Efficiency Bar

- [x] 4.1 Add a Capital Efficiency Bar section below the Capital Story Card
- [x] 4.2 Render a horizontal bar with two colour segments: "In Market" (purple or indigo, proportional to `deployedPct`) and "Idle Cash" (neutral, proportional to `idlePct`)
- [x] 4.3 Show labels with rupee amounts and percentages for each segment beneath or beside the bar
- [x] 4.4 Handle edge case: if `totalCapital` is zero, render bar as empty/neutral with both values at ₹0

## 5. Monthly Cash Flow Bar Chart

- [x] 5.1 Aggregate `data.transactions` by calendar month (YYYY-MM key), summing deposits and withdrawals separately into a `monthlyData` array sorted chronologically
- [x] 5.2 Create an inline SVG bar chart component (or inline JSX within `PortfolioValuation.tsx`) following the same dark-theme SVG pattern as `WealthVelocity` and `GhostXIRR`
- [x] 5.3 Render grouped bars per month: deposit bar (green) and withdrawal bar (red/amber) side by side
- [x] 5.4 Add X-axis month labels (e.g., "Jan 25") and Y-axis scale lines
- [x] 5.5 Show an empty state ("No cash flow data yet") when `data.transactions` is empty
- [x] 5.6 Insert the Monthly Cash Flow Chart section between the Wealth Velocity/XIRR Projection charts and the Cash Flow Ledger table

## 6. Layout & Integration

- [x] 6.1 Verify final section order in `PortfolioValuation.tsx`: (1) KPI row, (2) Capital Story Card + Tenure Badge, (3) Capital Efficiency Bar, (4) Wealth Velocity + XIRR Projection, (5) Monthly Cash Flow Chart, (6) Cash Flow Ledger table
- [x] 6.2 Ensure all new sections are wrapped in the existing `mt-8` spacing convention for visual consistency
- [x] 6.3 Verify the Nominal/Real XIRR toggle still works correctly and does not affect the new capital sections (those show absolute values, not XIRR-derived values)
- [x] 6.4 Smoke test in browser: navigate to `/valuation`, confirm all sections render, confirm empty state for transactions renders gracefully
