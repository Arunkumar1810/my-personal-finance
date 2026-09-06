## Context

The personal finance application tracks 8 asset domains under the `/assets` route (`indian-etfs`, `indian-lt-stocks`, `us-stocks-etfs`, `esops-rsus`, `fixed-deposits`, `indian-bonds`, `pf`, and `indian-swing-trading`). Currently, these domains have disparate views (such as `HoldingsView`, `ValuationView`, or `ActiveTradesPage`) without a consistent evaluation framework or a dedicated cashflow transaction ledger. Users must mentally calculate their real rate of return and navigate between disconnected pages to understand their capital inflows, outflows, and net asset health.

This design introduces a uniform, co-located architecture:
1. Every asset sub-domain gains an **`Asset Evaluation`** view rendering 12 identical parameters.
2. Every asset sub-domain gains a **`Transactions`** view tracking current valuation and all historical debits and credits.
3. An internal **XIRR Engine** dynamically calculates the annualized return displayed on the Evaluation view from the cashflows and dates in the Transactions ledger.

---

## Goals / Non-Goals

**Goals:**
- Provide a standardized, identical 12-parameter evaluation dashboard for every asset class.
- Co-locate all evaluation and transaction views inside their respective asset directories (`src/assets/<domain>/`) rather than a centralized common directory.
- Build a generic transaction ledger recording credits (inflows) and debits (outflows) alongside current market valuation.
- Implement a deterministic client-side Newton-Raphson XIRR calculation engine that binds transaction cashflows to the evaluation view's annualized return.
- Integrate `Asset Evaluation` and `Transactions` as the top-two navigation links in each asset's sidebar sub-tree in `AssetsLayout.tsx`.

**Non-Goals:**
- Altering the backend SQLite cache or changing Kite Connect / Google Sheets external sync runners.
- Modifying or deprecating existing domain-specific detail views (e.g. `IndianLtStocksHoldingsView`, `FixedDepositsActiveView`, etc.).
- Introducing heavy external financial calculation libraries; XIRR will be implemented natively in TypeScript.

---

## Decisions

### Decision 1: Co-Located Sub-Tree Component Architecture
* **Choice**: Create `<Domain>AssetEvaluationView.tsx` and `<Domain>TransactionsView.tsx` inside each domain directory (`src/assets/<domain>/`), with routes `/assets/<domain>/asset-evaluation` and `/assets/<domain>/transactions`.
* **Rationale**: Satisfies the explicit requirement that each dashboard lives within each asset's sub-tree, providing clear code ownership and modularity per asset class.
* **Alternative Considered**: A single centralized route `/assets/:domain/evaluation`. Rejected because it creates a monolithic catch-all component that couples domain concerns and violates sub-tree locality.

### Decision 2: Shared Presenter and Standardized Interface Contract
* **Choice**: Define a strict TypeScript contract `AssetEvaluationMetrics` (the 12 parameters) and `AssetTransaction` in `src/types/asset-evaluation.ts`. Provide lightweight reusable presenter shells (`AssetEvaluationTemplate` and `AssetTransactionsTemplate`) under `src/assets/shared/` that each domain view instantiates with its localized data feed.
* **Rationale**: Combines 100% parameter uniformity and DRY UI rendering with strict sub-tree co-location and domain autonomy.

### Decision 3: Native Newton-Raphson XIRR Engine
* **Choice**: Implement a zero-dependency financial XIRR function `calculateXIRR(cashflows: { date: Date, amount: number }[], terminalValue: number, asOfDate: Date): number` in `src/services/xirrCalculator.ts`.
* **Rationale**: XIRR solves the equation $\sum \frac{C_i}{(1 + r)^{(d_i - d_0)/365}} = 0$. The Newton-Raphson method converges in fewer than 20 iterations with $O(N)$ complexity, executing in under 2ms directly in browser memory without server round-trips.

### Decision 4: Sidebar Navigation Priority in AssetsLayout.tsx
* **Choice**: Position `Asset Evaluation` as item #1 and `Transactions` as item #2 under each asset's collapsible section, followed by domain-specific holdings/valuation views.
* **Rationale**: Establishes a predictable, standardized navigation hierarchy across all 8 asset domains while preserving quick access to specialized views.

---

## Risks / Trade-offs

* **[Risk] Insufficient transaction cashflows to compute XIRR (e.g. single investment with no exit)**
  ➔ *Mitigation*: The XIRR engine checks if cashflows have at least one debit and terminal positive value. If the investment period is under 30 days or cashflows do not alternate signs, the UI gracefully displays Absolute Return and marks XIRR as `"N/A (Holding < 30D)"`.

* **[Risk] Multiple domain files leading to boilerplate duplication**
  ➔ *Mitigation*: The presentation logic is encapsulated in `AssetEvaluationTemplate` and `AssetTransactionsTemplate` in `src/assets/shared/`. Domain views simply pass their configured metrics, transaction rows, and mock/live adapters.

* **[Risk] Performance on large transaction sets**
  ➔ *Mitigation*: Standard personal portfolios have fewer than 2,000 transactions per asset class. The Newton-Raphson solver memoizes intermediate step computations with `useMemo`.

---

## Migration & Implementation Plan

1. **Step 1**: Create data models in `src/types/asset-evaluation.ts` and the XIRR mathematical solver in `src/services/xirrCalculator.ts`.
2. **Step 2**: Create reusable layout templates `AssetEvaluationTemplate.tsx` and `AssetTransactionsTemplate.tsx` in `src/assets/shared/`.
3. **Step 3**: Implement co-located view components across all 8 asset sub-trees.
4. **Step 4**: Update `AssetsLayout.tsx` navigation tree and `App.tsx` router configuration.
5. **Step 5**: Verify navigation, parameter uniformity, transaction ledger filtering, and dynamic XIRR calculation across all asset domains.
