## ADDED Requirements

### Requirement: Sabotage Bad Setups
The system SHALL evaluate trading setups for high volatility or low edge and flag them accordingly to protect the trader.

#### Scenario: AI detects a highly volatile setup
- **WHEN** Gemini is evaluating a highly volatile or low-edge setup
- **THEN** it sets an `is_sabotaged: true` flag in the JSON response payload

### Requirement: Enforce Tight Stop-Loss on Sabotage
The system SHALL override standard math calculations to enforce a tight stop-loss when a setup is sabotaged.

#### Scenario: Setup is sabotaged
- **WHEN** the `is_sabotaged` flag is true
- **THEN** it overrides standard math to force a tight 0.5% Stop-Loss
