from fastapi import APIRouter
import sqlite3
from common.database import get_wealth_db_connection
from .models import ScrubberPayload, ResolveAlertPayload

router = APIRouter(tags=["wealth-dashboard"])

resolved_alerts: set[str] = set()

@router.get("/inbox")
def get_action_inbox():
    conn = get_wealth_db_connection()
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

@router.post("/scrubber")
def scrub_timeline(payload: ScrubberPayload):
    months_offset = payload.months_offset
    stress_test_drop = payload.stress_test_drop
    
    conn = get_wealth_db_connection()
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
