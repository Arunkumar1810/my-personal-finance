from fastapi import APIRouter

router = APIRouter(tags=["esops-rsus"])

@router.get("/api/assets/esops/vesting")
def get_esops_vesting():
    return {
        "vesting_schedule": [
            {"grant_date": "2024-01-15", "vest_date": "2025-01-15", "units": 250, "status": "vested", "exercise_price": 10.0},
            {"grant_date": "2024-01-15", "vest_date": "2026-01-15", "units": 250, "status": "vested", "exercise_price": 10.0},
            {"grant_date": "2024-01-15", "vest_date": "2027-01-15", "units": 250, "status": "unvested", "exercise_price": 10.0},
            {"grant_date": "2024-01-15", "vest_date": "2028-01-15", "units": 250, "status": "unvested", "exercise_price": 10.0}
        ]
    }

@router.get("/api/assets/esops/grants")
def get_esops_grants():
    return {
        "grants": [
            {"grant_id": "GRANT-2024-A", "total_options": 1000, "vested_options": 500, "unvested_options": 500, "fmv": 65.0, "estimated_value": 32500}
        ]
    }
