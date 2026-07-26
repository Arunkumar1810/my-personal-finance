## 1. Swing-Trading Service Updates

- [x] 1.1 Implement a gRPC server-streaming endpoint in the Swing-Trading Service for live market ticks.
- [x] 1.2 Modify the tick ingestion logic to broadcast incoming Kite ticks to all connected gRPC stream clients.

## 2. Monolith Updates

- [x] 2.1 Add a gRPC client method in the Monolith to connect to the Swing-Trading Service's live tick stream endpoint.
- [x] 2.2 Create a background task (e.g., via FastAPI lifecycle events or `asyncio.create_task`) that maintains the connection to the gRPC stream.
- [x] 2.3 Update the background task to push received ticks to the existing `websocket_manager.py` broadcast method.
- [x] 2.4 Add connection retry logic to the background task in case the gRPC stream drops.
