import datetime
from typing import List, Tuple, Dict, Any

def xnpv(rate: float, cash_flows: List[Tuple[datetime.date, float]]) -> float:
    """
    Calculate the net present value of a schedule of cash flows.
    """
    if not cash_flows:
        return 0.0
        
    t0 = cash_flows[0][0]
    return sum([cf[1] / (1.0 + rate) ** ((cf[0] - t0).days / 365.0) for cf in cash_flows])

def xnpv_derivative(rate: float, cash_flows: List[Tuple[datetime.date, float]]) -> float:
    """
    Calculate the derivative of the net present value.
    """
    if not cash_flows:
        return 0.0
        
    t0 = cash_flows[0][0]
    # Derivative of f(r) = amount / (1 + r)^(t) is -t * amount / (1 + r)^(t + 1)
    return sum([
        -((cf[0] - t0).days / 365.0) * cf[1] / (1.0 + rate) ** (((cf[0] - t0).days / 365.0) + 1.0)
        for cf in cash_flows if (cf[0] - t0).days > 0
    ])

def _newton_raphson(parsed_cfs, guess, max_iter, tol):
    """Single Newton-Raphson attempt from a given starting guess."""
    rate = guess
    for _ in range(max_iter):
        f_val = xnpv(rate, parsed_cfs)
        f_deriv = xnpv_derivative(rate, parsed_cfs)
        if abs(f_deriv) < 1e-10:
            return None
        rate_new = rate - f_val / f_deriv
        if abs(rate_new - rate) < tol:
            return rate_new
        rate = rate_new
        if rate <= -1.0:
            rate = -0.999999
    return None

def calculate_xirr(cash_flows: List[Dict[str, Any]], max_iter: int = 200, tol: float = 1e-6) -> float:
    """
    Calculate the Extended Internal Rate of Return (XIRR).
    Tries multiple starting guesses to avoid Newton-Raphson convergence failures.
    cash_flows should be a list of dicts with 'date' (str/date) and 'amount' (float).
    """
    if not cash_flows:
        return 0.0

    # Parse dates and sort chronologically
    parsed_cfs = []
    for cf in cash_flows:
        d = cf['date']
        if isinstance(d, str):
            d = datetime.datetime.fromisoformat(d.replace('Z', '+00:00')).date()
        parsed_cfs.append((d, float(cf['amount'])))
    parsed_cfs.sort(key=lambda x: x[0])

    # XIRR requires both positive and negative cash flows
    amounts = [cf[1] for cf in parsed_cfs]
    if max(amounts) <= 0 or min(amounts) >= 0:
        return 0.0

    # Try several starting guesses to find the correct convergence basin
    guesses = [0.1, 0.0, -0.1, 0.5, 1.0, 2.0, -0.3, -0.5]
    for guess in guesses:
        result = _newton_raphson(parsed_cfs, guess, max_iter, tol)
        if result is not None and -0.999 < result < 100.0:
            return result

    return 0.0
