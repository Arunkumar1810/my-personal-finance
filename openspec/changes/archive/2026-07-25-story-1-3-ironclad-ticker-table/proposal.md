## Why

As a trader, I need a quick and dense view to scan my entire portfolio across different devices (desktop and mobile) to make fast trading decisions.

## What Changes

- Add a dense data table to display positions for desktop viewing.
- The ticker column will include a company logo inside a white disc, alongside the ticker symbol and a 1-sentence summary.
- Implement responsive design so the table collapses into stacked cards on mobile devices.

## Capabilities

### New Capabilities
- `ticker-data-table`: A dense, responsive data table for displaying trader positions, rendering as stacked cards on mobile.
- `ticker-cell`: A custom table cell component that displays a company logo (in a white disc), the ticker symbol, and a 1-sentence summary.

### Modified Capabilities
- None

## Impact

- Frontend: New React components for the data table, custom cells, and mobile responsive cards. Uses TailwindCSS for styling and layout.
- Data: Depends on populated mock data being available in the shared ledger / state layer to render the positions.
