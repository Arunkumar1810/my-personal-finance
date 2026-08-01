## Context

Currently, users cannot see their active GTT (Good Till Triggered) orders on the Active Trades page because the frontend expects a 'unified_update' WebSocket message that the backend never sends. The `kite-service` has the logic to construct this payload (`construct_unified_payload` in `cross_reference.py`) but it is dead code. We need to implement a mechanism to periodically poll Kite, generate this payload, and stream it to the API gateway which will broadcast it over WebSockets.

## Goals / Non-Goals

**Goals:**
- Stream unified GTT and Holdings updates to the frontend via WebSockets.
- Implement a periodic polling mechanism in the `kite-service` to fetch GTTs and Holdings.
- Add a new gRPC streaming endpoint to the `kite-service` for the API gateway to consume.

**Non-Goals:**
- Handling order placement or modification.
- Real-time event-driven updates (we will rely on polling as Kite API does not push GTT updates).

## Decisions

**Decision 1: gRPC Stream vs. REST Polling**
We decided to use a gRPC stream from the `kite-service` to the API gateway.
- *Rationale*: gRPC streams are efficient and fit well into the existing microservices architecture. It allows the `kite-service` to push updates whenever the periodic polling completes, without the API gateway having to manage polling intervals.
- *Alternatives*: API gateway polling a REST endpoint on `kite-service`.

**Decision 2: Polling location**
Polling will happen inside the `kite-service`.
- *Rationale*: `kite-service` directly interacts with the Kite Connect API and contains the `construct_unified_payload` logic. Keeping the polling loop here centralizes Kite API interactions.

## Risks / Trade-offs

- **Rate Limiting**: Polling Kite API too frequently might hit rate limits.
  - *Mitigation*: Ensure the polling interval is conservative (e.g., 5-10 seconds) and respects Kite's API limits.
- **Resource Usage**: A continuous background task in both the `kite-service` and API gateway.
  - *Mitigation*: Use asyncio primitives efficiently and handle disconnections gracefully to avoid memory leaks.
