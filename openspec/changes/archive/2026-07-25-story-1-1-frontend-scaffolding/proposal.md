## Why

We need a foundational frontend layout to serve as the base for the Swing Trading Dashboard. This provides the core navigation and aesthetic structure (dark-mode theme, sidebar) that all other features will build upon, ensuring a consistent user experience from the start.

## What Changes

- Initialize a foundational layout for the React/Vite app.
- Implement a dark-mode theme (`#0D0D12` background).
- Create a fixed left sidebar navigation with links to Active Trades, Watchlist, and History.
- Load and configure JetBrains Mono as the monospace font using TailwindCSS.

## Capabilities

### New Capabilities
- `frontend-layout`: Establishes the core UI layout, dark-mode styling, typography, and sidebar navigation structure for the application.

### Modified Capabilities
- (None)

## Impact

- Frontend application entry point and styling configuration (Tailwind setup, index.css).
- New React components for the main layout and sidebar navigation.
- No impact on the backend Sync Engine or Google Sheets layer at this stage.
