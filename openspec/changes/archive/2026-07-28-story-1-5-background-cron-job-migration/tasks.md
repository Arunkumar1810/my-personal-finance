## 1. Setup Swing-Trading Service Cron Job

- [x] 1.1 Configure a 15-minute cron scheduler or background execution loop within the Swing-Trading Service.
- [x] 1.2 Implement the Kite API data fetch logic triggered by the scheduler.
- [x] 1.3 Implement the local SQLite `holdings_cache.db` upsert logic to save the fetched Kite data within the Swing-Trading Service.
- [x] 1.4 Add necessary logging and error handling to the background job.

## 2. Deprecate and Cleanup Monolith

- [x] 2.1 Identify and disable the existing 15-minute background sync cron job in the Monolith codebase.
- [x] 2.2 Remove the associated background sync job execution code from the Monolith.
- [x] 2.3 Delete the legacy `holdings_cache.db` file from the Monolith environment to prevent split-brain issues.
- [x] 2.4 Verify no other Monolith systems are trying to access the deleted `holdings_cache.db` directly.
