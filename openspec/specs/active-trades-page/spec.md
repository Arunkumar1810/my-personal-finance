# Capability: Active Trades Page

## Purpose
TBD

## Requirements

### Requirement: Active Trades Page Layout
The system SHALL provide an Active Trades page divided vertically into three primary sections: Active Holdings, Pending Buy GTT Orders, and Orphaned Sell GTT Orders.

#### Scenario: User views Active Trades page
- **WHEN** the user navigates to the Active Trades page
- **THEN** the three distinct sections are visible in order: Active Holdings, Pending Buy GTT Orders, and Orphaned Sell GTT Orders.

### Requirement: Empty States for Secondary Sections
The system SHALL display a subtle, single-line empty state message for Pending Buy GTT Orders or Orphaned Sell GTT Orders when no such orders exist.

#### Scenario: No pending buy orders
- **WHEN** there are no pending buy GTT orders
- **THEN** the Pending Buy GTT Orders section displays a subtle empty state message without taking up excessive vertical space.

### Requirement: Expandable Holdings Table
The system SHALL display Active Holdings in a dense data table with columns: Stock Name, Current Price, Invested Amount, Current Amount, P&L, Day Change. Each row SHALL be expandable to reveal a nested table of associated active Sell GTT orders.

#### Scenario: User expands a holding row
- **WHEN** the user clicks on a holding row
- **THEN** a sub-table expands smoothly below the row, displaying the associated Sell GTT orders and their GttProgressBar.
- **AND** the columns of the nested table strictly align with the parent table.

### Requirement: Read-Only Dashboard
The Active Trades page SHALL be strictly read-only, presenting a pure monitoring dashboard without forms, action buttons, edit icons, or delete actions.

#### Scenario: User attempts to edit
- **WHEN** the user interacts with the dashboard components
- **THEN** no edit or delete actions are available.
