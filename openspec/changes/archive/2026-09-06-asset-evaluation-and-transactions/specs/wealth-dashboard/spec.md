## MODIFIED Requirements

### Requirement: Application Navigation & Workspace Layout
The system SHALL provide persistent workspace navigation connecting all functional domains (`wealth-dashboard`, `portfolio-valuation`, `liabilities`, `goals`, and `assets` sub-domains) within a dark theme environment.

#### Scenario: User navigates between financial domains
- **WHEN** the user interacts with the navigation menu
- **THEN** links for "Wealth Dashboard", "Portfolio Valuation", "Liabilities", "Goals", and "Assets" are accessible
- **AND** expanding the "Assets" menu reveals sub-domains for "Assets Dashboard", "Indian ETFs", "Indian LT Stocks", "US Stocks & ETFs", "Indian Swing Trading", "ESOPs & RSUs", "Fixed Deposits", "PF", and "Indian Bonds"
- **AND** expanding any asset sub-domain tree presents "Asset Evaluation" and "Transactions" as primary access routes alongside asset-specific holdings or analytical views
- **AND** selecting any domain route updates the active view without reloading the entire application.

#### Scenario: Visual theme presentation
- **WHEN** the user opens the application
- **THEN** the workspace renders with a primary dark background (`#0D0D12`)
- **AND** typography and metrics provide high contrast with designated financial color semantics (green for positive gains, red for losses/liabilities, cyan/violet for allocation highlights).
