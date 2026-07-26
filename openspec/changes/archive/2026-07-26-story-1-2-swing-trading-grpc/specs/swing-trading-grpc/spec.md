## ADDED Requirements

### Requirement: Swing-Trading Service connects to Kite Adapter via gRPC
The Swing-Trading Service MUST use a synchronous gRPC client to communicate with the Kite Adapter to fetch portfolio data.

#### Scenario: Requesting holdings
- **WHEN** the Swing-Trading Service receives a generic internal request for holdings
- **THEN** it MUST reach out to the Kite Service using synchronous gRPC to fetch the data
- **AND** it MUST NOT contain any external Kite API credentials itself

### Requirement: No external Kite API credentials in Swing-Trading Service
The Swing-Trading Service MUST NOT store or send Kite API credentials directly to the external Kite API; it MUST rely entirely on the Kite Service.

#### Scenario: Enforcing credential decoupling
- **WHEN** the Swing-Trading Service initiates a connection to the Kite Adapter
- **THEN** it MUST NOT attach Kite-specific API keys or tokens in the generic internal request
