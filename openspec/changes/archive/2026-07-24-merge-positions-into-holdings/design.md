## Context

The backend currently connects to the Kite API to fetch long-term user `holdings` (settled positions). However, it ignores `positions` (which includes intraday and unsetted overnight positions). The user wants a single unified view of everything they own/owe across both categories.

## Goals / Non-Goals

**Goals:**
- Fetch both Holdings and Positions (`net` positions) from Kite API.
- Merge both lists into a single unified Portfolio list, keyed by `tradingsymbol`.
- For overlapping symbols, sum quantities, sum P&L, and recalculate average price using a weighted average formula.

**Non-Goals:**
- We will not send separate `holdings` and `positions` arrays to the frontend.
- We will not change the websocket message structure keys (the payload will still use `"holdings"` but it will now contain the merged data, perhaps with a minor rename later if needed, but for now we keep the key `"holdings"` to minimize frontend breakage).

## Decisions

- **Where to Merge**: The merge logic will live in `backend/cross_reference.py` inside (or right before) `construct_unified_payload`. This ensures `gtt_orders` calculation works against the actual combined total quantity.
- **Positions Filter**: We will use the `net` positions list, as `day` positions are just intraday variations and `net` represents the carry forward + day positions.
- **Handling Overlaps**: 
  - `Total Quantity = holding.quantity + position.quantity`
  - `Total PNL = holding.pnl + position.pnl`
  - `Average Price = ((holding.qty * holding.avg_price) + (pos.qty * pos.avg_price)) / Total Quantity`
- **Cache Changes**: We will cache `positions` in a new variable or add a table if needed, though for now, fetching and caching them alongside holdings makes sense.

## Risks / Trade-offs

- **Risk**: A stock's `quantity` could become 0 if a short position offsets a long holding completely.
  - **Mitigation**: Filter out items with 0 quantity from the final unified list, or explicitly keep them so the user knows they squared it off. We will keep them for transparency.
- **Risk**: GTT orders logic might behave weirdly if intraday positions artificially inflate `actual_holding` for a day.
  - **Mitigation**: The logic in `calculate_discrepancy` uses `holdings_qty_map`. It should correctly see the unified quantity. If they want to only calculate GTTs against CNC holdings, that would require more complex logic. We will assume GTTs apply to net exposure for now.
