from pydantic import BaseModel

class ScrubberPayload(BaseModel):
    months_offset: float = 0
    stress_test_drop: float = 0

class ResolveAlertPayload(BaseModel):
    title: str | None = None
    index: int | None = None
