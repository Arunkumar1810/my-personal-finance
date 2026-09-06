from fastapi import APIRouter
from common.database import get_wealth_db_connection

router = APIRouter(tags=["assets-dashboard"])

@router.get("/api/assets/summary")
def get_assets_summary():
    conn = get_wealth_db_connection()
    try:
        c = conn.cursor()
        c.execute("SELECT asset_class, count(*) as count FROM assets GROUP BY asset_class")
        breakdown = [dict(r) for r in c.fetchall()]
        return {"summary": breakdown}
    except Exception:
        return {"summary": []}
    finally:
        conn.close()
