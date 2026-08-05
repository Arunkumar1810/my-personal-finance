## MODIFIED Requirements

### Requirement: Enhanced Portfolio Valuation View
The existing Portfolio Valuation view SHALL be enhanced to include XIRR, Wealth Velocity, Ghost XIRR, and a transaction ledger. It MUST also include a mechanism to fetch transactions from Zerodha Console via an on-demand credential popup.

#### Scenario: User views Portfolio Valuation
- **WHEN** the user navigates to the Portfolio Valuation view
- **THEN** they see the current Portfolio Value and Available Funds fetched from Kite
- **AND** they see the calculated XIRR, a Wealth Velocity indicator, and a Ghost XIRR trendline based on transactions cached in the local SQLite database
- **AND** they see a "water drop" styled visual ledger of historical cash flows (deposits/withdrawals) within the same view.

#### Scenario: User requests transaction refresh
- **WHEN** the user clicks a "Refresh Transactions" button
- **THEN** a popup prompts them for their Zerodha User ID, Password, and TOTP
- **AND** upon submission, the frontend calls the backend to fetch new data from the Console API
- **AND** upon success, the Portfolio Valuation view updates the transaction ledger and recalculates XIRR with the newly cached data.
