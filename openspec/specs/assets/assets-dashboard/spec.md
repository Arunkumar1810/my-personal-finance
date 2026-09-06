# Capability: Assets Dashboard

## Purpose
The Assets Dashboard aggregates all 8 underlying asset classes into a unified multi-asset portfolio, tracking aggregate valuation, invested capital, total unrealized returns, and asset allocation drift.

## Requirements

### Requirement: Multi-Asset Class Portfolio Rollup
The system SHALL aggregate valuations and cost bases across all 8 underlying asset classes: Indian ETFs, Indian Long-Term Stocks, US Stocks & ETFs, Indian Swing Trading, ESOPs & RSUs, Fixed Deposits, Provident Fund (PF), and Indian Bonds.

#### Scenario: Aggregated multi-asset valuation
- **WHEN** the user requests the assets dashboard summary
- **THEN** the system calculates Total Asset Valuation by summing current values across all 8 asset domains
- **AND** calculates Total Invested Capital across all asset holdings
- **AND** computes Total Unrealized Gain/Loss in absolute rupee terms and overall return percentage.

#### Scenario: Asset class performance breakdown
- **WHEN** the user inspects individual asset categories on the dashboard
- **THEN** each asset class displays its current valuation, invested capital, percentage of total assets, and unrealized return.

### Requirement: Asset Allocation Drift Tracking
The system SHALL compare actual asset class weightings against target model allocations and identify allocation drift.

#### Scenario: Category drift analysis
- **WHEN** the system calculates current asset distributions
- **THEN** it compares each asset class's percentage share against the target model percentage
- **AND** identifies over-weighted and under-weighted asset classes.

### Requirement: Asset Class Navigation
The system SHALL provide direct navigation links from the summary cards into the dedicated capabilities for each specific asset class.

#### Scenario: User navigates to specific asset class
- **WHEN** the user selects an asset class card on the dashboard
- **THEN** the system navigates directly to that asset class capability.
