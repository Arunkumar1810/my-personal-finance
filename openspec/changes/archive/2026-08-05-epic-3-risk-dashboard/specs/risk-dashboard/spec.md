## ADDED Requirements

### Requirement: Risk-First Metrics Display
The system SHALL aggregate the total open risk (Capital at Risk) and the historical worst decline (Max Drawdown) and display them prominently above any P/L figures.

#### Scenario: Viewing dashboard load
- **WHEN** the user navigates to the Dashboard
- **THEN** the system calculates Capital at Risk from currently open Swing Campaigns
- **AND** displays Capital at Risk and Max Drawdown prominently at the top of the view
