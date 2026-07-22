# gtt-dashboard

## Purpose
TBD

## Requirements

### Requirement: GTT Real-time Table
The system SHALL display a clean, structured table for active GTT orders connected to the backend WebSocket receiving the unified GTT payload. Non-active GTTs MUST be filtered out at the source. The table MUST include "Current Price" and "Bought Price" (average price) columns for each GTT order.

#### Scenario: Display active GTT orders grouped by symbol
- **WHEN** the frontend connects to the WebSocket and receives GTT payload
- **THEN** the table must render and group active GTT orders by stock symbol, including their current market price and average bought price.

### Requirement: GTT Quantity Warning Indicator
The system SHALL display a subtle warning icon next to the GTT quantity if the quantity exceeds the available holdings.

#### Scenario: GTT quantity exceeds holdings
- **WHEN** the unified GTT payload shows that the GTT order quantity for a symbol is strictly greater than the available holdings
- **THEN** a subtle warning icon must be displayed next to the quantity in the table.

#### Scenario: GTT quantity is within holdings
- **WHEN** the unified GTT payload shows that the GTT order quantity for a symbol is less than or equal to the available holdings
- **THEN** no warning icon is displayed next to the quantity.
