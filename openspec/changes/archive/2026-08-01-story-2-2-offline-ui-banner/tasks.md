## 1. Global State & API Parsing

- [x] 1.1 Update the API fetching utility or React hooks that fetch `/api/holdings` to extract the `fallback` flag from the JSON response envelope.
- [x] 1.2 Create or update a global React Context (e.g., `FallbackContext`) to broadcast the `isFallback` boolean state across the SPA.
- [x] 1.3 Wrap the main dashboard or application entry point with the new Context Provider, defaulting `isFallback` to `false`.

## 2. Offline Banner UI

- [x] 2.1 Create an `OfflineWarningBanner` component that displays "Live Market Data is Unavailable" prominently.
- [x] 2.2 Integrate the banner at the top of the dashboard layout, conditionally rendering it only when `isFallback` is true.

## 3. Action Blocking & Trade Modals

- [x] 3.1 Update the main portfolio table/list to consume `isFallback`. If true, render the "Buy", "Sell", and "Modify" buttons as disabled with a descriptive tooltip.
- [x] 3.2 Update the Trade Modal component to consume `isFallback`. If the modal is already open and `isFallback` becomes true, immediately disable the submit button and show a warning message inside the modal.
- [x] 3.3 Add logic in the trade submission handler to explicitly abort the submission if `isFallback` is true, preventing synthetic queueing.

## 4. Pending Orders Visualization

- [x] 4.1 Update the "Pending Orders" list component to consume `isFallback`.
- [x] 4.2 Apply a grayed-out or strikethrough CSS class to pending orders when `isFallback` is true, and label them as "Suspended (Offline)".
