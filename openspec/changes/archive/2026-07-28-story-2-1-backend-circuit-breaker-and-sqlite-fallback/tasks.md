## 1. Circuit Breaker Setup

- [x] 1.1 Add circuit breaker pattern/utility to the Swing-Trading Service.
- [x] 1.2 Wrap the Kite Adapter gRPC client calls with the circuit breaker logic.
- [x] 1.3 Configure the circuit breaker to trip on Unavailable and ResourceExhausted (rate limiting) errors.

## 2. Fallback Mechanism Implementation

- [x] 2.1 Implement a function to connect to and query `holdings_cache.db` for the latest holdings snapshot.
- [x] 2.2 Map the SQLite query results to the Swing-Trading API's expected response model.
- [x] 2.3 Integrate the fallback function into the circuit breaker's catch block (to execute when the primary call fails or circuit is open).

## 3. API Response Update

- [x] 3.1 Update the API response envelope model to include an optional `fallback` boolean flag.
- [x] 3.2 Ensure the fallback flow sets `fallback: true` in the final HTTP response.
- [x] 3.3 Ensure the normal flow omits `fallback` or sets it to `false`.

## 4. Testing & Validation

- [x] 4.1 Write unit tests for the circuit breaker tripping and reset logic.
- [x] 4.2 Write integration tests simulating Kite Adapter outages and verifying `holdings_cache.db` reads.
- [x] 4.3 Verify the API correctly surfaces `fallback: true` during simulated outages.
