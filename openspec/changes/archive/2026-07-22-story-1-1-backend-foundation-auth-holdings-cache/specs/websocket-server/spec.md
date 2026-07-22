## ADDED Requirements

### Requirement: Expose WebSocket Endpoint
The backend MUST provide a WebSocket endpoint that the frontend can connect to for receiving real-time data updates.

#### Scenario: Frontend connects
- **WHEN** a client initiates a WebSocket connection to the designated endpoint
- **THEN** the backend accepts the connection and maintains it for bidirectional communication

#### Scenario: Push data payload
- **WHEN** the backend has updated information (e.g., cached holdings or tick data)
- **THEN** it pushes the payload to all connected WebSocket clients in standard JSON format
