## 1. Setup

- [x] 1.1 Add `.kite_access_token` to the `.gitignore` file.

## 2. Core Implementation

- [x] 2.1 Update `kite_client.py` to add a helper function for reading/writing the token cache file.
- [x] 2.2 Modify `authenticate_kite(request_token)` in `kite_client.py` to write the `access_token` to `.kite_access_token` when successfully generated.

## 3. Startup Integration

- [x] 3.1 Update `main.py`'s `lifespan` function to first try to read the token cache file on application startup.
- [x] 3.2 If a token exists in cache, initialize the `kite_instance` with the cached token instead of generating a new session.
- [x] 3.3 Verify that the application falls back correctly if the cache is empty or invalid.
