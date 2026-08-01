## Context

GTT orders are currently fetched from the Kite API and passed to the frontend for display. Occasionally, users might have multiple GTT orders for the same stock that share the exact same trigger conditions (e.g., both are SL/Target OCO orders with the exact same SL price and Target price). Currently, these are shown as separate rows. Consolidating them will simplify the view.

## Goals / Non-Goals

**Goals:**
- Identify duplicate/fragmented GTT orders based on stock symbol, order type, and trigger prices.
- Combine these orders by summing their quantities.
- Present a unified GTT order to the user interface.

**Non-Goals:**
- Combining orders that have different trigger prices or different conditions.
- Modifying the actual orders on the Kite broker side (aggregation is for display/tracking purposes only).

## Decisions

- **Aggregation Layer:** The aggregation should happen on the frontend (or in the backend adapter before emitting the payload). Since the frontend already groups GTT orders by symbol in `ActiveTrades.tsx` (as implied by the previous `gtt-dashboard` spec "group active GTT orders by stock symbol"), we can add a sub-grouping or aggregation step in the frontend data processing layer to merge those with identical trigger conditions.
- **Matching Criteria:** Two GTT orders are considered identical if they have the same:
  - `tradingsymbol`
  - `condition.trigger_values` (arrays must match exactly)
  - `type` (e.g., 'two-leg' or 'single')
- **Combined Fields:**
  - `quantity`: Sum of both quantities.
  - `id`: We can keep one ID or join them (e.g., `id1,id2`) for tracking, though typically the frontend doesn't need to fire modifications back based on this combined ID yet. For now, picking the first ID or creating a composite ID is fine.

## Risks / Trade-offs

- **Order Modification:** If a user later wants to modify one of the consolidated GTT orders, the UI might need to know it represents multiple underlying orders.
  → **Mitigation:** Since this is a read-only dashboard primarily for visualization, tracking a composite ID or just noting that it's an aggregated view is acceptable for now.
