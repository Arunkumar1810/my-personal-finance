from fastapi import APIRouter

router = APIRouter(tags=["indian-lt-stocks"])

@router.get("/api/assets/indian-lt-stocks/holdings")
def get_lt_stocks_holdings():
    return {
        "holdings": [
            {"symbol": "RELIANCE", "quantity": 100, "avg_price": 2450.0, "current_price": 2980.0, "current_value": 298000, "pnl": 53000},
            {"symbol": "TCS", "quantity": 80, "avg_price": 3200.0, "current_price": 4120.0, "current_value": 329600, "pnl": 73600},
            {"symbol": "HDFCBANK", "quantity": 250, "avg_price": 1490.0, "current_price": 1640.0, "current_value": 410000, "pnl": 37500}
        ]
    }

@router.get("/api/assets/indian-lt-stocks/valuation")
def get_lt_stocks_valuation():
    return {
        "total_invested": 873500,
        "current_value": 1037600,
        "cagr": 18.2,
        "xirr": 19.4
    }
