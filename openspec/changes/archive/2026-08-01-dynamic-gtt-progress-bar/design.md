## Context

The `GttProgressBar` component visualizes the distance of the Current Market Price (CMP) relative to the Stop Loss (SL) and Target prices. Currently, the component might lack permanent, dynamic text labels showing the exact values for SL, Buy Price, CMP, and Target. Users need these values visible at all times to assess their position quickly.

## Goals / Non-Goals

**Goals:**
- Extract the dynamic values (SL, Buy, CMP, Target) from the component's props.
- Render these values as permanent text labels aligned appropriately along the progress bar.

**Non-Goals:**
- Changing the underlying formula for the progress bar's fill percentages.
- Modifying backend endpoints.

## Decisions

- **Label Positioning:** The labels will be positioned using CSS absolute positioning relative to their respective points on the progress bar (e.g., 0% for SL, 100% for Target, and calculated percentages for Buy and CMP).
- **Responsiveness:** We will ensure text size and positioning do not overlap awkwardly on smaller screens, using appropriate CSS classes (`text-xs`, etc.).

## Risks / Trade-offs

- **Text Overlap:** If CMP is very close to Buy, SL, or Target, the labels might overlap.
  → **Mitigation:** We can employ a basic offset or rely on abbreviated values, but for this first iteration, we will rely on a clean, small font size (`text-[10px]` or similar) and potentially alternate top/bottom positioning if needed, though placing them all below or above uniformly is simpler.
