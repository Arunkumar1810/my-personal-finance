from kiteconnect import KiteTicker
from websocket_manager import manager
import asyncio

ticker_instance = None
app_loop = None
subscribed_tokens = []

def on_ticks(ws, ticks):
    if not app_loop:
        return
    # ticks is a list of dictionaries. Broadcast to frontend
    # Use run_coroutine_threadsafe to run the async broadcast_ticks in the main asyncio loop
    try:
        asyncio.run_coroutine_threadsafe(manager.broadcast_ticks(ticks), app_loop)
    except Exception as e:
        print(f"Error broadcasting ticks: {e}")

def on_connect(ws, response):
    print("KiteTicker connected successfully")
    if subscribed_tokens:
        ws.subscribe(subscribed_tokens)
        ws.set_mode(ws.MODE_FULL, subscribed_tokens)
        print(f"Subscribed to {len(subscribed_tokens)} tokens")

def on_close(ws, code, reason):
    print(f"KiteTicker closed: {code} - {reason}")

def start_ticker(api_key, access_token, holdings):
    global ticker_instance, app_loop, subscribed_tokens
    
    if ticker_instance:
        try:
            ticker_instance.close()
        except:
            pass
        
    try:
        app_loop = asyncio.get_event_loop()
    except RuntimeError:
        app_loop = asyncio.new_event_loop()
        asyncio.set_event_loop(app_loop)
    
    if holdings:
        subscribed_tokens = [int(h['instrument_token']) for h in holdings if h.get('instrument_token')]
    else:
        subscribed_tokens = []
        
    ticker_instance = KiteTicker(api_key, access_token)
    ticker_instance.on_ticks = on_ticks
    ticker_instance.on_connect = on_connect
    ticker_instance.on_close = on_close
    
    print("Connecting to KiteTicker...")
    ticker_instance.connect(threaded=True)
