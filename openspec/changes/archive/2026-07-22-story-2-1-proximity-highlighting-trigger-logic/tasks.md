## 1. Backend Updates

- [x] 1.1 Calculate distance from market price to Stop-Loss and Target for active GTT orders upon price ticks.
- [x] 1.2 Determine the closer trigger and update the WebSocket payload structure to include the `closestTrigger` field (values: "STOP_LOSS", "TARGET", or null).

## 2. Frontend Updates

- [x] 2.1 Update frontend GTT order model/types to parse `closestTrigger` from WebSocket messages.
- [x] 2.2 Add visual styling/highlighting to the Stop-Loss UI cell when `closestTrigger` is "STOP_LOSS".
- [x] 2.3 Add visual styling/highlighting to the Target UI cell when `closestTrigger` is "TARGET".
