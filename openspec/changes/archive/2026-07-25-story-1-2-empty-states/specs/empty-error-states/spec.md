## ADDED Requirements

### Requirement: Empty Portfolio State
The dashboard SHALL display an empty state message when there are no active positions.

#### Scenario: 0 active positions
- **WHEN** the dashboard is loaded with a mock JSON file containing 0 active positions
- **THEN** the main view displays a centered "No Active Positions. Add a ticker..." message

### Requirement: Connection Lost State
The dashboard SHALL display a full-screen error overlay when the data fetch fails.

#### Scenario: JSON fetch fails
- **WHEN** the JSON data fetch fails or the network connection is lost
- **THEN** a full-screen "Connection Lost" overlay appears over the dashboard
