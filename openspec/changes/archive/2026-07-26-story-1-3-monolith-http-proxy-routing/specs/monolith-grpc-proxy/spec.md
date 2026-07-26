## ADDED Requirements

### Requirement: Reverse proxy Kite requests to Swing-Trading Service
The Monolith SHALL act as a reverse proxy for all Kite-related HTTP requests (e.g., `/api/holdings`), forwarding them to the Swing-Trading Service via gRPC. The Monolith SHALL NOT contain business logic for these endpoints and SHALL return the upstream response directly to the SPA.

#### Scenario: Successful proxy of Kite requests
- **WHEN** the SPA makes an HTTP request to a Kite-related endpoint (e.g., `/api/holdings`) on the Monolith
- **THEN** the Monolith proxies the request to the Swing-Trading Service via gRPC
- **AND** the Monolith returns the gRPC response directly to the SPA as an HTTP response

### Requirement: Enforce strict gRPC timeout
The Monolith SHALL enforce a strict 5-second timeout on all gRPC calls proxied to the Swing-Trading Service. If the gRPC call breaches this timeout, the Monolith SHALL return an HTTP 504 Gateway Timeout to the SPA.

#### Scenario: Proxy call times out
- **WHEN** the Monolith proxies a request to the Swing-Trading Service via gRPC
- **AND** the Swing-Trading Service takes longer than 5 seconds to respond
- **THEN** the Monolith aborts the gRPC call
- **AND** the Monolith returns an HTTP 504 Gateway Timeout response to the SPA
