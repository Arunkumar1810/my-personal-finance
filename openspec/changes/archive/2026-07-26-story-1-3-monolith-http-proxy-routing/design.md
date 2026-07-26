## Context
Currently, the Monolith handles the business logic for Kite-related HTTP requests (like fetching `/api/holdings`). To simplify the architecture, decouple services, and move trading logic into the Swing-Trading Service, the Monolith needs to be updated to act purely as a reverse proxy for these Kite-related endpoints.

## Goals / Non-Goals

**Goals:**
- Route all Kite-related HTTP requests from the Monolith to the Swing-Trading Service via gRPC.
- Return responses from the gRPC service directly to the SPA.
- Enforce a strict 5-second timeout on the gRPC proxy calls.
- Return HTTP 504 Gateway Timeout if the call breaches the timeout.

**Non-Goals:**
- Modifying the Swing-Trading Service logic or behavior.
- Replacing the frontend SPA HTTP requests with direct gRPC-Web calls (Monolith remains the API Gateway).
- Implementing caching at the proxy level for these endpoints.

## Decisions
- **Proxy via gRPC**: We will proxy incoming HTTP JSON requests into gRPC calls. The Monolith will parse the HTTP request, construct the gRPC request message, invoke the Swing-Trading Service gRPC client, and serialize the gRPC response back to JSON to return as an HTTP response.
- **5-Second Timeout**: We will configure a context timeout of 5 seconds for the gRPC call. If a timeout occurs, the Monolith will catch it and respond with an HTTP status code `504 Gateway Timeout`.

## Risks / Trade-offs
- [Risk] Increased latency due to proxying and serialization/deserialization.
  - Mitigation: Ensure efficient gRPC clients are reused and serialization is optimized. The 5-second timeout prevents indefinite hangs.
- [Risk] Monolith acts as an extra hop for the requests.
  - Mitigation: The monolith is already handling this traffic, so proxying is simpler than reconfiguring the SPA to call multiple domains.
