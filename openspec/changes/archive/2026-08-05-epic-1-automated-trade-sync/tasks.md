## 1. Database Schema Setup

- [x] 1.1 Create `BrokerCredential` model and migration (user_id, api_key, api_secret encrypted)
- [x] 1.2 Create `RawExecution` model and migration (ticker, side, quantity, price, timestamp, synced_at)
- [x] 1.3 Create `SwingCampaign` model and migration (ticker, status, created_at)
- [x] 1.4 Create `CampaignExecution` join model and migration

## 2. Broker Integration (Backend)

- [x] 2.1 Implement secure API key storage and retrieval service
- [x] 2.2 Implement broker API connection verification endpoint (test call)
- [x] 2.3 Implement Trade Ingestion Engine to fetch executions since last `synced_at` and save as `RawExecution`

## 3. Broker Settings UI

- [x] 3.1 Create UI form in Settings for entering Broker API keys
- [x] 3.2 Wire Settings UI to connection verification and save endpoints
- [x] 3.3 Display "Connected" status upon successful verification

## 4. Raw Executions View & Sync

- [x] 4.1 Create "Raw Executions" list component to display unassigned trades
- [x] 4.2 Add "Sync Trades" button to History tab
- [x] 4.3 Wire "Sync Trades" button to Trade Ingestion Engine and refresh list on completion

## 5. Swing Campaign Grouping

- [x] 5.1 Implement multi-select capability on the "Raw Executions" view
- [x] 5.2 Implement backend endpoint to create a `SwingCampaign` from selected `RawExecution` IDs
- [x] 5.3 Implement backend aggregation logic for a campaign (average entry price, exit price, realized P/L)
- [x] 5.4 Update UI to move grouped executions out of "Raw" view and into a new "Campaigns" view
