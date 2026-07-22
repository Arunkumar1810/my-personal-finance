## 1. Kite Integration & Caching

- [x] 1.1 Implement function to fetch active GTT orders from Kite REST API
- [x] 1.2 Setup in-memory cache for GTT orders (keyed by user/account)
- [x] 1.3 Implement logic to populate the cache upon frontend request if empty or expired

## 2. Cross-referencing & Discrepancy Calculation

- [x] 2.1 Create function to calculate discrepancy (GTT trigger quantity - actual cached holdings)
- [x] 2.2 Construct the unified JSON data payload structure containing both GTT orders and discrepancy

## 3. WebSocket Integration

- [x] 3.1 Hook the fetch and calculation logic into the existing WebSocket connection flow
- [x] 3.2 Push the unified JSON payload to the frontend via WebSocket
- [x] 3.3 Test the end-to-end flow to verify frontend reconnects use the cached GTT orders
