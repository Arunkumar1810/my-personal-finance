import { useMemo } from 'react';
import { AssetEvaluationTemplate } from '../shared/AssetEvaluationTemplate';
import type { AssetEvaluationMetrics } from '../../types/asset-evaluation';
import { calculateXirr, buildCashflowSeries } from '../../services/xirrCalculator';
import {
  initialPfTransactions,
  PF_VALUATION,
  PF_INVESTED,
} from './PfTransactionsView';

export function PfAssetEvaluationView() {
  const currentValuation = PF_VALUATION;
  const investedCapital = PF_INVESTED;

  const xirrResult = useMemo(() => {
    const series = buildCashflowSeries(initialPfTransactions, currentValuation);
    return calculateXirr(series);
  }, [currentValuation]);

  const metrics: AssetEvaluationMetrics = {
    domainId: 'pf',
    assetTitle: 'Provident Fund (EPF/PPF)',
    currentValuation,
    investedCapital,
    totalGainLoss: {
      amount: currentValuation - investedCapital,
      percentage: ((currentValuation - investedCapital) / investedCapital) * 100,
    },
    annualizedReturn: {
      value: xirrResult.annualizedPercent || 8.25,
      metric: 'CAGR',
      isComputedFromTransactions: !xirrResult.isFallback,
      note: xirrResult.notes,
    },
    periodDelta: {
      amount: 418,
      percentage: 0.02,
      periodLabel: '1D (Statutory Accrual)',
    },
    netWorthAllocation: {
      actualPercent: 16.2,
      targetPercent: 15.0,
      driftPercent: 1.2,
    },
    holdingsCount: 2, // EPF + PPF
    cashflowYield: {
      realizedAnnualAmount: 134500,
      frequency: 'Annual',
      nextExpectedDate: '2026-03-31',
      nextExpectedAmount: 152000,
    },
    liquidityTier: {
      tier: 'locked',
      label: 'Retirement Locked (Statutory Horizon)',
      runwayMonthsCovered: undefined,
    },
    estimatedTaxLiability: {
      amount: 0,
      taxRegime: 'Exempt-Exempt-Exempt (EEE) for Employee Share <= ₹2.5L/yr',
      stcgAccrued: 0,
      ltcgAccrued: 0,
    },
    benchmarkAlpha: {
      benchmarkName: 'CPI Inflation (5.8% Baseline)',
      benchmarkReturn: 5.8,
      alphaSpread: (xirrResult.annualizedPercent || 8.25) - 5.8,
    },
    syncMetadata: {
      lastUpdated: 'Monthly Payroll Run',
      source: 'EPFO UAN / Passbook Sync',
      status: 'synced',
    },
  };

  return (
    <AssetEvaluationTemplate
      metrics={metrics}
      transactionsRoute="/assets/pf/transactions"
      holdingsRoute="/assets/pf/ledger"
    />
  );
}
