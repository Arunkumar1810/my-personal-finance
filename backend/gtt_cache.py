from datetime import datetime, timedelta

# In-memory cache for GTT orders
# Structure: { "account_id": { "data": [...], "updated_at": datetime_object } }
_gtt_cache = {}
CACHE_EXPIRY_MINUTES = 5

def get_cached_gtt_orders(account_id="default"):
    cache_entry = _gtt_cache.get(account_id)
    if cache_entry:
        if datetime.now() - cache_entry["updated_at"] < timedelta(minutes=CACHE_EXPIRY_MINUTES):
            return cache_entry["data"]
    return None

def set_cached_gtt_orders(gtt_orders, account_id="default"):
    _gtt_cache[account_id] = {
        "data": gtt_orders,
        "updated_at": datetime.now()
    }
