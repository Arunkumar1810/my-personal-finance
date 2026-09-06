import { useMemo } from 'react';
import { AssetEvaluationTemplate } from '../shared/AssetEvaluationTemplate';
import type { AssetEvaluationMetrics } from '../../types/asset-evaluation';
import { calculateXirr, buildCashflowSeries } from '../../services/xirrCalculator';
import { initialIndianEtfsTransactions, INDIAN_ETFS_VALUATION } from './IndianEtfsTransactionsView';

export function IndianEtfsAssetEvaluationView() {
  const currentValuation = INDIAN_ETFS_VALUATION;
  const investedCapital = 1297500;

  // Compute dynamic XIRR directly from transactions
  const xirrResult = useMemo(() => {
    const series = buildCashflowSeries(initialIndianEtfsTransactions, currentValuation);
    return calculateXirr(series);
  }, [currentValuation]);

  const metrics: AssetEvaluationMetrics = {
    domainId: 'indian-etfs',
    assetTitle: 'Indian ETFs',
    currentValuation,
    investedCapital,
    totalGainLoss: {
      amount: currentValuation - investedCapital,
      percentage: ((currentValuation - investedCapital) / investedCapital) * 100,
    },
    annualizedReturn: {
      value: xirrResult.annualizedPercent || 15.8,
      metric: 'XIRR',
      isComputedFromTransactions: !xirrResult.isFallback,
      note: xirrResult.notes,
    },
    periodDelta: {
      amount: 4800,
      percentage: 0.34,
      periodLabel: '1D',
    },
    netWorthAllocation: {
      actualPercent: 12.4,
      targetPercent: 10.0,
      driftPercent: 2.4,
    },
    holdingsCount: 4,
    cashflowYield: {
      realizedAnnualAmount: 8500,
      frequency: 'Annual',
      nextExpectedDate: '2025-09-15',
      nextExpectedAmount: 11000,
    },
    liquidityTier: {
      tier: 'liquid_t1',
      label: 'Liquid (T+1 Settlement)',
      runwayMonthsCovered: 11.8,
    },
    estimatedTaxLiability: {
      amount: 14993,
      taxRegime: 'Equity LTCG (12.5% > ₹1.25L Exemption)',
      stcgAccrued: 0,
      ltcgAccrued: 14993,
    },
    benchmarkAlpha: {
      benchmarkName: 'Nifty 50 TRI',
      benchmarkReturn: 14.2,
      alphaSpread: (xirrResult.annualizedPercent || 15.8) - 14.2,
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
      transactionsRoute="/assets/indian-etfs/transactions"
      holdingsRoute="/assets/indian-etfs/holdings"
    />
  );
}
