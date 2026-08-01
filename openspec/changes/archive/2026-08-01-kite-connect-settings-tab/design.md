## Context

The backend interacts with the Zerodha Kite API, which enforces strict session policies (request tokens are single-use; access tokens expire daily). When tokens expire, the app falls back to mock data or crashes. Currently, restoring connectivity requires manually updating `.env` files and restarting background services. We are implementing a UI-driven flow to streamline this process.

## Goals / Non-Goals

**Goals:**
- Add a Settings UI to the React frontend with a "Kite Connect" button.
- Redirect users to the Kite OAuth login.
- Provide a backend callback endpoint to capture the `request_token`.
- Automatically exchange the request token for a new access token and cache it.
- Ensure the backend adapters dynamically pick up the new session without a process restart.

**Non-Goals:**
- Completely headless automation of Kite login (forbidden by Kite's terms of service).
- Multi-account support.

## Decisions

**1. Authentication Flow UI:**
We will add a `/settings` route in `AppLayout.tsx`. The Settings page will feature a "Kite Connect" button. The backend will expose an endpoint `/api/auth/login-url` that returns the correct Kite login URL so the frontend can safely redirect the user.

**2. Backend Callback Endpoint:**
The monolith API Gateway (`main.py`) will expose `/api/auth/callback`. Once Kite redirects here with a `request_token`, the gateway will invoke `authenticate_kite(request_token=token)` which generates a new session and saves it to `.kite_access_token`. The endpoint will then redirect the user back to the `/settings` page on the frontend with a success query parameter.

**3. Dynamic Adapter Reloading:**
The `kite-service` gRPC server currently instantiates the adapter once in its `__init__`. We will modify `KiteServiceServicer` in `grpc_server.py` to call `self.adapter = get_kite_adapter(request)` dynamically on each RPC call (or lazily) so that when a new token is generated and cached, the service instantly switches back to `ProductionKiteAdapter` without needing a restart.

## Risks / Trade-offs

- **State synchronization:** If the frontend makes requests while the backend is still generating a session, requests may fail. *Mitigation*: The backend will fall back to `DevModeKiteAdapter` during failure states, preventing hard crashes.
- **Callback Security:** Exposing the callback route publicly. *Mitigation*: The application runs locally for personal use, limiting external exposure.
