## 1. Database Schema

- [x] 1.1 Implement schema migration in `database.py` to add `strategy`, `sell_reason`, `emotion`, `regret_metric`, and `rationale` columns to `swing_campaigns`
- [x] 1.2 Update the `create_swing_campaign` and retrieval queries in `database.py` to handle these new fields safely

## 2. Backend API

- [x] 2.1 Update the `/api/campaigns` GET endpoint to return the new behavioral fields
- [x] 2.2 Create a new `PUT` or `PATCH` endpoint at `/api/campaigns/{id}` to allow updating these behavioral fields for an existing campaign

## 3. Frontend UI Updates

- [x] 3.1 Update the Campaign entity interface in the frontend to include `strategy`, `sell_reason`, `emotion`, `regret_metric`, and `rationale`
- [x] 3.2 Add a form/edit modal to the Campaign view to input `Strategy` and `Sell Reason` using predefined tags
- [x] 3.3 Add inputs for `Emotion` (dropdown) and `Regret Metric` (1-5 slider or radio buttons)
- [x] 3.4 Add a Markdown-supported `Rationale` text area input
- [x] 3.5 Wire the form to the new `PATCH /api/campaigns/{id}` backend endpoint
- [x] 3.6 Display the tags and metrics elegantly on the Campaign card when viewing (read-only mode)
