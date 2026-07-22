## Why

Traders need to know how many units they are missing when placing GTT (Good Till Triggered) orders. By cross-referencing active GTT orders with cached holdings on the backend, the system can automatically calculate this discrepancy and push it to the frontend.

## What Changes

- Fetch active GTT orders from Kite.
- Cache the GTT orders in backend memory to prevent REST API spam on frontend reconnects.
- Calculate the discrepancy between the GTT trigger quantity and actual holdings.
- Push the unified data payload (GTT orders + discrepancy) to the WebSocket as standard JSON.

## Capabilities

### New Capabilities
- `gtt-holdings-cross-reference`: Fetching GTT orders from Kite, caching them, calculating discrepancy with cached holdings, and pushing the unified payload via WebSocket.

### Modified Capabilities

## Impact

- Backend Kite API integration (fetching GTT orders).
- Backend memory caching mechanism (caching GTT orders).
- WebSocket payload structure (pushing unified JSON payload).
