## Context

We are building a 'Swing Trading Dashboard' with a React/Vite/Tailwind frontend and a Python backend. They share state via a Shared Ledger in Google Sheets. This story covers the initial Python backend scaffolding and authentication with the Google Sheets API using a service account.

## Goals / Non-Goals

**Goals:**
- Set up the basic Python 3.10+ project structure for the backend.
- Authenticate to Google Sheets using a service account JSON key.
- Prove read access by fetching a list of tickers from the Sheet.
- Prove write access by updating a debug column in the Sheet.

**Non-Goals:**
- Complex AI calculations or market data fetching (will be handled in subsequent stories).
- Frontend integration (React already writes to the sheet, but we aren't connecting to React directly).

## Decisions

- **Google Sheets API Library:** We will use `gspread` and `google-auth` as they provide a simpler, more pythonic interface for Google Sheets compared to the official `google-api-python-client`.
- **Authentication:** Use a Service Account credential JSON file. The path to this file will be provided via an environment variable (`GOOGLE_APPLICATION_CREDENTIALS` or a custom env var) so it is not hardcoded.
- **Project Structure:** A simple `main.py` or `sync_engine.py` script for scaffolding, with a requirements.txt for dependencies.

## Risks / Trade-offs

- **Risk:** Rate limits on Google Sheets API.
  **Mitigation:** The initial scaffolding will only do a few reads/writes. In the future, we may need batch updates.
- **Risk:** Missing or invalid credentials.
  **Mitigation:** Provide clear error messages if the credentials file is missing or invalid.
