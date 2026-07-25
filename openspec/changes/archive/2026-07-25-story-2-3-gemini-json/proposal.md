## Why

To parse unstructured market data from Moneycontrol reliably, we need Gemini 1.5 Pro to output strict JSON so that we can cleanly extract Entry, Target, and Stop-Loss values. We also need to ensure system stability by handling API timeouts or malformed responses gracefully rather than crashing.

## What Changes

- Integrate the Gemini 1.5 Pro API into the Python backend sync engine.
- Send scraped Moneycontrol data to the Gemini API.
- Request and enforce a strict JSON response containing Entry, Target, and Stop-Loss fields.
- Validate the JSON response against a strict schema.
- Implement error handling for API timeouts and invalid/malformed JSON responses.

## Capabilities

### New Capabilities
- `gemini-integration`: Handle requests to the Gemini 1.5 Pro API and ensure strict JSON schema outputs.

### Modified Capabilities
- (None)

## Impact

- Python backend Sync Engine.
- Requires setting up a Gemini API key and utilizing the google-generativeai library (if not already used).
