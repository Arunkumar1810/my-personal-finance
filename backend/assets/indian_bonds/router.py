from fastapi import APIRouter

router = APIRouter(tags=["indian-bonds"])

@router.get("/api/assets/indian-bonds/holdings")
def get_bonds_holdings():
    return {
        "bonds": [
            {"name": "GOI 7.18% GS 2033", "face_value": 100000, "coupon": 7.18, "frequency": "Semi-Annual", "next_coupon": "2026-11-14", "ytm": 7.12},
            {"name": "NHAI 54EC Capital Gain Bond", "face_value": 200000, "coupon": 5.25, "frequency": "Annual", "next_coupon": "2026-12-31", "ytm": 5.25}
        ]
    }

@router.get("/api/assets/indian-bonds/valuation")
def get_bonds_valuation():
    return {
        "total_face_value": 300000,
        "current_market_value": 304500,
        "weighted_avg_yield": 6.54
    }
