## Why

The core trading logic has been extracted into a separate Swing-Trading Service. Live market tick data that was previously handled directly in the Monolith now arrives at the new service from Kite. This data needs to stream reliably back to the Monolith and then to the React SPA so the UI reflects real-time prices just as it did before the extraction.

## What Changes

- The Swing-Trading Service will receive live ticks from Kite.
- The Swing-Trading Service will stream these tick updates upstream to the Monolith via SSE or WebSocket.
- The Monolith will catch this event stream.
- The Monolith will broadcast these ticks to the React SPA using the existing `websocket_manager.py`.
- The React SPA will receive the data without any changes to its connection logic.

## Capabilities

### New Capabilities
- `swing-trading-live-stream`: A new mechanism in the Swing-Trading Service for streaming live ticks to upstream clients (Monolith) via SSE/WebSocket.

### Modified Capabilities
- `websocket-server`: Will act as a consumer of the Swing-Trading Service's live stream and broadcast those ticks to the React SPA using its existing websocket logic.

## Impact

- Swing-Trading Service: New stream endpoint to emit ticks.
- Monolith (`websocket_manager.py`): Modified to consume the upstream stream and rebroadcast.
- React SPA: No impact, logic remains unchanged.
