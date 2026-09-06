import { useMemo } from 'react';
import { AssetEvaluationTemplate } from '../shared/AssetEvaluationTemplate';
import type { AssetEvaluationMetrics } from '../../types/asset-evaluation';
import { calculateXirr, buildCashflowSeries } from '../../services/xirrCalculator';
import {
  initialFdTransactions,
  FIXED_DEPOSITS_VALUATION,
  FIXED_DEPOSITS_INVESTED,
} from './FixedDepositsTransactionsView';

export function FixedDepositsAssetEvaluationView() {
  const currentValuation = FIXED_DEPOSITS_VALUATION;
  const investedCapital = FIXED_DEPOSITS_INVESTED;

  const xirrResult = useMemo(() => {
    const series = buildCashflowSeries(initialFdTransactions, currentValuation);
    return calculateXirr(series);
  }, [currentValuation]);

  const metrics: AssetEvaluationMetrics = {
    domainId: 'fixed-deposits',
    assetTitle: 'Fixed Deposits',
    currentValuation,
    investedCapital,
    totalGainLoss: {
      amount: currentValuation - investedCapital,
      percentage: ((currentValuation - investedCapital) / investedCapital) * 100,
    },
    annualizedReturn: {
      value: xirrResult.annualizedPercent || 7.35,
      metric: 'CAGR',
      isComputedFromTransactions: !xirrResult.isFallback,
      note: xirrResult.notes,
    },
    periodDelta: {
      amount: 160,
      percentage: 0.02,
      periodLabel: '1D',
    },
    netWorthAllocation: {
      actualPercent: 7.1,
      targetPercent: 10.0,
      driftPercent: -2.9,
    },
    holdingsCount: 4,
    cashflowYield: {
      realizedAnnualAmount: 56200,
      frequency: 'Quarterly',
      nextExpectedDate: '2025-06-30',
      nextExpectedAmount: 14050,
    },
    liquidityTier: {
      tier: 'instant',
      label: 'Instant Breakable (1% Premature Penalty)',
      runwayMonthsCovered: 8.5,
    },
    estimatedTaxLiability: {
      amount: 6420,
      taxRegime: 'Taxed at Slab Rate (10% TDS with Form 26AS Credit)',
      stcgAccrued: 6420,
      ltcgAccrued: 0,
    },
    benchmarkAlpha: {
      benchmarkName: 'CPI Inflation Baseline',
      benchmarkReturn: 5.8,
      alphaSpread: (xirrResult.annualizedPercent || 7.35) - 5.8,
    },
    syncMetadata: {
      lastUpdated: 'Daily Accrual',
      source: 'NetBanking / Manual Statements',
      status: 'synced',
    },
  };

  return (
    <AssetEvaluationTemplate
      metrics={metrics}
      transactionsRoute="/assets/fixed-deposits/transactions"
      holdingsRoute="/assets/fixed-deposits/active"
    />
  );
}
