## Context

We are building the 'Swing Trading Dashboard' frontend using React, Vite, and TailwindCSS. The dashboard needs a way to display trader positions. Currently, there is a need for a dense, scannable view on desktop and a mobile-friendly view for phones.

## Goals / Non-Goals

**Goals:**
- Implement a dense data table for displaying positions on desktop.
- Implement a responsive design that converts the table rows into stacked cards on mobile screens.
- Create a custom cell component for the ticker column showing a company logo in a white disc, the symbol, and a 1-sentence summary.

**Non-Goals:**
- Changes to the backend Sync Engine.
- Changes to the Google Sheets state layer structure.
- Fetching real live data (we will use the populated mock data from the shared ledger).

## Decisions

- **Table vs CSS Grid**: We will use a standard HTML `<table>` for the desktop view for semantic correctness and ease of creating dense layouts. We will use TailwindCSS to style it.
- **Responsive Strategy**: Instead of trying to force a `<table>` to be responsive, we will create two layouts: a `<table class="hidden md:table">` for desktop and a `<div class="md:hidden flex flex-col">` for mobile cards. This provides the best user experience on both devices without complex CSS hacks.
- **Ticker Cell Component**: We will isolate the Ticker cell into its own React component `<TickerCell symbol={...} logo={...} summary={...} />` to keep the table row component clean. The logo will use an `img` tag inside a rounded full div with a white background.

## Risks / Trade-offs

- **Risk**: Duplicating data mapping logic between the desktop table and the mobile cards.
  - **Mitigation**: We will map over the data array once and render both the `<TableRow>` and `<MobileCard>` components for each item, allowing Tailwind's display classes to handle visibility.
