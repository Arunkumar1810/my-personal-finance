from fastapi import APIRouter
import sqlite3
import uuid
from common.database import get_wealth_db_connection
from .models import GoalPayload

router = APIRouter(tags=["goals"])

@router.get("/goals")
def get_goals():
    conn = get_wealth_db_connection()
    try:
        c = conn.cursor()
        c.execute("SELECT * FROM goals")
        goals = [dict(r) for r in c.fetchall()]
        return {"goals": goals}
    except sqlite3.OperationalError:
        return {"goals": []}
    finally:
        conn.close()

@router.post("/goals")
def save_goal(payload: GoalPayload):
    conn = get_wealth_db_connection()
    try:
        c = conn.cursor()
        gid = payload.id or f"G_{uuid.uuid4().hex[:6]}"
        c.execute("""
            INSERT INTO goals (id, name, target_amount, current_saved, target_date)
            VALUES (?, ?, ?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET
                name=excluded.name,
                target_amount=excluded.target_amount,
                current_saved=excluded.current_saved,
                target_date=excluded.target_date
        """, (gid, payload.name, payload.target_amount, payload.current_saved, payload.target_date))
        conn.commit()
        return {"status": "success", "id": gid}
    except Exception as e:
        return {"status": "error", "detail": str(e)}
    finally:
        conn.close()
