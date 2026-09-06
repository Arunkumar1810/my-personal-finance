# Capability: Offline Mode

## Purpose
Provides offline fallback indicators and trade submission safety controls when upstream market data connections are unavailable.

## Requirements

### Requirement: Offline Fallback & Order Submission Protection
The system MUST provide visual fallback indicators and block trade execution when portfolio data is served from local cache due to an upstream API outage.

#### Scenario: Fallback flag detected in response
- **WHEN** the system operates with fallback mode active (`fallback: true`)
- **THEN** a prominent warning banner indicates "Live Market Data is Unavailable"
- **AND** all "Buy", "Sell", and "Modify" actions are disabled to prevent synthetic trade queueing
- **AND** any existing pending orders are visually marked as suspended.
