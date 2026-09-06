from pydantic import BaseModel

class LiabilityPayload(BaseModel):
    id: str | None = None
    name: str
    total_amount: float
    apr: float
    monthly_emi: float
    next_due_date: str | None = None
    autopay_enabled: bool = False
