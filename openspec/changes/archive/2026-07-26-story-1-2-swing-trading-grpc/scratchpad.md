# SDD Refinement Scratchpad

## Status Legend
- [Open]: Issue identified, awaiting refinement.
- [Needs refinement]: Iteration proposed, awaiting user approval.
- [Resolved]: Artifacts updated and issue closed.

## Current Working Constraints / Decisions
- The Swing-Trading Service (currently in `backend/`) delegates all Kite network interaction to the Kite Service via gRPC.
- As part of decoupling, Kite API credentials must be completely removed from the Swing-Trading Service `.env`.
- The user highlighted a critical missing detail: we need to clarify that the Kite API keys, API secret, and request token will be migrated to and used exclusively by the Kite Service (specifically the Kite Adapter).

## Prioritized Issues

### P0 (Critical)
- **[Resolved] Issue 1 - Location of Kite Credentials**: The artifacts mandate removing Kite credentials from the Swing-Trading Service but do not explicitly document that they are migrated to and securely managed by the Kite Service's own configuration (`.env`).
- **[Resolved] Issue 2 - Microservice File Structure and Class Separation**: Artifacts lack constraints enforcing that each microservice lives in its own dedicated folder under `backend/` (e.g., `backend/swing-trading-service/`, `backend/kite-service/`) and that every class and interface must be isolated into separate files.

### P1 (Major)
- *None currently identified.*

### P2 (Minor)
- *None currently identified.*
