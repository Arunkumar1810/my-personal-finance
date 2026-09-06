## Purpose
TBD

## Requirements

### Requirement: Fetch and cache GTT orders
The `kite-service` SHALL periodically poll the Kite REST API for active GTT orders and Holdings, rather than relying on frontend connection events.

#### Scenario: Periodic polling
- **WHEN** the periodic polling interval triggers in the `kite-service`
- **THEN** the backend fetches active GTT orders and Holdings from Kite and caches them in memory for cross-referencing.

#### Scenario: Frontend initial connect
- **WHEN** the frontend connects via WebSocket and requests GTT orders
- **THEN** the backend fetches active GTT orders from Kite, caches them in memory, and returns them

#### Scenario: Frontend reconnects
- **WHEN** the frontend reconnects and requests GTT orders
- **THEN** the backend serves the GTT orders from the in-memory cache without hitting the Kite REST API

### Requirement: Cross-reference GTT orders with cached holdings
The system SHALL calculate the discrepancy between the GTT trigger quantity and actual cached holdings for each order.

#### Scenario: Valid holdings exist
- **WHEN** calculating the discrepancy
- **THEN** the system subtracts the actual cached holdings from the GTT trigger quantity to determine the missing units

### Requirement: Push unified payload via WebSocket
The `kite-service` SHALL emit the unified data payload containing both the GTT orders and their corresponding holding discrepancies over a gRPC stream, rather than pushing directly to WebSockets.

#### Scenario: Pushing unified data
- **WHEN** the discrepancy calculation is complete after a polling cycle
- **THEN** the `kite-service` pushes a JSON payload containing the GTT orders and their calculated discrepancies over the `StreamUnifiedUpdates` gRPC stream.
