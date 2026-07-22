## Why

Provide visual feedback to traders indicating whether their Stop-Loss or Target trigger is closer to the current market price, allowing them to know which outcome is more imminent.

## What Changes

- Backend calculates which trigger is closer (Stop-Loss vs Target) based on current market price on every tick.
- Backend sends this information to the frontend via WebSocket.
- Frontend visually highlights the closer trigger in the table UI.

## Capabilities

### New Capabilities
- `proximity-highlighting`: Logic to determine closer trigger (Stop-Loss vs Target) and highlight it visually on the frontend table UI.

### Modified Capabilities


## Impact

- Backend WebSocket payload format for GTT order data to include closest trigger info.
- Frontend UI table component for GTT orders to support visual highlighting.
