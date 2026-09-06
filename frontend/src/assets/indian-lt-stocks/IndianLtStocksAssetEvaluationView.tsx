import { useMemo } from 'react';
import { AssetEvaluationTemplate } from '../shared/AssetEvaluationTemplate';
import type { AssetEvaluationMetrics } from '../../types/asset-evaluation';
import { calculateXirr, buildCashflowSeries } from '../../services/xirrCalculator';
import {
  initialIndianLtStocksTransactions,
  INDIAN_LT_STOCKS_VALUATION,
  INDIAN_LT_STOCKS_INVESTED,
} from './IndianLtStocksTransactionsView';

export function IndianLtStocksAssetEvaluationView() {
  const currentValuation = INDIAN_LT_STOCKS_VALUATION;
  const investedCapital = INDIAN_LT_STOCKS_INVESTED;

  // Compute dynamic XIRR directly from transactions
  const xirrResult = useMemo(() => {
    const series = buildCashflowSeries(initialIndianLtStocksTransactions, currentValuation);
    return calculateXirr(series);
  }, [currentValuation]);

  const metrics: AssetEvaluationMetrics = {
    domainId: 'indian-lt-stocks',
    assetTitle: 'Indian Long-Term Stocks',
    currentValuation,
    investedCapital,
    totalGainLoss: {
      amount: currentValuation - investedCapital,
      percentage: ((currentValuation - investedCapital) / investedCapital) * 100,
    },
    annualizedReturn: {
      value: xirrResult.annualizedPercent || 18.6,
      metric: 'XIRR',
      isComputedFromTransactions: !xirrResult.isFallback,
      note: xirrResult.notes,
    },
    periodDelta: {
      amount: 28450,
      percentage: 0.82,
      periodLabel: '1D',
    },
    netWorthAllocation: {
      actualPercent: 42.5,
      targetPercent: 40.0,
      driftPercent: 2.5,
    },
    holdingsCount: 38,
    cashflowYield: {
      realizedAnnualAmount: 42600,
      frequency: 'Semi-Annual',
      nextExpectedDate: '2025-08-10',
      nextExpectedAmount: 22000,
    },
    liquidityTier: {
      tier: 'liquid_t1',
      label: 'Liquid (T+1 Settlement)',
      runwayMonthsCovered: 24.5,
    },
    estimatedTaxLiability: {
      amount: 89625,
      taxRegime: 'Equity LTCG (12.5% > ₹1.25L Exemption)',
      stcgAccrued: 0,
      ltcgAccrued: 89625,
    },
    benchmarkAlpha: {
      benchmarkName: 'Nifty 50 TRI',
      benchmarkReturn: 14.2,
      alphaSpread: (xirrResult.annualizedPercent || 18.6) - 14.2,
    },
    syncMetadata: {
      lastUpdated: '15m ago',
      source: 'Kite Connect API',
      status: 'synced',
    },
  };

  return (
    <AssetEvaluationTemplate
      metrics={metrics}
      transactionsRoute="/assets/indian-lt-stocks/transactions"
      holdingsRoute="/assets/indian-lt-stocks/holdings"
    />
  );
}
