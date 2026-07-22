## ADDED Requirements

### Requirement: ETA Calculation via ATR Caching
The system SHALL calculate the Estimated Time to Trigger (ETA) using the 14-day Average True Range (ATR). The system MUST cache the historical candle data for the ATR (e.g., daily or on startup) and NOT fetch it per real-time tick to avoid rate limits.

#### Scenario: Real-time trigger evaluation with cached ATR
- **WHEN** the backend identifies the closest trigger and evaluates ETA
- **THEN** it MUST use the pre-fetched cached 14-day ATR without making new network requests for historical data

### Requirement: Raw ETA Display
The frontend SHALL display the raw ETA exactly as calculated by the backend. It MUST NOT apply capping, filtering, or dampeners to the displayed value, even during periods of extreme volatility.

#### Scenario: Displaying extreme volatility ETA
- **WHEN** the volatility is extreme and the raw ETA is unusually small or large
- **THEN** the frontend MUST display the raw calculated ETA math without filtering or capping it
