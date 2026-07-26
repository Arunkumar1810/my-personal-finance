## 1. Swing-Trading Service gRPC Updates

- [x] 1.1 Update the protobuf definitions to add a `StreamLiveTicks` server-streaming RPC.
- [x] 1.2 Implement the `StreamLiveTicks` RPC handler in the Swing-Trading Service.
- [x] 1.3 Ensure the service routes incoming ticks from Kite to the active streams for connected clients.

## 2. Monolith Client Implementation

- [x] 2.1 Generate/Update gRPC client stubs in the Monolith for the Swing-Trading Service.
- [x] 2.2 Create a consumer client in the Monolith that connects to the `StreamLiveTicks` endpoint.
- [x] 2.3 Implement connection retry and exponential backoff logic for the consumer to handle network blips.

## 3. WebSocket Integration

- [x] 3.1 Hook the Monolith consumer's received tick payload into `websocket_manager.broadcast()`.
- [x] 3.2 Add a startup event/task in the Monolith (e.g., in FastAPI `lifespan` or equivalent) to launch the gRPC background consumer.
- [x] 3.3 Verify that the React SPA correctly receives live tick data without any client-side connection logic changes.
