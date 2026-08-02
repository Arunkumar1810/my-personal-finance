## xirr-transactions-tab Refinement Scratchpad

Tracks openspec-refine issues and working decisions for the `xirr-transactions-tab` change.
This is a working document, not a spec artifact.

Last updated: 2026-08-02

### Status Legend
- **Open**: Not yet captured consistently in OpenSpec artifacts
- **Needs refinement**: Partially captured; artifacts still need work
- **Consistent**: Artifacts are aligned with current intended behavior

### Key References
- User Intent: Get cash transactions, portfolio value, and available funds from Kite via Kite service. Calculate XIRR, Portfolio Value, Available funds from Swing Trading Service and show these details in Portfolio Valuation.

### Current Working Constraints / Decisions
- The data source for transactions is shifting from a local SQLite database to live/cached data from the Kite Service.
- The presentation location is shifting towards "Portfolio Valuation" rather than a separate "Transactions & XIRR" tab.
- Calculation logic will involve a new or updated "Swing Trading Service".

### Issue List

#### P0(1): Update Data Sourcing in Proposal & Design
- **Status**: Resolved
- **Notes**: `proposal.md` and `design.md` updated to use Kite Service and Swing Trading Service instead of local SQLite.
- **Artifacts touched**:
  - `openspec/changes/xirr-transactions-tab/proposal.md`
  - `openspec/changes/xirr-transactions-tab/design.md`

#### P0(2): Update Display Location in Proposal & Design
- **Status**: Resolved
- **Notes**: Artifacts updated to integrate XIRR and transaction ledger directly into the existing "Portfolio Valuation" view.
- **Artifacts touched**:
  - `openspec/changes/xirr-transactions-tab/proposal.md`
  - `openspec/changes/xirr-transactions-tab/design.md`

#### P1(1): Realign Tasks with Kite & Swing Trading Service
- **Status**: Open
- **Notes**: `tasks.md` reflects completed tasks for local SQLite. These need to be rewritten to reflect the new integration with Kite Service and Swing Trading Service.
- **Artifacts touched**:
  - `openspec/changes/xirr-transactions-tab/tasks.md`

### Open Questions
- Does the "Portfolio Valuation" already exist as a component, or are we replacing the "Transactions & XIRR" tab concept entirely with a Portfolio Valuation view?
