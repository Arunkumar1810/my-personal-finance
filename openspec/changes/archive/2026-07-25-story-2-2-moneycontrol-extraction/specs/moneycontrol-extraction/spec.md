## ADDED Requirements

### Requirement: Extract live price and metrics
The system SHALL extract live price and basic volatility metrics from Moneycontrol for a given Indian stock ticker.

#### Scenario: Valid ticker extraction
- **WHEN** the sync engine requests data for a valid ticker like `NSE:RELIANCE`
- **THEN** it successfully returns the current price and basic metrics.

### Requirement: Caching and rate limiting
The system SHALL implement a caching mechanism for the scraped data to prevent hitting the endpoint excessively.

#### Scenario: Repeated requests within TTL
- **WHEN** the sync engine requests data for the same ticker multiple times within the cache Time-To-Live (TTL)
- **THEN** it returns the cached data without making a new network request to Moneycontrol.
