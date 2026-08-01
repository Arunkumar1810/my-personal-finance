## 1. kite-service Updates

- [x] 1.1 Update `kite-service` `.proto` file to include `StreamUnifiedUpdates` endpoint.
- [x] 1.2 Implement the periodic polling loop in `kite-service` to fetch GTT orders and holdings.
- [x] 1.3 Repurpose `construct_unified_payload` in `cross_reference.py` to be called by the polling loop.
- [x] 1.4 Implement the server side of `StreamUnifiedUpdates` in `kite-service` to push the unified payload.

## 2. API Gateway Updates

- [x] 2.1 Update the API gateway's gRPC client to support `StreamUnifiedUpdates`.
- [x] 2.2 Create a background task in `main.py` (API gateway) to connect to `StreamUnifiedUpdates`.
- [x] 2.3 Implement logic in the background task to receive payloads and broadcast them using `connection_manager` as `unified_update`.
