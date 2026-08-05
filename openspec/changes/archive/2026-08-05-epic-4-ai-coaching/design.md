## Context

Traders often lack the objectivity to analyze their own mistakes and successes. Epic 4 introduces AI Coaching to provide automated, objective post-mortem analyses, counter-factual simulations, and active behavioral interventions (Revenge Trade warnings).

## Goals / Non-Goals

**Goals:**
- Provide an on-demand AI analysis of completed campaigns.
- Generate and display counter-factual scenarios based on rationale.
- Warn users if they are exhibiting "Revenge Trading" behavior (rapid re-entry after a loss).

**Non-Goals:**
- Automated execution or trading bots.
- Real-time AI analysis of open trades.

## Decisions

1. **AI Integration via Backend:** We will implement a new endpoint `POST /api/campaigns/{id}/ai-analysis` in FastAPI. This endpoint will construct a prompt containing the campaign's execution data, tags, and rationale, and send it to an LLM via its API. (For this implementation, we will mock the LLM call or use a simple heuristic string if actual API keys are not provided, or integrate if they are).
2. **Caching AI Results:** To avoid repeated LLM calls and costs, we will add an `ai_analysis` (TEXT) column to the `swing_campaigns` table to cache the result.
3. **Revenge Trade Warning:** For the MVP, this will be handled entirely on the frontend. The Dashboard will inspect the most recently closed campaign. If its `realized_pnl < 0` and the time elapsed since it was closed (using `created_at` or a new `updated_at` field) is less than 30 minutes, it will display a prominent warning banner.

## Risks / Trade-offs

- **Risk:** LLM Hallucinations or poor advice.
- **Trade-off / Mitigation:** We will clearly label the AI output as an experimental coaching tool, not financial advice. The prompt will be heavily constrained to focus purely on the provided execution data and rationale.
