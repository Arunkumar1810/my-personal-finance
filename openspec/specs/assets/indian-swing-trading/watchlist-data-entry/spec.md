## Purpose
TBD - Spec created from change story-1-5-watchlist-data-entry.

## Requirements

### Requirement: Ticker Submission
The system SHALL provide a form in the Watchlist Queue to submit new ticker symbols.

#### Scenario: Successful ticker submission
- **WHEN** the user enters a valid ticker symbol and submits the form
- **THEN** the ticker is added to the mock state
- **THEN** the queue UI updates to display the new ticker row
- **THEN** the new row displays an "Awaiting 15-min Sync" skeleton loader state

### Requirement: Input Validation
The system SHALL NOT allow submission of empty tickers.

#### Scenario: Submitting empty ticker
- **WHEN** the user attempts to submit an empty form
- **THEN** the submission is ignored and no state changes occur
