## Why

As the sync engine for the Swing Trading Dashboard, we need to extract raw live price and volatility metrics from Moneycontrol. This data is essential for the AI math to evaluate swing trading opportunities.

## What Changes

- Implement a scraper function that takes a ticker string (e.g. `NSE:RELIANCE`) and returns live price and basic metrics from Moneycontrol.
- Implement a simple batching/caching wrapper for the scraper to ensure we don't spam the endpoint and hit rate limits.

## Capabilities

### New Capabilities
- `moneycontrol-extraction`: Scraping of current price and volatility metrics for Indian stock tickers from Moneycontrol, including rate limiting/caching logic.

### Modified Capabilities
None

## Impact

- Adds backend dependencies for web scraping.
- Adds caching mechanism for stock data in the Python backend.
