## Context

The "Swing Trading Dashboard" currently has a Watchlist Queue interface, but it lacks a way to input new tickers for evaluation. We need a way for the user to submit new tickers so that they appear in the UI and are eventually processed by the backend during its 15-minute sync.

## Goals / Non-Goals

**Goals:**
- Provide a simple form for users to enter a ticker symbol in the Watchlist Queue.
- Update the mock state layer to store the pending tickers locally.
- Render pending tickers in the UI with an "Awaiting 15-min Sync" state (skeleton loader).

**Non-Goals:**
- Actual integration with Google Sheets or the backend sync engine (this is just the mock state and UI).
- Real-time stock validation (basic non-empty string validation is enough for now).

## Decisions

- **Form Placement**: Placed inline at the top or bottom of the Watchlist Queue to make it easily accessible.
- **State Management**: We will update the shared ledger mock state in React to keep a list of `pendingTickers` or simply append to the current watchlist with a `status: 'pending'` flag.
- **Skeleton Loader**: We will use a Tailwind CSS pulse animation to represent the pending state in the queue to maintain visual consistency with the "Awaiting 15-min Sync" concept.

## Risks / Trade-offs

- **Risk**: User enters invalid ticker. -> **Mitigation**: Backend will handle invalid ticker resolution in a future story; for now, we just accept non-empty input.
