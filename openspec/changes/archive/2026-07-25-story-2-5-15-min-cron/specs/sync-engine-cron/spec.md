## ADDED Requirements

### Requirement: Autonomous 15-minute sync execution
The sync engine SHALL execute autonomously on a 15-minute schedule to identify and process pending tickers.

#### Scenario: Scheduled execution triggers processing
- **WHEN** the 15-minute interval is reached
- **THEN** the engine finds all rows in Google Sheets marked "Awaiting 15-min Sync"
- **THEN** it executes the Moneycontrol and Gemini data fetching for each ticker
- **THEN** it writes the updated JSON payload back to the sheet for each successfully processed ticker

### Requirement: Explicit failure marking
The sync engine SHALL explicitly mark tickers that fail processing so they do not get stuck in a continuous retry loop.

#### Scenario: Data fetching fails for a ticker
- **WHEN** Moneycontrol or Gemini data fetching fails for a ticker marked "Awaiting 15-min Sync"
- **THEN** the engine writes `SYNC_FAILED` to the status or payload column for that specific ticker in the sheet
