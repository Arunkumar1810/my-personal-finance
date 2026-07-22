## Why

Traders need to calculate a raw Estimated Time to Trigger (ETA) based on recent stock volatility to size positions or adjust triggers realistically. The volatility metric used is the 14-day Average True Range (ATR).

## What Changes

- Fetch and cache historical candle data for the 14-day Average True Range (ATR).
- Ensure ATR data is cached (e.g., daily or on startup) and NOT fetched per real-time tick to avoid rate limits.
- Calculate the raw ETA using the cached 14-day ATR based on the closest identified trigger.
- Display the raw ETA math on the frontend exactly as calculated, without filtering or capping it during extreme volatility.

## Capabilities

### New Capabilities
- `real-time-eta`: Calculates and displays the raw ETA for stock triggers based on the 14-day ATR without filtering or capping it.

### Modified Capabilities

## Impact

- **Backend / Data Fetching**: Need to implement caching mechanisms for 14-day ATR to prevent rate limit issues from per-tick fetching.
- **Backend / Math Logic**: Real-time trigger evaluation must include the ETA calculation using the cached ATR.
- **Frontend / UI**: The display logic must explicitly show the raw calculated ETA without any artificial capping or filtering during high volatility.
