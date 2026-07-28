## ADDED Requirements

### Requirement: Swing-Trading Service 15-minute background sync
The Swing-Trading Service MUST run a scheduled background job every 15 minutes to fetch fresh data from Kite and update its local SQLite database.

#### Scenario: 15-minute interval trigger
- **WHEN** a 15-minute interval has passed
- **THEN** the scheduled job triggers in the Swing-Trading Service
- **THEN** it fetches fresh data from Kite
- **THEN** it updates the local SQLite database
