## 1. Database Schema

- [x] 1.1 Add `planned_risk` (REAL) and `planned_reward` (REAL) columns to `swing_campaigns` via `ALTER TABLE` in `init_db`.
- [x] 1.2 Update the retrieval and `update_swing_campaign` queries in `database.py` to include `planned_risk` and `planned_reward`.

## 2. Backend API

- [x] 2.1 Update `UpdateCampaignRequest` and `patch_campaign` endpoint to accept `planned_risk` and `planned_reward`.
- [x] 2.2 Create a new GET endpoint `/api/dashboard/daily-pnl` in `main.py` that fetches closed campaigns and aggregates `realized_pnl` grouped by `updated_at` (or `created_at` for now) into a dictionary mapping dates to total P/L.

## 3. Frontend Journal UI

- [x] 3.1 Update the `Campaign` frontend interface to include `planned_risk` and `planned_reward`.
- [x] 3.2 Add input fields for `Planned Risk` (₹) and `Planned Reward` (₹) in `CampaignJournalModal.tsx`.
- [x] 3.3 Update the Campaign card in `HistoryPage.tsx` to display Planned R/R versus Actual Realized R/R with visual highlighting.

## 4. Frontend Dashboard UI

- [x] 4.1 Create `DashboardPage.tsx` component structure.
- [x] 4.2 Fetch active campaigns to calculate and display "Capital at Risk" (sum of planned_risk on open campaigns) and "Max Drawdown" (peak-to-trough drop in historical cumulative P/L).
- [x] 4.3 Fetch data from `/api/dashboard/daily-pnl` and implement a Calendar Heatmap using CSS grid.
- [x] 4.4 Update `App.tsx` navigation to add a "Dashboard" tab routing alongside "History".
