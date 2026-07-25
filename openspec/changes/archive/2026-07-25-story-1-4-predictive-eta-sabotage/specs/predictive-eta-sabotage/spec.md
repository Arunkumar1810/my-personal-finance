## ADDED Requirements

### Requirement: Predictive ETA Visualization
The system SHALL display a horizontal progress bar for each active trade that visualizes the current price's distance relative to the Entry, Target, and Stop-Loss prices.

#### Scenario: Trade progressing towards target
- **WHEN** the current price is between the Entry and Target prices
- **THEN** the system displays a green horizontal progress bar indicating the percentage distance covered towards the Target

#### Scenario: Trade progressing towards stop-loss
- **WHEN** the current price is between the Entry and Stop-Loss prices
- **THEN** the system displays a red horizontal progress bar indicating the percentage distance covered towards the Stop-Loss

### Requirement: AI Sabotage Warning
The system SHALL visually alert the user if a trade is marked as "Sabotaged" by the AI.

#### Scenario: Trade is marked as sabotaged
- **WHEN** the trade data contains an `isSabotaged` flag set to true
- **THEN** the corresponding row in the trading table pulses with a danger color (`#FF1744`)

### Requirement: Manual Override for Sabotage Warning
The system SHALL provide a manual mechanism for the user to dismiss the AI Sabotage warning.

#### Scenario: User dismisses the warning
- **WHEN** the user clicks the "Override" button on a sabotaged trade
- **THEN** the system removes the "Sabotaged" warning state (pulsing and color) from the trade row
