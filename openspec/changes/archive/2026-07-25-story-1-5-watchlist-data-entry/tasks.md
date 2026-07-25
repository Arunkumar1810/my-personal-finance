## 1. Mock State Updates

- [x] 1.1 Update mock state structure to track `pendingTickers` alongside standard watchlist items.
- [x] 1.2 Implement the state transition to accept a new ticker string and append it to `pendingTickers`.

## 2. UI Implementation

- [x] 2.1 Create a simple `TickerInputForm` component with a text input and submit button.
- [x] 2.2 Wire the form submission to validate non-empty input and call the mock state update function.
- [x] 2.3 Integrate `TickerInputForm` into the Watchlist Queue UI component.
- [x] 2.4 Update Watchlist Queue rendering to include rows for `pendingTickers`.
- [x] 2.5 Style pending ticker rows with a Tailwind pulse skeleton loader to indicate "Awaiting 15-min Sync" state.
