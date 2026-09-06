import { useMemo } from 'react';
import { AssetEvaluationTemplate } from '../shared/AssetEvaluationTemplate';
import type { AssetEvaluationMetrics } from '../../types/asset-evaluation';
import { calculateXirr, buildCashflowSeries } from '../../services/xirrCalculator';
import {
  initialBondTransactions,
  INDIAN_BONDS_VALUATION,
  INDIAN_BONDS_INVESTED,
} from './IndianBondsTransactionsView';

export function IndianBondsAssetEvaluationView() {
  const currentValuation = INDIAN_BONDS_VALUATION;
  const investedCapital = INDIAN_BONDS_INVESTED;

  const xirrResult = useMemo(() => {
    const series = buildCashflowSeries(initialBondTransactions, currentValuation);
    return calculateXirr(series);
  }, [currentValuation]);

  const metrics: AssetEvaluationMetrics = {
    domainId: 'indian-bonds',
    assetTitle: 'Indian Bonds & SGBs',
    currentValuation,
    investedCapital,
    totalGainLoss: {
      amount: currentValuation - investedCapital,
      percentage: ((currentValuation - investedCapital) / investedCapital) * 100,
    },
    annualizedReturn: {
      value: xirrResult.annualizedPercent || 11.2,
      metric: 'XIRR',
      isComputedFromTransactions: !xirrResult.isFallback,
      note: xirrResult.notes,
    },
    periodDelta: {
      amount: 175,
      percentage: 0.02,
      periodLabel: '1D',
    },
    netWorthAllocation: {
      actualPercent: 7.8,
      targetPercent: 10.0,
      driftPercent: -2.2,
    },
    holdingsCount: 3,
    cashflowYield: {
      realizedAnnualAmount: 36920,
      frequency: 'Semi-Annual',
      nextExpectedDate: '2025-08-14',
      nextExpectedAmount: 14360,
    },
    liquidityTier: {
      tier: 'semi_liquid',
      label: 'Semi-Liquid (RFQ Secondary / Maturity)',
      runwayMonthsCovered: 9.4,
    },
    estimatedTaxLiability: {
      amount: 0,
      taxRegime: 'SGB Capital Gains Tax Exempt at Maturity; NHAI Tax Free',
      stcgAccrued: 0,
      ltcgAccrued: 0,
    },
    benchmarkAlpha: {
      benchmarkName: '10-Yr G-Sec Benchmark (7.05%)',
      benchmarkReturn: 7.05,
      alphaSpread: (xirrResult.annualizedPercent || 11.2) - 7.05,
    },
    syncMetadata: {
      lastUpdated: 'Daily Coupon Accrual',
      source: 'CCIL / CDSL Demat Sync',
      status: 'synced',
    },
  };

  return (
    <AssetEvaluationTemplate
      metrics={metrics}
      transactionsRoute="/assets/indian-bonds/transactions"
      holdingsRoute="/assets/indian-bonds/holdings"
    />
  );
}
