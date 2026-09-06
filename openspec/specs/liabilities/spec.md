# Capability: Liabilities

## Purpose
The Liabilities capability manages debt tracking, monthly debt obligations (EMIs), interest rate structures, and debt payoff simulations across secured and unsecured borrowing.

## Requirements

### Requirement: Debt Portfolio Tracking
The system SHALL aggregate all active borrowing obligations, computing Total Outstanding Debt, Total Monthly EMI Commitments, and the overall Debt-to-Asset Ratio.

#### Scenario: Aggregated debt calculation
- **WHEN** the user requests the liabilities summary
- **THEN** the system calculates Total Outstanding Debt by summing current balances across all loan and credit card accounts
- **AND** calculates the Total Monthly Debt Service by summing monthly EMI obligations
- **AND** calculates the Debt-to-Asset ratio by comparing total liabilities against total portfolio assets.

#### Scenario: Debt free state
- **WHEN** all liabilities are paid off or zero obligations exist
- **THEN** total debt displays ₹0, monthly EMI displays ₹0, and the Debt-to-Asset ratio displays 0.0%.

### Requirement: Liabilities Classification & Servicing
The system SHALL classify and track individual liabilities across Home Loans, Auto Loans, Personal Loans, and Credit Card accounts with associated interest rates, tenures, and amortization details.

#### Scenario: Itemized liability tracking
- **WHEN** the user views the liabilities portfolio
- **THEN** each debt account displays the lender name, category, outstanding balance, annual interest rate (APR), monthly EMI, and remaining tenure.

#### Scenario: High interest warning
- **WHEN** an unsecured liability (such as a credit card or personal loan) carries an APR exceeding 15%
- **THEN** the account is flagged with high-interest priority styling to encourage prepayment.

### Requirement: Debt Prepayment & Amortization Simulation
The system SHALL simulate payoff timelines and interest savings when applying extra monthly prepayments under Snowball and Avalanche payoff strategies.

#### Scenario: Avalanche strategy simulation
- **WHEN** the user runs a prepayment simulation selecting the "Avalanche" method with an additional monthly amount
- **THEN** the system allocates extra payments towards the highest-interest rate liability first
- **AND** calculates the total interest saved and the number of months shaved off the aggregate payoff date.

#### Scenario: Snowball strategy simulation
- **WHEN** the user runs a prepayment simulation selecting the "Snowball" method with an additional monthly amount
- **THEN** the system allocates extra payments towards the liability with the lowest outstanding balance first
- **AND** models the accelerated psychological payoff milestones along with total interest saved.
