# Capability: Indian ETFs

## Purpose
The Indian ETFs capability manages exchange-traded funds across index, sectoral, gold, and liquid categories, tracking net asset values (NAV), acquisition costs, and performance returns.

## Requirements

### Requirement: Indian ETF Portfolio Management
The system SHALL track individual Indian ETF holdings, recording ticker symbols, categories, accumulated units, average acquisition price, current market price (CMP), current valuation, and unrealized gain/loss.

#### Scenario: User views ETF holdings
- **WHEN** the user views the Indian ETFs portfolio
- **THEN** the system displays all active ETF holdings with ticker symbol, category badge (Large Cap, Sectoral, Gold, Liquid), units held, average price, CMP, total value, and unrealized return.

#### Scenario: Total ETF valuation summary
- **WHEN** ETF holdings are retrieved
- **THEN** the system calculates Total Invested Capital in ETFs, Total Current ETF Valuation, and the aggregate unrealized return percentage.

### Requirement: ETF NAV & Category Allocation
The system SHALL categorize ETF investments and track performance relative to underlying index benchmarks.

#### Scenario: Category distribution
- **WHEN** the user inspects ETF allocations
- **THEN** the system computes the percentage breakdown across Broad Market Index ETFs, Sectoral ETFs, Gold ETFs, and Liquid ETFs.

#### Scenario: Real-time NAV premium or discount
- **WHEN** market price and reported NAV are available
- **THEN** the system calculates any premium or discount between the traded market price and the underlying NAV.
