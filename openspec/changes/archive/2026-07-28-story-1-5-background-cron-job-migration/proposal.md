## Why

The current background sync cron jobs run on the Monolith, accessing Kite data and storing it in a local `holdings_cache.db`. With the introduction of the Swing-Trading Service, these cron jobs need to be migrated to the new service so that it can manage the background sync to its own local `holdings_cache.db`. This migration prevents split-brain issues and ensures the Swing-Trading Service is self-contained.

## What Changes

- Implement a 15-minute background sync cron job in the Swing-Trading Service.
- The new cron job will fetch fresh data from Kite and update the local SQLite database in the Swing-Trading Service.
- **BREAKING**: Remove the background sync cron jobs from the Monolith.
- **BREAKING**: Delete the legacy `holdings_cache.db` from the Monolith environment.

## Capabilities

### New Capabilities

- `swing-trading-cron`: Background 15-minute sync jobs running within the Swing-Trading Service to update its local SQLite database.

### Modified Capabilities

- `holdings-cache`: Remove legacy `holdings_cache.db` from the Monolith environment and ensure no background jobs run on the Monolith.

## Impact

- **Monolith**: Cron jobs removed; `holdings_cache.db` deleted.
- **Swing-Trading Service**: New cron scheduler added to fetch data from Kite every 15 minutes and update the local `holdings_cache.db`.
- **Database**: The SQLite database for holdings cache will now only reside and be updated in the Swing-Trading Service.
