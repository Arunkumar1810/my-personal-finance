## 1. Project Setup and Component Stubs

- [x] 1.1 Create `ActiveTradesPage` component stub and setup routing
- [x] 1.2 Update Sidebar navigation in `frontend-layout` to point "Active Trades" to the new page
- [x] 1.3 Create `GttProgressBar` component stub
- [x] 1.4 Create `HoldingsTable` component stub

## 2. GttProgressBar Implementation

- [x] 2.1 Implement base layout (horizontal track) for `GttProgressBar`
- [x] 2.2 Add vertical markers (Stoploss, Buy Price, Target) dynamically positioned based on props
- [x] 2.3 Implement dynamic fill visualization indicating profit (Green) vs loss (Red)
- [x] 2.4 Add hover interaction to display specific price numbers (Stoploss, Buy, Current, Target)
- [x] 2.5 Ensure colorblind accessibility via textures or directional arrows and explicit numbers

## 3. HoldingsTable Implementation

- [x] 3.1 Implement dense table structure and columns (Stock Name, Current Price, Invested Amount, Current Amount, P&L, Day Change)
- [x] 3.2 Add row expansion logic and UI (chevron)
- [x] 3.3 Implement nested sub-table to render associated Sell GTTs with `GttProgressBar`
- [x] 3.4 Ensure nested sub-table columns strictly align with parent table

## 4. Active Trades Page Assembly

- [x] 4.1 Assemble the three layout sections: Active Holdings, Pending Buy GTT Orders, and Orphaned Sell GTT Orders
- [x] 4.2 Integrate `HoldingsTable` into the Active Holdings section
- [x] 4.3 Integrate appropriate data tables for Pending Buy and Orphaned Sell GTT sections
- [x] 4.4 Implement empty states for Pending Buy and Orphaned Sell GTT sections
- [x] 4.5 Add skeleton loaders for initial data fetching across all sections
