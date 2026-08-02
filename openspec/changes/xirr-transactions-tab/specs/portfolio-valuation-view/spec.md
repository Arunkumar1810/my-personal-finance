## MODIFIED Requirements

### Requirement: Enhanced Portfolio Valuation View
The existing Portfolio Valuation view SHALL be enhanced to include XIRR, Wealth Velocity, Ghost XIRR, and a transaction ledger.

#### Scenario: User views Portfolio Valuation
- **WHEN** the user navigates to the Portfolio Valuation view
- **THEN** they see the current Portfolio Value and Available Funds fetched from Kite
- **AND** they see the calculated XIRR, a Wealth Velocity indicator, and a Ghost XIRR trendline
- **AND** they see a "water drop" styled visual ledger of historical cash flows (deposits/withdrawals) within the same view.

### Requirement: Interactive Calculator Mode
The Portfolio Valuation view SHALL allow users to manually interact with their transaction ledger to see its effect on XIRR.

#### Scenario: User tweaks a transaction
- **WHEN** the user toggles Calculator Mode and adjusts a past transaction amount or date
- **THEN** the client-side XIRR recalculates and updates visually in real-time without making backend calls.
