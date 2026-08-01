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
    allow_origins=["*"],
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

