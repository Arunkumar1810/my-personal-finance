## ADDED Requirements

### Requirement: Consume Upstream Unified Updates
The API gateway's WebSocket server subsystem SHALL maintain a background connection to the `kite-service`'s unified updates gRPC stream to source GTT and Holdings updates.

#### Scenario: Unified update received from upstream
- **WHEN** the API gateway receives a unified update event from the `kite-service` gRPC stream
- **THEN** it broadcasts that update payload to all connected React SPA clients using the existing WebSocket broadcast mechanism under the 'unified_update' event type.
