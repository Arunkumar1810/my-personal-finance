## Context

Traders currently see their GTT orders but without a quick visual cue on which trigger (Stop-Loss or Target) is closest to being hit based on the current market price. The backend already pushes GTT order data via WebSocket on price ticks.

## Goals / Non-Goals

**Goals:**
- Provide real-time visual feedback on which outcome is more imminent.
- Keep the frontend logic simple by doing calculations on the backend.

**Non-Goals:**
- Predicting trigger execution time.
- Modifying order behavior based on proximity.

## Decisions

- **Calculate Proximity on Backend:** The backend will calculate the distance between the current market price and both triggers (Stop-Loss and Target) for each active GTT order on every relevant market price tick. 
  - *Rationale:* Keeps the frontend dumb and ensures consistent logic if multiple frontends are built. It also minimizes frontend computation on rapid price ticks.
- **WebSocket Payload Addition:** The backend will include a new field `closestTrigger` (values: "STOP_LOSS", "TARGET", or null) in the GTT order WebSocket payload.
  - *Rationale:* Simplifies the contract.

## Risks / Trade-offs

- **Risk:** High market volatility could cause the `closestTrigger` to flip rapidly, causing UI flicker.
  - *Mitigation:* The frontend can apply a small visual debounce or transition effect to make rapid changes less jarring, though the backend will report the exact state per tick.
