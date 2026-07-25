## ADDED Requirements

### Requirement: Python service authenticates with Google Sheets
The backend script MUST authenticate with the Google Sheets API using a Service Account JSON credentials file.

#### Scenario: Successful Authentication
- **WHEN** the Python script is executed with valid service account credentials
- **THEN** it successfully establishes a connection to the Google Sheets API without raising an authentication error

### Requirement: Python service reads from Google Sheets
The backend script MUST be able to read data from a specified Google Sheet.

#### Scenario: Read Ticker List
- **WHEN** the script connects to the designated Dashboard Google Sheet
- **THEN** it successfully fetches the list of tickers or data from the 'Pending Watchlist' or equivalent sheet range

### Requirement: Python service writes to Google Sheets
The backend script MUST be able to write data back to a specified Google Sheet.

#### Scenario: Write Debug Output
- **WHEN** the script has read data successfully
- **THEN** it writes a test/debug string back to a specific column or cell to prove write access
