## ADDED Requirements

### Requirement: GTT Real-time Table
The system SHALL display a clean, structured table for GTT orders connected to the backend WebSocket receiving the unified GTT payload.

#### Scenario: Display GTT orders grouped by symbol
- **WHEN** the frontend connects to the WebSocket and receives GTT payload
- **THEN** the table must render and group GTT orders by stock symbol.

### Requirement: GTT Quantity Warning Indicator
The system SHALL display a subtle warning icon next to the GTT quantity if the quantity exceeds the available holdings.

#### Scenario: GTT quantity exceeds holdings
- **WHEN** the unified GTT payload shows that the GTT order quantity for a symbol is strictly greater than the available holdings
- **THEN** a subtle warning icon must be displayed next to the quantity in the table.

#### Scenario: GTT quantity is within holdings
- **WHEN** the unified GTT payload shows that the GTT order quantity for a symbol is less than or equal to the available holdings
- **THEN** no warning icon is displayed next to the quantity.
