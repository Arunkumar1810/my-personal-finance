## Context

The Python Backend Sync Engine currently lacks a reliable way to extract specific numerical values (Entry, Target, Stop-Loss) from unstructured Moneycontrol market data. Integrating the Gemini 1.5 Pro API allows us to leverage LLM capabilities to parse this data. However, for a programmatic pipeline, we need predictable output (strict JSON) and robust error handling to prevent the system from crashing during API timeouts or when unexpected responses occur.

## Goals / Non-Goals

**Goals:**
- Implement Gemini 1.5 Pro integration to parse raw market data.
- Enforce strict JSON output from the Gemini API.
- Gracefully handle API timeouts and malformed JSON errors without crashing.

**Non-Goals:**
- Implementing scraping logic (that's handled separately).
- Complex retry mechanisms (simple try-except is sufficient for this story).
- Passing unnecessary or massive datasets to the API (keep prompts concise).

## Decisions

- **Use `google-generativeai` SDK**: The official Google SDK will be used to interact with Gemini 1.5 Pro.
- **Strict JSON Prompting**: The system will explicitly instruct Gemini to return ONLY valid JSON with specific keys (`entry`, `target`, `stop_loss`). We may also use Gemini's structured output features if applicable.
- **Robust Error Handling**: Wrap the API call and JSON parsing in a `try...except` block, specifically catching API exceptions and `json.JSONDecodeError`.

## Risks / Trade-offs

- **Risk: API Latency or Rate Limits** → Mitigation: Implement a reasonable timeout for the API call to ensure the backend doesn't hang indefinitely.
- **Risk: Gemini occasionally returns markdown wrap (```json ... ```)** → Mitigation: Strip the markdown wrapping before parsing the JSON string.
