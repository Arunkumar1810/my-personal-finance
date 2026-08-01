## Why

The Kite API sessions expire periodically (request tokens are single-use, access tokens are valid for a day). Currently, when they expire, the application degrades to mock data and requires manual `.env` updates and service restarts to restore real data. We need a convenient "Settings" tab in the UI with a "Kite Connect" button so the user can easily re-authenticate and restore live data flow dynamically without touching configuration files or restarting backend processes.

## What Changes

- Add a "Settings" navigation item and a new Settings page to the frontend dashboard.
- Display a "Kite Connect" button on the Settings page that redirects the user to the Kite API login page.
- Add a callback/redirect route (e.g., `/api/auth/callback`) in the backend to capture the new `request_token` returned by Kite.
- Update the backend's Kite client to dynamically exchange the new request token for an access token, save it to the cache, and re-initialize the `ProductionKiteAdapter` without requiring a server restart.

## Capabilities

### New Capabilities
- `kite-authentication`: Endpoints and UI to redirect the user to Kite login and capture the resulting request token.

### Modified Capabilities
- `kite-adapter`: Modify the adapter initialization/factory logic to support hot-reloading the access token so the backend transitions from dev mode back to production mode dynamically when a new token is provided.

## Impact

- **Frontend**: New UI route (`/settings`) and API integration for authentication.
- **Backend Gateway**: New endpoints for auth redirect and callback.
- **Kite Service/Swing Trading Service**: Authentication logic (`kite_client.py` and `factory.py`) must be updated to dynamically refresh the active adapter instance.
