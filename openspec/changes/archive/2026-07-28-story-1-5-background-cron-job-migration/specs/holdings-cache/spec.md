## MODIFIED Requirements

### Requirement: Cache portfolio holdings locally
The system MUST cache the user's current portfolio holdings into a local SQLite database after authenticating with Kite. The legacy Monolith environment MUST NOT run background jobs for this purpose and MUST NOT contain a `holdings_cache.db`.

#### Scenario: Initial holdings fetch
- **WHEN** the backend authenticates successfully and the SQLite cache is empty
- **THEN** it fetches holdings from the Kite API and saves them into the local SQLite database

#### Scenario: Cached holdings usage
- **WHEN** the backend receives a request for holdings data
- **THEN** it serves the data from the SQLite database to avoid Kite rate limits

#### Scenario: Legacy Monolith environment clean-up
- **WHEN** running in the Monolith environment
- **THEN** no background sync jobs run
- **THEN** the legacy `holdings_cache.db` is completely deleted to prevent split-brain issues
