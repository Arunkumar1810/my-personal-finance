import { useMemo } from 'react';
import { AssetEvaluationTemplate } from '../shared/AssetEvaluationTemplate';
import type { AssetEvaluationMetrics } from '../../types/asset-evaluation';
import { calculateXirr, buildCashflowSeries } from '../../services/xirrCalculator';
import {
  initialUsStocksTransactions,
  US_STOCKS_VALUATION,
  US_STOCKS_INVESTED,
} from './UsStocksTransactionsView';

export function UsStocksAssetEvaluationView() {
  const currentValuation = US_STOCKS_VALUATION;
  const investedCapital = US_STOCKS_INVESTED;

  const xirrResult = useMemo(() => {
    const series = buildCashflowSeries(initialUsStocksTransactions, currentValuation);
    return calculateXirr(series);
  }, [currentValuation]);

  const metrics: AssetEvaluationMetrics = {
    domainId: 'us-stocks-etfs',
    assetTitle: 'US Stocks & ETFs',
    currentValuation,
    investedCapital,
    totalGainLoss: {
      amount: currentValuation - investedCapital,
      percentage: ((currentValuation - investedCapital) / investedCapital) * 100,
    },
    annualizedReturn: {
      value: xirrResult.annualizedPercent || 22.4,
      metric: 'XIRR',
      isComputedFromTransactions: !xirrResult.isFallback,
      note: xirrResult.notes,
    },
    periodDelta: {
      amount: 14200,
      percentage: 0.51,
      periodLabel: '1D',
    },
    netWorthAllocation: {
      actualPercent: 24.6,
      targetPercent: 20.0,
      driftPercent: 4.6,
    },
    holdingsCount: 3,
    cashflowYield: {
      realizedAnnualAmount: 29200,
      frequency: 'Quarterly',
      nextExpectedDate: '2025-11-20',
      nextExpectedAmount: 7800,
    },
    liquidityTier: {
      tier: 'liquid_t1',
      label: 'Liquid (T+1 US + 2D Wire)',
      runwayMonthsCovered: 18.2,
    },
    estimatedTaxLiability: {
      amount: 75587,
      taxRegime: 'Unlisted Foreign Asset LTCG (12.5% >24m, Schedule FA)',
      stcgAccrued: 0,
      ltcgAccrued: 75587,
    },
    benchmarkAlpha: {
      benchmarkName: 'S&P 500 (INR Terms)',
      benchmarkReturn: 19.8,
      alphaSpread: (xirrResult.annualizedPercent || 22.4) - 19.8,
    },
    syncMetadata: {
      lastUpdated: '1h ago',
      source: 'Interactive Brokers / Vested Sync',
      status: 'synced',
    },
  };

  return (
    <AssetEvaluationTemplate
      metrics={metrics}
      transactionsRoute="/assets/us-stocks/transactions"
      holdingsRoute="/assets/us-stocks/holdings"
    />
  );
}
