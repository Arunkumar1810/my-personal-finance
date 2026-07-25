## Context

The system has a Google Sheets shared ledger that holds ticker data. The React dashboard reads from it, while a Python sync engine is supposed to update it. Currently, the sync loop needs to run autonomously to keep the sheet data fresh without manual triggers. 

## Goals / Non-Goals

**Goals:**
- Schedule the Python sync script to run every 15 minutes.
- Fetch rows explicitly marked as "Awaiting 15-min Sync" from the sheet.
- Fetch live data from Moneycontrol for these tickers.
- Fetch insights from Gemini for these tickers.
- Write the final combined payload back to the sheet.
- Explicitly mark failures with `SYNC_FAILED` to prevent endless retry loops on broken tickers and alert the user.

**Non-Goals:**
- Real-time updates (sub-minute frequency).
- Changing the Google Sheets schema.
- Replacing Google Sheets with a traditional database.

## Decisions

- **Scheduler:** Use a standard cron expression or task scheduler at the OS level, or a lightweight scheduling library (like `schedule` in Python) in a long-running process. A simple cron or Windows Task Scheduler is preferred to avoid keeping a Python process running constantly, but a Python entrypoint script `run_cron.py` that loops with `schedule` library is also viable if we want an active worker. *Decision:* We will assume a long-running Python process `sync_worker.py` using `schedule` or a simple `time.sleep` loop, OR an OS cron job calling `sync_engine.py`. Given the "script is scheduled on a 15-minute cron job" AC, we'll design for an entry script `sync_runner.py` that can be run via OS cron.
- **Error Handling:** When Moneycontrol or Gemini fails for a ticker, write `SYNC_FAILED` back to the status column in the Google Sheet so it doesn't block other tickers or continuously retry in the next cycle unless reset by the user.

## Risks / Trade-offs

- [Risk] Google Sheets API Rate Limits → Mitigation: The script processes only rows marked "Awaiting 15-min Sync". We can also batch updates if there are many tickers.
- [Risk] Script overlapping if run takes longer than 15 mins → Mitigation: Ensure the script exits or skips if an instance is already running (e.g., using a lock file).
