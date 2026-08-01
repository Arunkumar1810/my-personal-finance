## Why

The frontend expects 'unified_update' WebSocket messages to render GTT orders on the Active Trades page, but the backend currently never polls for GTT orders or sends this message. The existing `construct_unified_payload` logic is unused dead code, meaning users cannot see their active GTT orders in the UI.

## What Changes

- Add a dedicated gRPC stream endpoint `StreamUnifiedUpdates` to the `kite-service` (update `.proto` file and server implementation).
- The `kite-service` will periodically poll Kite for active GTTs and holdings, build the unified payload using the existing `construct_unified_payload` logic, and stream it.
- Update the API gateway (`main.py`) to launch a background consumer that listens to this new gRPC stream and broadcasts whatever it receives over the WebSocket using the `connection_manager`.

## Capabilities

### New Capabilities

- `unified-update-streaming`: Streams unified updates combining GTT orders and holdings via a gRPC stream from the kite-service, which is then broadcast to WebSocket clients.

### Modified Capabilities

- `websocket-server`: Modifies the WebSocket server to consume the new `StreamUnifiedUpdates` gRPC stream and broadcast 'unified_update' messages to connected clients.
- `gtt-holdings-cross-reference`: Repurposes the existing `construct_unified_payload` dead code to be actively used within the new periodic polling loop in `kite-service`.

## Impact

- `kite-service` gRPC interface and backend implementation.
- API gateway (`main.py`) WebSocket broadcasting logic.
- Background task resource usage in the API gateway for consuming the stream.
