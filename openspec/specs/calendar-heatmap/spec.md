# Capability: calendar-heatmap

## Purpose
TBD - Provides a calendar visualization of daily net P/L for swing trading.

## Requirements

### Requirement: Calendar Heatmap rendering
The system SHALL render a calendar view for the current month overlaying daily net P/L with color intensity.

#### Scenario: Visualizing daily consistency
- **WHEN** the user views the Dashboard
- **THEN** a monthly calendar is displayed
- **AND** days with net profit are colored green (intensity scaling with profit)
- **AND** days with net loss are colored red (intensity scaling with loss)
- **AND** hovering over a date reveals the exact net P/L for that day
