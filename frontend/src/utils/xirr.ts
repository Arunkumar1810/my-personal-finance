/**
 * Calculates the XIRR (Extended Internal Rate of Return) of a series of cash flows.
 * @param cashFlows Array of { amount, date } objects
 * @param guess Initial guess for the rate of return (default 0.1 for 10%)
 * @returns The calculated XIRR, or null if it cannot be found
 */
export function calculateXIRR(
  cashFlows: { amount: number; date: Date }[],
  guess: number = 0.1
): number | null {
  if (!cashFlows || cashFlows.length === 0) return null;

  // Ensure dates are parsed and sort by date
  const flows = cashFlows
    .map((cf) => ({
      amount: cf.amount,
      date: new Date(cf.date),
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  // Check if we have both positive and negative cash flows
  const hasPositive = flows.some((cf) => cf.amount > 0);
  const hasNegative = flows.some((cf) => cf.amount < 0);
  if (!hasPositive || !hasNegative) {
    return null; // Cannot calculate XIRR without both positive and negative flows
  }

  const t0 = flows[0].date.getTime();
  const maxIterations = 100;
  const tolerance = 1e-6;

  let rate = guess;

  // Newton-Raphson method
  for (let i = 0; i < maxIterations; i++) {
    let f = 0.0;
    let df = 0.0;

    for (let j = 0; j < flows.length; j++) {
      const t = (flows[j].date.getTime() - t0) / (1000 * 60 * 60 * 24); // days diff
      const years = t / 365.0;

      f += flows[j].amount / Math.pow(1.0 + rate, years);
      if (years > 0) {
        df -= (years * flows[j].amount) / Math.pow(1.0 + rate, years + 1.0);
      }
    }

    if (Math.abs(f) < tolerance) {
      return rate;
    }

    const newRate = rate - f / df;
    
    // Safety check for extreme rates or divergence
    if (newRate <= -1.0 || isNaN(newRate) || !isFinite(newRate)) {
      // Fallback or restart with different guess if it goes out of bounds
      rate = rate > 0 ? -0.1 : 0.1; 
      continue;
    }

    rate = newRate;
  }

  return null; // Did not converge
}
