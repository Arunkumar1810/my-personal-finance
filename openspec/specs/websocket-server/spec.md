# Purpose
TBD

# Requirements

### Requirement: Expose WebSocket Endpoint
The backend MUST provide a WebSocket endpoint that the frontend can connect to for receiving real-time data updates.

#### Scenario: Frontend connects
- **WHEN** a client initiates a WebSocket connection to the designated endpoint
- **THEN** the backend accepts the connection and maintains it for bidirectional communication

#### Scenario: Push data payload
- **WHEN** the backend has updated information (e.g., cached holdings or tick data)
- **THEN** it pushes the payload to all connected WebSocket clients in standard JSON format

### Requirement: Consume Upstream Ticks
The Monolith's WebSocket server subsystem SHALL maintain a background connection to the Swing-Trading Service's live tick stream to source tick data.

#### Scenario: Tick received from upstream
- **WHEN** the Monolith receives a tick event from the Swing-Trading Service gRPC stream
- **THEN** it broadcasts that tick payload to all connected React SPA clients using the existing WebSocket broadcast mechanism

### Requirement: Consume Upstream Unified Updates
The API gateway's WebSocket server subsystem SHALL maintain a background connection to the `kite-service`'s unified updates gRPC stream to source GTT and Holdings updates.

#### Scenario: Unified update received from upstream
- **WHEN** the API gateway receives a unified update event from the `kite-service` gRPC stream
- **THEN** it broadcasts that update payload to all connected React SPA clients using the existing WebSocket broadcast mechanism under the 'unified_update' event type.
