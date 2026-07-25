## Why

Traders need to submit new ticker symbols into the system so the AI can evaluate them during the next 15-minute sync. This forms the basis of the user input cycle for the Swing Trading Dashboard, allowing manual entry of watchlist items that will eventually be written to Google Sheets via our shared ledger architecture.

## What Changes

- Add a text input form in the Watchlist Queue UI to submit new ticker symbols.
- Upon submission, append a new row to the queue locally (mock state).
- Display an "Awaiting 15-min Sync" skeleton loader state for newly added rows.
- Store the new ticker in a mock state layer that will later be wired to the Google Sheets backend.

## Capabilities

### New Capabilities
- `watchlist-data-entry`: UI and mock state management for submitting new stock tickers into the Watchlist Queue.

### Modified Capabilities

## Impact

- **Frontend**: New UI component (form + input) for entering tickers. Watchlist queue component will be updated to display pending states ("Awaiting 15-min Sync").
- **State**: Mock state update function to simulate writing to the shared ledger.
