# Capability: Console Ledger

## Purpose
Fetches and parses historical cash deposits and withdrawals from the Zerodha Console API into the local transaction cache.

## Requirements

### Requirement: Console Ledger Ingestion
The system SHALL fetch the user's ledger from the Zerodha Console API and parse it to extract historical cash deposits and withdrawals.

#### Scenario: Successful ledger fetch
- **WHEN** the system is provided with a valid `kf_session` and `enctoken`
- **THEN** it fetches the ledger from `/api/reports/ledger`
- **AND** parses the JSON payload to extract entries corresponding to cash deposits and withdrawals
- **AND** saves these parsed transactions (date, amount, type) into the local SQLite database

#### Scenario: Session expired during fetch
- **WHEN** the system attempts to fetch the ledger with an expired session
- **THEN** it encounters a 401 Unauthorized or similar response
- **AND** returns an error indicating that a new login is required
