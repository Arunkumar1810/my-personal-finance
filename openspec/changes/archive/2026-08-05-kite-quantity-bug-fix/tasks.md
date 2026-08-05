## 1. Backend Modifications

- [x] 1.1 Update `KiteServiceServicer.GetHoldings` in `backend/kite-service/grpc_server.py` to calculate total quantity as `quantity + t1_quantity + collateral_quantity`.
- [x] 1.2 Restart the `kite-service` gRPC server to apply changes and verify correct quantities for T1/collateral stocks.
