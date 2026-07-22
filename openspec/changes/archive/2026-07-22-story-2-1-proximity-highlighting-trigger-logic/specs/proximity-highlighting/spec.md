## ADDED Requirements

### Requirement: Calculate closest trigger
The backend SHALL calculate which trigger (Stop-Loss or Target) is closer to the current market price and include this information in the WebSocket payload for GTT orders.

#### Scenario: Stop-Loss is closer
- **WHEN** the absolute difference between the current market price and the Stop-Loss trigger price is less than the absolute difference between the current market price and the Target trigger price
- **THEN** the backend sets the `closestTrigger` field to "STOP_LOSS" in the WebSocket payload

#### Scenario: Target is closer
- **WHEN** the absolute difference between the current market price and the Target trigger price is less than the absolute difference between the current market price and the Stop-Loss trigger price
- **THEN** the backend sets the `closestTrigger` field to "TARGET" in the WebSocket payload

### Requirement: Visual highlighting of closest trigger
The frontend SHALL visually highlight the trigger identified as closest by the backend in the GTT order table UI.

#### Scenario: Highlighting Stop-Loss
- **WHEN** the frontend receives a WebSocket payload with `closestTrigger` set to "STOP_LOSS"
- **THEN** the UI visually highlights the Stop-Loss cell for that order

#### Scenario: Highlighting Target
- **WHEN** the frontend receives a WebSocket payload with `closestTrigger` set to "TARGET"
- **THEN** the UI visually highlights the Target cell for that order
