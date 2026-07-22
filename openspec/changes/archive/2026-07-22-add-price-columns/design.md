## Context

The backend websocket payload already sends some GTT information, and the user wants to see the "Current Price" and "Bought Price" (average price) for each stock alongside their GTT orders. 
Currently, the `cross_reference.py` has access to `holdings`, which typically contain `last_price` and `average_price` for each instrument. However, these fields might not be explicitly populated into the unified GTT payload.

## Goals / Non-Goals

**Goals:**
- Expose `last_price` (Current Price) and `average_price` (Bought Price) from the holdings into the unified GTT payload.
- Update the frontend React component (`GttTable.tsx` / `GttDashboard.tsx`) to extract and display these fields in new columns.

**Non-Goals:**
- Changing the structure of the existing holdings payload itself.
- Implementing any advanced profit/loss calculation (P&L columns).

## Decisions

- **Backend Unified Payload Augmentation:** We will inject `last_price` and `average_price` into the `enriched_gtt` dictionary inside `calculate_discrepancy` in `cross_reference.py`.
  - *Rationale:* Since `cross_reference.py` already merges GTTs with holdings, it is the most appropriate place to augment the data.
- **Frontend Presentation:** We will add two new columns to the `GttTable` before the "ETA (Days)" column.
  - *Rationale:* Placing them before the ETA keeps price information contextual to the Stop-Loss and Target prices.

## Risks / Trade-offs

- [Risk] If a GTT order exists for a symbol not present in holdings, `last_price` or `average_price` might be missing.
  → *Mitigation*: Fall back to the `last_price` available in the GTT's condition if holdings data is missing, and default `average_price` to `0` or null, handled gracefully by the frontend.
