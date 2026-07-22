## ADDED Requirements

### Requirement: Cache portfolio holdings locally
The system MUST cache the user's current portfolio holdings into a local SQLite database after authenticating with Kite.

#### Scenario: Initial holdings fetch
- **WHEN** the backend authenticates successfully and the SQLite cache is empty
- **THEN** it fetches holdings from the Kite API and saves them into the local SQLite database

#### Scenario: Cached holdings usage
- **WHEN** the backend receives a request for holdings data
- **THEN** it serves the data from the SQLite database to avoid Kite rate limits
