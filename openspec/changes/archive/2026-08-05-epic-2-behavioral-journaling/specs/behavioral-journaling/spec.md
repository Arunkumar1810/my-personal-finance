## ADDED Requirements

### Requirement: Categorical Trade Tagging
The system SHALL allow users to tag a Swing Campaign with a Strategy (e.g., Breakout, Pullback) and a Sell Reason (e.g., Stoploss Triggered, Target Reached).

#### Scenario: Tagging a campaign
- **WHEN** a user views a campaign details page and selects a Strategy and Sell Reason
- **THEN** the tags are saved to the campaign entity
- **AND** displayed as visual pills on the campaign header

### Requirement: Emotional State and Regret Logging
The system SHALL allow users to log their Emotional State (FOMO, Anxious, Confident, Neutral) and a Regret Metric (1-5) for a Swing Campaign.

#### Scenario: Logging emotion and regret
- **WHEN** the user selects an Emotional State and sets a Regret Metric on a campaign
- **THEN** the structured data is saved to the campaign entity
- **AND** displayed visually on the campaign summary

### Requirement: Rationale Journal Entry
The system SHALL provide a free-form text area for users to log the qualitative rationale for a campaign, supporting Markdown.

#### Scenario: Writing rationale
- **WHEN** the user types into the Rationale text area and saves
- **THEN** the text is stored in the database
- **AND** displayed in a readable markdown format on the campaign view
