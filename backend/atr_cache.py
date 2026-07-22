from datetime import datetime, timedelta

# In-memory cache for ATR
# Structure: { "tradingsymbol": { "atr": float, "updated_at": datetime_object } }
_atr_cache = {}
CACHE_EXPIRY_HOURS = 24

def get_cached_atr(tradingsymbol):
    cache_entry = _atr_cache.get(tradingsymbol)
    if cache_entry:
        if datetime.now() - cache_entry["updated_at"] < timedelta(hours=CACHE_EXPIRY_HOURS):
            return cache_entry["atr"]
    return None

def set_cached_atr(tradingsymbol, atr_value):
    _atr_cache[tradingsymbol] = {
        "atr": atr_value,
        "updated_at": datetime.now()
    }
