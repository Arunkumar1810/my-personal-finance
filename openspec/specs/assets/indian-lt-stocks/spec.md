# Capability: Indian Long-Term Stocks

## Purpose
The Indian Long-Term Stocks capability tracks core equity investment portfolios, measuring holdings, acquisition costs, current valuations, sector exposures, and fundamental indicators.

## Requirements

### Requirement: Long-Term Equity Portfolio Management
The system SHALL maintain individual equity holdings intended for multi-year holding, recording ticker, company name, industry sector, shares held, average purchase price, current market price (CMP), current value, and unrealized profit/loss.

#### Scenario: Long-term stocks portfolio overview
- **WHEN** the user accesses the Indian LT Stocks portfolio
- **THEN** the system displays all long-term holdings with company name, sector, shares held, average buy price, CMP, total valuation, and absolute/percentage returns.

#### Scenario: Aggregate equity performance
- **WHEN** the portfolio is loaded
- **THEN** the system computes Total Invested Capital, Total Current Valuation, and overall unrealized gain/loss across all long-term stocks.

### Requirement: Sector Diversification & Fundamental Health Indicators
The system SHALL analyze sector concentrations across the equity holdings and track fundamental valuation indicators.

#### Scenario: Sector weighting breakdown
- **WHEN** the user inspects equity diversification
- **THEN** the system aggregates exposure by industry sector (e.g., Financials, Information Technology, Healthcare, Auto, Consumer Goods)
- **AND** displays the percentage weight of each sector relative to the overall stock portfolio.

#### Scenario: Fundamental metrics display
- **WHEN** fundamental stock data is available
- **THEN** each holding displays key fundamental badges including Market Cap category (Large/Mid/Small), Price-to-Earnings (P/E) ratio, and Dividend Yield.
