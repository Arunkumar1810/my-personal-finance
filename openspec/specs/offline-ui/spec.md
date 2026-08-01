## Purpose
TBD - Offline UI visual indicators and action blocking.

## Requirements

### Requirement: React SPA Offline UI Banner & Action Blocking
The React SPA MUST provide visual indicators and block interactions when the portfolio data was served from the local SQLite fallback cache due to an API outage.

#### Scenario: Fallback flag detected in response
- **WHEN** the frontend receives a response with the `fallback: true` flag
- **THEN** a prominent warning banner must be displayed indicating "Live Market Data is Unavailable"
- **AND** all "Buy" / "Sell" / "Modify" buttons must be disabled to explicitly prevent synthetic trade queueing
- **AND** the UI must block any trade submissions even if a modal was already open when the connection dropped
- **AND** any existing "Pending" orders must be visually grayed out or marked as suspended.
