# Capability: Wealth Dashboard

## Purpose
The Wealth Dashboard serves as the central command center for personal finance, providing consolidated net worth tracking, portfolio health diagnostics, multi-asset allocation monitoring, and proactive wealth optimization alerts.

## Requirements

### Requirement: Application Navigation & Workspace Layout
The system SHALL provide persistent workspace navigation connecting all functional domains (`wealth-dashboard`, `portfolio-valuation`, `liabilities`, `goals`, and `assets` sub-domains) within a dark theme environment.

#### Scenario: User navigates between financial domains
- **WHEN** the user interacts with the navigation menu
- **THEN** links for "Wealth Dashboard", "Portfolio Valuation", "Liabilities", "Goals", and "Assets" are accessible
- **AND** expanding the "Assets" menu reveals sub-domains for "Assets Dashboard", "Indian ETFs", "Indian LT Stocks", "US Stocks & ETFs", "Indian Swing Trading", "ESOPs & RSUs", "Fixed Deposits", "PF", and "Indian Bonds"
- **AND** selecting any domain route updates the active view without reloading the entire application.

#### Scenario: Visual theme presentation
- **WHEN** the user opens the application
- **THEN** the workspace renders with a primary dark background (`#0D0D12`)
- **AND** typography and metrics provide high contrast with designated financial color semantics (green for positive gains, red for losses/liabilities, cyan/violet for allocation highlights).

### Requirement: Net Worth Aggregation
The system SHALL aggregate valuations across all active asset classes, deduct all outstanding liabilities, and compute the total net worth along with absolute and percentage changes over the preceding period.

#### Scenario: Net worth calculation with assets and liabilities
- **WHEN** the user requests the wealth overview
- **THEN** the system calculates Total Assets by summing valuations from all 8 asset domains
- **AND** calculates Total Liabilities by summing outstanding balances across all liability items
- **AND** sets Total Net Worth to (Total Assets - Total Liabilities)
- **AND** calculates the period delta and percentage growth compared to the historical baseline.

#### Scenario: Zero or initial portfolio state
- **WHEN** no asset or liability records exist in the system
- **THEN** the net worth displays ₹0 with neutral period indicators
- **AND** prompts the user to connect external accounts or record initial assets.

### Requirement: Financial Health Scoring & Emergency Runway
The system SHALL calculate a comprehensive Financial Health Score on a 0–100 scale evaluating asset diversification, debt burden, and liquid emergency reserves.

#### Scenario: Healthy diversification and adequate runway
- **WHEN** liquid assets cover at least 6 months of mandatory expenses and debt-to-asset ratio is below 30%
- **THEN** the health score reflects a "Strong" tier (score >= 80)
- **AND** the emergency runway indicator displays the exact number of months covered.

#### Scenario: Excessive debt or insufficient liquidity
- **WHEN** liquid emergency reserves cover fewer than 3 months of expenses or high-interest debt exceeds 40% of net worth
- **THEN** the health score drops into the "Needs Attention" tier (score < 60)
- **AND** an actionable alert advises strengthening emergency reserves or accelerating debt payoff.

### Requirement: Asset Allocation Mix & Rebalancing
The system SHALL track actual asset allocation against target weightings across core asset categories and trigger rebalancing warnings when allocation drift exceeds defined thresholds.

#### Scenario: Allocation drift exceeds tolerance threshold
- **WHEN** actual allocation in any category (e.g., Equity or Alternatives) drifts more than 5% away from the target model
- **THEN** the allocation breakdown highlights the drifted category
- **AND** generates a rebalancing alert specifying the excess or deficit amount required to realign.

#### Scenario: Balanced asset allocation
- **WHEN** all asset categories remain within tolerance limits of their targets
- **THEN** the allocation status is marked as "Balanced" with no rebalancing warning.

### Requirement: Historical Net Worth Growth Trajectory
The system SHALL compute and present historical net worth snapshots across configurable time horizons.

#### Scenario: User selects timeframe
- **WHEN** the user selects a timeframe filter (1M, 6M, 1Y, or ALL)
- **THEN** the system filters historical net worth snapshots matching the interval
- **AND** displays the chronological trajectory alongside peak, trough, and net return calculations.

### Requirement: Wealth Optimization Alerts
The system SHALL evaluate the financial state against optimization heuristics and generate prioritized actionable alerts.

#### Scenario: Idle cash optimization
- **WHEN** unallocated cash exceeds the recommended emergency buffer
- **THEN** the system generates an alert suggesting deployment into short-term liquid instruments or debt reduction.

#### Scenario: High-interest debt warning
- **WHEN** an active liability carries an interest rate exceeding 12% per annum
- **THEN** the system prioritizes an alert recommending accelerated prepayment.
