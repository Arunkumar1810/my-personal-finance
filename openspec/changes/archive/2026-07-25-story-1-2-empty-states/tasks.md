## 1. UI Components

- [x] 1.1 Create EmptyState component to display "No Active Positions. Add a ticker..." message
- [x] 1.2 Create ErrorOverlay component to display a full-screen "Connection Lost" message

## 2. State Integration

- [x] 2.1 Update data fetching logic to catch JSON fetch errors and set an error state
- [x] 2.2 Update main view to conditionally render ErrorOverlay if the error state is true
- [x] 2.3 Update main view to conditionally render EmptyState if the positions array length is 0 (and no error)
