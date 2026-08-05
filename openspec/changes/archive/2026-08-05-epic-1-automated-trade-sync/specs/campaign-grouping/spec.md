## ADDED Requirements

### Requirement: Swing Campaign Creation
The system SHALL allow users to select multiple raw executions and group them into a Swing Campaign.

#### Scenario: Grouping related executions
- **WHEN** the user selects multiple raw executions and clicks "Create Campaign"
- **THEN** a new Swing Campaign entity is created linking those executions
- **AND** the selected executions are removed from the "Raw" unassigned view

### Requirement: Campaign Aggregation Calculations
The system SHALL calculate the aggregated entry price, exit price, and realized P/L for a Swing Campaign based on its linked executions.

#### Scenario: Viewing a grouped campaign
- **WHEN** a Swing Campaign is created or viewed
- **THEN** the system displays the aggregated entry price, exit price, and total realized P/L based on the linked executions
