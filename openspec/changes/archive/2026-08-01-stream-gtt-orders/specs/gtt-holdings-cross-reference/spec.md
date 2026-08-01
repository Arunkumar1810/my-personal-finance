## MODIFIED Requirements

### Requirement: Fetch and cache GTT orders
The `kite-service` SHALL periodically poll the Kite REST API for active GTT orders and Holdings, rather than relying on frontend connection events.

#### Scenario: Periodic polling
- **WHEN** the periodic polling interval triggers in the `kite-service`
- **THEN** the backend fetches active GTT orders and Holdings from Kite and caches them in memory for cross-referencing.

### Requirement: Push unified payload via WebSocket
The `kite-service` SHALL emit the unified data payload containing both the GTT orders and their corresponding holding discrepancies over a gRPC stream, rather than pushing directly to WebSockets.

#### Scenario: Pushing unified data
- **WHEN** the discrepancy calculation is complete after a polling cycle
- **THEN** the `kite-service` pushes a JSON payload containing the GTT orders and their calculated discrepancies over the `StreamUnifiedUpdates` gRPC stream.
