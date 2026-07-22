## Context

To calculate Estimated Time to Trigger (ETA) based on recent stock volatility, the system will use the 14-day Average True Range (ATR). Fetching the historical candle data per tick would result in rate limit issues and latency, requiring a caching mechanism for ATR.

## Goals / Non-Goals

**Goals:**
- Provide raw ETA using the 14-day ATR based on the closest identified trigger.
- Implement an ATR caching strategy that avoids rate limits (fetch daily/startup).
- Update the frontend to show the exact calculated ETA without capping.

**Non-Goals:**
- Applying caps, filters, or dampeners to the ETA during high volatility.
- Changing the underlying trigger detection algorithm itself, apart from adding ETA.

## Decisions

1. **ATR Data Caching Strategy:**
   - *Decision:* Use a background job or a daily cache refresh to fetch daily candle data and compute/cache the 14-day ATR for active symbols.
   - *Rationale:* Avoids rate-limiting the data provider by separating the historical data fetch from the high-frequency real-time tick processing.

2. **ETA Calculation Execution:**
   - *Decision:* The backend service that evaluates real-time triggers will read the cached ATR and compute the ETA using distance to trigger.
   - *Rationale:* Backend holds the triggers and receives the ticks, avoiding moving large datasets to the frontend.

3. **Frontend Display:**
   - *Decision:* Display the raw ETA exactly as calculated by the backend.
   - *Rationale:* To satisfy the strict requirement that extreme volatility should reflect the raw math without filtering or capping.

## Risks / Trade-offs

- **Stale ATR Data:** If the refresh fails, the ETA could be computed using stale volatility data. Mitigation: Alert on cache refresh failures.
- **UI Overflow:** Extreme volatility could produce very short or very long ETA values. Mitigation: Ensure the UI layout gracefully handles the string dimensions without modifying the value.
