from fastapi import APIRouter

router = APIRouter(tags=["fixed-deposits"])

@router.get("/api/assets/fixed-deposits/active")
def get_active_fds():
    return {
        "deposits": [
            {"bank": "HDFC Bank", "principal": 500000, "rate": 7.25, "start_date": "2024-03-01", "maturity_date": "2027-03-01", "maturity_amount": 620500},
            {"bank": "ICICI Bank", "principal": 300000, "rate": 7.10, "start_date": "2024-06-15", "maturity_date": "2026-06-15", "maturity_amount": 345200}
        ]
    }

@router.get("/api/assets/fixed-deposits/matured")
def get_matured_fds():
    return {
        "deposits": [
            {"bank": "SBI", "principal": 200000, "rate": 6.8, "start_date": "2023-01-10", "maturity_date": "2025-01-10", "maturity_amount": 228400, "status": "closed"}
        ]
    }
