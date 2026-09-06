import React from 'react';
import { NavLink } from 'react-router-dom';
import type { AssetEvaluationMetrics } from '../../types/asset-evaluation';

interface AssetEvaluationTemplateProps {
  metrics: AssetEvaluationMetrics;
  transactionsRoute: string;
  holdingsRoute?: string;
  children?: React.ReactNode;
}

export function AssetEvaluationTemplate({
  metrics,
  transactionsRoute,
  holdingsRoute,
  children,
}: AssetEvaluationTemplateProps) {
  const isPositiveGain = metrics.totalGainLoss.amount >= 0;
  const isPositive1D = metrics.periodDelta.amount >= 0;
  const isPositiveAlpha = metrics.benchmarkAlpha.alphaSpread >= 0;

  const formatINR = (val: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="max-w-6xl space-y-6">
      {/* Top Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {metrics.assetTitle}
            </h2>
            <span className="bg-sky-500/10 text-sky-400 text-xs px-2.5 py-0.5 rounded-full border border-sky-500/20 font-medium">
              Asset Evaluation
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Standardized multi-parameter evaluation & performance diagnostics
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Sync Status Badge */}
          <div className="flex items-center gap-2 bg-[#16161D] border border-[#2C2C35] px-3 py-1.5 rounded-lg text-xs font-mono text-gray-300">
            <span
              className={`w-2 h-2 rounded-full ${
                metrics.syncMetadata.status === 'synced'
                  ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]'
                  : 'bg-amber-400'
              }`}
            />
            <span>{metrics.syncMetadata.source}</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-400">{metrics.syncMetadata.lastUpdated}</span>
          </div>

          <NavLink
            to={transactionsRoute}
            className="bg-[#2C2C35] hover:bg-[#383844] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5"
          >
            <span>Transactions</span>
            <span className="text-xs bg-sky-400/20 text-sky-300 px-1.5 py-0.5 rounded">Ledger</span>
          </NavLink>

          {holdingsRoute && (
            <NavLink
              to={holdingsRoute}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Holdings
            </NavLink>
          )}
        </div>
      </header>

      {/* Hero Metric Ribbon (5 Universal Financial Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1: Current Valuation */}
        <div className="bg-[#16161D] border border-[#2C2C35] p-5 rounded-2xl">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Current Valuation
          </div>
          <div className="text-2xl font-bold font-mono text-white mt-1">
            {formatINR(metrics.currentValuation)}
          </div>
          <div className="text-xs text-sky-400 mt-2 font-medium">
            {metrics.netWorthAllocation.actualPercent.toFixed(1)}% of Net Worth
          </div>
        </div>

        {/* Card 2: Invested Capital */}
        <div className="bg-[#16161D] border border-[#2C2C35] p-5 rounded-2xl">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Invested Capital
          </div>
          <div className="text-2xl font-bold font-mono text-white mt-1">
            {formatINR(metrics.investedCapital)}
          </div>
          <div className="text-xs text-gray-400 mt-2">
            {metrics.holdingsCount} Active {metrics.holdingsCount === 1 ? 'Holding' : 'Holdings'}
          </div>
        </div>

        {/* Card 3: Total Gain / Loss */}
        <div className="bg-[#16161D] border border-[#2C2C35] p-5 rounded-2xl">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Total Gain / Loss
          </div>
          <div
            className={`text-2xl font-bold font-mono mt-1 ${
              isPositiveGain ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {isPositiveGain ? '+' : ''}
            {formatINR(metrics.totalGainLoss.amount)}
          </div>
          <div
            className={`text-xs mt-2 font-semibold ${
              isPositiveGain ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {isPositiveGain ? '+' : ''}
            {metrics.totalGainLoss.percentage.toFixed(2)}% Return
          </div>
        </div>

        {/* Card 4: Annualized Return (XIRR) */}
        <div className="bg-[#16161D] border border-[#2C2C35] p-5 rounded-2xl relative overflow-hidden">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex justify-between">
            <span>Annualized Return</span>
            <span className="text-[10px] text-sky-400 font-mono">
              {metrics.annualizedReturn.metric}
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
            {metrics.annualizedReturn.value >= 0 ? '+' : ''}
            {metrics.annualizedReturn.value.toFixed(1)}%
          </div>
          <div className="text-xs text-gray-400 mt-2 flex items-center gap-1">
            {metrics.annualizedReturn.isComputedFromTransactions ? (
              <span className="text-emerald-400 font-medium">✓ Transaction-derived</span>
            ) : (
              <span>Standard Model</span>
            )}
          </div>
        </div>

        {/* Card 5: 1D Movement */}
        <div className="bg-[#16161D] border border-[#2C2C35] p-5 rounded-2xl">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Period Delta ({metrics.periodDelta.periodLabel})
          </div>
          <div
            className={`text-2xl font-bold font-mono mt-1 ${
              isPositive1D ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {isPositive1D ? '+' : ''}
            {formatINR(metrics.periodDelta.amount)}
          </div>
          <div
            className={`text-xs mt-2 font-semibold ${
              isPositive1D ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {isPositive1D ? '+' : ''}
            {metrics.periodDelta.percentage.toFixed(2)}%
          </div>
        </div>
      </div>

      {/* Secondary Evaluation Matrix (Parameters 6 through 12) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Allocation & Drift */}
        <div className="bg-[#16161D] border border-[#2C2C35] p-4 rounded-xl">
          <div className="text-xs font-medium text-gray-400 uppercase">
            Net Worth Allocation
          </div>
          <div className="flex justify-between items-baseline mt-2">
            <span className="text-lg font-bold text-white font-mono">
              {metrics.netWorthAllocation.actualPercent.toFixed(1)}%
            </span>
            <span className="text-xs text-gray-400">
              Target: {metrics.netWorthAllocation.targetPercent.toFixed(1)}%
            </span>
          </div>
          <div className="mt-2 text-xs">
            {Math.abs(metrics.netWorthAllocation.driftPercent) <= 2 ? (
              <span className="text-emerald-400 font-medium">✓ Balanced (Drift &lt; 2%)</span>
            ) : metrics.netWorthAllocation.driftPercent > 0 ? (
              <span className="text-amber-400 font-medium">
                Overweight (+{metrics.netWorthAllocation.driftPercent.toFixed(1)}%)
              </span>
            ) : (
              <span className="text-sky-400 font-medium">
                Underweight ({metrics.netWorthAllocation.driftPercent.toFixed(1)}%)
              </span>
            )}
          </div>
        </div>

        {/* Benchmark Alpha */}
        <div className="bg-[#16161D] border border-[#2C2C35] p-4 rounded-xl">
          <div className="text-xs font-medium text-gray-400 uppercase">
            Benchmark Comparison
          </div>
          <div className="flex justify-between items-baseline mt-2">
            <span className="text-sm font-semibold text-gray-200">
              {metrics.benchmarkAlpha.benchmarkName}
            </span>
            <span className="text-xs font-mono text-gray-400">
              {metrics.benchmarkAlpha.benchmarkReturn >= 0 ? '+' : ''}
              {metrics.benchmarkAlpha.benchmarkReturn.toFixed(1)}%
            </span>
          </div>
          <div className="mt-2 text-xs font-semibold">
            {isPositiveAlpha ? (
              <span className="text-emerald-400">
                Alpha: +{metrics.benchmarkAlpha.alphaSpread.toFixed(1)}% (Outperforming)
              </span>
            ) : (
              <span className="text-rose-400">
                Spread: {metrics.benchmarkAlpha.alphaSpread.toFixed(1)}% (Underperforming)
              </span>
            )}
          </div>
        </div>

        {/* Liquidity Tier & Runway */}
        <div className="bg-[#16161D] border border-[#2C2C35] p-4 rounded-xl">
          <div className="text-xs font-medium text-gray-400 uppercase">
            Liquidity & Runway
          </div>
          <div className="text-sm font-semibold text-white mt-2">
            {metrics.liquidityTier.label}
          </div>
          <div className="mt-2 text-xs text-gray-400">
            {metrics.liquidityTier.runwayMonthsCovered !== undefined ? (
              <span className="text-sky-400 font-medium">
                {metrics.liquidityTier.runwayMonthsCovered.toFixed(1)} Months Runway
              </span>
            ) : (
              <span>Tenure / Horizon Locked</span>
            )}
          </div>
        </div>

        {/* Tax Liability & Cashflow */}
        <div className="bg-[#16161D] border border-[#2C2C35] p-4 rounded-xl">
          <div className="text-xs font-medium text-gray-400 uppercase">
            Tax Regime & Cashflow
          </div>
          <div className="text-sm font-semibold text-white mt-2 truncate" title={metrics.estimatedTaxLiability.taxRegime}>
            {metrics.estimatedTaxLiability.taxRegime}
          </div>
          <div className="mt-2 text-xs text-gray-400 flex justify-between">
            <span>Accrued Tax:</span>
            <span className="text-amber-400 font-mono font-medium">
              {formatINR(metrics.estimatedTaxLiability.amount)}
            </span>
          </div>
        </div>
      </div>

      {/* Children Domain-Specific Overview Slot */}
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}
