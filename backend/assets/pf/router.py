from fastapi import APIRouter

router = APIRouter(tags=["pf"])

@router.get("/api/assets/pf/ledger")
def get_pf_ledger():
    return {
        "account_no": "EPFO-TN-MAS-0012345",
        "employee_share": 420000,
        "employer_share": 135000,
        "pension_share": 85000,
        "total_balance": 640000
    }

@router.get("/api/assets/pf/analytics")
def get_pf_analytics():
    return {
        "annual_interest_rate": 8.25,
        "estimated_interest_ytd": 52800,
        "projected_retirement_corpus": 4850000
    }
