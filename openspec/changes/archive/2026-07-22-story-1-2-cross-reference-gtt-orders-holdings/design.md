## Context

The backend currently caches holdings for a user but does not automatically integrate active GTT orders. Traders need a view of how many units they are missing for their GTT orders when considering their actual cached holdings, to easily identify any shortfalls.

## Goals / Non-Goals

**Goals:**
- Fetch GTT orders via the Kite REST API.
- Cache the fetched GTT orders in backend memory so that frontend reconnects do not trigger spammy Kite REST API requests.
- Compare the GTT trigger quantities against cached holdings to calculate discrepancies.
- Publish a unified payload containing GTT orders and their calculated discrepancies over WebSocket to the frontend.

**Non-Goals:**
- Creating new GTT orders or modifying existing ones.
- Persisting GTT orders to a database (in-memory caching is sufficient).

## Decisions

- **Caching Mechanism**: We will use an in-memory store (e.g., a simple map/dictionary or an existing in-memory cache solution if present in the backend) for GTT orders, keyed by user/account.
- **WebSocket Publishing**: The discrepancy calculation will happen on the backend and immediately pushed through the existing WebSocket connection as a standard JSON message.

## Risks / Trade-offs

- **Risk**: The in-memory cache may become stale if a GTT order is executed or modified outside the platform.
  - **Mitigation**: We could implement a periodic refresh or provide a way for the user to manually trigger a refresh from the frontend. For now, the cache will be updated upon initial fetch or specific events.
