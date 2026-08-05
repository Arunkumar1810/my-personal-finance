## 1. Kite Service Integration

- [x] 1.1 Implement Kite Service methods to fetch raw cash transactions.
- [x] 1.2 Implement Kite Service methods to fetch current portfolio value and available funds.

## 2. Swing Trading Service Logic

- [x] 2.1 Implement robust XIRR calculation utility in the Swing Trading Service.
- [x] 2.2 Create service layer to aggregate Portfolio Value, Available Funds, and XIRR using Kite Service data.
- [x] 2.3 Expose REST endpoints or GraphQL resolvers to serve the aggregated data to the frontend.

## 3. Frontend Portfolio Valuation Update

- [x] 3.1 Update Portfolio Valuation view layout to accommodate new metrics (XIRR, Wealth Velocity, Ghost XIRR).
- [x] 3.2 Integrate data fetching from the Swing Trading Service API.

## 4. UI Components

- [x] 4.1 Build visual "water drop" ledger for listing deposits and withdrawals in the Portfolio Valuation view.
- [x] 4.2 Build "Wealth Velocity" speedometer React component.
- [x] 4.3 Build "Ghost XIRR" predictive trendline component.

## 5. Calculator Mode Interactivity

- [x] 5.1 Implement interactive "Calculator Mode" UI in the ledger (edit/drag simulated flows).
- [x] 5.2 Add lightweight client-side XIRR recalculation for real-time interactive updates without hitting the backend.
- [x] 5.3 Add toggles to switch between real and nominal returns.
