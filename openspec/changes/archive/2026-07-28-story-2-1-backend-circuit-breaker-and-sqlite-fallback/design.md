## Context
Currently, the Swing-Trading Service relies completely on the Kite Adapter via gRPC for live holdings data. If the Kite API is down, rate limits are hit, or the Kite Adapter is unresponsive, the service throws an error (e.g., 500) to the frontend. We want to improve resiliency by falling back to a local SQLite cache (`holdings_cache.db`) so users can still see their portfolio.

## Goals / Non-Goals

**Goals:**
- Provide a circuit breaker pattern on the gRPC client connecting to Kite Adapter.
- Serve stale data from `holdings_cache.db` when the Kite API is unavailable.
- Clearly indicate to the client that the data is from a fallback cache via `fallback: true` in the JSON response envelope.

**Non-Goals:**
- Implementing a write-through cache for all services.
- Updating the `holdings_cache.db` data generation logic (it is assumed to be populated by another process).

## Decisions
- **Circuit Breaker Logic**: We will implement circuit breaking logic wrapping the gRPC client to handle retries and circuit breaking on Unvailable/ResourceExhausted errors.
- **Fallback Flow**: When the circuit breaker trips or an immediate RPC fails, the service will query `holdings_cache.db`, read the latest snapshot, and format it to match the standard API response, appending `"fallback": true`.

## Risks / Trade-offs
- **Stale Data** -> Mitigation: The `fallback: true` flag allows the UI to show a warning to the user that data may be outdated.
- **Schema mismatch** -> Mitigation: We must ensure the SQLite queries map correctly to the expected Swing-Trading API response models.

## Migration Plan
- Deploy the updated Swing-Trading Service.
- Ensure `holdings_cache.db` is present and accessible by the service.

## Open Questions
- What should be the circuit breaker thresholds (e.g., failure rate, timeout duration)? We will start with a basic try-catch fallback and expand to a full circuit breaker library if needed.
