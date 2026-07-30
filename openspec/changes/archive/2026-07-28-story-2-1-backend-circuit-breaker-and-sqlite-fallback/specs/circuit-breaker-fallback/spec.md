## ADDED Requirements

### Requirement: Circuit breaker for external API failures
The Swing-Trading Service MUST implement a circuit breaker to catch 5xx and 429 errors (or their gRPC equivalents) from the Kite Adapter.

#### Scenario: Kite Adapter fails to respond
- **WHEN** the Swing-Trading Service attempts to fetch live data from the Kite Adapter
- **AND** the Kite Adapter returns an error indicating it is unresponsive or rate limited
- **THEN** the circuit breaker MUST trip and catch the error
- **AND** it MUST query the local `holdings_cache.db` for the last known data
- **AND** it MUST return HTTP 200 with the cached data
- **AND** it MUST include a `fallback: true` flag in the JSON envelope
