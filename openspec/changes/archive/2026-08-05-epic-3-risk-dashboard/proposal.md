## Why

Swing traders need to maintain strict discipline to survive long-term, which means focusing on risk management before profits. Currently, there is no high-level view that forces the user to confront their open risk, compare their execution (actual R/R) against their plan, or visualize their consistency (P/L heatmap). This change introduces a Risk-First dashboard to fulfill these needs.

## What Changes

- Redesign the main dashboard to prominently feature "Capital at Risk" and "Max Drawdown" at the very top.
- Introduce a visual indicator on completed Swing Campaigns to compare Planned Risk/Reward vs Actual Realized Risk/Reward.
- Implement a Calendar Heatmap view that overlays daily net P/L, using color intensity to highlight winning and losing streaks.

## Capabilities

### New Capabilities
- `risk-dashboard`: Aggregation and prominent display of top-level risk metrics (Capital at Risk, Max Drawdown).
- `campaign-performance`: Visual comparison of planned R/R (from tags/rationale) vs realized R/R (from execution data) on completed campaigns.
- `calendar-heatmap`: Calendar visualization rendering daily net P/L with color intensity scaling.

### Modified Capabilities
<!-- None -->

## Impact

- **UI/UX:** Major addition of a new Dashboard page/tab with new data visualization components (Heatmap, R/R charts).
- **Backend:** New API endpoints required to aggregate daily P/L for the heatmap and calculate total open risk/drawdown.
- **Database:** May require storing "Planned R/R" if it isn't easily parsed from the existing rationale field (or we can add a dedicated field).
