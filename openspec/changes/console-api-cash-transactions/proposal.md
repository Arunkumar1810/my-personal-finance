## Why

The Kite Connect API does not provide historical cash deposits and withdrawals, which leaves our transaction lists empty and makes accurate XIRR calculations impossible in the Portfolio Valuation view. To fetch this data, we must programmatically query the Zerodha Console API using an undocumented login flow when requested by the user.

## What Changes

- Add a UI mechanism to trigger an on-demand refresh of cash transactions.
- Implement a popup/form to securely prompt for Zerodha User ID, Password, and TOTP, sending them to the backend.
- Create a backend endpoint `/api/console/login` (or similar) that uses these credentials to obtain `kf_session` and `enctoken` via the undocumented Zerodha login flow.
- Fetch ledger data from the Console API (`/api/reports/ledger`) and parse out cash deposits and withdrawals.
- Save these cash transactions into the existing SQLite `transactions` table (`holdings_cache.db`).
- Ensure `PortfolioValuation` component or its underlying gRPC service leverages the local SQLite database for these transactions rather than attempting to fetch them from the empty Kite API adapter.

## Capabilities

### New Capabilities
- `console-auth`: Authenticates with the Zerodha web endpoints to acquire session cookies for the Console API.
- `console-ledger`: Fetches and parses cash deposits and withdrawals from the Zerodha Console API.

### Modified Capabilities
- `portfolio-valuation-view`: Modifies the source of truth for transactions to use the local SQLite database instead of querying the Kite Connect API. Includes a new UI mechanism to refresh these transactions by authenticating with the Console API.

## Impact

- **Frontend**: New popup component for Zerodha web credentials and a refresh trigger in the Portfolio Valuation view.
- **Backend API (Gateway)**: New REST endpoint for initiating the Console API login and ledger fetch.
- **Backend Service (Swing Trading Service)**: Updates `GetPortfolioValuation` to query transactions from the SQLite database instead of passing the request to the `kite-service`.
- **Database**: The `transactions` table in `holdings_cache.db` will now be the active source of truth.
