## Context

The Swing-Trading Service was recently extracted from the Monolith into its own service. Live market tick data from Kite is now received by the Swing-Trading Service, but the frontend React SPA connects to the Monolith via WebSockets for live data. This change bridges the gap by streaming the data from the new service back to the Monolith.

## Goals / Non-Goals

**Goals:**
- Stream live market ticks reliably from the Swing-Trading Service to the Monolith.
- Broadcast these ticks from the Monolith to the connected React SPA clients over the existing WebSocket connection.
- Ensure zero connection logic changes are required on the React SPA frontend.

**Non-Goals:**
- Modifying the React SPA connection mechanism.
- Having the React SPA connect directly to the Swing-Trading Service (for now, to avoid dealing with new authentication/CORS issues and multiple WebSocket connections).

## Decisions

- **Service-to-Service Protocol: gRPC Server Streaming**: The Swing-Trading Service will expose a gRPC server-streaming endpoint for live ticks. The Monolith will connect as a client and consume this stream.
  - *Rationale*: gRPC is already used for other interactions (per the `swing-trading-grpc` spec), and server-streaming is perfect for one-way continuous data flows like market ticks. It is more robust and typed than SSE or plain WebSockets.
- **Monolith Re-broadcasting**: The Monolith will run a background task (e.g., in FastAPI/asyncio) that consumes the gRPC stream and pushes the events to the existing `websocket_manager.py`.
  - *Rationale*: The existing `websocket_manager.py` already handles client connections and broadcasting logic, so this minimizes disruption.

## Risks / Trade-offs

- **Risk**: The Monolith might become a bottleneck if tick volume is extremely high.
  - *Mitigation*: The current tick volume is manageable, and this is the same architecture as before the extraction.
- **Risk**: Connection drops between Monolith and Swing-Trading Service.
  - *Mitigation*: The Monolith gRPC client must implement retry logic to reconnect to the stream automatically upon disconnection.
