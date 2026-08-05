## Context

The current `swing_campaigns` table in the SQLite database only stores mechanical execution data (ticker, status, timestamps) and calculates entry/exit from child `campaign_executions`. To satisfy Epic 2, we need to capture psychological and qualitative context: Strategy tags, Sell Reason tags, Emotional state, a 1-5 Regret metric, and a free-form Rationale text. 

## Goals / Non-Goals

**Goals:**
- Provide a structured way to capture and retrieve qualitative and psychological metrics for campaigns.
- Ensure the backend exposes these fields gracefully through the `/api/campaigns` endpoints.
- Provide a robust frontend UI to input these values with good UX.

**Non-Goals:**
- We are not implementing the AI analysis of these fields yet (that is Epic 4).
- We are not building dynamic tag creation (users cannot create new custom strategy tags in this epic; we will rely on a predefined set or simple free-text input managed by the frontend).

## Decisions

- **Database Storage Model**: We will add the following columns directly to the `swing_campaigns` table:
  - `strategy` (TEXT)
  - `sell_reason` (TEXT)
  - `emotion` (TEXT)
  - `regret_metric` (INTEGER)
  - `rationale` (TEXT)
  *Rationale*: Storing them as explicit columns rather than a JSON blob makes it slightly easier to do simple aggregate queries or filtering (e.g., "show me all Breakout campaigns") in SQLite, even though JSON is also supported.
- **Predefined Enums**: The frontend will use specific `<select>` drop-downs or pill-groups for `emotion` (FOMO, Anxious, Confident, Neutral) and tags, rather than letting the user type anything, enforcing data cleanliness for future AI use.
- **SQLite Migration Strategy**: Since this is still an MVP in rapid development and data migration is not strictly necessary for local SQLite iteration, we will implement an `ALTER TABLE` execution inside `database.py` initialization to seamlessly add these columns if they do not exist.

## Risks / Trade-offs

- **Risk: Free-form tags vs Enums** -> *Trade-off*: By hardcoding predefined tags on the frontend, we lose flexibility, but we ensure structured data NFRs are met for the future AI context.
- **Risk: Schema Evolution** -> *Mitigation*: We will use `ALTER TABLE ADD COLUMN` queries wrapped in `try/except sqlite3.OperationalError` in the `database.py` setup block to ensure the new columns are added to existing local databases without wiping data.
