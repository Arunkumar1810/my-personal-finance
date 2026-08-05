## ADDED Requirements

### Requirement: Undocumented Web Login
The system SHALL authenticate with the Zerodha web platform using an undocumented login flow to acquire a valid `kf_session` and `enctoken`.

#### Scenario: Successful web login
- **WHEN** the system receives valid user credentials (User ID, Password, TOTP)
- **THEN** it executes HTTP requests simulating the web login flow
- **AND** returns the resulting `kf_session` and `enctoken` cookies for subsequent Console API calls

#### Scenario: Invalid credentials provided
- **WHEN** the system receives invalid credentials or an expired TOTP
- **THEN** the login flow fails gracefully
- **AND** returns a structured error indicating authentication failure
