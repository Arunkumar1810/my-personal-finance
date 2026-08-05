## 1. Backend Authentication

- [x] 1.1 Implement a Python function to authenticate with Zerodha web using User ID, Password, and TOTP to extract `kf_session` and `enctoken`.
- [x] 1.2 Create an API endpoint `POST /api/console/login` in the Gateway (`backend/main.py`) that accepts these credentials and invokes the authentication function.

## 2. Backend Ledger Fetching

- [x] 2.1 Implement a Python function to fetch the ledger from the Zerodha Console API (`/api/reports/ledger`) using `kf_session` and `enctoken`.
- [x] 2.2 Parse the JSON response to extract cash deposits and withdrawals (filtering out non-cash entries).
- [x] 2.3 Update the `POST /api/console/login` endpoint to automatically fetch, parse, and save these transactions to the SQLite `transactions` table upon successful login.

## 3. Backend Service Integration

- [x] 3.1 Update `backend/swing-trading-service/grpc_server.py` (`GetPortfolioValuation`) to query the SQLite `transactions` table via `database.get_transactions()` instead of calling `kite_client.get_cash_transactions()`.
- [x] 3.2 Ensure any duplicate deposits/withdrawals fetched multiple times from the Console API are handled gracefully (e.g., upsert or wipe-and-replace for the user's ledger).

## 4. Frontend UI and Integration

- [x] 4.1 Add a "Refresh Transactions" button to the `PortfolioValuation` component.
- [x] 4.2 Create a modal popup prompting for Zerodha User ID, Password, and TOTP code.
- [x] 4.3 On popup submission, make an HTTP POST request to `/api/console/login` with the credentials.
- [x] 4.4 Ensure the frontend handles loading states and success/error responses from the authentication flow.
- [x] 4.5 On successful fetch, automatically re-fetch the `/api/portfolio-valuation` endpoint to refresh the transaction list and XIRR calculation visually.
