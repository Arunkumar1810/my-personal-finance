## Why

When the backend falls back to the SQLite cache during a Kite API outage, the frontend receives stale data but currently does not clearly indicate this to the user. We need to display a prominent warning banner and explicitly block trade queueing to prevent users from making decisions based on stale data or attempting synthetic trades while offline.

## What Changes

- Add a prominent warning banner indicating "Live Market Data is Unavailable" when `fallback: true` is present in the response.
- Disable all "Buy", "Sell", and "Modify" buttons across the dashboard to prevent synthetic trade queueing.
- Block any trade submissions, even if a trade modal was already open when the connection dropped.
- Visually gray out or mark as suspended any existing "Pending" orders.

## Capabilities

### New Capabilities
- `offline-ui`: Defines the UI behaviors and action blocking logic when the frontend is operating in offline/fallback mode.

### Modified Capabilities
- *(None)*

## Impact

- **React SPA**: Updates to the dashboard layout, trade modals, and order lists to conditionally read the `fallback` flag and adjust UI state.
