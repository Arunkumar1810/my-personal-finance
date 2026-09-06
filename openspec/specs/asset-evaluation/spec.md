# Capability: Asset Evaluation

## Purpose
Asset Evaluation provides a standardized, domain-agnostic analytical framework evaluating valuation, returns (CAGR / dynamic XIRR), risk, liquidity, and tax across every active asset class in the portfolio.

## Requirements

### Requirement: Standardized Multi-Asset Parameter Evaluation
The system SHALL evaluate and compute 12 standardized analytical parameters uniformly across each individual asset domain (`indian-etfs`, `indian-lt-stocks`, `us-stocks-etfs`, `indian-swing-trading`, `esops-rsus`, `fixed-deposits`, `pf`, and `indian-bonds`): Current Valuation (₹), Invested Capital (₹), Total Gain/Loss (₹ and %), Annualized Return (XIRR/CAGR/YTM), Period Delta / 1D Movement (₹ and %), Net Worth Allocation Weight (%), Holdings Count, Cashflow Yield (₹), Liquidity Tier (Settlement horizon & runway coverage), Estimated Tax Liability (₹), Benchmark Alpha Spread (%), and Sync Metadata (Timestamp and Provider Source).

#### Scenario: Universal parameter presentation across asset domains
- **WHEN** the user inspects the Asset Evaluation of any asset domain
- **THEN** the system computes and renders all 12 standardized metrics according to that asset's active holdings and ledger records
- **AND** maintains the identical visual parameter contract regardless of the underlying asset class mechanics.

#### Scenario: Benchmark alpha relative spread calculation
- **WHEN** evaluating asset performance against broad market indicators
- **THEN** the system compares the asset's annualized return against its designated benchmark (Nifty 50 for Indian equities/ETFs, S&P 500 for US stocks, 10-Yr G-Sec for Bonds/FDs, or CPI Inflation for PF)
- **AND** displays the relative alpha spread as an over/under-performance badge.

#### Scenario: Net worth allocation drift computation
- **WHEN** an asset evaluation metric set is loaded
- **THEN** the system calculates the asset's current valuation as a percentage of total consolidated net worth
- **AND** displays the variance between actual allocation weight and configured model target weight.

### Requirement: Sub-Tree Localized Asset Evaluation Modules
The system SHALL maintain dedicated, domain-localized evaluation modules physically co-located within each asset's sub-tree directory (`src/assets/<domain>/`), binding to the standardized parameter contract without importing from or routing to a centralized common module.

#### Scenario: Accessing localized asset evaluation
- **WHEN** the user navigates to `/assets/<domain>/asset-evaluation`
- **THEN** the system renders the domain-specific evaluation component co-located in that asset's folder
- **AND** highlights the active "Asset Evaluation" link within that asset's sub-tree sidebar menu.

### Requirement: Real-Time Dynamic XIRR Evaluation Integration
The system SHALL derive the annualized return (XIRR) displayed in the Asset Evaluation module directly from the chronological cashflow transactions and execution dates recorded for that asset account, using current valuation as the terminal cashflow.

#### Scenario: Dynamic XIRR calculation from cashflow schedule
- **WHEN** computing annualized performance for an asset class
- **THEN** the system compiles all historical debit cashflows (investments/purchases as negative outflows) and credit cashflows (sales/dividends/interest as positive inflows) alongside their exact calendar dates
- **AND** appends the current valuation at the present timestamp as the terminal positive cashflow
- **AND** solves the non-periodic internal rate of return equation via Newton-Raphson numerical approximation to produce the official XIRR percentage.

#### Scenario: Recalculation upon transaction ledger update
- **WHEN** a new transaction is logged, updated, or synced for an asset account
- **THEN** the system re-runs the cashflow solving algorithm
- **AND** updates the displayed XIRR on the Asset Evaluation interface without manual intervention.
