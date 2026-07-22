## Context

The backend currently fetches all GTTs (historical, cancelled, triggered, and active) from the Kite API and stores them in an in-memory cache, which is then broadcast to the frontend via websockets. This bloats the cache and network payload since the frontend only needs active GTTs for the current dashboard.

## Goals / Non-Goals

**Goals:**
- Filter out non-active GTTs before caching to reduce memory footprint and websocket payload size.

**Non-Goals:**
- Supporting a historical view of GTTs (this is out of scope for now; if needed later, we can reconsider fetching them separately).

## Decisions

- **Filter at Fetch Time:** We will filter the GTTs immediately after `kite.get_gtts()` in `fetch_and_cache_gtt_orders` within `kite_client.py`.
- *Rationale:* This provides the leanest cache and prevents unnecessary data transfer over websockets. The frontend requires no changes and will naturally receive less noise.

## Risks / Trade-offs

- [Risk] We won't have historical GTTs in the cache if a new feature needs them.
  → *Mitigation*: We can add a separate endpoint or modify the filter logic if that requirement ever arises.
