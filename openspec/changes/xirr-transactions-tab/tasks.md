## 1. Kite Service Integration

- [ ] 1.1 Implement Kite Service methods to fetch raw cash transactions.
- [ ] 1.2 Implement Kite Service methods to fetch current portfolio value and available funds.

## 2. Swing Trading Service Logic

- [ ] 2.1 Implement robust XIRR calculation utility in the Swing Trading Service.
- [ ] 2.2 Create service layer to aggregate Portfolio Value, Available Funds, and XIRR using Kite Service data.
- [ ] 2.3 Expose REST endpoints or GraphQL resolvers to serve the aggregated data to the frontend.

## 3. Frontend Portfolio Valuation Update

- [ ] 3.1 Update Portfolio Valuation view layout to accommodate new metrics (XIRR, Wealth Velocity, Ghost XIRR).
- [ ] 3.2 Integrate data fetching from the Swing Trading Service API.

## 4. UI Components

- [ ] 4.1 Build visual "water drop" ledger for listing deposits and withdrawals in the Portfolio Valuation view.
- [ ] 4.2 Build "Wealth Velocity" speedometer React component.
- [ ] 4.3 Build "Ghost XIRR" predictive trendline component.

## 5. Calculator Mode Interactivity

- [ ] 5.1 Implement interactive "Calculator Mode" UI in the ledger (edit/drag simulated flows).
- [ ] 5.2 Add lightweight client-side XIRR recalculation for real-time interactive updates without hitting the backend.
- [ ] 5.3 Add toggles to switch between real and nominal returns.
