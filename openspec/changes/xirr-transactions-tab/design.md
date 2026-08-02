## Context

Currently, portfolio performance is tracked by simple point-in-time value, which does not account for deposits and withdrawals over time, making it hard to track the true annualized rate of return (XIRR). We are integrating new UI elements into the existing "Portfolio Valuation" view to visualize cash flows and calculate XIRR, pulling data directly from Kite.

## Goals / Non-Goals

**Goals:**
- Integrate a clear, actionable Transactions & XIRR section into the Portfolio Valuation view.
- Provide a ledger view of transactions (deposits/withdrawals) with visual context ("water drop").
- Implement "Wealth Velocity" and predictive "Ghost XIRR" visualizations.
- Provide step-by-step transparency into the XIRR calculation via "Calculator Mode".
- Retrieve live transaction, portfolio value, and available funds data via Kite Service.
- Perform XIRR and value calculations using the Swing Trading Service.

**Non-Goals:**
- Full tax-loss harvesting recommendations based on XIRR.
- Manual entry of transaction data or local SQLite persistence for transactions.

## Decisions

- **XIRR Calculation Location**: The Swing Trading Service will perform core calculations (XIRR, Portfolio Value, Available Funds) based on data fetched from the Kite Service. The frontend will consume these calculated values, though lightweight recalculations for "Calculator Mode" interactivity may still occur client-side.
- **Data Sourcing**: No local SQLite `transactions` table. Data is dynamically fetched or cached from Kite APIs.
- **Display Location**: All new components will be embedded in the existing Portfolio Valuation view rather than a standalone tab.
- **Visual Paradigms**: We will build custom React components for the "Wealth Velocity" speedometer and "Ghost XIRR" chart, leveraging `recharts` or standard SVG/CSS for the visualisations.

## Risks / Trade-offs

- **Risk: Kite API rate limits or latency** -> **Mitigation**: Implement robust caching in the Kite Service / Swing Trading Service to prevent excessive API calls and ensure frontend responsiveness.
- **Risk: XIRR math complexity causing frontend lag during Calculator Mode** -> **Mitigation**: Use Web Workers if the hypothetical transaction count exceeds a performance threshold during interactive scenarios.
