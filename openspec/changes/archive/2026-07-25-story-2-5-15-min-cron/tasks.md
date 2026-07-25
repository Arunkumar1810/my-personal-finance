## 1. Google Sheets Integration

- [x] 1.1 Update the Google Sheets reading logic to filter for rows marked "Awaiting 15-min Sync"
- [x] 1.2 Implement the write-back logic to update a row with `SYNC_FAILED` on individual ticker processing error

## 2. Sync Engine Orchestration

- [x] 2.1 Refactor existing Moneycontrol and Gemini processing to handle a batch of pending tickers from step 1.1
- [x] 2.2 Ensure individual ticker failures are caught and don't halt the entire batch

## 3. Scheduling

- [x] 3.1 Create `sync_runner.py` entrypoint that can be executed by a cron job
- [x] 3.2 Ensure `sync_runner.py` prevents overlapping executions (e.g., using a lockfile or checking for existing processes)
- [x] 3.3 Set up OS-level cron expression or lightweight scheduler to trigger `sync_runner.py` every 15 minutes
