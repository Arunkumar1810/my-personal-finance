## Context

To support a complete swing trading journal, we need historical trade data that isn't accessible via the standard Kite Connect API if the trades are older. The Zerodha Console Tradebook API provides this historical data but requires an `enctoken` for authentication. We need to implement a mechanism to fetch this data from the Console, parse it, and expose it via our backend so the frontend can trigger the sync.

## Goals / Non-Goals

**Goals:**
- Implement `fetch_and_parse_tradebook(enctoken)` in a new or existing `console_client.py` module.
- Add an API endpoint `POST /api/console/tradebook-sync` in the backend.
- Update the frontend `HistoryPage.tsx` with a "Sync Tradebook" button to trigger the sync.

**Non-Goals:**
- Fully automated background syncing (this will be user-triggered).
- Using the official Kite Connect API for historical trades (since it's limited, we rely on the Console).

## Decisions

- **Client Separation**: We will use `backend/console_client.py` to keep the undocumented Console API separate from any official `kite_client.py` usage.
- **Trigger Mechanism**: A simple button on `HistoryPage.tsx` will POST to `/api/console/tradebook-sync`. 

## Risks / Trade-offs

- **Risk**: The `enctoken` is a session token and may expire or become invalid.
  - **Mitigation**: The backend must handle authentication failures gracefully and return a clear error (e.g., HTTP 401/403) so the frontend can prompt the user to update their enctoken.
- **Risk**: Undocumented API changes.
  - **Mitigation**: Isolate the console fetching logic so it can be easily updated if Zerodha changes the response format.
