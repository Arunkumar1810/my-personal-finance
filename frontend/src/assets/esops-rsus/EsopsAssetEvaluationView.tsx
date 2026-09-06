import { useMemo } from 'react';
import { AssetEvaluationTemplate } from '../shared/AssetEvaluationTemplate';
import type { AssetEvaluationMetrics } from '../../types/asset-evaluation';
import { calculateXirr, buildCashflowSeries } from '../../services/xirrCalculator';
import {
  initialEsopTransactions,
  ESOPS_VALUATION,
  ESOPS_INVESTED,
} from './EsopsTransactionsView';

export function EsopsAssetEvaluationView() {
  const currentValuation = ESOPS_VALUATION;
  const investedCapital = ESOPS_INVESTED;

  const xirrResult = useMemo(() => {
    const series = buildCashflowSeries(initialEsopTransactions, currentValuation);
    return calculateXirr(series);
  }, [currentValuation]);

  const metrics: AssetEvaluationMetrics = {
    domainId: 'esops-rsus',
    assetTitle: 'ESOPs & RSUs',
    currentValuation,
    investedCapital,
    totalGainLoss: {
      amount: currentValuation - investedCapital,
      percentage: ((currentValuation - investedCapital) / investedCapital) * 100,
    },
    annualizedReturn: {
      value: xirrResult.annualizedPercent || 48.2,
      metric: 'CAGR',
      isComputedFromTransactions: !xirrResult.isFallback,
      note: xirrResult.notes,
    },
    periodDelta: {
      amount: 0,
      percentage: 0,
      periodLabel: '1D (Unlisted)',
    },
    netWorthAllocation: {
      actualPercent: 9.2,
      targetPercent: 10.0,
      driftPercent: -0.8,
    },
    holdingsCount: 1, // Grant #2023-A
    cashflowYield: {
      realizedAnnualAmount: 0,
      frequency: 'Periodic',
      nextExpectedDate: 'Next Vest: 2025-10-01',
      nextExpectedAmount: 2500, // 2,500 more options
    },
    liquidityTier: {
      tier: 'locked',
      label: 'Illiquid (Secondary Window / IPO Horizon)',
      runwayMonthsCovered: undefined,
    },
    estimatedTaxLiability: {
      amount: 115440,
      taxRegime: 'Perquisite Tax at Exercise (31.2%) + CG at Sale',
      stcgAccrued: 0,
      ltcgAccrued: 115440,
    },
    benchmarkAlpha: {
      benchmarkName: 'Venture Capital Hurdle (20% p.a.)',
      benchmarkReturn: 20.0,
      alphaSpread: (xirrResult.annualizedPercent || 48.2) - 20.0,
    },
    syncMetadata: {
      lastUpdated: 'Quarterly 409A Valuation',
      source: 'Carta / Company Cap Table',
      status: 'synced',
    },
  };

  return (
    <AssetEvaluationTemplate
      metrics={metrics}
      transactionsRoute="/assets/esops/transactions"
      holdingsRoute="/assets/esops/grants"
    />
  );
}
