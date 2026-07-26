## Why

To decouple the Kite API from the monolith, we need the Swing-Trading Service (the Brain) to connect to the new stateless Kite Adapter via gRPC. This allows the Swing-Trading Service to securely fetch portfolio and order data downstream without storing Kite API credentials itself, establishing the core data ingestion pipeline.

## What Changes

- Stand up the core gRPC client connection from the Swing-Trading Service to the Kite Service.
- Implement synchronous fetching of generic holdings data via this gRPC channel.
- Ensure the Swing-Trading Service does not hold any external Kite API credentials, relying exclusively on the Kite Service adapter.

## Capabilities

### New Capabilities
- `swing-trading-grpc`: Establish downstream synchronous gRPC communication from the Swing-Trading Service to fetch data securely from the Kite Service.

### Modified Capabilities

## Impact

- **Swing-Trading Service**: New gRPC client module to connect to the Kite Service.
- **Security**: The Swing-Trading Service will be decoupled from Kite credentials.
