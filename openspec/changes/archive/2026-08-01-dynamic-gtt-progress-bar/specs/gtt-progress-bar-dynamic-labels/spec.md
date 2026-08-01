## ADDED Requirements

### Requirement: Always Visible Dynamic Pricing Labels
The system SHALL display the exact numerical values for Stop Loss (SL), Buy Price, Current Market Price (CMP), and Target directly on or adjacent to the GTT progress bar. These labels MUST be permanently visible and dynamically reflect the real-time data passed to the component.

#### Scenario: Rendering the GTT Progress Bar
- **WHEN** the GTT progress bar is rendered for an active holding
- **THEN** it displays text labels for SL, Buy, CMP, and Target at their corresponding relative positions on the progress track.

#### Scenario: Persistent Visibility
- **WHEN** the user views the Active Trades dashboard
- **THEN** the labels for SL, Buy, CMP, and Target are visible without requiring hover interactions.
