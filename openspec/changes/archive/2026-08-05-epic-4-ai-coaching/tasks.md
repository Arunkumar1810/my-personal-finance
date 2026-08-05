## 1. Database Schema

- [x] 1.1 Add `ai_analysis` (TEXT) column to `swing_campaigns` via `ALTER TABLE` in `init_db`.
- [x] 1.2 Update the retrieval and update queries in `database.py` to include `ai_analysis`.

## 2. Backend API Integration

- [x] 2.1 Add Python dependencies for the chosen LLM provider (e.g., `google-genai`) to the backend environment.
- [x] 2.2 Create `POST /api/campaigns/{id}/ai-analysis` endpoint in `main.py`. This should fetch the campaign data, construct a prompt for critique and counter-factuals, call the LLM API (or a mock service), save the result to `ai_analysis`, and return it.

## 3. Frontend Revenge Trade Warning

- [x] 3.1 In `DashboardPage.tsx`, add logic to check if the most recently closed campaign resulted in a net loss and was closed within the last 30 minutes.
- [x] 3.2 If the condition is met, display a prominent, dismissible "Revenge Trade Warning" banner at the top of the Dashboard.

## 4. Frontend AI Post-Mortem UI

- [x] 4.1 In the `CampaignJournalModal.tsx` (or a dedicated Campaign Details view), add an "AI Coaching" section visible only for closed campaigns.
- [x] 4.2 Add a button to trigger the `POST /api/campaigns/{id}/ai-analysis` endpoint if `ai_analysis` is null.
- [x] 4.3 Render the returned (or cached) AI analysis markdown, highlighting the critique and counter-factual scenarios.
