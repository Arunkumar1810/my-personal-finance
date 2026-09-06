## ADDED Requirements

### Requirement: Generic Cashflow Ledger & Valuation Tracking
The system SHALL maintain a dedicated, chronological ledger of all credit and debit transactions executed for each asset account, presenting real-time Current Valuation, Net Invested Capital, Total Inflows (Credits), and Total Outflows (Debits).

#### Scenario: Inspecting asset transaction history
- **WHEN** the user opens the Transactions module for any asset sub-domain
- **THEN** the system displays the asset's Current Market Valuation alongside cumulative capital totals
- **AND** renders the chronological transaction log with execution date, transaction classification (`DEBIT` or `CREDIT`), description, units, price, charges, and net cashflow amount.

#### Scenario: Cashflow categorization by debit and credit
- **WHEN** transactions are processed by the system
- **THEN** capital deployments (purchases, SIP deductions, deposit creations, payroll contributions) are recorded as `DEBIT` cashflows with negative monetary impact
- **AND** capital realizations (redemptions, sales, dividend payouts, coupon credits, maturing principal returns) are recorded as `CREDIT` cashflows with positive monetary impact.

### Requirement: Sub-Tree Localized Asset Transactions Modules
The system SHALL co-locate dedicated transaction management modules within each asset sub-tree directory (`src/assets/<domain>/`) mapped directly to route `/assets/<domain>/transactions` and exposed in the sub-tree navigation menu.

#### Scenario: Accessing localized asset transactions
- **WHEN** the user navigates to `/assets/<domain>/transactions`
- **THEN** the system renders the domain-specific transactions component residing within that asset's sub-tree
- **AND** activates the "Transactions" navigation state within that asset's sidebar group.

### Requirement: Structured Cashflow Timeline Export for XIRR Computation
The system SHALL expose an immutable, date-ordered cashflow series from each asset's transaction records to serve as the single source of truth for portfolio rate-of-return computations.

#### Scenario: Providing cashflow sequence for performance calculations
- **WHEN** performance analytics or asset evaluation modules request rate-of-return inputs
- **THEN** the transaction module returns an ordered array of `{ date, cashflowAmount }` pairs containing all historical debits and credits
- **AND** guarantees net cashflow precision after incorporating transaction taxes, brokerages, and statutory deductions.
