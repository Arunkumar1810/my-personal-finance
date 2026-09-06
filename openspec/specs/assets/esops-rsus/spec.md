# Capability: ESOPs & RSUs

## Purpose
The ESOPs & RSUs capability manages corporate stock option grants, vesting tranches, in-the-money valuations, and tax liability estimations across employee equity plans.

## Requirements

### Requirement: Stock Grant Lifecycle Tracking
The system SHALL track corporate equity grants including grant date, award type (ESOP vs RSU), total shares awarded, exercise/strike price, vesting frequency, and individual tranche vesting dates.

#### Scenario: User reviews equity grant tranches
- **WHEN** the user inspects ESOP & RSU holdings
- **THEN** the system displays each grant tranche with grant date, vesting date, vested units, unvested units, strike price, and current fair market value (FMV).

#### Scenario: Next upcoming vesting tranche
- **WHEN** unvested tranches exist
- **THEN** the system highlights the next upcoming vesting date, number of shares unlocking, and the countdown in days.

### Requirement: Vested vs Unvested Valuation & Tax Estimation
The system SHALL calculate the current in-the-money valuation for both vested and unvested units and estimate perquisite tax and capital gains obligations.

#### Scenario: In-the-money valuation
- **WHEN** the current share price exceeds the exercise strike price
- **THEN** the system calculates the intrinsic value as (current share price - strike price) * units
- **AND** calculates the total vested realizable value and projected unvested value.

#### Scenario: Perquisite tax liability projection
- **WHEN** evaluating unexercised vested options
- **THEN** the system estimates the perquisite tax obligation based on the difference between FMV and strike price at the user's marginal income tax bracket.
