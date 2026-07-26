## Context

As part of decoupling the monolith into microservices, the Swing-Trading Service (the "Brain") requires real-time and static data from the user's brokerage. To achieve this securely, the Swing-Trading Service will communicate downstream with the new, stateless Kite Adapter via a synchronous gRPC channel. The Swing-Trading Service itself should not hold any external API keys or credentials.

## Goals / Non-Goals

**Goals:**
- Establish a secure, synchronous gRPC connection from the Swing-Trading Service to the Kite Service.
- Define the initial gRPC protobuf definitions for generic internal holdings requests.
- Ensure no Kite API credentials exist in the Swing-Trading Service's configuration or logic. (The `KITE_API_KEY`, `KITE_API_SECRET`, and `KITE_REQUEST_TOKEN` are securely relocated to and managed exclusively by the Kite Service's `.env` file).
- **Strict Microservice Isolation & File Structure**: Each microservice must live in its own dedicated folder inside `backend/` (e.g., `backend/swing-trading-service/` and `backend/kite-service/`). Furthermore, to guarantee high cohesion and readability, every single class and interface must be isolated into its own separate file.

**Non-Goals:**
- Implementing the HTTP proxy routing in the Monolith (covered in Story 1.3).
- Implementing asynchronous live market tick streaming (covered in Story 1.4).

## Decisions

- **gRPC for Internal Communication**: We chose gRPC over REST for the internal microservice communication due to its strong typing (protobufs), binary serialization (performance), and clear contract definitions.
- **Stateless Kite Adapter**: The Kite Service handles authentication with the external API and rate limiting independently. The Swing-Trading Service makes simple RPC calls to it, keeping the business logic purely focused on swing-trading data aggregation.

## Risks / Trade-offs

- **Risk: Network Latency / Timeout**: Synchronous RPC over the network might introduce latency or fail if the Kite Service is unreachable.
  - **Mitigation**: We will enforce strict RPC timeouts on the gRPC stubs. Fallback mechanisms will be introduced in Epic 2.
