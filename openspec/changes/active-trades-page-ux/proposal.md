## Why

The Active Trades page needs a clear, utilitarian UX to monitor trades. The current application lacks a dense, data-heavy dashboard tailored for desktop displays that allows rapid scanning of numbers and immediate visual feedback on trade progress without marketing flair.

## What Changes

- Implement a desktop-first Active Trades page with high data density.
- Divide the page into three primary sections: Active Holdings, Pending Buy GTT Orders, and Orphaned Sell GTT Orders.
- Implement an expandable Holdings table that reveals nested Sell GTT orders.
- Implement a GttProgressBar component for visual tracking of trade status (Stoploss, Buy Price, Target).
- Integrate colorblind-first accessibility (using textures/directional arrows instead of relying solely on red/green).
- Introduce skeleton loaders for data fetching.

## Capabilities

### New Capabilities
- `active-trades-page`: The primary layout and view for monitoring active trades, holdings, and GTT orders.
- `gtt-progress-bar`: A read-only visual progress indicator displaying Stoploss, Buy Price, Target, and Current Price.

### Modified Capabilities
- `frontend-layout`: Accommodate the new dense Active Trades dashboard sections.
- `gtt-dashboard`: (If this existing capability overlaps, it may need to be updated to match the new dense table and nested expansion UX). I'll list it here for potential updates to its UX constraints.

## Impact

- Frontend React components and routing (Active Trades page).
- Tailwind v4 styles (adding specific dense table and progress bar styles).
- Will require integrating with existing data feeds for Holdings and GTT orders.
