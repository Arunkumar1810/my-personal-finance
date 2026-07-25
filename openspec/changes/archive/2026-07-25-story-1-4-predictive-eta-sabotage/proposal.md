## Why

To help traders make emotionless decisions based on AI math, they need visual indicators showing how close their current trade is to its target or stop-loss. Furthermore, they need immediate, clear warnings when the AI identifies a trade as "Sabotaged".

## What Changes

- Add a horizontal progress bar in the trade table to visualize the distance to the Target (green) or Stop-Loss (red) based on the Entry, Target, Stop-Loss, and current prices.
- Add visual styling (pulse with danger color `#FF1744`) to the entire row if the AI marks the trade as "Sabotaged".
- Add a manual "Override" button to dismiss the "Sabotaged" warning.

## Capabilities

### New Capabilities
- `predictive-eta-sabotage`: Visual indicators for trade progress towards targets/stop-losses, AI sabotage warnings with pulsing row colors, and manual override functionality.

### Modified Capabilities
- `trading-dashboard`: Updating the existing dashboard table requirements to include the new visual indicators and sabotage warnings.

## Impact

- Frontend: Updates to the React components rendering the trade table (e.g., adding progress bars, conditional row styling, and the override button).
- Data Models: State management needs to handle the "Override" action for a sabotaged trade.
