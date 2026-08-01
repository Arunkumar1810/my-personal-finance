## ADDED Requirements

### Requirement: Kite Login Configuration UI
The system SHALL expose a "Settings" tab in the frontend layout. The Settings page MUST provide a "Kite Connect" button that requests the Kite OAuth login URL from the backend and redirects the user to it.

#### Scenario: User navigates to Settings
- **WHEN** the user navigates to `/settings`
- **THEN** they see a "Kite Connect" button

### Requirement: Kite OAuth Callback
The system SHALL provide a backend API endpoint (e.g., `/api/auth/callback`) to handle the Kite redirect. It MUST extract the `request_token`, generate a new Kite API session, cache the access token securely, and redirect the user back to the Settings page.

#### Scenario: Successful OAuth callback
- **WHEN** Kite redirects the user to the callback endpoint with a `request_token`
- **THEN** the backend exchanges the token for a session
- **THEN** saves the session to `.kite_access_token`
- **THEN** redirects the user back to `/settings`
