## 1. Backend: Console API Client

- [x] 1.1 Create `fetch_and_parse_tradebook(enctoken)` function in `backend/console_client.py`
- [x] 1.2 Implement logic to make HTTP requests to the Zerodha Console API using the enctoken
- [x] 1.3 Add parsing logic to map the console API response to the standard internal trade model

## 2. Backend: Sync Endpoint

- [x] 2.1 Add `POST /api/console/tradebook-sync` route in `backend/main.py`
- [x] 2.2 Wire the endpoint to call `fetch_and_parse_tradebook(enctoken)`
- [x] 2.3 Implement error handling for invalid/expired tokens and update local trade history on success

## 3. Frontend: UI Integration

- [x] 3.1 Open `HistoryPage.tsx` and add a "Sync Tradebook" button
- [x] 3.2 Implement API call from the frontend to `POST /api/console/tradebook-sync` when the button is clicked
- [x] 3.3 Add loading states and toast notifications (success/error) based on API response
