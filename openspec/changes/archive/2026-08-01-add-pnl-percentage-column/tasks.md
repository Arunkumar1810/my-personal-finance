## 1. Component Updates

- [x] 1.1 Update `HoldingsTable` header to include a new `P&L %` column.
- [x] 1.2 Calculate the P&L percentage for each row using `(holding.pnl / holding.investedAmount) * 100`.
- [x] 1.3 Add a fallback to display `0.00%` if `holding.investedAmount` is zero.
- [x] 1.4 Render the calculated value in the new column.
- [x] 1.5 Apply conditional styling (green for > 0, red for < 0) to the P&L % value.
- [x] 1.6 Adjust table column widths to accommodate the new column without breaking layout.
