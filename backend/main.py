import asyncio
from contextlib import asynccontextmanager
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import grpc
import os
import sys

# Setup paths
backend_dir = os.path.dirname(__file__)
if backend_dir not in sys.path:
    sys.path.append(backend_dir)

swing_service_dir = os.path.join(backend_dir, 'swing-trading-service')
if swing_service_dir not in sys.path:
    sys.path.append(swing_service_dir)

from protos import holdings_pb2_grpc

from common.connection_manager import manager
from common.tick_consumer import consume_ticks, consume_unified_updates
from common.auth_router import router as auth_router

from wealth_dashboard.router import router as wealth_dashboard_router
from portfolio_valuation.router import router as portfolio_valuation_router
from liabilities.router import router as liabilities_router
from goals.router import router as goals_router
from assets.router import router as assets_router

def get_grpc_stub():
    channel = grpc.insecure_channel('localhost:50052')
    return holdings_pb2_grpc.KiteServiceStub(channel)

@asynccontextmanager
async def lifespan(app: FastAPI):
    consumer_task = asyncio.create_task(consume_ticks())
    unified_task = asyncio.create_task(consume_unified_updates())
    yield
    consumer_task.cancel()
    unified_task.cancel()

app = FastAPI(title="Personal Finance API Gateway", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1. Common / Authentication
app.include_router(auth_router)

# 2. Wealth Orchestrator Compatibility Routers (/api/orchestrator/*)
app.include_router(wealth_dashboard_router, prefix="/api/orchestrator")
app.include_router(portfolio_valuation_router, prefix="/api/orchestrator")
app.include_router(liabilities_router, prefix="/api/orchestrator")
app.include_router(goals_router, prefix="/api/orchestrator")

# 3. Direct Domain Routers
app.include_router(wealth_dashboard_router, prefix="/api/wealth-dashboard")
app.include_router(portfolio_valuation_router)
app.include_router(liabilities_router, prefix="/api")
app.include_router(goals_router, prefix="/api")

# 4. Assets Routers (Aggregate of all 9 asset classes including Indian Swing Trading)
app.include_router(assets_router)

# 5. WebSockets
@app.websocket("/ws/holdings")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)
