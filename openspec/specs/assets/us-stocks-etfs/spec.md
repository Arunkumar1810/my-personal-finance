# Capability: US Stocks & ETFs

## Purpose
The US Stocks & ETFs capability tracks international equity holdings, foreign exchange rates (USD/INR), dual-currency valuations, and Liberalised Remittance Scheme (LRS) remittance tracking.

## Requirements

### Requirement: US Equities & ETFs Dual-Currency Valuation
The system SHALL track US equities and ETFs, recording native USD share prices and computing real-time converted valuations in Indian Rupees (INR).

#### Scenario: Dual currency portfolio view
- **WHEN** the user views the US Stocks & ETFs portfolio
- **THEN** each holding displays ticker, shares held, average acquisition price (USD), current price (USD), total USD value, and the converted INR valuation.

#### Scenario: Total US investment summary
- **WHEN** the US portfolio summary is computed
- **THEN** the system outputs Total Invested Capital in USD and INR, Total Current Valuation in USD and INR, and total return percentages.

### Requirement: Foreign Exchange Rate & LRS Quota Tracking
The system SHALL monitor the prevailing USD/INR foreign exchange rate and track annual remittance limits under the RBI Liberalised Remittance Scheme (LRS).

#### Scenario: FX rate conversion
- **WHEN** computing INR valuations for US holdings
- **THEN** the system applies the current USD/INR exchange rate
- **AND** displays the reference FX rate used for conversion.

#### Scenario: Annual LRS limit utilization
- **WHEN** tracking overseas remittances for the current fiscal year
- **THEN** the system compares total remitted USD against the annual statutory LRS limit ($250,000 USD)
- **AND** displays the percentage utilized and remaining headroom.
