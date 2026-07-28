## Context

The Monolith currently handles scheduled cron jobs for fetching and updating holdings data from Kite into a local `holdings_cache.db` SQLite database. A new `Swing-Trading Service` is being introduced which also relies on this data. Continuing to manage background syncs via the Monolith while introducing the Swing-Trading Service introduces a split-brain problem and violates bounded contexts, as the new service should own its trading and portfolio cache.

## Goals / Non-Goals

**Goals:**
- Migrate the 15-minute scheduled background syncs for holdings data from Kite entirely into the Swing-Trading Service.
- Store the fetched holdings data exclusively in the `holdings_cache.db` within the Swing-Trading Service environment.
- Completely remove background cron job definitions and execution responsibilities from the Monolith.
- Delete the legacy `holdings_cache.db` in the Monolith environment.

**Non-Goals:**
- Changing the underlying 15-minute interval or the Kite API integration logic itself.
- Migrating other non-Kite or non-holdings related background jobs from the Monolith at this time.

## Decisions

- **Swing-Trading Service Ownership**: The background sync will run exclusively inside the Swing-Trading Service.
  - *Rationale*: It ensures the service that depends on accurate holdings data manages its own persistence and Kite API interaction, preventing data drift and split-brain architectures.
- **Complete Deletion from Monolith**: The legacy `holdings_cache.db` will be physically deleted from the Monolith.
  - *Rationale*: Leaving stale data behind can cause issues if any legacy monolith services accidentally query it.

## Risks / Trade-offs

- [Risk] Monolith components that relied on `holdings_cache.db` directly might break.
  → *Mitigation*: Ensure all queries for holdings are routed through the Swing-Trading Service APIs rather than the database.
- [Risk] Loss of data during migration.
  → *Mitigation*: Holdings data is fetched fresh from Kite; no state migration is strictly necessary as long as the new Swing-Trading Service job seeds the database correctly upon its first execution.

## Migration Plan

1. Implement the new cron scheduler in the Swing-Trading Service.
2. Verify the Swing-Trading Service successfully fetches from Kite and updates its own `holdings_cache.db`.
3. Stop the existing cron jobs on the Monolith.
4. Delete the legacy `holdings_cache.db` from the Monolith.
5. Deploy changes to production.

## Open Questions

- Are there any downstream services still directly reading `holdings_cache.db` from the Monolith environment?
