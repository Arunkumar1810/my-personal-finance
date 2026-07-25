## Context

The Swing Trading Dashboard needs a foundational layout to establish its core user interface. The frontend is built with React, Vite, and TailwindCSS. It's essential to set up the dark mode theme, typography (JetBrains Mono), and sidebar navigation as the base for all subsequent features like Active Trades and Watchlist.

## Goals / Non-Goals

**Goals:**
- Establish the root React application structure.
- Configure TailwindCSS with dark mode capabilities (`#0D0D12` background) and JetBrains Mono as the monospace font.
- Implement a reusable layout component that includes a fixed left sidebar.
- Implement sidebar navigation links for "Active Trades", "Watchlist", and "History".

**Non-Goals:**
- Implementing the actual content or functionality of the Active Trades, Watchlist, or History views.
- Backend Sync Engine or Google Sheets integration at this stage.

## Decisions

- **Tailwind Config for Dark Mode**: We will configure Tailwind to use dark mode by default, setting the body background to `#0D0D12` to ensure a consistent dark theme across the application.
- **Font Configuration**: We will import JetBrains Mono and configure it as the `mono` font family in `tailwind.config.js`. This is critical for trading dashboards where numbers and code-like structures need clear monospace rendering.
- **Layout Component (`AppLayout`)**: Create a wrapper component that renders the sidebar on the left and a main content area on the right. This separates layout concerns from page-level content.
- **Routing Structure**: Use `react-router-dom` to manage navigation between Active Trades (`/`), Watchlist (`/watchlist`), and History (`/history`). The layout component will host the routing output for the main content area.

## Risks / Trade-offs

- **Risk:** Font loading might cause a flash of unstyled text.
  - **Mitigation:** Use a reliable method (like `@fontsource/jetbrains-mono` or preloading in `index.html`) to ensure the font loads as quickly as possible.
