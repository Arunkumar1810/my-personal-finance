from fastapi import APIRouter

router = APIRouter(tags=["us-stocks-etfs"])

@router.get("/api/assets/us-stocks/holdings")
def get_us_stocks_holdings():
    return {
        "holdings": [
            {"symbol": "VOO", "quantity": 40, "avg_price": 420.0, "current_price": 490.5, "current_value": 19620, "pnl": 2820},
            {"symbol": "AAPL", "quantity": 25, "avg_price": 170.0, "current_price": 220.0, "current_value": 5500, "pnl": 1250},
            {"symbol": "MSFT", "quantity": 15, "avg_price": 380.0, "current_price": 445.0, "current_value": 6675, "pnl": 975}
        ]
    }

@router.get("/api/assets/us-stocks/valuation")
def get_us_stocks_valuation():
    return {
        "total_invested": 26750,
        "current_value": 31795,
        "currency": "USD",
        "inr_value": 2638985,
        "cagr": 16.5
    }
