## 1. Type Definitions & Analytical Services

- [x] 1.1 Create `src/types/asset-evaluation.ts` defining `AssetEvaluationMetrics`, `AssetTransaction`, and `CashflowSchedule` interfaces.
- [x] 1.2 Implement the Newton-Raphson XIRR mathematical solver in `src/services/xirrCalculator.ts` with irregular date intervals and terminal valuation handling.
- [x] 1.3 Add unit validation for `xirrCalculator.ts` confirming mathematical convergence against known SIP and dividend cashflow series.

## 2. Reusable Presentation Shells

- [x] 2.1 Create `src/assets/shared/AssetEvaluationTemplate.tsx` rendering the standardized 12-parameter hero metrics, benchmark alpha, allocation drift, and health indicators.
- [x] 2.2 Create `src/assets/shared/AssetTransactionsTemplate.tsx` rendering the valuation header, summary metrics, and credit/debit transaction ledger with filter controls.

## 3. Co-Located Views for Equity & Trading Domains

- [x] 3.1 Create `IndianEtfsAssetEvaluationView.tsx` and `IndianEtfsTransactionsView.tsx` in `src/assets/indian-etfs/`.
- [x] 3.2 Create `IndianLtStocksAssetEvaluationView.tsx` and `IndianLtStocksTransactionsView.tsx` in `src/assets/indian-lt-stocks/`.
- [x] 3.3 Create `UsStocksAssetEvaluationView.tsx` and `UsStocksTransactionsView.tsx` in `src/assets/us-stocks-etfs/`.
- [x] 3.4 Create `IndianSwingTradingAssetEvaluationView.tsx` and `IndianSwingTradingTransactionsView.tsx` in `src/assets/indian-swing-trading/`.

## 4. Co-Located Views for Fixed Income & Alternative Domains

- [x] 4.1 Create `FixedDepositsAssetEvaluationView.tsx` and `FixedDepositsTransactionsView.tsx` in `src/assets/fixed-deposits/`.
- [x] 4.2 Create `EsopsAssetEvaluationView.tsx` and `EsopsTransactionsView.tsx` in `src/assets/esops-rsus/`.
- [x] 4.3 Create `IndianBondsAssetEvaluationView.tsx` and `IndianBondsTransactionsView.tsx` in `src/assets/indian-bonds/`.
- [x] 4.4 Create `PfAssetEvaluationView.tsx` and `PfTransactionsView.tsx` in `src/assets/pf/`.

## 5. Navigation & Route Wiring

- [x] 5.1 Update `src/assets/AssetsLayout.tsx` to insert `Asset Evaluation` and `Transactions` as leading links under each of the 8 asset collapsible sections.
- [x] 5.2 Update `src/App.tsx` routing configuration to mount `/assets/<domain>/asset-evaluation` and `/assets/<domain>/transactions` for all 8 domains.

## 6. Verification & End-to-End Testing

- [x] 6.1 Execute frontend typechecking and linting to verify zero broken imports or structural regressions.
- [x] 6.2 Verify browser navigation across all 8 asset domains, confirming identical parameter presentation and reactive XIRR computation from transaction cashflows.
