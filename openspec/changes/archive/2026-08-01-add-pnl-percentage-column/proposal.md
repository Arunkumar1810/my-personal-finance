## Why

Users currently can only see absolute P&L in the Active Holdings table. Adding a P&L % column allows users to quickly assess the relative performance of each holding, improving their ability to make informed trading decisions.

## What Changes

- Add a new "P&L %" column to the `HoldingsTable` on the Active Trades page.
- Calculate the percentage based on the P&L and invested amount for each row.
- Format the P&L % value dynamically (green for positive, red for negative).

## Capabilities

### New Capabilities
- `holdings-pnl-percentage`: Introduce a P&L % column to the Active Holdings table to display relative profit or loss.

### Modified Capabilities

## Impact

- `HoldingsTable` component in the frontend to include the new column and styling.
