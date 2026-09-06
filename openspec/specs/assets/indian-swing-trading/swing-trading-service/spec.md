# Capability: Swing Trading Service

## Purpose
TBD: Swing Trading service logic and aggregation.

## Requirements

### Requirement: XIRR Calculation Logic
The Swing Trading Service SHALL provide the core logic for calculating the Extended Internal Rate of Return (XIRR).

#### Scenario: Computing XIRR
- **WHEN** provided with a series of cash flows and current portfolio value
- **THEN** the service calculates and returns the accurate XIRR.

### Requirement: Data Aggregation
The Swing Trading Service SHALL aggregate raw data from the Kite Service to provide a unified portfolio summary.

#### Scenario: Aggregating portfolio data
- **WHEN** the frontend requests portfolio valuation data
- **THEN** the service fetches transactions, portfolio value, and available funds from Kite
- **AND** aggregates this data, calculating the overall XIRR
- **AND** returns a combined response containing all metrics.
