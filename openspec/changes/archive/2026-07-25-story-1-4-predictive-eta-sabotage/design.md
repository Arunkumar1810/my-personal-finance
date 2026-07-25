## Context

The trading dashboard displays active trades. To help traders make better decisions, we are adding visual indicators for how close a trade is to its target or stop-loss. Additionally, the AI mock data will flag some trades as "Sabotaged", which needs a strong visual warning to alert the user.

## Goals / Non-Goals

**Goals:**
- Provide a clear horizontal progress bar indicating the distance to Target or Stop-Loss.
- Show a pulsing danger background for trades marked "Sabotaged".
- Allow users to dismiss the warning via an "Override" button.

**Non-Goals:**
- Real-time fetching of AI data (mock data is assumed per the story).
- Adding complex animations beyond a simple pulse.

## Decisions

- **Progress Bar Implementation**: We will use custom `div` elements styled with TailwindCSS rather than the native `<progress>` element. This provides full control over the colors (green for Target, red for Stop-Loss) and layout within the table cell.
- **Sabotage Warning**: A TailwindCSS `animate-pulse` and a background color override (`bg-[#FF1744]`) will be applied to the row (or table cell) when the trade is marked `isSabotaged: true`.
- **Override Action**: The Override button will update the local React state (or the state management store if used) to set `isSabotaged: false` for the specific trade, instantly dismissing the warning.

## Risks / Trade-offs

- [Risk] Custom progress bar might look bad on small screens. → Mitigation: Use flexible width (`w-full`) and ensure minimum widths for the progress bar container.
- [Risk] Pulsing red background might make the text unreadable. → Mitigation: Ensure text color contrasts well (e.g., white text) when the danger background is active.
