## 1. Setup Kite Adapter Interface

- [x] 1.1 Create the base Kite Service adapter interface/class in a dedicated file (e.g., `backend/adapters/kite/interface.py`).
- [x] 1.2 Implement the default production service that routes to the live Kite API in a dedicated file (e.g., `backend/adapters/kite/production_adapter.py`).

## 2. Dev Mode Emulator Implementation

- [x] 2.1 Define deterministic mock JSON data structures for the Kite API.
- [x] 2.2 Create the dev mode emulator implementation in a dedicated file (e.g., `backend/adapters/kite/dev_adapter.py`) that returns the mock data without making network calls.
- [x] 2.3 Create a test script to validate the structure of the mocked data against expected Kite API typings to prevent schema drift.

## 3. Factory Dependency Integration

- [x] 3.1 Create a FastAPI dependency factory in a dedicated file (e.g., `backend/adapters/kite/factory.py`) to read incoming request headers.
- [x] 3.2 Add conditional routing inside the factory based on the presence of the `X-Dev-Mode: true` header to inject either the production service or the emulator.
- [x] 3.3 Write unit tests to verify both standard production dependency injection and dev mode short-circuiting.
