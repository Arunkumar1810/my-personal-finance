## Context

The current application requires a dedicated, data-dense view for monitoring active stock trades. The Active Trades page is intended to be a desktop-optimized, utilitarian dashboard that allows users to rapidly scan their current holdings, pending buy GTTs (Good Till Triggered), and orphaned sell GTTs. The design emphasizes high data density and quick visual feedback using components like `GttProgressBar` and an expandable `HoldingsTable`.

## Goals / Non-Goals

**Goals:**
- Implement a desktop-first, highly dense tabular layout for active trades.
- Clearly separate Active Holdings, Pending Buy GTT Orders, and Orphaned Sell GTT Orders.
- Provide a read-only `GttProgressBar` for instant visual status of sell orders.
- Allow nested expansion of holdings rows to reveal associated sell GTT orders.
- Ensure colorblind-friendly accessibility by supplementing color with textures or directional arrows and explicit numbers.

**Non-Goals:**
- Mobile-first or responsive design optimized for small screens (this is explicitly desktop-first).
- Interactive order editing (drag/drop, form editing). The dashboard is strictly read-only.
- Marketing flair, excessive padding, or complex animations beyond smooth row expansion.

## Decisions

- **Three-Section Layout**: 
  - **Why**: Keeps distinct states of the trading lifecycle separate. Holdings are the primary focus, while pending buys and orphaned sells are secondary but necessary context.
  - **Alternatives**: Mixing all orders in one table, but that would be confusing.
- **Nested Expandable Rows (`HoldingsTable`)**:
  - **Why**: Allows users to see high-level P&L at a glance and dive into GTT specifics for a holding without leaving the context or opening a new page.
  - **Alternatives**: Modal popups (blocks context) or separate pages.
- **`GttProgressBar` Component**:
  - **Why**: Provides a visual mental model of trade safety (Current Price vs Buy Price vs Stoploss).
  - **Alternatives**: Simple text columns. Visuals provide much faster cognitive processing for risk assessment.
- **Colorblind-First Approach**:
  - **Why**: Financial data relies heavily on red/green. Providing supplementary cues (textures, numbers) ensures critical risk data is accessible.

## Risks / Trade-offs

- **Risk: High data density may feel cluttered to some users.**
  - **Mitigation**: Use subtle dividing lines, clear typography (JetBrains Mono for numbers), and structured padding to maintain order despite density.
- **Risk: Complex DOM structure due to nested tables.**
  - **Mitigation**: Ensure nested tables share column widths with the parent or use a CSS grid layout that spans both parent and child rows consistently.

## Migration Plan

- Deploy the new Active Trades page side-by-side with any existing views initially, or replace the existing GTT dashboard if it maps exactly to this new page.
- Ensure the backend WebSocket data feeds for GTTs and Holdings can supply the necessary fields (Invested Amount, Current Amount, P&L, Day Change).

## Open Questions

- Should the nested Sell GTT table strictly align its columns with the parent `HoldingsTable`, or have its own optimized column layout? (The brainstorm intent suggests they strictly share column widths).
