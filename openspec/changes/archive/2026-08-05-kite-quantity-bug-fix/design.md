## Context

The Kite API separates stock quantities into `quantity` (fully settled), `t1_quantity` (T+1 unsettled), and `collateral_quantity` (pledged). The backend currently reads only `quantity`, causing T1 and pledged stocks to incorrectly report a quantity of 0, which breaks the frontend portfolio valuation features.

## Goals / Non-Goals

**Goals:**
- Provide the frontend with the true aggregate quantity of owned stocks.
- Ensure all downstream components (like portfolio valuation, XIRR calculations) automatically reflect the accurate value of unsettled and pledged assets.

**Non-Goals:**
- Separating settled vs. unsettled stocks on the UI (for now, simple sum is sufficient).
- Tracking pledged margins at a granular UI level.

## Decisions

- **Summing quantities on backend:** The backend `grpc_server.py` for `kite-service` will calculate `total_quantity = quantity + t1_quantity + collateral_quantity`. 
  - *Rationale*: This avoids passing multiple data fields to the frontend and modifying UI components. It ensures a single source of truth for total assets.

## Risks / Trade-offs

- *Risk*: A user expects to only see "available to sell" quantities and is confused by seeing T1 or pledged stocks included.
  - *Mitigation*: Usually, users view "Portfolio Valuation" as total assets owned, so summing them aligns with their expectation of total net worth. Unsettled stocks belong to them and should be counted.
