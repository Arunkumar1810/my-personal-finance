from kiteconnect import KiteConnect
from config import settings
from database import save_holdings
from gtt_cache import set_cached_gtt_orders
from atr_cache import set_cached_atr
from datetime import datetime, timedelta

def calculate_atr(historical_data):
    if len(historical_data) < 14:
        return None
    true_ranges = []
    for i in range(1, len(historical_data)):
        high = historical_data[i]['high']
        low = historical_data[i]['low']
        prev_close = historical_data[i-1]['close']
        tr = max(high - low, abs(high - prev_close), abs(low - prev_close))
        true_ranges.append(tr)
    if len(true_ranges) < 14:
        return None
    atr = sum(true_ranges[-14:]) / 14.0
    return atr

def fetch_and_cache_atr_for_holdings(kite, holdings):
    if not holdings:
        return
    to_date = datetime.now()
    from_date = to_date - timedelta(days=30)
    for holding in holdings:
        instrument_token = holding.get('instrument_token')
        tradingsymbol = holding.get('tradingsymbol')
        if not instrument_token or not tradingsymbol:
            continue
        try:
            historical_data = kite.historical_data(instrument_token, from_date.strftime("%Y-%m-%d"), to_date.strftime("%Y-%m-%d"), "day")
            atr = calculate_atr(historical_data)
            if atr is not None:
                set_cached_atr(tradingsymbol, atr)
        except Exception as e:
            print(f"Failed to fetch historical data for {tradingsymbol}: {e}")

def authenticate_kite(request_token=None):
    if not settings.KITE_API_KEY or not settings.KITE_API_SECRET:
        print("Kite API credentials not fully provided in .env.")
        return False
    
    token_to_use = request_token or settings.KITE_REQUEST_TOKEN
    if not token_to_use:
        print("Kite Request Token not provided. Please authenticate via /api/auth/login")
        return False
        
    try:
        kite = KiteConnect(api_key=settings.KITE_API_KEY)
        data = kite.generate_session(token_to_use, api_secret=settings.KITE_API_SECRET)
        kite.set_access_token(data["access_token"])
        print("Successfully authenticated with Kite API.")
        return kite
    except Exception as e:
        print(f"Failed to authenticate with Kite API: {e}")
        return None

def get_kite_login_url():
    if not settings.KITE_API_KEY:
        return None
    kite = KiteConnect(api_key=settings.KITE_API_KEY)
    return kite.login_url()

def fetch_and_cache_holdings(kite):
    try:
        holdings = kite.holdings()
        save_holdings(holdings)
        print("Holdings fetched and cached successfully.")
        return holdings
    except Exception as e:
        print(f"Failed to fetch holdings: {e}")
        return None

def fetch_and_cache_gtt_orders(kite):
    try:
        gtt_orders = kite.get_gtts()
        set_cached_gtt_orders(gtt_orders)
        print("GTT orders fetched and cached successfully.")
        return gtt_orders
    except Exception as e:
        print(f"Failed to fetch GTT orders: {e}")
        return None
