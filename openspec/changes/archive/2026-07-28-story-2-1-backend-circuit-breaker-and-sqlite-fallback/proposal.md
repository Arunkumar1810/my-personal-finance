## Why

When the Kite API is down or returns rate limit errors, the Swing-Trading Service currently fails to fetch live data, causing the dashboard to freeze or throw 500 errors. We need to provide a seamless user experience during these outages by falling back to the local SQLite cache so the dashboard loads instantly with the most recently known data.

## What Changes

- Implement a circuit breaker in the Swing-Trading Service when interacting with the Kite Adapter.
- Catch 5xx and 429 errors from the Kite Adapter.
- Query the local `holdings_cache.db` when these errors occur.
- Return HTTP 200 with the cached data instead of an error.
- Include a `fallback: true` flag in the JSON envelope when cached data is returned.

## Capabilities

### New Capabilities
- `circuit-breaker-fallback`: Defines the fallback behavior to the SQLite cache when the primary Kite API provider is unresponsive or returning errors.

### Modified Capabilities
- `swing-trading-grpc`: Modifying to catch Kite Adapter errors and return cached data with a `fallback: true` flag.

## Impact

- **Swing-Trading Service**: Logic added to handle adapter errors and query `holdings_cache.db`.
- **Kite Adapter**: May need to ensure errors are propagated clearly (5xx/429).
- **API Envelope**: Adding a `fallback: true` field for clients to consume.
