import json
import urllib.parse
import requests

def authenticate_console(user_id, password, totp_code):
    """
    Simulates the Kite web login flow to extract the enctoken.
    """
    session = requests.Session()
    session.headers.update({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        'X-Kite-Version': '3'
    })
    
    # 1. Login with user_id and password
    login_url = "https://kite.zerodha.com/api/login"
    login_data = {
        "user_id": user_id,
        "password": password
    }
    response = session.post(login_url, data=login_data)
    try:
        response_data = response.json()
    except Exception:
        raise Exception(f"Login failed to parse JSON: {response.text}")
        
    if response_data.get("status") != "success":
        raise Exception(f"Login failed: {response_data.get('message')}")
        
    request_id = response_data["data"]["request_id"]
    
    # 2. Enter TOTP
    twofa_url = "https://kite.zerodha.com/api/twofa"
    twofa_data = {
        "user_id": user_id,
        "request_id": request_id,
        "twofa_value": totp_code
    }
    response = session.post(twofa_url, data=twofa_data)
    try:
        response_data = response.json()
    except Exception:
        raise Exception(f"2FA failed to parse JSON: {response.text}")
        
    if response_data.get("status") != "success":
        raise Exception(f"2FA failed: {response_data.get('message')}")
        
    enctoken = session.cookies.get('enctoken')
    if not enctoken:
        raise Exception("Failed to extract enctoken after 2FA")
        
    # 3. Perform SSO to Console to get session
    sso_url = "https://console.zerodha.com/kite/login"
    session.get(sso_url)
    
    console_session = session.cookies.get('session')
    if not console_session:
        raise Exception("Failed to extract console session cookie after SSO")
        
    for cookie_name in ['enctoken', 'kf_session', 'public_token', 'user_id']:
        if cookie_name in session.cookies:
            del session.cookies[cookie_name]
        
    # We explicitly strip Kite cookies to bypass the backend CSRF check.
    return {"enctoken": enctoken, "session_obj": session}

def fetch_and_parse_ledger(auth_data):
    """
    Fetches the ledger from Zerodha Console API and parses cash deposits/withdrawals.
    """
    ledger_url = "https://console.zerodha.com/api/ledger"
    session = auth_data['session_obj']
    enctoken = auth_data['enctoken']
    
    headers = {
        "Authorization": f"enctoken {urllib.parse.unquote(enctoken)}",
        "Accept": "application/json",
        "referer": "https://console.zerodha.com/",
        "x-kite-version": "3",
        "sec-fetch-site": "same-origin",
        "sec-fetch-mode": "cors",
        "sec-fetch-dest": "empty"
    }
    
    cash_transactions = []
    page = 1
    total_pages = 1
    
    while page <= total_pages:
        params = {
            "segment": "EQ",
            "from_date": "2016-04-01",
            "to_date": "2030-01-01",
            "page": page
        }
        
        response = session.get(ledger_url, headers=headers, params=params)
        if response.status_code != 200:
            raise Exception(f"Failed to fetch ledger page {page}: {response.status_code} {response.text}")
            
        try:
            response_data = response.json()
            with open("ledger_debug.json", "w") as f:
                json.dump(response_data, f, indent=2)
        except Exception:
            raise Exception(f"Ledger API error, non-JSON response. Status: {response.status_code}")
            
        if response_data.get("status") != "success":
            raise Exception(f"Ledger API error: {response_data.get('message')}")
            
        data_field = response_data.get("data", {})
        
        # Update total pages from pagination data
        pagination = data_field.get("pagination", {})
        if pagination.get("total_pages"):
            total_pages = pagination.get("total_pages")
            
        if isinstance(data_field, dict):
            result_field = data_field.get("result", {})
            if isinstance(result_field, dict):
                results = result_field.get("breakdown", [])
            elif isinstance(result_field, list):
                results = result_field
            else:
                results = []
        elif isinstance(data_field, list):
            results = data_field
        else:
            results = []
            
        for entry in results:
            if isinstance(entry, str):
                continue # Skip if entry is just a string
            # Based on typical console ledger format, we look for Bank transfers
            voucher_type = entry.get("voucher_type", "").lower()
            particulars = entry.get("particulars", entry.get("remarks", "")).lower()
        
            # A simpler robust way: check if it's a bank transfer
            if "bank" in voucher_type or "funds" in particulars or "net settlement" in particulars or "withdrawal" in particulars or "deposit" in particulars or "payment" in voucher_type or "receipt" in voucher_type:
                # Try to infer if it's an actual deposit/withdrawal rather than trade settlement
                if "bill" in particulars or "settlement" in particulars:
                    continue # Skip trade settlements
                    
                amount = entry.get("amount", 0.0)
                date_str = entry.get("posting_date")
                if not date_str:
                    continue
                    
                credit = entry.get("credit", 0.0)
                debit = entry.get("debit", 0.0)
                
                if credit > 0:
                    tx_type = "deposit"
                    val = credit
                elif debit > 0:
                    tx_type = "withdrawal"
                    val = -debit
                elif amount != 0:
                    tx_type = "deposit" if amount > 0 else "withdrawal"
                    val = amount
                else:
                    continue
                    
                formatted_date = date_str.split("T")[0] if "T" in date_str else date_str
                
                tx = {
                    "date": formatted_date,
                    "amount": val,
                    "type": tx_type,
                    "particulars": particulars
                }
                print("FOUND TX:", tx)
                cash_transactions.append(tx)
                
        page += 1
        
    return cash_transactions
