## ADDED Requirements

### Requirement: Kite Transaction Fetching
The Kite Service integration SHALL dynamically fetch historical cash transactions (deposits and withdrawals).

#### Scenario: Fetching transactions
- **WHEN** the system needs transaction history
- **THEN** the Kite Service API is queried
- **AND** returns an array of cash flows with accurate dates and amounts.

### Requirement: Kite Portfolio Value Fetching
The Kite Service integration SHALL dynamically fetch the current portfolio value and available funds.

#### Scenario: Fetching current values
- **WHEN** the system needs current portfolio metrics
- **THEN** the Kite Service API is queried
- **AND** returns the live portfolio value and available funds.
