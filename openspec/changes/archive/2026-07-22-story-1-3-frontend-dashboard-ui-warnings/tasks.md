## 1. Component Setup

- [x] 1.1 Create the `GttDashboard` component skeleton in the frontend UI.
- [x] 1.2 Create the `GttTable` component to handle rendering individual grouped rows.

## 2. WebSocket Integration

- [x] 2.1 Set up a React `useEffect` hook in `GttDashboard` to connect to the backend WebSocket and subscribe to the unified GTT payload.
- [x] 2.2 Store the incoming GTT payload in the component's state to ensure real-time updates.

## 3. Rendering and Warning Logic

- [x] 3.1 Implement the logic in `GttTable` to group GTT orders by their stock symbol.
- [x] 3.2 Add conditional rendering logic in the table rows to compare the GTT quantity with available holdings.
- [x] 3.3 Display a subtle warning icon next to the quantity column if it exceeds the holdings.
