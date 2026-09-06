from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import grpc
import sys
import os
import asyncio

# Include swing-trading-service in path for protos and database modules
swing_service_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'swing-trading-service')
if swing_service_dir not in sys.path:
    sys.path.append(swing_service_dir)

from protos import holdings_pb2, holdings_pb2_grpc
from database import (
    get_transactions, save_transaction, wipe_transactions,
    get_broker_credentials, save_broker_credentials, save_raw_executions, get_raw_executions,
    create_swing_campaign, add_executions_to_campaign, get_swing_campaigns, update_swing_campaign
)
from settings import settings
from kiteconnect import KiteConnect
from .console_client import authenticate_console, fetch_and_parse_ledger, fetch_and_parse_tradebook

router = APIRouter(tags=["indian-swing-trading"])

def get_grpc_stub():
    if 'main' in sys.modules and hasattr(sys.modules['main'], 'get_grpc_stub'):
        fn = getattr(sys.modules['main'], 'get_grpc_stub')
        if fn is not get_grpc_stub:
            return fn()
    channel = grpc.insecure_channel('localhost:50052')
    return holdings_pb2_grpc.KiteServiceStub(channel)

# -----------------
# 1. Holdings
# -----------------
@router.get("/api/holdings")
async def get_holdings():
    stub = get_grpc_stub()
    request = holdings_pb2.HoldingsRequest()
    try:
        response = stub.GetHoldings(request, timeout=5.0)
        holdings = []
        for h in response.holdings:
            holdings.append({
                "tradingsymbol": h.tradingsymbol,
                "exchange": h.exchange,
                "instrument_token": h.instrument_token,
                "quantity": h.quantity,
                "average_price": h.average_price,
                "last_price": h.last_price,
                "pnl": h.pnl
            })
        return JSONResponse(content={"holdings": holdings, "fallback": response.fallback})
    except grpc.RpcError as e:
        if e.code() == grpc.StatusCode.DEADLINE_EXCEEDED:
            raise HTTPException(status_code=504, detail="Gateway Timeout: Swing-Trading Service took too long to respond.")
        raise HTTPException(status_code=502, detail=f"Bad Gateway: {e.details()}")

# -----------------
# 2. Transactions
# -----------------
class TransactionCreate(BaseModel):
    date: str
    amount: float
    type: str

