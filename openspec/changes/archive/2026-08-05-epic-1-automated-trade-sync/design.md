## Context

The Swing Trading Journal currently relies on manual trade entry, which is error-prone and tedious. To build a robust AI-driven journaling tool, we need high-fidelity, automated execution data. This design outlines the plumbing for broker API integration and the foundational data model for grouping raw executions into "Swing Campaigns".

## Goals / Non-Goals

**Goals:**
- Securely store broker API credentials.
- Ingest raw trade executions from a supported broker API on-demand.
- Allow users to group raw executions into a logical "Swing Campaign" entity.
- Calculate aggregated entry price, exit price, and realized P/L for Campaigns.

**Non-Goals:**
- Automated or algorithmic trading (read-only access).
- Real-time websocket streaming of executions (on-demand sync is sufficient for MVP).
- Supporting multiple brokerages on day one (Alpaca or a single mock integration is fine for MVP).

## Decisions

**1. On-Demand Sync vs Webhooks**
- *Decision*: We will implement an on-demand sync triggered by the user clicking "Sync Trades" (Story 1.2). 
- *Rationale*: Webhooks are more complex to set up and debug, and swing traders typically journal at the end of the day or after closing a campaign. On-demand sync is simpler and meets the immediate need. We can upgrade to webhooks in Epic 4 for near-real-time revenge trading warnings.

**2. Campaign Grouping Model**
- *Decision*: A many-to-many relationship between `RawExecution` and `SwingCampaign` (though realistically one-to-many if an execution belongs to exactly one campaign). We'll use a `campaign_id` on the `RawExecution` table, or a join table `CampaignExecution`.
- *Rationale*: An execution typically belongs to one campaign. When grouped, the execution is linked to the campaign. The campaign calculates its aggregated stats based on its linked executions.

**3. Credential Storage**
- *Decision*: API keys and secrets must be encrypted at rest in the database.
- *Rationale*: Standard security practice for storing third-party API credentials.

## Risks / Trade-offs

- **Risk**: Broker API rate limits or pagination issues when syncing large histories.
  - *Mitigation*: The sync engine should only fetch executions since the last successful `synced_at` timestamp.
- **Risk**: User groups wrong executions into a campaign.
  - *Mitigation*: The UI should allow removing an execution from a campaign.
