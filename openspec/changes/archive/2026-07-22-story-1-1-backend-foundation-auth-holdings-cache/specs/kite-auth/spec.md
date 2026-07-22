## ADDED Requirements

### Requirement: Authenticate with Kite API
The backend MUST authenticate with the Kite API using API credentials securely stored in a `.env` file.

#### Scenario: Successful authentication
- **WHEN** the FastAPI backend starts up and valid credentials are in `.env`
- **THEN** it successfully connects to the Kite API without errors

#### Scenario: Missing credentials
- **WHEN** the `.env` file is missing required Kite API credentials
- **THEN** the backend startup SHALL fail with a clear configuration error
