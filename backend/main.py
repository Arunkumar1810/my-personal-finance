import asyncio
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, Request, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, RedirectResponse
import grpc
import sys
import os

# Add swing-trading-service to path so we can import protos
sys.path.append(os.path.join(os.path.dirname(__file__), 'swing-trading-service'))
from protos import holdings_pb2, holdings_pb2_grpc
from kite_client import get_kite_login_url, authenticate_kite
from tick_consumer import consume_ticks, consume_unified_updates
from connection_manager import manager
from pydantic import BaseModel
from console_client import authenticate_console, fetch_and_parse_ledger
from database import (
    get_transactions, save_transaction, wipe_transactions,
    get_broker_credentials, save_broker_credentials, save_raw_executions, get_raw_executions
)
from settings import settings
from kiteconnect import KiteConnect



@asynccontextmanager
async def lifespan(app: FastAPI):
    # Start the gRPC background consumer
    consumer_task = asyncio.create_task(consume_ticks())
    unified_task = asyncio.create_task(consume_unified_updates())
    yield
    # Cancel task on shutdown
    consumer_task.cancel()
    unified_task.cancel()

app = FastAPI(title="Monolith API Gateway", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/auth/login-url")
def auth_login_url():
    url = get_kite_login_url()
    if url:
        return {"url": url}
    else:
        raise HTTPException(status_code=500, detail="Kite API Key not configured")

@app.get("/api/auth/callback")
def auth_callback(request_token: str):
    kite = authenticate_kite(request_token=request_token)
    if kite:
        return RedirectResponse(url="http://localhost:5173/settings?auth=success")
    else:
        return RedirectResponse(url="http://localhost:5173/settings?auth=error")

@app.websocket("/ws/holdings")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)

def get_grpc_stub():
    # Connect to the Swing-Trading Service gRPC server
    channel = grpc.insecure_channel('localhost:50052')
    return holdings_pb2_grpc.KiteServiceStub(channel)

@app.get("/api/holdings")
async def get_holdings():
    stub = get_grpc_stub()
    request = holdings_pb2.HoldingsRequest()
    
    try:
        # Task 1.2 & 2.1: 5-second context timeout wrapper for gRPC calls
        response = stub.GetHoldings(request, timeout=5.0)
        
        # Task 2.2: Handle gRPC response serialization to JSON
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
        # Task 2.3: Return HTTP 504 on DeadlineExceeded
        if e.code() == grpc.StatusCode.DEADLINE_EXCEEDED:
            raise HTTPException(status_code=504, detail="Gateway Timeout: Swing-Trading Service took too long to respond.")
        # Catch other errors
        raise HTTPException(status_code=502, detail=f"Bad Gateway: {e.details()}")

class TransactionCreate(BaseModel):
    date: str
    amount: float
    type: str

@app.get("/api/portfolio-valuation")
async def get_portfolio_valuation():
    stub = get_grpc_stub()
    request = holdings_pb2.PortfolioValuationRequest()
    
    try:
        response = stub.GetPortfolioValuation(request, timeout=5.0)
        transactions = []
        for tx in response.transactions:
            transactions.append({
                "date": tx.date,
                "amount": tx.amount,
                "type": tx.type
            })
            
        return {
            "current_value": response.current_value,
            "available_funds": response.available_funds,
            "xirr": response.xirr,
            "transactions": transactions
        }
    except grpc.RpcError as e:
        if e.code() == grpc.StatusCode.DEADLINE_EXCEEDED:
            raise HTTPException(status_code=504, detail="Gateway Timeout: Swing-Trading Service took too long to respond.")
        raise HTTPException(status_code=502, detail=f"Bad Gateway: {e.details()}")

@app.get("/api/transactions")
async def get_transactions_endpoint():
    try:
        transactions = get_transactions()
        return {"transactions": transactions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/transactions")
async def create_transaction(tx: TransactionCreate):
    try:
        save_transaction(tx.date, tx.amount, tx.type)
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class ConsoleLoginRequest(BaseModel):
    user_id: str
    password: str
    totp_code: str

@app.post("/api/console/login")
async def console_login(req: ConsoleLoginRequest):
    try:
        enctoken = authenticate_console(req.user_id, req.password, req.totp_code)
        transactions = fetch_and_parse_ledger(enctoken)
        
        # Wipe old transactions and insert the new ones
        wipe_transactions()
        for tx in transactions:
            save_transaction(tx["date"], tx["amount"], tx["type"])
            
        return {"status": "success", "fetched_transactions_count": len(transactions)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


class BrokerCredentials(BaseModel):
    api_key: str
    api_secret: str

@app.get("/api/broker/credentials")
async def get_broker_credentials_endpoint():
    creds = get_broker_credentials(user_id="default")
    if creds:
        return {"api_key": creds["api_key"], "has_secret": True}
    elif settings.KITE_API_KEY:
        # Fallback to .env
        return {"api_key": settings.KITE_API_KEY, "has_secret": bool(settings.KITE_API_SECRET)}
    return {}

@app.post("/api/broker/credentials")
async def save_broker_credentials_endpoint(creds: BrokerCredentials):
    try:
        save_broker_credentials("default", creds.api_key, creds.api_secret)
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/broker/verify")
async def verify_broker_connection():
    creds = get_broker_credentials("default")
    api_key = creds["api_key"] if creds else settings.KITE_API_KEY
    if not api_key:
        raise HTTPException(status_code=400, detail="No credentials found")
    
    try:
        kite = KiteConnect(api_key=api_key)
        # A true verification requires logging in. Since we don't have an access token yet,
        # we can just return the login url for the user to proceed.
        login_url = kite.login_url()
        return {"status": "success", "login_url": login_url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/broker/sync")
async def sync_broker_trades():
    # Trade Ingestion Engine
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
        
        # Fetch trades for the day (Kite's trades endpoint returns today's trades)
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

@app.get("/api/broker/executions")
async def get_raw_executions_endpoint():
    try:
        executions = get_raw_executions("default")
        return {"executions": executions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class CreateCampaignRequest(BaseModel):
    ticker: str
    execution_ids: list[int]

@app.post("/api/campaigns")
async def create_campaign(req: CreateCampaignRequest):
    try:
        from database import create_swing_campaign
        campaign_id = create_swing_campaign("default", req.ticker, req.execution_ids)
        return {"status": "success", "campaign_id": campaign_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/campaigns")
async def get_campaigns_endpoint():
    try:
        from database import get_swing_campaigns
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

@app.patch("/api/campaigns/{campaign_id}")
async def patch_campaign(campaign_id: int, req: UpdateCampaignRequest):
    try:
        from database import update_swing_campaign
        update_swing_campaign(
            campaign_id, 
            strategy=req.strategy, 
            sell_reason=req.sell_reason, 
            emotion=req.emotion, 
            regret_metric=req.regret_metric, 
            rationale=req.rationale
        )
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
