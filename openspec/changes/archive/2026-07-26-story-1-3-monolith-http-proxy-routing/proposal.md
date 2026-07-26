## Why
The monolith currently contains business logic for Kite-related HTTP requests. To simplify the monolith architecture and decouple services, it needs to act purely as a reverse-proxy gateway, routing Kite-related requests to the dedicated Swing-Trading Service. This reduces monolith complexity and centralizes trading logic in the new service.

## What Changes
- Implement a reverse-proxy route in the monolith for Kite-related endpoints (e.g., `/api/holdings`).
- Proxy incoming HTTP requests to the Swing-Trading Service via gRPC.
- Return the upstream gRPC response directly to the frontend SPA without modification.
- Introduce a strict 5-second timeout for the gRPC calls in the monolith.
- Return an HTTP 504 Gateway Timeout response if the gRPC call breaches the 5-second timeout.

## Capabilities

### New Capabilities
- `monolith-grpc-proxy`: Reverse-proxy HTTP requests from Monolith to Swing-Trading Service over gRPC with a 5-second timeout.

### Modified Capabilities

## Impact
- **Monolith API**: The `/api/holdings` and other Kite-related endpoints will no longer process requests locally but will proxy them.
- **Frontend SPA**: Receives responses transparently, but must handle new 504 Gateway Timeout errors on latency.
- **Dependencies**: Monolith requires gRPC client configuration to communicate with the Swing-Trading Service.
