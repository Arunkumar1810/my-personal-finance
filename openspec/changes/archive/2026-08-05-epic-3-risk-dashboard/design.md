## Context

The application currently has a History page displaying raw executions and campaigns. To build discipline, users need a high-level view (a Dashboard) that focuses on risk management rather than just profit/loss.

## Goals / Non-Goals

**Goals:**
- Implement a primary Dashboard tab in the React frontend.
- Calculate and display Capital at Risk and Max Drawdown.
- Render a Calendar Heatmap for daily P/L.
- Compare planned vs actual risk/reward.

**Non-Goals:**
- AI analysis or "What-if" scenarios (these belong to Epic 4).
- Real-time market data integration for live risk calculations (we will rely on static planned risk values).

## Decisions

1. **Dashboard Tab:** We will add a new `DashboardPage.tsx` component and update the main `App.tsx` routing/navigation to include a "Dashboard" tab alongside "History".
2. **Planned R/R Fields:** To accurately calculate Capital at Risk and Planned R/R, we will add two new columns to the `swing_campaigns` table: `planned_risk` (REAL) and `planned_reward` (REAL). These can be updated via the Journaling modal.
3. **Daily P/L Endpoint:** The backend will expose a new GET `/api/dashboard/daily-pnl` endpoint. It will aggregate realized P/L from closed campaigns, distributing the P/L to the day the campaign was closed (exit date).
4. **Calendar Component:** The frontend will use native JavaScript `Date` logic to construct a simple 7-column CSS grid for the current month, coloring cells based on the fetched daily P/L.

## Risks / Trade-offs

- **Risk:** Calculating Max Drawdown requires historical equity curves, which we don't fully track (we only track discrete campaign P/L).
- **Trade-off / Mitigation:** For MVP, Max Drawdown will be approximated by finding the maximum peak-to-trough drop in cumulative realized P/L from the campaign history. If no campaigns are closed, it's 0.
