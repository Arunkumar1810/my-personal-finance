## Why

Traders need clear feedback when their portfolio is empty or when the dashboard is disconnected. Without explicit empty and error states, users may stare at a blank screen wondering if the application is broken or if they simply have no active positions.

## What Changes

- Add an empty state UI component for the main view that displays a centered "No Active Positions. Add a ticker..." message when there are 0 active positions.
- Add an error state full-screen overlay that displays a "Connection Lost" message if the JSON data fetch fails.

## Capabilities

### New Capabilities
- `empty-error-states`: Provides clear user feedback when there are no active positions or when the data connection is lost.

### Modified Capabilities


## Impact

- Frontend React application main view (needs to conditionalize rendering based on positions count).
- Data fetching logic in the frontend (needs to catch fetch errors and trigger the connection lost overlay).
