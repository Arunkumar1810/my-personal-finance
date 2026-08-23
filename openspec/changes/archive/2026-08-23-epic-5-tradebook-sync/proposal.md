## Why

To maintain an accurate history of trades, we need to fetch historical tradebook from Zerodha Console (part of Epic 5: Historical Tradebook Sync). This solves the need to have a comprehensive and accurate record of trades without manual entry.

## What Changes

- Add `fetch_and_parse_tradebook(enctoken)` to `backend/console_client.py` pulling from Console Tradebook API.
- Add `POST /api/console/tradebook-sync` endpoint in `backend/main.py` to trigger the sync.
- Add a "Sync Tradebook" button to `HistoryPage.tsx` in the frontend that calls this new API.

## Capabilities

### New Capabilities
- `tradebook-sync`: Fetches and parses historical tradebook data from the Zerodha Console API.

### Modified Capabilities

## Impact

- `backend/console_client.py` (new function)
- `backend/main.py` (new API endpoint)
- `HistoryPage.tsx` (frontend UI update)
