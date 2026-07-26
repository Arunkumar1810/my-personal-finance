## Context

The core trading logic and data ingestion have been moved out of the Monolith and into a dedicated Swing-Trading Service (which exposes a gRPC API). Previously, the Monolith received live market tick data directly and broadcasted it to the React SPA using its `websocket_manager.py`. Now, the Swing-Trading Service receives the live ticks from Kite. We need a way to reliably stream these ticks back from the Swing-Trading Service to the Monolith so that the Monolith can rebroadcast them to the React SPA, preserving the existing client-side behavior.

## Goals / Non-Goals

**Goals:**
- Stream live ticks from the Swing-Trading Service to the Monolith with low latency.
- Seamlessly integrate with the Monolith's existing `websocket_manager.py` to broadcast data to the React SPA.
- Keep the React SPA completely unchanged (zero changes to connection logic).

**Non-Goals:**
- Overhauling the React SPA's websocket client logic.
- Rewriting the existing `websocket_manager.py` in the Monolith (we only want to feed data into it).
- Changing how Kite streams data to the Swing-Trading Service.

## Decisions

**Decision 1: Protocol for Swing-Trading to Monolith Streaming**
- **Choice**: gRPC Server-Side Streaming.
- **Rationale**: The Swing-Trading Service is already a gRPC service. Adding a server-streaming RPC (e.g., `StreamLiveTicks`) is idiomatic, highly performant, and avoids introducing another protocol (like a raw WebSocket or HTTP SSE server) into the Swing-Trading Service.
- **Alternative Considered**: Server-Sent Events (SSE) or Redis Pub/Sub. SSE would require an HTTP server alongside gRPC. Redis Pub/Sub would introduce a new infrastructure dependency for a simple point-to-point stream.

**Decision 2: Monolith Integration Strategy**
- **Choice**: A dedicated background consumer in the Monolith.
- **Rationale**: The Monolith will start a background task on initialization that opens the gRPC stream to the Swing-Trading Service. As ticks arrive on the stream, this background task will simply invoke the existing `websocket_manager.broadcast()` (or equivalent) to forward the data to all connected React clients.
- **Alternative Considered**: Having the React SPA connect directly to the Swing-Trading Service. Rejected because a core requirement is zero changes to the React SPA's connection logic, and we want to keep the Monolith as the single API gateway for the frontend.

## Risks / Trade-offs

- **[Risk] gRPC Connection Drops**: The long-lived gRPC stream between the Monolith and Swing-Trading Service might drop due to network blips.
  - **Mitigation**: The background consumer in the Monolith must implement robust reconnection logic with exponential backoff.
- **[Risk] Backpressure**: The Monolith might struggle to broadcast ticks if the volume is extremely high.
  - **Mitigation**: The existing `websocket_manager.py` should already handle this, but if necessary, we can drop stale ticks in the consumer before broadcasting.
