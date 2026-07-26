# Refinement Scratchpad

## Status Legend
- **Open**: Issue identified, pending proposal or user review.
- **Needs refinement**: User provided feedback, updating proposal.
- **Consistent**: Issue resolved and artifacts updated.

## Current Working Constraints / Decisions
- The focus is on a stateless Kite Service adapter using `X-Dev-Mode: true` for dev environment mocking.
- No outbound network calls should be made when dev mode is active.

## Prioritized Issues

### 1. P0: Undefined scope of mocked Kite API endpoints (Consistent)
**Resolution:** Based on the existing codebase requirements, the mock scope has been defined to include `holdings`, `positions`, `get_gtts`, and `historical_data`. `proposal.md` and `spec.md` have been updated.

### 2. P1: Missing implementation for mock data validation (Consistent)
**Resolution:** Added a requirement to `spec.md` and a task to `tasks.md` (Task 2.3) to implement automated schema validation for the mock data, ensuring alignment with the risk mitigation proposed in `design.md`.

### 3. P2: Ambiguity between Interceptor and Service Routing (Consistent)
**Resolution:** Updated `proposal.md`, `design.md`, and `tasks.md` to replace "Interceptor" terminology with "Factory Dependency Injection", correctly reflecting the FastAPI dependency structure used for routing the adapter logic.

### 4. P0: Code organization for adapter classes (Consistent)
**Resolution:** Updated `design.md` with a File Separation Principle and revised `tasks.md` to explicitly assign the interface, production adapter, dev mode emulator, and factory dependency to their own separate files (e.g., under `backend/adapters/kite/`).
