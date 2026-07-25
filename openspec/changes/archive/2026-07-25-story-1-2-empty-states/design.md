## Context
Currently, the trading dashboard may show a blank screen if the portfolio JSON is empty (0 positions) or if the fetch fails. This leads to a poor user experience as the user cannot distinguish between an empty portfolio and a broken application.

## Goals / Non-Goals

**Goals:**
- Provide a clear message ("No Active Positions. Add a ticker...") when the portfolio is successfully fetched but contains no positions.
- Provide a full-screen overlay ("Connection Lost") if the data fetch fails entirely.

**Non-Goals:**
- Implementing the actual ticker addition functionality.
- Implementing automatic retries for data fetching.

## Decisions
- **Empty State**: We will conditionally render the main view's content based on `positions.length === 0`.
- **Error State**: We will use a try-catch block in the data fetching logic to set an `error` state variable. If true, a full-screen overlay component will render.

## Risks / Trade-offs
- **Risk**: Flash of error or empty state during initial load. 
  **Mitigation**: Ensure a `loading` state is properly handled before evaluating empty/error conditions.
