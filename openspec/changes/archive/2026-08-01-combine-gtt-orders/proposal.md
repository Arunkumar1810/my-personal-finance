## Why

Currently, if there are multiple GTT orders for the same stock with the exact same trigger price, they appear as separate, fragmented entries (potentially due to a bug or manual splitting). This clutters the UI and makes it difficult for users to see their total exposure and true consolidated quantity at a specific price point. Combining these orders streamlines the dashboard.

## What Changes

- Modify the GTT order processing logic (likely in the backend or frontend state) to aggregate multiple GTT orders into a single order if they share the exact same stock symbol and trigger price(s).
- The consolidated order should have its quantity summed up from the individual matching orders.

## Capabilities

### New Capabilities
- `combine-duplicate-gtt-orders`: Defines the requirement to merge multiple GTT orders for the same instrument and trigger price into a single unified record with a summed quantity.

### Modified Capabilities

## Impact

- The backend `kite-service` (or frontend, depending on where the aggregation is implemented) will include a grouping/aggregation step before returning/rendering the list of GTT orders.
- The UI will display a cleaner, consolidated list of GTTs.
