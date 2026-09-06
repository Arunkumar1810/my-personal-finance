from fastapi import APIRouter
from pydantic import BaseModel
import sqlite3
import os
import uuid

router = APIRouter()

DATABASE_URL = os.path.join(os.path.dirname(__file__), "wealth_orchestrator.db")

class ScrubberPayload(BaseModel):
    months_offset: float = 0
    stress_test_drop: float = 0

class GoalPayload(BaseModel):
    id: str | None = None
    name: str
    target_amount: float
    current_saved: float = 0.0
    target_date: str | None = None

class LiabilityPayload(BaseModel):
    id: str | None = None
    name: str
    total_amount: float
    apr: float
    monthly_emi: float
    next_due_date: str | None = None
    autopay_enabled: bool = False

class ResolveAlertPayload(BaseModel):
    title: str | None = None
    index: int | None = None

def get_db_connection():
    conn = sqlite3.connect(DATABASE_URL)
    conn.row_factory = sqlite3.Row
    return conn

# In-memory resolved alert titles for local session persistence
resolved_alerts: set[str] = set()

@router.get("/inbox")
def get_action_inbox():
    conn = get_db_connection()
    try:
        c = conn.cursor()
        c.execute("SELECT * FROM liabilities")
        liabilities = c.fetchall()
        alerts = []
        for l in liabilities:
            title = f"Upcoming EMI for {l['name']}"
            if title in resolved_alerts:
                continue
            alerts.append({
                "type": "LIQUIDITY_WARNING",
                "title": title,
                "amount": l["monthly_emi"],
                "due_date": l["next_due_date"],
                "priority": "high"
            })
        return {"alerts": alerts}
    except sqlite3.OperationalError:
        return {"alerts": []}
    finally:
        conn.close()

@router.post("/inbox/resolve")
def resolve_action_inbox(payload: ResolveAlertPayload):
    if payload.title:
        resolved_alerts.add(payload.title)
    return {"status": "resolved", "resolved": list(resolved_alerts)}

@router.get("/valuations")
def get_valuations():
    conn = get_db_connection()
    try:
        c = conn.cursor()
        c.execute("SELECT a.*, sum(t.quantity) as total_qty, avg(t.price) as avg_price FROM assets a LEFT JOIN transactions t ON a.id = t.asset_id GROUP BY a.id")
        assets = [dict(r) for r in c.fetchall()]
        
        c.execute("SELECT * FROM market_prices")
        prices = {r['asset_id']: r['close_price'] for r in c.fetchall()}
        
        for a in assets:
            avg_price = a['avg_price'] if a['avg_price'] is not None else 0
            current_price = prices.get(a['id'], avg_price)
            a['current_value'] = (a['total_qty'] or 0) * current_price
            
        return {"assets": assets}
    except sqlite3.OperationalError:
        return {"assets": []}
    finally:
        conn.close()

@router.get("/liabilities")
def get_liabilities():
    conn = get_db_connection()
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
    conn = get_db_connection()
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

@router.get("/goals")
def get_goals():
    conn = get_db_connection()
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
    conn = get_db_connection()
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

@router.post("/scrubber")
def scrub_timeline(payload: ScrubberPayload):
    months_offset = payload.months_offset
    stress_test_drop = payload.stress_test_drop
    
    conn = get_db_connection()
    try:
        c = conn.cursor()
        c.execute("SELECT a.*, sum(t.quantity) as total_qty, avg(t.price) as avg_price FROM assets a LEFT JOIN transactions t ON a.id = t.asset_id GROUP BY a.id")
        assets = c.fetchall()
        c.execute("SELECT * FROM market_prices")
        prices = {r['asset_id']: r['close_price'] for r in c.fetchall()}
        
        projected_assets = []
        for a in assets:
            qty = a['total_qty'] or 0
            avg_price = a['avg_price'] if a['avg_price'] is not None else 0
            base_price = prices.get(a['id'], avg_price)
            
            projected_price = base_price * (1.0 + (0.01 * months_offset))
            if stress_test_drop:
                projected_price *= (1 - stress_test_drop / 100.0)
                
            projected_assets.append({
                "asset_id": a['id'],
                "symbol": a['symbol'],
                "name": a['name'],
                "projected_value": qty * projected_price
            })
            
        return {"projected_assets": projected_assets}
    except sqlite3.OperationalError:
        return {"projected_assets": []}
    finally:
        conn.close()


