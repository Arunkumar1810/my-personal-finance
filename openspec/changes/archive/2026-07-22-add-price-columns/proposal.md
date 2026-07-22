## Why

Users need to see the current market price and their original bought price (average price) for each stock alongside their GTT orders. This allows them to quickly evaluate if their GTT stop-loss or target is set correctly relative to the current market and their entry position.

## What Changes

- Add a "Current Price" column to the GTT dashboard table.
- Add a "Bought Price" (average price) column to the GTT dashboard table.
- Both values should be extracted from the backend unified payload and displayed in the frontend.

## Capabilities

### New Capabilities

### Modified Capabilities
- `gtt-dashboard`: The GTT table requirements will be updated to include displaying "Current Price" and "Bought Price" columns.

## Impact

- Frontend: `GttTable.tsx` and `GttDashboard.tsx` will need to extract and display these new fields from the websocket payload.
- Backend: `cross_reference.py` must ensure `last_price` and `average_price` from the holdings are passed correctly into the unified GTT payload.
