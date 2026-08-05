## Context

The system currently relies on the Kite Connect API to fetch holdings, margins, and cash transactions to calculate XIRR in the Portfolio Valuation view. However, Kite Connect API does not provide historical cash deposits and withdrawals (`ProductionKiteAdapter` returns `[]`). There is a disconnected SQLite `transactions` table in `holdings_cache.db` with CRUD operations in `backend/main.py`, but it requires manual entry and is not wired up to the Portfolio Valuation flow.

To automate this without storing sensitive user credentials (like passwords and TOTP secrets) in environment variables, we will implement an "on-demand refresh" flow. When the user explicitly requests a refresh, they will provide their credentials via a frontend popup. These credentials will be used once to authenticate against the undocumented Zerodha web endpoints, retrieve session cookies (`kf_session`), and fetch the ledger from the Console API.

## Goals / Non-Goals

**Goals:**
- Provide a secure, on-demand way for users to fetch their historical cash deposits and withdrawals from Zerodha Console.
- Ensure zero manual data entry of transactions.
- Keep sensitive credentials (password, TOTP secret) out of `.env` files and persistent storage.
- Update the Portfolio Valuation XIRR calculation to use these locally cached transactions.

**Non-Goals:**
- Real-time or background syncing of cash transactions (requires storing credentials, which is out of scope by user request).
- Using a headless browser (e.g., Playwright/Puppeteer). We will use a scriptable HTTP client (e.g., `requests` in Python) to execute the undocumented login flow.

## Decisions

**1. Authentication Flow:**
We will implement an undocumented HTTP login flow in Python (simulating the web login) to acquire `kf_session` and `enctoken` cookies. 
*Alternative:* Use a headless browser. *Rationale:* Too heavy and fragile for an on-demand API fetch. Python `requests` with standard Zerodha login payloads is faster, provided we keep the login endpoints up to date.

**2. Credential Handling:**
Credentials will be entered by the user in a frontend popup and sent securely to a new backend endpoint `POST /api/console/login`. The backend will use these immediately in memory and NOT store them on disk or database.

**3. Source of Truth for Transactions:**
The Swing Trading Service (`grpc_server.py`) will be updated. Instead of calling `self.kite_client.get_cash_transactions()` (which goes to the Kite Service and returns empty), it will directly query the local SQLite database `transactions` table. The backend endpoint `POST /api/console/login` will populate this table after successfully fetching data from the Console API.

## Risks / Trade-offs

- **[Risk] Undocumented API Changes:** Zerodha frequently updates their login flow (e.g., adding Cloudflare Turnstile, changing TOTP payloads). 
  → **Mitigation:** If the login fails, the system relies on the locally cached SQLite transactions, meaning historical XIRR remains available even if refresh is broken.
- **[Risk] Security of Credentials in Transit:** Credentials are sent from frontend to backend. 
  → **Mitigation:** Ensure the application runs locally (localhost) or over HTTPS if deployed.
