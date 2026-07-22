## Context

During local development of the personal-finance app, backend server restarts cause the in-memory Kite `access_token` to be lost. To avoid re-authenticating with Kite 2FA multiple times a day, we want to persist the `access_token` across restarts. Kite's access token is valid from the time it's generated until 6:00 AM the next day.

## Goals / Non-Goals

**Goals:**
- Persist the Kite access token to disk upon successful generation.
- Load the access token from disk on application startup to bypass the login flow if a valid token exists.
- Ensure the token cache file is not committed to the repository (git ignored).

**Non-Goals:**
- Handling token expiration programmatically beyond a simple read/write. If the token is invalid (e.g., next day), the user can simply go through the `/api/auth/login` flow to generate and cache a new one.

## Decisions

**1. Cache Location and Format**
- *Decision*: Store the access token in a `.kite_access_token` plaintext file at the root of the backend directory.
- *Rationale*: It's a simple, single-value secret. No need for complex JSON or database storage for a developer convenience feature.

**2. Startup Integration**
- *Decision*: On startup in `main.py`'s `lifespan` context, we will first attempt to load the token from the cache. If successful, we construct `kite_instance` with this token.
- *Rationale*: Keeps the initialization logic straightforward without deep architectural changes to the FastAPI app.

**3. Cache Population**
- *Decision*: Modify `authenticate_kite(request_token)` to write the returned `access_token` to the `.kite_access_token` file upon a successful `kite.generate_session()` call.
- *Rationale*: Centralizes the single point of truth where the session is generated.

## Risks / Trade-offs

- **Risk: Secret leakage** -> *Mitigation*: Strictly add `.kite_access_token` to `.gitignore` to prevent accidental commits.
- **Risk: Invalid token cache leading to errors** -> *Mitigation*: `authenticate_kite` will gracefully fall back to returning `None` or failing gracefully if the cached token fails during Kite API initialization.
