# AI Post-Mortem

## Purpose
TBD

## Requirements

### Requirement: AI Post-Mortem Request
The system SHALL provide a way to request an AI-generated post-mortem for a completed Swing Campaign, sending its execution data and rationale to the AI service.

#### Scenario: Running an AI Post-Mortem
- **WHEN** the user clicks "Run AI Post-Mortem" on a completed Swing Campaign
- **THEN** the system generates a prompt including entry/exit points and user rationale
- **AND** displays the AI's objective critique of the trade execution
