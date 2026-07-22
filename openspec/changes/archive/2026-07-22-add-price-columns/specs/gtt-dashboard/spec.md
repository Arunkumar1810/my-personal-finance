## MODIFIED Requirements

### Requirement: GTT Real-time Table
The system SHALL display a clean, structured table for active GTT orders connected to the backend WebSocket receiving the unified GTT payload. Non-active GTTs MUST be filtered out at the source. The table MUST include "Current Price" and "Bought Price" (average price) columns for each GTT order.

#### Scenario: Display active GTT orders grouped by symbol
- **WHEN** the frontend connects to the WebSocket and receives GTT payload
- **THEN** the table must render and group active GTT orders by stock symbol, including their current market price and average bought price.
