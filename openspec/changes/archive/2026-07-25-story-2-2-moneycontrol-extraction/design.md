## Context

The Sync Engine (Python backend) of the Swing Trading Dashboard requires live stock prices and basic volatility metrics for Indian stocks to feed into its AI signal generation logic. Moneycontrol is chosen as the data source for these metrics.

## Goals / Non-Goals

**Goals:**
- Provide a scraper function that takes a ticker symbol (e.g., `NSE:RELIANCE`) and returns current price and metrics.
- Implement a basic caching/batching wrapper to prevent rate-limiting and minimize network calls to Moneycontrol.

**Non-Goals:**
- Extracting deep historical data or complex fundamental data (only live price and basic volatility metrics).
- Building a complex distributed scraping infrastructure; a simple synchronous or basic asynchronous script is sufficient.

## Decisions

- **Scraping Tool**: Use standard Python libraries like `requests` and `BeautifulSoup` (or `lxml`) for parsing HTML. They are lightweight and sufficient for basic scraping.
- **Caching Mechanism**: Implement a simple in-memory or file-based cache with a configurable Time-To-Live (TTL) (e.g., 15 minutes) for the extracted data. This ensures we don't spam the Moneycontrol servers on rapid, repeated evaluations.
- **Ticker Mapping**: The scraper will need a basic mapping or search logic to translate standard dashboard tickers (e.g., `NSE:RELIANCE`) into the specific URL structure used by Moneycontrol.

## Risks / Trade-offs

- **Risk: HTML structure changes on Moneycontrol.**
  - **Mitigation:** Keep the CSS selectors/parsing logic as robust as possible and implement clear error handling to alert when parsing fails rather than returning silent garbage data.
- **Risk: IP Blocking / Rate Limiting by Moneycontrol.**
  - **Mitigation:** Employ standard `User-Agent` headers. The caching wrapper is the primary defense. Avoid aggressive concurrent scraping without delays.
