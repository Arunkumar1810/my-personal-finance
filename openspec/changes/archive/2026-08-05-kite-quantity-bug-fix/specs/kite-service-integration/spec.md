## MODIFIED Requirements

### Requirement: Kite Portfolio Value Fetching
The Kite Service integration SHALL dynamically fetch the current portfolio value and available funds, ensuring that the total quantity for each holding aggregates `quantity`, `t1_quantity`, and `collateral_quantity` to accurately reflect unsettled and pledged assets.

#### Scenario: Fetching current values
- **WHEN** the system needs current portfolio metrics
- **THEN** the Kite Service API is queried
- **AND** returns the live portfolio value and available funds based on the true aggregated stock quantities.
