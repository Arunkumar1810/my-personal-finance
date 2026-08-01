## 1. GTT Order Aggregation Logic

- [x] 1.1 Locate the data processing step for GTT orders (likely in `frontend/src/components/ActiveTrades.tsx` or a related context/hook).
- [x] 1.2 Implement a grouping utility that creates a unique key for each GTT order based on `tradingsymbol`, `type`, and the exact values in `condition.trigger_values`.
- [x] 1.3 Iterate through the GTT orders list and group them by this unique key.
- [x] 1.4 For each unique group, reduce the orders into a single order object where the `quantity` is the sum of all orders in that group.
- [x] 1.5 Pass this new consolidated array of GTT orders to the rendering component (the GTT order table).
- [x] 1.6 Verify that orders with different trigger prices or types for the same stock are still rendered as separate rows.
