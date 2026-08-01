## MODIFIED Requirements

### Requirement: Stateless Kite Service Adapter with Dev Mode
The system SHALL provide a stateless adapter for the Kite Service that handles API requests. When the `X-Dev-Mode: true` header is present in the request OR when Kite authentication fails (due to an expired or missing token), the adapter MUST fall back and immediately return deterministic mock JSON data matching the Kite schema for the following endpoints: `holdings`, `positions`, `get_gtts`, and `historical_data`. The adapter MUST dynamically re-authenticate or pick up new cached tokens without requiring a process restart, switching back to production mode dynamically on the next request. The adapter MUST make zero outbound network calls to the real Kite API when returning mock data.

#### Scenario: Production mode standard request
- **WHEN** the Kite Service adapter receives a request without the `X-Dev-Mode: true` header AND a valid Kite session exists
- **THEN** it routes the request to the live Kite API

#### Scenario: Dev mode request with mock data
- **WHEN** the Kite Service adapter receives a request with the `X-Dev-Mode: true` header
- **THEN** it returns deterministic mock JSON data matching the Kite schema
- **THEN** it makes zero outbound network calls to the real Kite API

#### Scenario: Fallback to mock data on auth failure
- **WHEN** Kite authentication fails due to invalid or expired tokens
- **THEN** it automatically returns the deterministic mock JSON data instead of crashing
