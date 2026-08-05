## Why

Traders often struggle to objectively analyze their own performance and are prone to emotional mistakes like revenge trading. By integrating AI, we can provide objective post-mortem analysis of completed campaigns, simulate "What if?" scenarios, and actively warn the user when they exhibit toxic behavior patterns (e.g., trading immediately after a loss).

## What Changes

- Introduce a new "AI Post-Mortem" action for completed Swing Campaigns that sends execution data and rationale to an AI service for critique.
- Generate counter-factual scenarios (e.g., "What if you held for the original target?") and visualize the hypothetical outcome.
- Implement a real-time detection system that triggers a "Revenge Trade" warning if a new trade is executed within a short window after closing a losing campaign.

## Capabilities

### New Capabilities
- `ai-post-mortem`: Automated, objective critique of a closed campaign's entry and exit timing.
- `ai-counter-factuals`: Generation and visualization of hypothetical trading scenarios based on the user's logged rationale.
- `revenge-trade-warning`: Detection algorithm that identifies rapid, consecutive trade entries following a realized loss and triggers a visual warning.

### Modified Capabilities
<!-- None -->

## Impact

- **UI/UX:** New AI analysis views within the Campaign Details/History page. Prominent warning banners for revenge trading on the Dashboard/Active Trades views.
- **Backend:** New integration with an LLM provider (e.g., OpenAI or Gemini API) to generate the analysis and counter-factuals. New logic to evaluate time elapsed since the last losing trade upon new execution sync.
- **Cost/Dependencies:** Will require an external LLM API key and incur token usage costs.
