## Why

We are building a 'Swing Trading Dashboard' that requires a sync engine to update the underlying Google Sheets, ensuring the React dashboard always has fresh data. Running this engine autonomously every 15 minutes allows for timely updates of market data (via Moneycontrol) and AI insights (via Gemini) without manual intervention.

## What Changes

- Create a 15-minute cron job or scheduled task for the Python sync engine.
- Update the sync engine to query Google Sheets for rows marked "Awaiting 15-min Sync".
- Integrate with Moneycontrol and Gemini to process the selected tickers.
- Write the resulting JSON payload back into the respective row in the Google Sheet.
- Ensure that any failures processing individual tickers are explicitly marked as `SYNC_FAILED` in the sheet.

## Capabilities

### New Capabilities
- `sync-engine-cron`: Scheduled execution of the sync engine (every 15 mins) that fetches pending tickers, processes them through market data and AI services, and updates the shared Google Sheets ledger.

### Modified Capabilities

## Impact

- **Backend**: New scheduled job script/runner.
- **Data Layer (Google Sheets)**: Rows will transition from "Awaiting 15-min Sync" to either updated payload or `SYNC_FAILED`.
- **Frontend (React Dashboard)**: Benefits from data freshness automatically without triggering manual updates.
