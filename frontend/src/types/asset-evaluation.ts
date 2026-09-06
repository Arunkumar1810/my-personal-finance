export type LiquidityTier = 'instant' | 'liquid_t1' | 'semi_liquid' | 'locked';

export interface BenchmarkComparison {
  benchmarkName: string;
  benchmarkReturn: number;
  alphaSpread: number; // positive = outperforming, negative = underperforming
}

export interface CashflowYieldInfo {
  realizedAnnualAmount: number;
  frequency: 'Monthly' | 'Quarterly' | 'Semi-Annual' | 'Annual' | 'Periodic';
  nextExpectedDate?: string;
  nextExpectedAmount?: number;
}

export interface SyncMetadataInfo {
  lastUpdated: string;
  source: string; // e.g. 'Kite Connect API', 'Google Sheets CMS', 'Manual Entry', 'EPFO Portal'
  status: 'synced' | 'pending' | 'stale' | 'offline';
  syncLatencyMs?: number;
}

export interface AssetEvaluationMetrics {
  domainId: string;
  assetTitle: string;
  currentValuation: number;
  investedCapital: number;
  totalGainLoss: {
    amount: number;
    percentage: number;
  };
  annualizedReturn: {
    value: number; // e.g. 18.6 for 18.6%
    metric: 'XIRR' | 'CAGR' | 'YTM';
    isComputedFromTransactions?: boolean;
    note?: string;
  };
  periodDelta: {
    amount: number;
    percentage: number;
    periodLabel: string; // e.g. '1D' or '1M'
  };
  netWorthAllocation: {
    actualPercent: number;
    targetPercent: number;
    driftPercent: number;
  };
  holdingsCount: number;
  cashflowYield: CashflowYieldInfo;
  liquidityTier: {
    tier: LiquidityTier;
    label: string;
    runwayMonthsCovered?: number;
  };
  estimatedTaxLiability: {
    amount: number;
    taxRegime: string;
    stcgAccrued?: number;
    ltcgAccrued?: number;
  };
  benchmarkAlpha: BenchmarkComparison;
  syncMetadata: SyncMetadataInfo;
}

export type TransactionType = 'DEBIT' | 'CREDIT';

export interface AssetTransaction {
  id: string;
  date: string; // YYYY-MM-DD
  type: TransactionType; // DEBIT = capital deployment/outflow, CREDIT = realization/inflow
  description: string;
  units?: number;
  unitPrice?: number;
  grossAmount: number;
  charges?: number;
  netCashflow: number; // signed: negative for debit/outflow, positive for credit/inflow
  status: 'completed' | 'pending' | 'cancelled';
  referenceId?: string;
}

export interface CashflowItem {
  date: string; // YYYY-MM-DD
  amount: number; // signed: negative for investment, positive for returns/current value
}

export interface CashflowSchedule {
  domainId: string;
  cashflows: CashflowItem[];
  currentValuation: number;
  valuationDate: string;
}
