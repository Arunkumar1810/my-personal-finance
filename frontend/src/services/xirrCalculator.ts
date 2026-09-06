import type { AssetTransaction, CashflowItem } from '../types/asset-evaluation';

export interface XirrResult {
  xirr: number | null; // e.g. 18.6 for 18.6%
  formatted: string; // e.g. "+18.6%" or "N/A"
  annualizedPercent: number;
  isFallback: boolean;
  notes?: string;
}

/**
 * Builds a standardized chronological cashflow series from historical transactions
 * appending current valuation as the terminal positive inflow.
 */
export function buildCashflowSeries(
  transactions: AssetTransaction[],
  currentValuation: number,
  valuationDate: string = new Date().toISOString().split('T')[0]
): CashflowItem[] {
  const completed = transactions
    .filter((t) => t.status === 'completed' && t.netCashflow !== 0)
    .map((t) => ({
      date: t.date,
      amount: t.netCashflow, // negative for investments/purchases, positive for dividends/sales
    }));

  // Append terminal current valuation if positive and active
  if (currentValuation > 0) {
    completed.push({
      date: valuationDate,
      amount: currentValuation,
    });
  }

  // Sort chronologically ascending
  completed.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return completed;
}

/**
 * Solves for XIRR using the Newton-Raphson numerical method,
 * falling back to bisection or simple return when appropriate.
 */
export function calculateXirr(
  cashflows: CashflowItem[],
  initialGuess: number = 0.1
): XirrResult {
  if (!cashflows || cashflows.length < 2) {
    return {
      xirr: null,
      formatted: 'N/A',
      annualizedPercent: 0,
      isFallback: true,
      notes: 'Need at least 2 cashflow points (initial investment and current value).',
    };
  }

  // Check that cashflows have both positive and negative entries
  let hasPositive = false;
  let hasNegative = false;
  let totalInvested = 0;
  let totalInflow = 0;

  for (const cf of cashflows) {
    if (cf.amount > 0) {
      hasPositive = true;
      totalInflow += cf.amount;
    } else if (cf.amount < 0) {
      hasNegative = true;
      totalInvested += Math.abs(cf.amount);
    }
  }

  if (!hasPositive || !hasNegative) {
    return {
      xirr: null,
      formatted: 'N/A',
      annualizedPercent: 0,
      isFallback: true,
      notes: 'Cashflows must contain both investments (outflows) and valuations/returns (inflows).',
    };
  }

  const d0 = new Date(cashflows[0].date).getTime();
  const dN = new Date(cashflows[cashflows.length - 1].date).getTime();
  const totalDays = Math.max(1, (dN - d0) / (1000 * 60 * 60 * 24));

  // If holding period is under 14 days, XIRR annualization produces distorted outliers
  if (totalDays < 14) {
    const absReturn = totalInvested > 0 ? ((totalInflow - totalInvested) / totalInvested) * 100 : 0;
    const sign = absReturn >= 0 ? '+' : '';
    return {
      xirr: absReturn,
      formatted: `${sign}${absReturn.toFixed(1)}% (Abs)`,
      annualizedPercent: absReturn,
      isFallback: true,
      notes: `Holding period (${Math.round(totalDays)} days) is too short for meaningful annualization. Showing absolute return.`,
    };
  }

  // Parse days offsets: (d_i - d_0) / 365
  const parsed = cashflows.map((cf) => ({
    amount: cf.amount,
    years: (new Date(cf.date).getTime() - d0) / (1000 * 60 * 60 * 24 * 365.25),
  }));

  // Net Present Value function
  const npv = (rate: number): number => {
    let sum = 0;
    for (const p of parsed) {
      const denom = Math.pow(1 + rate, p.years);
      if (isNaN(denom) || denom === 0) return NaN;
      sum += p.amount / denom;
    }
    return sum;
  };

  // Derivative of NPV function with respect to rate
  const dnpv = (rate: number): number => {
    let sum = 0;
    for (const p of parsed) {
      if (p.years === 0) continue;
      const denom = Math.pow(1 + rate, p.years + 1);
      if (isNaN(denom) || denom === 0) return NaN;
      sum += (-p.years * p.amount) / denom;
    }
    return sum;
  };

  // Newton-Raphson iteration
  let rate = initialGuess;
  const maxIterations = 100;
  const tolerance = 1e-5;
  let converged = false;

  for (let i = 0; i < maxIterations; i++) {
    if (rate <= -0.999) {
      rate = -0.9;
    }
    const fVal = npv(rate);
    const fPrime = dnpv(rate);

    if (isNaN(fVal) || isNaN(fPrime) || Math.abs(fPrime) < 1e-10) {
      break;
    }

    const nextRate = rate - fVal / fPrime;

    if (Math.abs(nextRate - rate) < tolerance) {
      rate = nextRate;
      converged = true;
      break;
    }

    rate = nextRate;
  }

  // Bisection fallback if Newton-Raphson failed to converge
  if (!converged || isNaN(rate) || rate < -0.99 || rate > 100) {
    let low = -0.9;
    let high = 5.0;
    let lowVal = npv(low);
    let highVal = npv(high);

    if (lowVal * highVal <= 0) {
      for (let j = 0; j < 60; j++) {
        const mid = (low + high) / 2;
        const midVal = npv(mid);
        if (Math.abs(midVal) < tolerance || (high - low) / 2 < tolerance) {
          rate = mid;
          converged = true;
          break;
        }
        if (lowVal * midVal < 0) {
          high = mid;
          highVal = midVal;
        } else {
          low = mid;
          lowVal = midVal;
        }
      }
    }
  }

  if (converged && !isNaN(rate) && rate > -1.0 && rate < 100.0) {
    const xirrPercent = rate * 100;
    const sign = xirrPercent >= 0 ? '+' : '';
    return {
      xirr: Number(xirrPercent.toFixed(2)),
      formatted: `${sign}${xirrPercent.toFixed(1)}%`,
      annualizedPercent: Number(xirrPercent.toFixed(2)),
      isFallback: false,
    };
  }

  // Graceful CAGR fallback if non-periodic solving encounters a mathematical singularity
  const years = totalDays / 365.25;
  if (totalInvested > 0 && totalInflow > 0 && years > 0.1) {
    const cagr = (Math.pow(totalInflow / totalInvested, 1 / years) - 1) * 100;
    const sign = cagr >= 0 ? '+' : '';
    return {
      xirr: Number(cagr.toFixed(2)),
      formatted: `${sign}${cagr.toFixed(1)}% (CAGR)`,
      annualizedPercent: Number(cagr.toFixed(2)),
      isFallback: true,
      notes: 'Solved via annualized CAGR approximation.',
    };
  }

  return {
    xirr: null,
    formatted: 'N/A',
    annualizedPercent: 0,
    isFallback: true,
    notes: 'Could not converge on a valid rate of return.',
  };
}
