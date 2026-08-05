## Why

Most trading journals require tedious manual entry, leading to stale or inaccurate data. By automating trade ingestion from a broker API, we remove data entry friction and ensure high-fidelity execution data. This is the foundational plumbing required before we can build the behavioral and psychological journaling features. 

## What Changes

- Add a secure broker API connection and key management system in settings.
- Build a Trade Ingestion Engine to fetch and persist raw trade executions (ticker, price, timestamp, quantity, side).
- Add a "Raw Executions" view to list unassigned imported trades.
- Introduce the "Swing Campaign" entity.
- Create UI for users to select multiple raw executions and group them into a single Swing Campaign, calculating aggregated entry/exit prices and P/L.

## Capabilities

### New Capabilities
- `broker-integration`: Secure API key management and automated fetching of trade executions from a broker.
- `campaign-grouping`: Core logic and UI to link individual buy/sell executions into a unified Swing Campaign entity and aggregate P/L.

### Modified Capabilities
- (None)

## Impact

- **Database**: New tables required for Broker Credentials, Raw Executions, and Swing Campaigns.
- **UI**: New Settings page section for broker keys, new "Raw Executions" list view, and Campaign grouping interactions.
- **External**: Integration with a third-party broker API (e.g., Alpaca or similar).
