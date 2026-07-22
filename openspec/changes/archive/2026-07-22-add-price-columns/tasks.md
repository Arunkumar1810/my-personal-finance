## 1. Backend Implementation

- [x] 1.1 Update `calculate_discrepancy` in `backend/cross_reference.py` to extract `last_price` and `average_price` from the matched holding and add them to `enriched_gtt` payload.
- [x] 1.2 Update the fallback logic in `cross_reference.py` to correctly assign defaults for missing `last_price` (using GTT condition) and `average_price` (0) if holding data isn't present.

## 2. Frontend Implementation

- [x] 2.1 Update the `GttOrder` interface in `frontend/src/components/GttTable.tsx` to include `currentPrice` and `boughtPrice` optional fields.
- [x] 2.2 Update `frontend/src/components/GttDashboard.tsx` to map `last_price` and `average_price` from the backend payload to the `currentPrice` and `boughtPrice` properties of `GttOrder`.
- [x] 2.3 Modify the `GttTable` JSX in `frontend/src/components/GttTable.tsx` to display the "Current Price" and "Bought Price" columns before the "ETA" column.
