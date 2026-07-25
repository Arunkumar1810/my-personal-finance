## Why

The Junior Analyst needs to protect the trader from executing highly volatile or low-edge setups. By flagging these setups and forcing a tight stop-loss, we aggressively limit potential losses on bad ideas.

## What Changes

- Update the Gemini AI evaluation logic to detect highly volatile or low-edge setups.
- When such a setup is detected, include an `is_sabotaged: true` flag in the JSON response payload.
- Override the standard math calculations to enforce a tight 0.5% Stop-Loss when `is_sabotaged` is true.

## Capabilities

### New Capabilities
- `ai-sabotage`: Detects low-edge setups and overrides normal trade parameters to protect the trader.

### Modified Capabilities

## Impact

- The backend Sync Engine (Python) will need an update to handle the new `is_sabotaged` flag and enforce the overridden 0.5% Stop-Loss.
- The shared ledger (Google Sheets) might need to record this state.
- The frontend (React) will need to display the sabotage status or the tightened stop-loss to the user.
