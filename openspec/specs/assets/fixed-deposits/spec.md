# Capability: Fixed Deposits

## Purpose
The Fixed Deposits capability manages bank and corporate term deposits, interest accrual calculations, compounding frequencies, maturity dates, and deposit insurance limits.

## Requirements

### Requirement: Fixed Deposit Account Management
The system SHALL record term deposit accounts including financial institution name, account/deposit reference number, principal amount, annual interest rate (%), compounding interval (Monthly, Quarterly, Cumulative), and creation date.

#### Scenario: User inspects fixed deposit portfolio
- **WHEN** the user accesses the Fixed Deposits portfolio
- **THEN** the system lists all active deposits with institution name, principal amount, interest rate, tenure, maturity date, and maturity payout value.

#### Scenario: Aggregate deposit metrics
- **WHEN** fixed deposit records are retrieved
- **THEN** the system outputs Total Principal Invested, Total Accrued Interest to date, and the weighted average interest rate across all deposits.

### Requirement: Accrued Interest Calculation & Maturity Schedule
The system SHALL calculate compounding interest accrued to date and provide a chronological timeline of upcoming deposit maturities.

#### Scenario: Cumulative interest accrual
- **WHEN** computing current valuation of a cumulative deposit
- **THEN** the system compounds interest based on elapsed duration and compounding frequency
- **AND** sets Current Valuation equal to Principal plus Accrued Interest.

#### Scenario: Deposit maturity alert
- **WHEN** an active deposit reaches maturity within 30 days
- **THEN** the system generates an upcoming maturity notification specifying the maturity amount and reinvestment options.
