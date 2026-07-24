## Why

Currently, the application only displays long-term settled "Holdings". It ignores active "Positions" (such as intraday trades, overnight F&O, and unsettled cash positions). This gives the user an incomplete picture of their portfolio's true exposure and current standing. We need to merge Positions and Holdings into a single, unified view.

## What Changes

- Fetch `positions` from the Kite API alongside `holdings`.
- Normalize the `positions` data structure to match `holdings`.
- Group both lists by `tradingsymbol`.
- If a stock exists in both Holdings and Positions, sum up their quantities, sum their P&L, and calculate a weighted average price to reflect a single line item for that symbol.
- Expose this unified Portfolio list to the frontend instead of just Holdings.

## Capabilities

### New Capabilities
- `unified-portfolio`: Normalizes and merges Holdings and Positions into a single portfolio list, correctly handling overlaps (summing qty/P&L and calculating weighted average price).

### Modified Capabilities

## Impact

- **Backend (`kite_client.py`)**: Needs to fetch `kite.positions()` along with `kite.holdings()`.
- **Backend (`database.py`)**: May need to store positions or the merged portfolio instead of just holdings, or cache them separately.
- **Backend (`cross_reference.py`)**: The `construct_unified_payload` function will merge both and provide the single unified list to the WebSocket stream.
- **Frontend**: Will receive a modified schema or merged list. If we keep the key as `holdings`, minimal frontend UI change is required, except for perhaps a tag showing if it's purely holding vs mixed. (Assuming we map fields to existing keys).
