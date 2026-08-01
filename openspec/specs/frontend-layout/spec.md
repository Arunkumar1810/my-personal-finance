# Capability: Frontend Layout

## Purpose
TBD

## Requirements

### Requirement: Dark Mode Theme Foundation
The system SHALL render a dark-mode theme by default, with a primary background color of `#0D0D12`.

#### Scenario: User opens application
- **WHEN** the user opens the application
- **THEN** the application body background is `#0D0D12`
- **AND** the default text color has sufficient contrast for readability on the dark background

### Requirement: Fixed Left Sidebar Navigation
The system SHALL provide a fixed left sidebar navigation menu.

#### Scenario: Sidebar visibility
- **WHEN** the user views any main page of the application
- **THEN** a fixed sidebar is visible on the left side of the screen
- **AND** the sidebar does not scroll with the main content

### Requirement: Navigation Links
The sidebar SHALL contain navigation links for the core dashboard sections.

#### Scenario: Core navigation links
- **WHEN** the user looks at the sidebar
- **THEN** links for "Active Trades", "Watchlist", and "History" are present and clickable
- **AND** clicking "Active Trades" navigates the user to the dense data-heavy Active Trades dashboard page.

### Requirement: Monospace Typography
The system SHALL use JetBrains Mono as the primary monospace font.

#### Scenario: Monospace rendering
- **WHEN** text is styled with the monospace font family
- **THEN** the JetBrains Mono font is applied and rendered

### Requirement: High Density Layout Container
The system SHALL provide a container optimized for high data density on desktop displays for dashboards like Active Trades.

#### Scenario: Desktop high density view
- **WHEN** the user views a dense data dashboard on a desktop display
- **THEN** the layout uses compact padding to allow maximum rows on screen without scrolling
- **AND** maintains readability through clear typography and structural spacing.
