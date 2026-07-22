## Context

The trading frontend currently lacks a real-time, consolidated view of Good Till Triggered (GTT) orders. Traders need a live dashboard that not only displays these orders but also alerts them if an active GTT order's quantity exceeds their current holdings for that stock symbol. The frontend uses React and connects to a backend WebSocket for real-time updates.

## Goals / Non-Goals

**Goals:**
- Implement a real-time React component (dashboard) to consume the unified GTT payload from the WebSocket.
- Group GTT orders by stock symbol for clarity.
- Display a warning icon next to the quantity if the GTT quantity is greater than the available holdings.

**Non-Goals:**
- Implementing the backend WebSocket or modifying the GTT payload (assumed to be already available or handled in another change).
- Managing or placing new GTT orders from this dashboard.

## Decisions

- **State Management**: Use React state and an effect hook to manage WebSocket connections and store incoming GTT payloads. This ensures the component always reflects real-time data.
- **Component Structure**: A primary `GttDashboard` component will hold the state, and a `GttTable` child component will handle the rendering and grouping logic.
- **Grouping Logic**: The `GttTable` will group rows by `symbol` and calculate if a warning should be displayed based on the `quantity` and `holdings` fields in the payload.

## Risks / Trade-offs

- **Risk**: High frequency of WebSocket messages could cause performance issues due to excessive React re-renders.
  - **Mitigation**: Implement throttling or debouncing on the state updates to batch React renders if the message volume is too high.
