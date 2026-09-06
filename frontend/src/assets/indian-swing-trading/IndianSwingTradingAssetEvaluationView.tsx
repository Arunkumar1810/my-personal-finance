import { useMemo } from 'react';
import { AssetEvaluationTemplate } from '../shared/AssetEvaluationTemplate';
import type { AssetEvaluationMetrics } from '../../types/asset-evaluation';
import { calculateXirr, buildCashflowSeries } from '../../services/xirrCalculator';
import {
  initialSwingTransactions,
  SWING_TRADING_VALUATION,
  SWING_TRADING_INVESTED,
} from './IndianSwingTradingTransactionsView';

export function IndianSwingTradingAssetEvaluationView() {
  const currentValuation = SWING_TRADING_VALUATION;
  const investedCapital = SWING_TRADING_INVESTED;

  const xirrResult = useMemo(() => {
    const series = buildCashflowSeries(initialSwingTransactions, currentValuation);
    return calculateXirr(series);
  }, [currentValuation]);

  const metrics: AssetEvaluationMetrics = {
    domainId: 'indian-swing-trading',
    assetTitle: 'Indian Swing Trading',
    currentValuation,
    investedCapital,
    totalGainLoss: {
      amount: currentValuation - investedCapital,
      percentage: ((currentValuation - investedCapital) / investedCapital) * 100,
    },
    annualizedReturn: {
      value: xirrResult.annualizedPercent || 26.4,
      metric: 'XIRR',
      isComputedFromTransactions: !xirrResult.isFallback,
      note: xirrResult.notes,
    },
    periodDelta: {
      amount: 6200,
      percentage: 1.06,
      periodLabel: '1D',
    },
    netWorthAllocation: {
      actualPercent: 5.2,
      targetPercent: 5.0,
      driftPercent: 0.2,
    },
    holdingsCount: 4,
    cashflowYield: {
      realizedAnnualAmount: 42500,
      frequency: 'Periodic',
      nextExpectedDate: 'Active Trailing SLs',
      nextExpectedAmount: 0,
    },
    liquidityTier: {
      tier: 'instant',
      label: 'High Liquidity (Intraday to T+1)',
      runwayMonthsCovered: 4.8,
    },
    estimatedTaxLiability: {
      amount: 8500,
      taxRegime: 'Speculative / Non-Speculative STCG (20%)',
      stcgAccrued: 8500,
      ltcgAccrued: 0,
    },
    benchmarkAlpha: {
      benchmarkName: 'Nifty 50 Momentum',
      benchmarkReturn: 19.6,
      alphaSpread: (xirrResult.annualizedPercent || 26.4) - 19.6,
    },
    syncMetadata: {
      lastUpdated: 'Live Streaming',
      source: 'FastAPI WebSockets / Google Sheets CMS',
      status: 'synced',
    },
  };

  return (
    <AssetEvaluationTemplate
      metrics={metrics}
      transactionsRoute="/assets/indian-swing-trading/transactions"
      holdingsRoute="/assets/indian-swing-trading/active"
    />
  );
}
