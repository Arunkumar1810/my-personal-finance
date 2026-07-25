## 1. Setup & Configuration

- [x] 1.1 Add required web scraping dependencies (`requests`, `beautifulsoup4`) to Python backend requirements if not already present.
- [x] 1.2 Setup base file structure for data extraction module.

## 2. Core Implementation

- [x] 2.1 Implement base scraper function to fetch HTML content for a Moneycontrol ticker page.
- [x] 2.2 Implement HTML parsing to extract the current live price.
- [x] 2.3 Implement HTML parsing to extract basic volatility metrics (e.g. 52-week high/low).

## 3. Caching & Wrapper

- [x] 3.1 Implement a caching wrapper/decorator for the scraper function with a configurable TTL (e.g., 15 mins).
- [x] 3.2 Write a test script or unit tests to verify the cache correctly avoids hitting the network on rapid calls.
