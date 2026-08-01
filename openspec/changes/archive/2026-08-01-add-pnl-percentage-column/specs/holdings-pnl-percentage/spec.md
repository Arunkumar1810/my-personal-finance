## ADDED Requirements

### Requirement: Display P&L Percentage
The system SHALL display the Profit & Loss (P&L) as a percentage in a new column within the Active Holdings table. The percentage SHALL be calculated based on the absolute P&L and the invested amount. It MUST be colored green for positive values and red for negative values.

#### Scenario: Positive P&L Percentage
- **WHEN** the absolute P&L for a holding is positive
- **THEN** the system calculates the percentage (P&L / Invested Amount * 100), displays it in the P&L % column, and colors the text green.

#### Scenario: Negative P&L Percentage
- **WHEN** the absolute P&L for a holding is negative
- **THEN** the system calculates the percentage (P&L / Invested Amount * 100), displays it in the P&L % column, and colors the text red.

#### Scenario: Zero P&L Percentage
- **WHEN** the absolute P&L for a holding is exactly zero (or no invested amount exists)
- **THEN** the system displays 0.00% without any specific green or red color (e.g. default text color).
