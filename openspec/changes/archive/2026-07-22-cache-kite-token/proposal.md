## Why

During local development, the backend server restarts frequently (e.g., via `--reload` on save). Kite's authentication requires exchanging a single-use request token for an access token, which is currently stored in memory. When the server restarts, this memory is wiped, forcing the developer to go through the entire Kite login flow (including 2FA) again to get a new request token. This slows down development significantly. However, the access token obtained is actually valid for the entire day. By caching this access token to disk, subsequent server restarts can reuse it, bypassing the login flow entirely.

## What Changes

- Update `kite_client.py` to support writing the Kite access token to disk upon successful authentication.
- Update the startup logic to read the token from disk and use it to initialize the session.
- Add the token cache file to `.gitignore` to prevent committing secrets to version control.

## Capabilities

### New Capabilities
- `kite-token-caching`: The ability to persist and reuse the Kite access token across application restarts.

### Modified Capabilities
None

## Impact

- `backend/kite_client.py`: Will contain the logic to read and write the token file.
- `backend/main.py`: Will check for the cached token on startup.
- `.gitignore`: Will be updated to ignore the cache file.
