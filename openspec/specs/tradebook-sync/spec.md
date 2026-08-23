# Capability: tradebook-sync

## Purpose
TBD

## Requirements

### Requirement: Console Tradebook API Client
The system SHALL provide a backend function `fetch_and_parse_tradebook(enctoken)` to communicate with the Zerodha Console Tradebook API.

#### Scenario: Fetching tradebook data
- **WHEN** provided with a valid enctoken
- **THEN** it fetches historical trade records and parses them into standard trade objects

### Requirement: Tradebook Sync Endpoint
The system SHALL provide an API endpoint `POST /api/console/tradebook-sync` to trigger the tradebook sync process.

#### Scenario: Successful sync request
- **WHEN** a POST request is made to the sync endpoint
- **THEN** it triggers the Console Tradebook API client and returns a success response upon completion

### Requirement: Frontend Sync Button
The system SHALL display a "Sync Tradebook" button on the `HistoryPage.tsx`.

#### Scenario: User triggers sync
- **WHEN** the user clicks the "Sync Tradebook" button
- **THEN** it calls the sync API endpoint and notifies the user of the result
