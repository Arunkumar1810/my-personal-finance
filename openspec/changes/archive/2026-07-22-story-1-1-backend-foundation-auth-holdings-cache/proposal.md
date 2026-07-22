## Why

The backend needs to act as the authoritative source for the application, handling external communication with the Kite API and caching data locally. This solves the problem of rate limiting and provides a stable state for the frontend to connect to via WebSockets.

## What Changes

- Add Kite API authentication using credentials from `.env`.
- Introduce a local SQLite database to cache user holdings.
- Implement a WebSocket endpoint to push updates to the frontend.

## Capabilities

### New Capabilities
- `kite-auth`: Authenticate with Kite using config-driven credentials.
- `holdings-cache`: Fetch portfolio holdings from Kite and cache them in a local SQLite database.
- `websocket-server`: Set up a FastAPI WebSocket endpoint to allow the frontend to connect and receive data.

### Modified Capabilities

## Impact

- Introduces new FastAPI backend service.
- Adds SQLite dependency for caching.
- Establishes the WebSocket connection pattern for the frontend.
