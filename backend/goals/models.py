from pydantic import BaseModel

class GoalPayload(BaseModel):
    id: str | None = None
    name: str
    target_amount: float
    current_saved: float = 0.0
    target_date: str | None = None
