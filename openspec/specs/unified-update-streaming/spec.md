## Purpose
TBD

## Requirements

### Requirement: Stream Unified Updates via gRPC
The `kite-service` SHALL provide a gRPC streaming endpoint `StreamUnifiedUpdates` that continuously emits the latest unified payload of GTT orders and holdings.

#### Scenario: Client connects to gRPC stream
- **WHEN** a client (like the API gateway) connects to the `StreamUnifiedUpdates` gRPC endpoint
- **THEN** the `kite-service` accepts the connection and periodically pushes the unified payload after each polling cycle.
