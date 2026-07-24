from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Request
from fastapi.responses import RedirectResponse
from contextlib import asynccontextmanager
from database import init_db, get_cached_holdings, get_cached_positions
from kite_client import authenticate_kite, fetch_and_cache_holdings, fetch_and_cache_gtt_orders, fetch_and_cache_atr_for_holdings, fetch_and_cache_positions
from gtt_cache import get_cached_gtt_orders
from websocket_manager import manager
from cross_reference import construct_unified_payload
import asyncio

kite_instance = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global kite_instance
    # Startup
    init_db()
    from kite_client import load_access_token, initialize_kite_with_token
    cached_token = load_access_token()
    if cached_token:
        temp_kite = initialize_kite_with_token(cached_token)
        if temp_kite:
            try:
                # Verify token validity
                temp_kite.profile()
                kite_instance = temp_kite
                print("Successfully authenticated with Kite API using cached token.")
            except Exception as e:
                print(f"Cached token is invalid or expired: {e}")
                kite_instance = None
                
    if not kite_instance:
        kite_instance = authenticate_kite()
    if kite_instance:
        holdings = fetch_and_cache_holdings(kite_instance)
        positions = fetch_and_cache_positions(kite_instance)
        fetch_and_cache_gtt_orders(kite_instance)
        if holdings or positions:
            merged_items = (holdings or []) + (positions or [])
            fetch_and_cache_atr_for_holdings(kite_instance, merged_items)
            
        from kite_ticker_manager import start_ticker
        start_ticker(kite_instance.api_key, kite_instance.access_token, (holdings or []) + (positions or []))
    yield
    # Shutdown

app = FastAPI(lifespan=lifespan)

@app.get("/api/auth/login")
async def login():
    from kite_client import get_kite_login_url
    url = get_kite_login_url()
    if url:
        return RedirectResponse(url)
    return {"error": "KITE_API_KEY not found"}

@app.get("/api/auth/callback")
async def auth_callback(request_token: str):
    global kite_instance
    kite_instance = authenticate_kite(request_token)
    if kite_instance:
        holdings = fetch_and_cache_holdings(kite_instance)
        positions = fetch_and_cache_positions(kite_instance)
        fetch_and_cache_gtt_orders(kite_instance)
        if holdings or positions:
            merged_items = (holdings or []) + (positions or [])
            fetch_and_cache_atr_for_holdings(kite_instance, merged_items)
            
        from kite_ticker_manager import start_ticker
        start_ticker(kite_instance.api_key, kite_instance.access_token, (holdings or []) + (positions or []))
        
        return {"status": "success", "message": "Successfully authenticated and initialized session"}
    return {"status": "error", "message": "Authentication failed"}

@app.websocket("/ws/holdings")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        # Push initial cached holdings and GTTs on connect
        cached_holdings = get_cached_holdings()
        cached_positions = get_cached_positions()
        cached_gtts = get_cached_gtt_orders()
        
        # If gtt cache is empty/expired, fetch again
        if cached_gtts is None and kite_instance:
            cached_gtts = fetch_and_cache_gtt_orders(kite_instance)
            
        if cached_holdings or cached_gtts or cached_positions:
            unified_payload = construct_unified_payload(cached_gtts or [], cached_holdings or [], cached_positions or [])
            await manager.broadcast_unified(unified_payload)
            
        while True:
            # Keep connection open
            data = await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)
