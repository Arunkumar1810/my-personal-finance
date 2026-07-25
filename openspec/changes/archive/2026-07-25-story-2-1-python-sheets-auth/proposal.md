## Why

We need a backend system that can authenticate with the Google Sheets API. This allows the backend to read the pending watchlist inputted by the user in React and write back market/AI calculations to the Shared Ledger (Google Sheets).

## What Changes

- Python 3.10+ script scaffolding.
- Integration with Google Sheets API using a service account credential.
- Implementation of read/write logic to prove two-way access to the Sheet.

## Capabilities

### New Capabilities
- `python-sheets-auth`: Capability for the Python backend to authenticate and perform basic read/write operations with Google Sheets via service account.

### Modified Capabilities

## Impact

- Python backend scaffolding is created.
- Python dependencies for Google Sheets API (e.g. `gspread`, `google-auth`) will be needed.
