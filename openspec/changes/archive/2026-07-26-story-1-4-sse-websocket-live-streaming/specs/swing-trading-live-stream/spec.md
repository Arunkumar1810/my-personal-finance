## MODIFIED Requirements

### Requirement: Stream Live Ticks
The Swing-Trading Service SHALL expose a gRPC server-streaming endpoint for live market ticks.

#### Scenario: Upstream client connects to stream
- **WHEN** an authorized client (e.g., the Monolith) connects to the live tick stream
- **THEN** the Swing-Trading Service continuously pushes market tick data received from Kite down the stream
