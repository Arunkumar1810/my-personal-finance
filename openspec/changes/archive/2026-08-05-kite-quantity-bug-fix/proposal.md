## Why

Kite's API separates stock quantities into different buckets during the T+1 settlement phase (e.g., `quantity` vs `t1_quantity`) and when stocks are pledged (`collateral_quantity`). Currently, our backend only parses the `quantity` field, which causes recently bought (T+1) or pledged stocks to appear with a quantity of 0, breaking the portfolio valuation math on the frontend. 

## What Changes

- Modify the `KiteServiceServicer.GetHoldings` method to calculate the total quantity as the sum of `quantity`, `t1_quantity`, and `collateral_quantity`.
- Ensure the frontend receives the correct aggregated quantity so that `investedAmount` and `currentAmount` calculate accurately.

## Capabilities

### New Capabilities
*(None)*

### Modified Capabilities
- `kite-service-integration`: Modify the Kite Portfolio Value Fetching requirement to mandate aggregating all quantity buckets (`quantity`, `t1_quantity`, `collateral_quantity`) into a single total quantity.

## Impact

- **Backend**: `backend/kite-service/grpc_server.py` will have a modified parsing rule.
- **Frontend**: Will accurately display portfolio values for stocks in the T1 settlement phase or pledged as collateral, without any code changes on the frontend itself.
