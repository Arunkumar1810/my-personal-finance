## ADDED Requirements

### Requirement: Capital Story Card
The system SHALL display a Capital Story Card on the Portfolio Valuation tab that aggregates transaction history into a summarised capital narrative. The card SHALL show: Total Deposited (sum of all deposit transactions), Total Withdrawn (sum of all withdrawal transactions), Net Invested (deposits minus withdrawals), Unrealised Gain/Loss in absolute rupee terms (current_value minus net invested), and Gain % (unrealised gain divided by net invested, expressed as a percentage). Gain values SHALL be coloured green when positive and red when negative.

#### Scenario: Positive unrealised gain
- **WHEN** the current portfolio value exceeds net invested capital
- **THEN** the Unrealised Gain cell shows the absolute gain in green with a `+` prefix

#### Scenario: Negative unrealised gain (portfolio underwater)
- **WHEN** the current portfolio value is less than net invested capital
- **THEN** the Unrealised Gain cell shows the absolute loss in red with a `-` prefix

#### Scenario: No transactions recorded
- **WHEN** the transactions array is empty
- **THEN** all Capital Story Card fields display `₹0` and gain % displays `0.00%`

#### Scenario: Withdrawals reduce net invested
- **WHEN** the user has both deposit and withdrawal transactions
- **THEN** Net Invested equals total deposits minus total withdrawals

---

### Requirement: Capital Efficiency Bar
The system SHALL display a horizontal bar showing the ratio of capital currently deployed in the market (current_value) versus idle available funds (available_funds). The bar SHALL show two segments labelled "In Market" and "Idle Cash" with their respective rupee amounts and percentages. The total SHALL be the sum of current_value and available_funds.

#### Scenario: Funds fully deployed
- **WHEN** available_funds is zero or near-zero
- **THEN** the In Market segment fills the full bar width

#### Scenario: Mixed deployment
- **WHEN** both current_value and available_funds are greater than zero
- **THEN** the bar shows proportional segments for each

#### Scenario: No portfolio value
- **WHEN** current_value is zero
- **THEN** the bar shows Idle segment filling full width

---

### Requirement: Monthly Cash Flow Bar Chart
The system SHALL display a grouped bar chart above the Cash Flow Ledger table that visualises monthly deposit and withdrawal totals. Each month SHALL show two bars: one for total deposits and one for total withdrawals in that calendar month. The chart SHALL use inline SVG consistent with existing WealthVelocity and GhostXIRR chart components. The X-axis SHALL show month labels (e.g., "Jan 25"). The Y-axis SHALL scale to the maximum monthly value.

#### Scenario: Multiple months of data
- **WHEN** transactions span multiple calendar months
- **THEN** the chart shows one grouped bar pair per month in chronological order

#### Scenario: Month with only deposits
- **WHEN** a given month has deposits but no withdrawals
- **THEN** the withdrawal bar for that month is absent or zero-height

#### Scenario: No transactions
- **WHEN** the transactions array is empty
- **THEN** the chart displays an empty state message ("No cash flow data yet")

#### Scenario: Single month of data
- **WHEN** all transactions fall within the same calendar month
- **THEN** the chart shows a single grouped bar pair for that month

---

### Requirement: Portfolio Tenure Badge
The system SHALL display a portfolio tenure badge showing the date the portfolio was started (oldest transaction date) and the elapsed time since then in years and months.

#### Scenario: Portfolio with transaction history
- **WHEN** at least one transaction exists
- **THEN** the badge displays "Since [Month Year] • [Xy Ym]" where X is years and Y is months

#### Scenario: Portfolio started less than one year ago
- **WHEN** the oldest transaction is less than 12 months ago
- **THEN** the badge displays only months (e.g., "Since Aug 2025 • 11m")

#### Scenario: No transactions
- **WHEN** the transactions array is empty
- **THEN** the tenure badge is not rendered

## MODIFIED Requirements

### Requirement: Portfolio Valuation View Layout
The portfolio valuation tab layout SHALL be updated to include the four new sections (Capital Story Card, Capital Efficiency Bar, Monthly Cash Flow Chart, Portfolio Tenure Badge) in addition to the existing KPI row, Wealth Velocity, XIRR Projection, and Cash Flow Ledger. The section order from top to bottom SHALL be: (1) KPI row, (2) Capital Story Card with Portfolio Tenure Badge, (3) Capital Efficiency Bar, (4) Wealth Velocity and XIRR Projection charts, (5) Monthly Cash Flow Bar Chart, (6) Cash Flow Ledger table.

#### Scenario: Full data available
- **WHEN** the API returns current_value, available_funds, xirr, and transactions
- **THEN** all six sections render in the specified order

#### Scenario: Loading state
- **WHEN** data is being fetched
- **THEN** the loading skeleton is shown and no new sections render prematurely
