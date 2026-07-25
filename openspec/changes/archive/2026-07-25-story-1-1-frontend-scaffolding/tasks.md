## 1. Setup and Configuration

- [x] 1.1 Configure TailwindCSS to default to dark mode and set `#0D0D12` as the background color.
- [x] 1.2 Import JetBrains Mono font and configure it in `tailwind.config.js` as the default monospace font.

## 2. Layout Components

- [x] 2.1 Create a new React component `AppLayout` to serve as the main wrapper.
- [x] 2.2 Implement a fixed left sidebar inside `AppLayout`.

## 3. Navigation

- [x] 3.1 Setup `react-router-dom` in the main application entry point (`App.jsx` or similar).
- [x] 3.2 Add navigation links to the sidebar for "Active Trades" (`/`), "Watchlist" (`/watchlist`), and "History" (`/history`).
- [x] 3.3 Ensure the `AppLayout` renders an `<Outlet />` for the route content area.
