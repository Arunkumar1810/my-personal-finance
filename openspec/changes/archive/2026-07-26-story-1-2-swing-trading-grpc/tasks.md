## 1. gRPC Protobuf Definition

- [x] 1.1 Define the `holdings.proto` file (or equivalent) in a shared schema location or within the Swing-Trading Service repository.
- [x] 1.2 Generate Python gRPC client stubs from the protobuf definition.

## 2. Core Implementation

- [x] 2.1 Set up the gRPC channel connection inside the Swing-Trading Service to connect to the Kite Service URL.
- [x] 2.2 Implement a `KiteServiceClient` class in the Swing-Trading Service that wraps the gRPC stubs.
- [x] 2.3 Implement the synchronous `get_holdings` method inside the `KiteServiceClient` to fetch holding data without sending Kite credentials.
- [x] 2.4 Configure the gRPC channel with strict timeouts (e.g., 5 seconds) to handle unresponsiveness.

## 3. Configuration & Secrets Validation

- [x] 3.1 Verify that the Swing-Trading Service `.env` / configuration relies entirely on the internal gRPC endpoint for Kite, with no direct references to Kite API keys.
- [x] 3.2 Verify that the `KITE_API_KEY`, `KITE_API_SECRET`, and `KITE_REQUEST_TOKEN` are correctly configured in the standalone Kite Service `.env` file.

## 4. Structural Refactoring & Compliance

- [x] 4.1 Migrate all Swing-Trading Service code into a new `backend/swing-trading-service/` directory.
- [x] 4.2 Migrate the Kite Adapter code into a new `backend/kite-service/` directory.
- [x] 4.3 Refactor the `kite-service` to extract all classes and interfaces into individual, separate files.
- [x] 4.4 Refactor the `swing-trading-service` to ensure every class and interface is isolated into its own file.
