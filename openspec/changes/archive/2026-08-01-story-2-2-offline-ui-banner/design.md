## Context

The backend has implemented a circuit breaker and SQLite fallback to ensure the portfolio dashboard remains highly available even if the external Kite API is down. When this fallback is triggered, the backend API includes a `fallback: true` flag in its JSON response. Currently, the React SPA does not consume this flag, so users are unaware they are viewing stale data and can still attempt to execute trades which will fail or get unsafely queued.

## Goals / Non-Goals

**Goals:**
- Provide clear visual indication on the dashboard when `fallback: true` is received.
- Prevent all trade interactions (Buy/Sell/Modify) when in fallback mode.
- Prevent form submission for trade modals that might have been opened before the connection dropped.
- Clearly mark pending orders as suspended.

**Non-Goals:**
- Implementing local offline trade queueing for later execution (explicitly blocked by NFR3).
- Changes to backend APIs.

## Decisions

- **Global Fallback State:** We will extract the `fallback: true` flag from the API response payload in our main data fetching hook/layer and store it in a React Context or a global state (e.g., Redux/Zustand or simply pass it down if state is simple). This ensures any component (banner, buttons, modals) can react to the offline state.
- **Component-Level Action Blocking:** Instead of just hiding buttons, we will render them as disabled with a tooltip explaining that actions are disabled during a live data outage.
- **Pending Orders Visualization:** We will add CSS classes to gray out or apply a strikethrough/suspended visual treatment to orders in the "Pending" list when the fallback flag is active.

## Risks / Trade-offs

- **Risk:** Users might leave a trade modal open, the connection drops, and they submit the trade.
  **Mitigation:** The trade submission handler and the submit button within the modal must re-evaluate the global fallback state before allowing the action to proceed.
- **Trade-off:** Passing the fallback state down to every interactive component might require some prop drilling if we don't use a context. We'll opt for a Context Provider to cleanly broadcast the `isFallback` state to deep components like buttons and modals.
