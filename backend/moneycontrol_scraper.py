import requests
from bs4 import BeautifulSoup
import logging
import time
from functools import wraps

logger = logging.getLogger(__name__)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}

def get_moneycontrol_url(ticker: str) -> str:
    """Find the Moneycontrol URL for a given ticker."""
    query = ticker.replace("NSE:", "").replace("BSE:", "")
    url = f"https://www.moneycontrol.com/mccode/common/autosuggestion_solr.php?query={query}&type=1&format=json"
    
    try:
        response = requests.get(url, headers=HEADERS, timeout=10)
        response.raise_for_status()
        data = response.json()
        if data and len(data) > 0:
            return data[0].get('link_src')
    except Exception as e:
        logger.error(f"Error fetching URL for ticker {ticker}: {e}")
    return None

def fetch_moneycontrol_data(ticker: str) -> dict:
    """Core function to fetch and parse HTML content."""
    url = get_moneycontrol_url(ticker)
    if not url:
        return {"error": "URL not found"}
        
    try:
        response = requests.get(url, headers=HEADERS, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Extract price
        price_div = soup.find('div', {'id': 'nsecp'}) or soup.find('div', {'id': 'bsecp'})
        price = price_div.text.strip() if price_div else None
        
        # Extract 52-week high/low
        high_td = soup.find('td', string=lambda t: t and '52 Week High' in t)
        low_td = soup.find('td', string=lambda t: t and '52 Week Low' in t)
        
        high_52 = None
        low_52 = None
        
        if high_td:
            val = high_td.find_next_sibling('td')
            if val: high_52 = val.text.strip()
            
        if low_td:
            val = low_td.find_next_sibling('td')
            if val: low_52 = val.text.strip()
            
        # Extract volume
        vol_div = soup.find(id='nse_vol') or soup.find(id='bse_vol')
        volume = vol_div.text.strip() if vol_div else None
            
        return {
            "ticker": ticker,
            "price": price,
            "52_week_high": high_52,
            "52_week_low": low_52,
            "volume": volume,
            "url": url,
            "timestamp": time.time()
        }
    except Exception as e:
        logger.error(f"Error extracting data for {ticker}: {e}")
        return {"error": str(e)}

# Cache dictionary to store responses
_MC_CACHE = {}

def get_cached_moneycontrol_data(ticker: str, ttl_seconds: int = 900) -> dict:
    """
    Wrapper function with basic in-memory caching.
    TTL defaults to 900 seconds (15 mins).
    """
    now = time.time()
    if ticker in _MC_CACHE:
        cached_time, data = _MC_CACHE[ticker]
        if now - cached_time < ttl_seconds:
            logger.info(f"Returning cached data for {ticker}")
            # Make a copy so we don't modify the cached dict
            data_copy = data.copy()
            data_copy['cached'] = True
            return data_copy
            
    # If not in cache or expired, fetch it
    data = fetch_moneycontrol_data(ticker)
    
    # Store in cache if successful
    if "error" not in data:
        _MC_CACHE[ticker] = (now, data)
        data_copy = data.copy()
        data_copy['cached'] = False
        return data_copy
        
    return data
