## Why

We recently extracted the Swing-Trading Service from the Monolith, but live market tick data is currently not streaming back to the React SPA. We need to restore the real-time pricing capability so the UI reflects live prices just as it did before the extraction, ensuring a seamless user experience.

## What Changes

- Implement a mechanism (SSE or WebSocket) for the Swing-Trading Service to push live tick updates upstream to the Monolith.
- Update the Monolith to listen for these events from the Swing-Trading Service.
- Integrate the incoming stream with the Monolith's existing `websocket_manager.py` to broadcast the data to connected clients.
- Ensure the data format broadcasted to the React SPA matches the original schema so the frontend requires zero changes to its connection logic.

## Capabilities

### New Capabilities

- None

### Modified Capabilities

- `swing-trading-live-stream`: Needs to push live tick updates to the Monolith instead of directly to clients, or provide a stream the Monolith can consume.
- `websocket-server`: The Monolith's websocket server needs to be updated to consume the live tick stream from the Swing-Trading Service and broadcast it using the existing `websocket_manager.py`.

## Impact

- **Swing-Trading Service**: New streaming endpoint or client connection logic to push ticks to the Monolith.
- **Monolith**: New background task or listener to consume the Swing-Trading Service tick stream and bridge it to `websocket_manager.py`.
- **React SPA**: No impact (zero changes required).
