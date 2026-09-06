# Capability: Indian Bonds

## Purpose
The Indian Bonds capability manages fixed income debt securities including Sovereign Gold Bonds (SGB), Government of India Securities (G-Secs), State Development Loans (SDL), and Corporate Non-Convertible Debentures (NCD).

## Requirements

### Requirement: Fixed Income Instrument Management
The system SHALL track individual bond and fixed income investments, recording ISIN/ticker, bond type, issuing entity, face value, quantity held, purchase price, current market valuation, coupon rate (%), and maturity date.

#### Scenario: User inspects bond holdings
- **WHEN** the user views the Indian Bonds portfolio
- **THEN** the system lists all active bond holdings with instrument name, bond classification badge (SGB, G-Sec, Corporate NCD), face value, quantity, current market value, coupon yield, and maturity date.

#### Scenario: Total bond portfolio valuation
- **WHEN** the bond portfolio summary is calculated
- **THEN** the system computes Total Invested Capital in bonds, Current Market Valuation, and weighted average coupon rate.

### Requirement: Coupon Schedule & Yield to Maturity Analytics
The system SHALL project semi-annual and annual coupon interest cash flows and compute the Yield to Maturity (YTM) for each bond.

#### Scenario: Upcoming coupon payout calendar
- **WHEN** the user inspects interest payout schedules
- **THEN** the system generates a chronological calendar of upcoming coupon payment dates and projected rupee interest receipts for the next 12 months.

#### Scenario: Yield to maturity calculation
- **WHEN** bond market price, coupon rate, and remaining maturity are available
- **THEN** the system calculates the effective Yield to Maturity (YTM) accounting for coupon reinvestment and capital gain/loss at par redemption.
