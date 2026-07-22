## ADDED Requirements

### Requirement: Fetch and cache GTT orders
The system SHALL fetch active GTT orders from the Kite REST API and cache them in backend memory to prevent repeated API calls on frontend reconnects.

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
The system SHALL push the unified data payload containing both the GTT orders and their corresponding holding discrepancies to the WebSocket as standard JSON.

#### Scenario: Pushing unified data
- **WHEN** the discrepancy calculation is complete
- **THEN** the system pushes a JSON payload containing the GTT orders and their calculated discrepancies over the WebSocket connection
