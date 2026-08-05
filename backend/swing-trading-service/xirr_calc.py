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

def calculate_xirr(cash_flows: List[Dict[str, Any]], guess: float = 0.1, max_iter: int = 100, tol: float = 1e-6) -> float:
    """
    Calculate the Extended Internal Rate of Return (XIRR).
    cash_flows should be a list of dictionaries with 'date' and 'amount'.
    """
    if not cash_flows:
        return 0.0

    # Parse dates and sort
    parsed_cfs = []
    for cf in cash_flows:
        # Handle string dates, assuming ISO format or similar
        d = cf['date']
        if isinstance(d, str):
            # Extract just the date part if it's datetime string
            d = datetime.datetime.fromisoformat(d.replace('Z', '+00:00')).date()
        parsed_cfs.append((d, float(cf['amount'])))
        
    parsed_cfs.sort(key=lambda x: x[0])
    
    # Check if there are both positive and negative cash flows
    amounts = [cf[1] for cf in parsed_cfs]
    if max(amounts) <= 0 or min(amounts) >= 0:
        return 0.0 # Cannot compute XIRR if flows are all same sign
        
    rate = guess
    for _ in range(max_iter):
        f_val = xnpv(rate, parsed_cfs)
        f_deriv = xnpv_derivative(rate, parsed_cfs)
        
        if abs(f_deriv) < 1e-10:
            break # Avoid division by zero
            
        rate_new = rate - f_val / f_deriv
        
        if abs(rate_new - rate) < tol:
            return rate_new
            
        rate = rate_new
        
        # Don't let rate drop below -100%
        if rate <= -1.0:
            rate = -0.999999
            
    # If it fails to converge, return the last calculated rate or 0
    # In a real app we might want to raise an exception or try a different solver
    return rate
