# Capability: Portfolio Valuation

## Purpose
Portfolio Valuation measures investment performance, capital efficiency, returns (XIRR), and cash flow movements, while synchronizing transaction history from Zerodha Console.

## Requirements

### Requirement: Capital Story & Portfolio Valuation
The system SHALL calculate and present the overall capital story, aggregating historical transactions to display Total Deposited, Total Withdrawn, Net Invested capital, absolute Unrealized Gain/Loss, and annualized XIRR return.

#### Scenario: Positive unrealized gain
- **WHEN** current portfolio valuation exceeds net invested capital
- **THEN** the system displays the positive unrealized gain in green with a `+` prefix
- **AND** calculates the gain percentage as (unrealized gain / net invested * 100).

#### Scenario: Portfolio underwater
- **WHEN** current portfolio valuation is less than net invested capital
- **THEN** the system displays the negative unrealized gain in red with a `-` prefix
- **AND** calculates the negative return percentage.

#### Scenario: No historical transactions
- **WHEN** no transaction records exist in the cache
- **THEN** net invested displays ₹0, gain displays ₹0, and XIRR displays 0.00%.

### Requirement: Capital Efficiency Ratio
The system SHALL compute and display the ratio of capital deployed in active market holdings versus idle available funds.

#### Scenario: Capital fully deployed
- **WHEN** available cash funds are zero or near-zero
- **THEN** the deployed market segment reflects 100% of the capital base.

#### Scenario: Capital partially deployed
- **WHEN** both portfolio market value and available funds are greater than zero
- **THEN** the system presents the proportional distribution between deployed equity and idle cash.

### Requirement: Monthly Cash Flow Analytics
The system SHALL aggregate historical deposit and withdrawal cash flows by calendar month and provide chronological comparisons.

#### Scenario: Multi-month transaction history
- **WHEN** cash flow transactions span multiple calendar months
- **THEN** the system calculates monthly total deposits and total withdrawals per month in chronological sequence
- **AND** scales relative values against the peak monthly volume.

#### Scenario: Month with single-direction cash flow
- **WHEN** a given month records deposits but no withdrawals
- **THEN** the withdrawal metric for that month is recorded as ₹0.

### Requirement: Portfolio Tenure Tracking
The system SHALL compute the elapsed tenure of the investment portfolio from the earliest recorded transaction date.

#### Scenario: Portfolio with transaction history
- **WHEN** at least one historical transaction exists
- **THEN** the system calculates the elapsed duration from the earliest transaction date to the present
- **AND** outputs the inception date along with elapsed years and months.

### Requirement: Historical Cash Flow Ledger
The system SHALL maintain a chronological ledger of all cash movements including deposits, withdrawals, dates, and bank references.

#### Scenario: User inspects transaction history
- **WHEN** the user inspects the cash flow ledger
- **THEN** transactions are displayed in reverse chronological order
- **AND** each entry denotes the transaction type, date, amount, and execution status.

### Requirement: Broker Console Synchronization
The system SHALL provide on-demand synchronization with Zerodha Console to ingest cash flow transactions and refresh local portfolio cache.

#### Scenario: User requests transaction refresh
- **WHEN** the user initiates a transaction refresh and submits credentials along with TOTP
- **THEN** the system authenticates against the Console API
- **AND** fetches the latest cash transactions ledger
- **AND** updates the local SQLite cache and recalculates XIRR and capital metrics.
