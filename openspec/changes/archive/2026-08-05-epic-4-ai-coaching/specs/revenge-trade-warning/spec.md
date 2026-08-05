## ADDED Requirements

### Requirement: Revenge Trade Detection
The system SHALL detect rapid successive trade entries following a closed loss and trigger a warning.

#### Scenario: Triggering Revenge Trade Warning
- **WHEN** the user closes a Swing Campaign with a net loss
- **AND** opens a new trade execution within 30 minutes
- **THEN** the Dashboard displays a prominent visual warning recommending a cool-down period
