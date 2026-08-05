## Why

Raw trade metrics only tell half the story. To truly improve as a swing trader, it is crucial to understand the qualitative context behind a trade: the underlying strategy, the reasons for exiting, the emotional state during execution, and the rationale. This epic introduces behavioral and psychological journaling to capture these insights, bridging the gap between mechanical execution and emotional discipline.

## What Changes

- Add capability to tag a Swing Campaign with predefined "Strategy" tags (e.g., Breakout, Pullback) and "Sell Reason" tags (e.g., Stoploss Triggered, Target Reached).
- Introduce a 1-5 "Regret Metric" and predefined "Emotional State" (e.g., FOMO, Anxious, Confident, Neutral) selections for each campaign.
- Add a free-form "Rationale" text journal entry to document the complete trade thesis and post-trade thoughts.
- Update the Swing Campaign UI to allow input and visualization of these qualitative metrics.
- Extend the database schema for `swing_campaigns` to persist these fields natively.

## Capabilities

### New Capabilities
- `behavioral-journaling`: Captures emotional states, regret metrics, categorical tags (strategy and sell reasons), and free-form text rationale on swing campaigns.

### Modified Capabilities
<!-- None -->

## Impact

- **Database**: Adds new columns or a JSON field to the `swing_campaigns` table in the SQLite database to store tags, regret score, emotion, and rationale text.
- **Backend API**: The endpoints for updating and retrieving campaigns must be modified to read/write the new fields.
- **Frontend UI**: The Swing Campaign details page must be heavily updated to introduce form inputs (selects, sliders, textareas) and visual indicators (badges, pills, markdown renderers) for the new data.
