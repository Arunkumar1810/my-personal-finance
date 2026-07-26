## MODIFIED Requirements

### Requirement: Consume Upstream Ticks
The Monolith's WebSocket server subsystem SHALL maintain a background connection to the Swing-Trading Service's live tick stream to source tick data.

#### Scenario: Tick received from upstream
- **WHEN** the Monolith receives a tick event from the Swing-Trading Service gRPC stream
- **THEN** it broadcasts that tick payload to all connected React SPA clients using the existing WebSocket broadcast mechanism
