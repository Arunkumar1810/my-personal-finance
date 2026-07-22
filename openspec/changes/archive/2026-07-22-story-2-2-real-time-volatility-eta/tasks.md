## 1. Backend: ATR Data Caching

- [x] 1.1 Implement daily or startup background job to fetch historical candle data for active symbols.
- [x] 1.2 Calculate the 14-day Average True Range (ATR) based on the fetched candle data.
- [x] 1.3 Store the computed 14-day ATR values in cache (e.g., in-memory or Redis) for quick access.

## 2. Backend: ETA Calculation

- [x] 2.1 Update the real-time trigger evaluation logic to retrieve the cached 14-day ATR.
- [x] 2.2 Implement the ETA calculation math using the distance to the closest identified trigger and the cached ATR.
- [x] 2.3 Include the raw calculated ETA in the data payload sent to the frontend.

## 3. Frontend: Raw ETA Display

- [x] 3.1 Update the UI components to parse the ETA from the backend payload.
- [x] 3.2 Display the ETA exactly as calculated without applying any logic to cap, filter, or dampen the value.
- [x] 3.3 Verify that the UI layout can gracefully handle extremely small or large ETA string lengths caused by extreme volatility, without truncating the value itself.
