# Capability: Goals

## Purpose
The Goals capability tracks milestone financial planning, target funding progress, inflation-adjusted projections, and monthly savings allocation run-rates across life objectives.

## Requirements

### Requirement: Life Milestones Goal Management
The system SHALL manage distinct life milestone goals across core categories including Retirement, Children's Higher Education, Home Purchase, and Emergency Corpus.

#### Scenario: User configures milestone goal
- **WHEN** the user creates or updates a financial goal
- **THEN** the system stores the goal title, category, target monetary amount, target completion year, and allocated monthly contribution.

#### Scenario: Priority classification
- **WHEN** goals are registered in the system
- **THEN** each goal is prioritized (High, Medium, Low) to govern capital allocation during funding shortages.

### Requirement: Goal Funding Progress & Completion Timeline
The system SHALL calculate the funding completion percentage and estimate the projected completion date based on current allocated corpus and growth assumptions.

#### Scenario: Goal on track
- **WHEN** current allocated corpus plus projected compounding meets or exceeds the target amount by the target year
- **THEN** the goal status displays "On Track" with a progress percentage
- **AND** displays the estimated completion year matching or beating the target.

#### Scenario: Goal lagging target
- **WHEN** the projected future value of current savings falls short of the target amount by the target deadline
- **THEN** the goal status displays "Underfunded"
- **AND** quantifies the projected deficit in nominal rupee terms.

### Requirement: Monthly SIP Run-Rate & Shortfall Analytics
The system SHALL calculate the required monthly investment run-rate for each goal and flag overall monthly surplus or shortfall.

#### Scenario: Required monthly investment calculation
- **WHEN** the user evaluates a goal's funding requirements
- **THEN** the system calculates the Required Monthly SIP using the formula: future target, remaining duration in months, and assumed annual CAGR
- **AND** compares the required SIP against the actual monthly amount currently allocated.

#### Scenario: Monthly shortfall alert
- **WHEN** actual allocated monthly savings are less than the required monthly run-rate
- **THEN** the system highlights a "Shortfall" badge indicating the additional monthly amount needed to achieve the goal on time.
