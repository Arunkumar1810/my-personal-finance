# Capability: Broker Integration

## Purpose
TBD: Integrating with the broker for secure API key management and on-demand trade syncing.

## Requirements

### Requirement: Secure Broker API Key Management
The system SHALL allow users to input, save, and securely store broker API credentials, and verify the connection.

#### Scenario: Valid credentials submitted
- **WHEN** user submits valid Broker API keys
- **THEN** keys are securely stored
- **AND** the system successfully verifies the connection via a test API call
- **AND** a "Connected" status is displayed

### Requirement: On-Demand Trade Sync
The system SHALL fetch new trade executions from the broker when triggered by the user and store them locally.

#### Scenario: User triggers sync with new executions
- **WHEN** the user clicks "Sync Trades" and a valid connection exists
- **THEN** the system fetches all executions since the last sync timestamp
- **AND** persists them as Raw Executions with ticker, price, quantity, timestamp, and side
- **AND** displays them in the Raw Executions list
