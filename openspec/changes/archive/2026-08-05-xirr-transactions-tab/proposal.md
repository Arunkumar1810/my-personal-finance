## Why

Currently, the dashboard lacks a way to track the true annualized rate of return of the portfolio accounting for irregular cash flows (deposits and withdrawals) over time. This change integrates XIRR, Portfolio Value, and Available Funds into the existing Portfolio Valuation view, pulling live/cached data directly from the Kite Service and processing it via a Swing Trading Service, eliminating the need for manual data entry or local transaction persistence.

## What Changes

- Integrate XIRR calculation, Portfolio Value, and Available Funds displays directly into the "Portfolio Valuation" view.
- Implement an interactive Calculator Mode to show step-by-step XIRR transparency.
- Visualize "Wealth Velocity" and a predictive "Ghost XIRR" trendline.
- Display a transactions ledger with visual "water drop" representations for cash flows within the Portfolio Valuation view.
- Add clear toggles to view real vs. nominal returns.
- Connect to the Kite Service to fetch cash transactions, portfolio value, and available funds.
- Utilize a Swing Trading Service to calculate XIRR, Portfolio Value, and Available funds based on the Kite data.

## Capabilities

### Modified Capabilities
- `portfolio-valuation-view`: Enhance existing view to include XIRR, Wealth Velocity, Ghost XIRR, and the transaction ledger.
- `swing-trading-service`: Backend capability to calculate XIRR, aggregate portfolio value, and determine available funds from Kite data.
- `kite-service-integration`: Fetch cash transactions, portfolio value, and available funds dynamically.

## Impact

- **Frontend**: Updates to the Portfolio Valuation components to support heavy mathematical calculations and new visualizations. No new tabs or routing required.
- **Backend**: Shift from local SQLite storage to dynamic data retrieval via Kite Service and on-the-fly calculations in the Swing Trading Service.
- **Data Model**: Relies entirely on external API (Kite) as the source of truth, removing local transaction persistence requirements.
