## 1. Backend Updates

- [x] 1.1 Update Gemini AI prompt to check for high volatility and low-edge setups.
- [x] 1.2 Modify AI response parsing to correctly extract the `is_sabotaged` boolean flag.
- [x] 1.3 Add logic to enforce a 0.5% stop-loss when `is_sabotaged` is true.
- [x] 1.4 Ensure the new payload structure syncs correctly to Google Sheets (the Shared Ledger).

## 2. Frontend Updates

- [x] 2.1 Update React dashboard to read the `is_sabotaged` flag from the synced state.
- [x] 2.2 Highlight sabotaged setups clearly in the UI.
- [x] 2.3 Display the enforced 0.5% stop-loss for sabotaged setups.
