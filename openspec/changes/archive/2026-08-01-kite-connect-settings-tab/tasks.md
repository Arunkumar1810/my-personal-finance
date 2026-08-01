## 1. Backend Core Logic Updates

- [x] 1.1 Update `kite_client.py` to implement a method that dynamically exchanges a provided request token, creates a new session, and saves it to `.kite_access_token`.
- [x] 1.2 Update the adapter instantiation in `kite-service/grpc_server.py` to dynamically re-evaluate the active adapter (checking cache freshness) on each request, so it recovers from dev-mode without a restart.
- [x] 1.3 Add a new endpoint `/api/auth/login-url` to `backend/main.py` that returns the Kite OAuth login URL.
- [x] 1.4 Add a new endpoint `/api/auth/callback` to `backend/main.py` that receives the `request_token` from Kite, invokes the authentication exchange, and redirects back to the frontend `/settings` route.

## 2. Frontend Settings UI

- [x] 2.1 Add a "Settings" navigation link to the layout in `frontend/src/components/AppLayout.tsx` (or equivalent).
- [x] 2.2 Create a `Settings.tsx` component that includes a "Kite Connect" button.
- [x] 2.3 Wire the "Kite Connect" button to fetch the login URL from the backend and redirect the browser to Kite's OAuth page.
- [x] 2.4 Add logic to display a success message/toast on the Settings page when redirected back with a successful authentication flag.
