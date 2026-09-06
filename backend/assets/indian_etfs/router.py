from fastapi import APIRouter

router = APIRouter(tags=["indian-etfs"])

@router.get("/api/assets/indian-etfs/holdings")
def get_etf_holdings():
    return {
        "holdings": [
            {"symbol": "NIFTYBEES", "quantity": 2500, "avg_price": 242.5, "current_price": 268.4, "current_value": 671000, "pnl": 64750},
            {"symbol": "JUNIORBEES", "quantity": 1200, "avg_price": 510.0, "current_price": 594.2, "current_value": 713040, "pnl": 101040},
            {"symbol": "GOLDBEES", "quantity": 5000, "avg_price": 58.2, "current_price": 66.8, "current_value": 334000, "pnl": 43000}
        ]
    }

@router.get("/api/assets/indian-etfs/valuation")
def get_etf_valuation():
    return {
        "total_invested": 1548250,
        "current_value": 1718040,
        "cagr": 14.8,
        "benchmark": "NIFTY 50 TRI"
    }
