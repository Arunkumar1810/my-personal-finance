## Why

Currently, the backend fetches all GTTs (including historical, triggered, and cancelled orders) from the Kite API and caches/broadcasts them to the frontend. This bloats the cache memory and websocket payloads unnecessarily with dead orders that aren't needed for the current dashboard view.

## What Changes

- Filter the fetched GTTs in `kite_client.py` right after the API call, so only GTTs with `status == 'active'` are cached and broadcasted.

## Capabilities

### New Capabilities
None

### Modified Capabilities
- `gtt-dashboard`: The requirement for which GTTs to fetch and display is changing to only include active GTT orders.

## Impact

- `backend/kite_client.py`: The `fetch_and_cache_gtt_orders` function will be updated to filter the returned GTT list.
- Websocket payloads will be significantly smaller.
- The frontend will only receive and display active GTTs.
