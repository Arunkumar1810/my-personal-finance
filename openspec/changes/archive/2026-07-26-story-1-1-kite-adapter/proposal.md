## Why

We need to safely test our application locally without hitting the live Kite API rate limits. By building a stateless Kite Service adapter with an `X-Dev-Mode` emulator, we can route standard requests to the live Kite API while returning deterministic mock data during local development and testing.

## What Changes

- Create a stateless Kite Service adapter to handle interactions with the Kite API.
- Implement a FastAPI dependency factory that reads the `X-Dev-Mode: true` header to conditionally inject the appropriate adapter implementation.
- Implement a dev mode emulator that immediately returns deterministic mock JSON data matching the Kite schema. The emulator must support the following core endpoints:
  - `holdings`
  - `positions`
  - `get_gtts`
  - `historical_data`
- Ensure that when dev mode is triggered, zero outbound network calls are made to the real Kite API.

## Capabilities

### New Capabilities
- `kite-adapter`: A stateless Kite Service adapter with a factory dependency routing `X-Dev-Mode` requests to an emulator using deterministic mock JSON data.

### Modified Capabilities
- (None)

## Impact

- **API/Service Layer**: Addition of the Kite Service adapter and its factory dependency routing/emulator logic.
- **Local Testing**: Enhances the developer experience by enabling safe, rate-limit-free local testing and stable CI runs.
