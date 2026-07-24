## 1. Backend: Data Fetching and Caching

- [x] 1.1 In `backend/kite_client.py`, create a new function `fetch_and_cache_positions(kite)` that fetches `kite.positions()`.
- [x] 1.2 In `backend/kite_client.py`, update `authenticate_kite` and `auth_callback` in `main.py` to also call `fetch_and_cache_positions(kite)`.

## 2. Backend: Data Merging Logic

- [x] 2.1 In `backend/cross_reference.py`, create a `merge_holdings_and_positions(holdings, positions)` function.
- [x] 2.2 Implement the merging logic inside the new function: group by `tradingsymbol`, sum quantities and PNL, and calculate weighted average price.
- [x] 2.3 Update `construct_unified_payload` in `backend/cross_reference.py` to call the merge function and return the merged list in the `holdings` key.

## 3. WebSocket Integration

- [x] 3.1 Update `backend/main.py` WebSocket endpoint to pass the fetched positions into `construct_unified_payload`.
- [x] 3.2 Ensure the ticker and GTT logic continue to work with the updated unified `holdings` key payload.

## 4. Testing

- [x] 4.1 Verify the WebSocket payload on the frontend correctly displays the merged positions and holdings.
