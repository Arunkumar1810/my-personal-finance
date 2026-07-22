## Why

Traders need to view their Good Till Triggered (GTT) orders in a clean, real-time table to quickly scan for missing holdings. This ensures that they can easily identify if their active GTT orders exceed the available holdings, allowing them to adjust their positions accordingly.

## What Changes

- Implement a real-time table in the React frontend connected to the backend WebSocket to receive the unified GTT payload.
- Group the table rows by stock symbol for better readability.
- Display a subtle warning icon next to the quantity column if the GTT quantity for a symbol exceeds the currently available holdings.

## Capabilities

### New Capabilities
- `gtt-dashboard`: Real-time frontend table view of GTT orders grouped by symbol, including missing holdings warnings.

### Modified Capabilities
- (None)

## Impact

- Frontend React components (dashboard UI).
- WebSocket event consumption logic for the unified GTT payload.
