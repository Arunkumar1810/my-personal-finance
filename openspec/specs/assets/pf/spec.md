# Capability: Provident Fund

## Purpose
The Provident Fund capability manages Employees' Provident Fund (EPF), Public Provident Fund (PPF), and Voluntary Provident Fund (VPF) holdings, statutory interest accrual, and contribution splits.

## Requirements

### Requirement: Provident Fund Portfolio Tracking
The system SHALL track provident fund accounts, maintaining balances across EPF, PPF, and VPF with breakdown of employee contributions, employer contributions, and pension (EPS) allocations.

#### Scenario: User inspects provident fund holdings
- **WHEN** the user views the PF portfolio
- **THEN** the system displays total EPF balance, total PPF balance, employee contribution to date, employer contribution to date, and the aggregate provident fund valuation.

#### Scenario: Monthly contribution recording
- **WHEN** a monthly payroll contribution is recorded
- **THEN** the system credits the employee contribution and employer EPF share to the active balance
- **AND** updates the historical contribution ledger.

### Requirement: Statutory Compounding Interest & Contribution Split
The system SHALL apply annual government-notified interest rates and project balance compounding over long-term holding periods.

#### Scenario: Annual interest rate accrual
- **WHEN** the annual notified PF interest rate (e.g., 8.25%) is applied
- **THEN** the system calculates compounding interest based on monthly running balances
- **AND** updates the total accumulated corpus.

#### Scenario: Tax exemption and lock-in tracking
- **WHEN** reviewing contribution totals for the financial year
- **THEN** the system tracks total contributions against Section 80C statutory limits (₹1.5 Lakh) and statutory annual tax-free interest ceilings.
