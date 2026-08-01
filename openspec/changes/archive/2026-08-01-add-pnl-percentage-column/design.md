## Context

The Active Trades page currently displays absolute P&L in the `HoldingsTable` component. Users want to see the relative performance (percentage) of their holdings to better assess their trades at a glance.

## Goals / Non-Goals

**Goals:**
- Calculate and display the P&L percentage for each holding row.
- Add visual indicators (red/green) depending on positive or negative performance.

**Non-Goals:**
- Altering the backend API structure.
- Changing the overall layout or structure of the Active Trades dashboard.

## Decisions

- **Frontend Calculation:** We will calculate the P&L percentage on the frontend within the `HoldingsTable` component using the existing `pnl` and `invested` data fields. This avoids unnecessary backend changes. The formula will be `(pnl / invested) * 100`.
- **Formatting:** We will use standard conditional formatting (e.g., Tailwind or CSS classes) for colors: green for `> 0`, red for `< 0`. 

## Risks / Trade-offs

- **Zero Invested Amount:** If the invested amount is zero (e.g., some edge case or fully sold but still appearing), division by zero could occur. 
  → **Mitigation:** We will ensure a fallback check where if `invested` is 0 or undefined, the P&L % is displayed as `0.00%` or `N/A`.
