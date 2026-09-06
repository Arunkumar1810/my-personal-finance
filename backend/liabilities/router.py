from fastapi import APIRouter
import sqlite3
import uuid
from common.database import get_wealth_db_connection
from .models import LiabilityPayload

router = APIRouter(tags=["liabilities"])

@router.get("/liabilities")
def get_liabilities():
    conn = get_wealth_db_connection()
    try:
        c = conn.cursor()
        c.execute("SELECT * FROM liabilities")
        liabilities = [dict(r) for r in c.fetchall()]
        return {"liabilities": liabilities}
    except sqlite3.OperationalError:
        return {"liabilities": []}
    finally:
        conn.close()

@router.post("/liabilities")
def save_liability(payload: LiabilityPayload):
    conn = get_wealth_db_connection()
    try:
        c = conn.cursor()
        lid = payload.id or f"L_{uuid.uuid4().hex[:6]}"
        c.execute("""
            INSERT INTO liabilities (id, name, total_amount, apr, monthly_emi, next_due_date, autopay_enabled)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET
                name=excluded.name,
                total_amount=excluded.total_amount,
                apr=excluded.apr,
                monthly_emi=excluded.monthly_emi,
                next_due_date=excluded.next_due_date,
                autopay_enabled=excluded.autopay_enabled
        """, (lid, payload.name, payload.total_amount, payload.apr, payload.monthly_emi, payload.next_due_date, int(payload.autopay_enabled)))
        conn.commit()
        return {"status": "success", "id": lid}
    except Exception as e:
        return {"status": "error", "detail": str(e)}
    finally:
        conn.close()