@router.get("/api/transactions")
async def get_transactions_endpoint():
    try:
        transactions = get_transactions()
        return {"transactions": transactions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/api/transactions")
async def create_transaction(tx: TransactionCreate):
    try:
        save_transaction(tx.date, tx.amount, tx.type)
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# -----------------
# 3. Console Sync
# -----------------
class ConsoleLoginRequest(BaseModel):
    user_id: str
    password: str
    totp_code: str

@router.post("/api/console/login")
async def console_login(req: ConsoleLoginRequest):
    try:
        enctoken = authenticate_console(req.user_id, req.password, req.totp_code)
        transactions = fetch_and_parse_ledger(enctoken)
        wipe_transactions()
        for tx in transactions:
            save_transaction(tx["date"], tx["amount"], tx["type"])
        return {"status": "success", "fetched_transactions_count": len(transactions)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class TradebookSyncRequest(BaseModel):
    user_id: str
    password: str
    totp_code: str
    from_date: str | None = None
    to_date: str | None = None

@router.post("/api/console/tradebook-sync")
async def console_tradebook_sync(req: TradebookSyncRequest):
    try:
        auth_data = authenticate_console(req.user_id, req.password, req.totp_code)
        parsed_executions = fetch_and_parse_tradebook(
            auth_data=auth_data,
            from_date=req.from_date,
            to_date=req.to_date
        )
        count = save_raw_executions(parsed_executions, "default")
        return {
            "status": "success",
            "synced_count": count,
            "total_fetched": len(parsed_executions)
        }
    except Exception as e:
        error_msg = str(e)
        if any(keyword in error_msg for keyword in ["Login failed", "2FA failed", "Failed to extract enctoken"]):
            raise HTTPException(status_code=401, detail=error_msg)
        raise HTTPException(status_code=500, detail=error_msg)

# -----------------
# 4. Broker Credentials & Sync
# -----------------
class BrokerCredentials(BaseModel):
    api_key: str
    api_secret: str

@router.get("/api/broker/credentials")
async def get_broker_credentials_endpoint():
    creds = get_broker_credentials(user_id="default")
    if creds:
        return {"api_key": creds["api_key"], "has_secret": True}
    elif settings.KITE_API_KEY:
        return {"api_key": settings.KITE_API_KEY, "has_secret": bool(settings.KITE_API_SECRET)}
    return {}

@router.post("/api/broker/credentials")
async def save_broker_credentials_endpoint(creds: BrokerCredentials):
    try:
        save_broker_credentials("default", creds.api_key, creds.api_secret)
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/api/broker/verify")
async def verify_broker_connection():
    creds = get_broker_credentials("default")
    api_key = creds["api_key"] if creds else settings.KITE_API_KEY
    if not api_key:
        raise HTTPException(status_code=400, detail="No credentials found")
    try:
        kite = KiteConnect(api_key=api_key)
        login_url = kite.login_url()
        return {"status": "success", "login_url": login_url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/api/broker/sync")
async def sync_broker_trades():
    from kite_client import load_access_token
    creds = get_broker_credentials("default")
    api_key = creds["api_key"] if creds else settings.KITE_API_KEY
    if not api_key:
        raise HTTPException(status_code=400, detail="No credentials found")
    access_token = load_access_token()
    if not access_token:
        raise HTTPException(status_code=401, detail="Not authenticated with Kite (missing access token)")
    try:
        kite = KiteConnect(api_key=api_key)
        kite.set_access_token(access_token)
        trades = kite.trades()
        parsed_executions = []
        for t in trades:
            parsed_executions.append({
                "ticker": t.get("tradingsymbol"),
                "side": t.get("transaction_type"),
                "quantity": float(t.get("quantity", 0)),
                "price": float(t.get("average_price", 0)),
                "timestamp": str(t.get("fill_timestamp", t.get("order_timestamp")))
            })
        count = save_raw_executions(parsed_executions, "default")
        return {"status": "success", "synced_count": count}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/api/broker/executions")
async def get_raw_executions_endpoint():
    try:
        executions = get_raw_executions("default")
        return {"executions": executions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# -----------------
# 5. Campaigns & Analysis
# -----------------
class CreateCampaignRequest(BaseModel):
    ticker: str
    execution_ids: list[int]

@router.post("/api/campaigns")
async def create_campaign(req: CreateCampaignRequest):
    try:
        campaign_id = create_swing_campaign("default", req.ticker, req.execution_ids)
        return {"status": "success", "campaign_id": campaign_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class AddExecutionsRequest(BaseModel):
    execution_ids: list[int]

@router.post("/api/campaigns/{campaign_id}/executions")
async def add_executions_to_campaign_endpoint(campaign_id: int, req: AddExecutionsRequest):
    try:
        add_executions_to_campaign(campaign_id, req.execution_ids)
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/api/campaigns")
async def get_campaigns_endpoint():
    try:
        campaigns = get_swing_campaigns("default")
        return {"campaigns": campaigns}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class UpdateCampaignRequest(BaseModel):
    strategy: str | None = None
    sell_reason: str | None = None
    emotion: str | None = None
    regret_metric: int | None = None
    rationale: str | None = None
    planned_risk: float | None = None
    planned_reward: float | None = None
    status: str | None = None

@router.patch("/api/campaigns/{campaign_id}")
async def patch_campaign(campaign_id: int, req: UpdateCampaignRequest):
    try:
        update_swing_campaign(
            campaign_id, 
            strategy=req.strategy, 
            sell_reason=req.sell_reason, 
            emotion=req.emotion, 
            regret_metric=req.regret_metric, 
            rationale=req.rationale,
            planned_risk=req.planned_risk,
            planned_reward=req.planned_reward,
            status=req.status
        )
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/api/dashboard/daily-pnl")
async def get_daily_pnl():
    try:
        campaigns = get_swing_campaigns("default")
        daily_pnl = {}
        for camp in campaigns:
            if camp["status"] == "closed":
                date_str = camp["created_at"].split(" ")[0]
                pnl = camp.get("realized_pnl", 0)
                daily_pnl[date_str] = daily_pnl.get(date_str, 0) + pnl
        return {"daily_pnl": daily_pnl}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/api/campaigns/{campaign_id}/ai-analysis")
async def generate_campaign_ai_analysis(campaign_id: int):
    try:
        campaigns = get_swing_campaigns("default")
        camp = next((c for c in campaigns if c["id"] == campaign_id), None)
        if not camp:
            raise HTTPException(status_code=404, detail="Campaign not found")
        await asyncio.sleep(1)
        mock_analysis = f"""### AI Post-Mortem Critique
Based on your rationale ("{camp.get('rationale', 'No rationale provided')}"), your timing was evaluated. The exit price of ₹{camp.get('exit_price', 0):.2f} was triggered. Emotional factors played a role.

### Counter-Factual Scenarios
- **Scenario A (Holding to Planned Target):** If you had held to the original target, your P/L would align better with the planned reward of ₹{camp.get('planned_reward') or 'N/A'}.
- **Scenario B (Alternative Entry):** A slightly later entry could have reduced drawdown.
"""
        update_swing_campaign(campaign_id, ai_analysis=mock_analysis)
        return {"ai_analysis": mock_analysis}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
