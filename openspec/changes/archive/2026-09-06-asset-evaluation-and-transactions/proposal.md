## Why

Currently, each asset sub-domain in the personal finance application lacks a standardized evaluation interface and dedicated transaction tracking within its sub-tree. Asset classes vary in mechanics, but investors need an identical set of core parameters (valuation, returns, risk, liquidity, and tax) to evaluate performance consistently, alongside a localized transaction ledger of credits and debits that mathematically powers an accurate Extended Internal Rate of Return (XIRR). Co-locating these capabilities directly within each asset's sub-tree navigation ensures domain autonomy while guaranteeing system-wide analytical uniformity.

## What Changes

- Add a standardized **Asset Evaluation** capability across each asset sub-tree (`/assets/<domain>/asset-evaluation`) rendering 12 identical valuation, performance, liquidity, and risk parameters.
- Add a dedicated **Asset Transactions** capability across each asset sub-tree (`/assets/<domain>/transactions`) providing current valuation headers and complete chronological credit/debit cashflow ledgers.
- Implement a deterministic **Dynamic XIRR Engine** that derives annualized returns on the Asset Evaluation view directly from transaction cashflows (inflows/outflows and dates) paired with current valuation.
- Update application workspace navigation in `wealth-dashboard` (`AssetsLayout.tsx`) so that each asset class sub-tree features `Asset Evaluation` and `Transactions` as leading links alongside detail views.
- Establish co-located sub-tree file structure in `frontend/src/assets/<domain>/` with zero centralized generic catch-all components.

## Capabilities

### New Capabilities
- `asset-evaluation`: Standardized evaluation engine and view specification across all asset sub-trees providing uniform 12-parameter valuation, performance, risk, and tax tracking.
- `asset-transactions`: Dedicated per-asset transaction ledger capturing all credit/debit cashflows and feeding exact cashflow dates into the dynamic XIRR calculation engine.

### Modified Capabilities
- `wealth-dashboard`: Workspace navigation requirement updated to include `Asset Evaluation` and `Transactions` under every asset sub-domain tree in the sidebar layout.

## Impact

- **Frontend Navigation**: Updates `frontend/src/assets/AssetsLayout.tsx` to add `Asset Evaluation` and `Transactions` routes under all 8 asset domains.
- **Frontend Views**: Adds `*AssetEvaluationView.tsx` and `*TransactionsView.tsx` in each domain folder (`indian-etfs`, `indian-lt-stocks`, `us-stocks-etfs`, `esops-rsus`, `fixed-deposits`, `indian-bonds`, `pf`, `indian-swing-trading`).
- **Shared Types & Analytics**: Defines `AssetEvaluationMetrics` and `AssetTransaction` data models and utility for mathematical XIRR computation.
- **Routing**: Expands `frontend/src/App.tsx` routes under `/assets`.
