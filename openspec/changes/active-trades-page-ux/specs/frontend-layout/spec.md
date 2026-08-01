## MODIFIED Requirements

### Requirement: Navigation Links
The sidebar SHALL contain navigation links for the core dashboard sections.

#### Scenario: Core navigation links
- **WHEN** the user looks at the sidebar
- **THEN** links for "Active Trades", "Watchlist", and "History" are present and clickable
- **AND** clicking "Active Trades" navigates the user to the dense data-heavy Active Trades dashboard page.

## ADDED Requirements

### Requirement: High Density Layout Container
The system SHALL provide a container optimized for high data density on desktop displays for dashboards like Active Trades.

#### Scenario: Desktop high density view
- **WHEN** the user views a dense data dashboard on a desktop display
- **THEN** the layout uses compact padding to allow maximum rows on screen without scrolling
- **AND** maintains readability through clear typography and structural spacing.
