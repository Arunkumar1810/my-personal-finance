## Why

The current GTT progress bar lacks dynamic values for SL (Stop Loss), Buy Price, CMP (Current Market Price), and Target. Displaying these values dynamically and permanently ensures users have immediate visual context of their risk and reward parameters without needing to hover or look elsewhere.

## What Changes

- Update the `GttProgressBar` component to calculate and render dynamic text labels for SL, Buy, CMP, and Target prices along the bar.
- Ensure these labels are always visible (not hidden behind hover states or only conditionally rendered).

## Capabilities

### New Capabilities
- `gtt-progress-bar-dynamic-labels`: Defines the requirement for the GTT progress bar to permanently display dynamic pricing labels (SL, Buy, CMP, Target) along its track.

### Modified Capabilities

## Impact

- `GttProgressBar.tsx` component will be updated.
- No backend API changes are expected as the necessary data (SL, Buy, Target, CMP) is already passed to the component.
