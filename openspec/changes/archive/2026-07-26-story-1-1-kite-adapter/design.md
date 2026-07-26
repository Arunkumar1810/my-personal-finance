## Context

The Kite API provides real data for our application, but rate limits restrict our ability to safely test locally and run continuous integration pipelines. We need a way to mock the API responses deterministically when testing without modifying the core business logic.

## Goals / Non-Goals

**Goals:**
- Provide a stateless Kite Service adapter to act as the single point of contact for Kite API requests.
- Conditionally route requests containing the `X-Dev-Mode: true` header at the dependency injection level.
- Return deterministic mock JSON data matching the Kite schema when the header is present, making zero outbound network calls.

**Non-Goals:**
- Fully replicate the entire backend logic of Kite.
- Provide mock data for APIs other than the Kite API.

## Decisions

- **File Separation Principle**: The interface, each adapter implementation, and the factory dependency must be housed in their own distinct files (e.g., `interface.py`, `production_adapter.py`, `dev_adapter.py`, and `factory.py`) to promote maintainability and prevent monolithic files.
- **Stateless Adapter Pattern**: The adapter will not hold state, making it safe for concurrent use and simplifying testing.
- **Header-based Dev Mode (`X-Dev-Mode: true`)**: This approach avoids having to change environment variables dynamically for testing; instead, requests from tests or dev environments can opt-in to dev mode explicitly by attaching the header.
- **Factory Dependency Injection**: A FastAPI dependency will read the header and inject either the production adapter or the emulator adapter, effectively short-circuiting the actual HTTP call.

## Risks / Trade-offs

- **Risk: Mock data gets out of sync with real Kite schema**
  - *Mitigation*: Ensure mock schemas are generated or validated against actual Kite API typings/responses in CI.
