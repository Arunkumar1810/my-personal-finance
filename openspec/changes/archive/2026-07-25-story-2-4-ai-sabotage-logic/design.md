## Context

The trading dashboard involves a Python backend Sync Engine that integrates with Gemini AI to evaluate trading setups. Currently, bad setups might just receive a low score, but the user might still trade them. To aggressively protect the trader, the AI should explicitly flag bad setups (highly volatile or low-edge) and force a strict 0.5% stop-loss.

## Goals / Non-Goals

**Goals:**
- Detect volatile or low-edge setups in the AI evaluation process.
- Pass an `is_sabotaged` boolean flag in the AI response payload.
- Enforce a 0.5% stop-loss when this flag is true, overriding standard calculations.

**Non-Goals:**
- Do not block the trade entirely; just enforce a strict stop-loss.
- Do not implement new trading strategies.

## Decisions

- **AI Prompt Update**: Modify the Gemini prompt in the Python backend to instruct it to analyze for volatility and edge, and set `is_sabotaged: true` in the JSON if the setup is bad.
- **Backend Stop-Loss Override**: In the backend Sync Engine, after receiving the JSON payload, check the `is_sabotaged` flag. If true, set the stop-loss to 0.5% and ignore the calculated stop-loss.
- **Shared Ledger / Frontend**: The `is_sabotaged` flag and updated stop-loss will be synced to Google Sheets and then displayed on the React frontend.

## Risks / Trade-offs

- **False Positives**: AI might incorrectly flag a good setup as sabotaged. Mitigation: Start with a conservative prompt and allow the user to review the AI's reasoning.
- **Payload Parsing Issues**: The JSON payload structure needs to be robust to handle the new flag. Mitigation: Use Pydantic or strict JSON parsing and provide a default `is_sabotaged: false`.
