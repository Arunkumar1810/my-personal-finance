## ADDED Requirements

### Requirement: Fetch and Merge Positions
The system SHALL fetch both `holdings` and `positions` from the Kite API and merge them into a single list before returning to the frontend.

#### Scenario: No overlapping symbols
- **WHEN** user has holdings for AAPL and positions for MSFT
- **THEN** the unified payload SHALL contain both AAPL and MSFT as separate items in the `holdings` array.

#### Scenario: Overlapping symbols
- **WHEN** user has 100 shares of TCS in holdings and 50 shares of TCS in positions
- **THEN** the unified payload SHALL contain one entry for TCS with a quantity of 150.

#### Scenario: Overlapping symbols PNL and Avg Price
- **WHEN** user has an overlapping symbol
- **THEN** the PNL of the unified item SHALL be the sum of both PNLs, and the average price SHALL be the weighted average based on the quantities.
