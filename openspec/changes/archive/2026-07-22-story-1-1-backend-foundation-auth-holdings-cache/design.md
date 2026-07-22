## Context

The Command Center Dashboard needs a backend to interact securely with the Kite API and serve data to a frontend. The Kite API has strict rate limits which prevent us from hammering it for data on every page reload or for every user. We need a way to cache the user's holdings locally and provide real-time updates to the frontend without the frontend directly talking to Kite.

## Goals / Non-Goals

**Goals:**
- Authenticate with the Kite API using credentials stored in `.env`.
- Establish a local SQLite database for caching holdings.
- Implement a WebSocket endpoint using FastAPI for pushing data to the frontend.

**Non-Goals:**
- Multi-tenant architecture (this is single-tenant for now).
- Complex database setups like PostgreSQL or Redis.
- Direct Kite API communication from the frontend.

## Decisions

- **FastAPI for Backend:** Chose FastAPI due to its async support, which is excellent for WebSockets and concurrent API calls.
- **SQLite for Cache:** Lightweight, built-in, and file-based. Perfect for a single-tenant local cache to persist data across restarts.
- **WebSocket over REST for Frontend Updates:** WebSockets allow the backend to push real-time ticks to the frontend efficiently without the frontend needing to poll, reducing latency and overhead.

## Risks / Trade-offs

- **Risk:** SQLite database locking during concurrent writes.
  - **Mitigation:** Ensure the database connection handles concurrent access gracefully or use WAL mode if necessary, though writes (updating cache) are infrequent compared to reads.
- **Risk:** WebSocket connection dropping.
  - **Mitigation:** The frontend will need to implement reconnection logic.

## Migration Plan

No migration needed as this is a greenfield setup.

## Open Questions

None at this time.
