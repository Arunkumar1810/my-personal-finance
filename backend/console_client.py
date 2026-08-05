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
    response_data = response.json()
    
    if response_data.get("status") != "success":
        raise Exception(f"Login failed: {response_data.get('message')}")
        
    request_id = response_data["data"]["request_id"]
    
    # 2. Complete 2FA
    twofa_url = "https://kite.zerodha.com/api/twofa"
    twofa_data = {
        "user_id": user_id,
        "request_id": request_id,
        "twofa_value": totp_code
    }
    response = session.post(twofa_url, data=twofa_data)
    response_data = response.json()
    
    if response_data.get("status") != "success":
        raise Exception(f"2FA failed: {response_data.get('message')}")
        
    # Extract enctoken
    enctoken = session.cookies.get('enctoken')
    if not enctoken:
        raise Exception("Failed to extract enctoken from cookies")
        
    return enctoken

def fetch_and_parse_ledger(enctoken):
    """
    Fetches the ledger from Zerodha Console API and parses cash deposits/withdrawals.
    """
    ledger_url = "https://console.zerodha.com/api/reports/ledger"
    headers = {
        "Authorization": f"enctoken {enctoken}",
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json"
    }
    # Provide an arbitrary long date range to get all historical data
    params = {
        "segment": "EQ",
        "from_date": "2010-01-01",
        "to_date": "2030-01-01"
    }
    
    response = requests.get(ledger_url, headers=headers, params=params)
    if response.status_code != 200:
        raise Exception(f"Failed to fetch ledger: {response.status_code} {response.text}")
        
    response_data = response.json()
    if response_data.get("status") != "success":
        raise Exception(f"Ledger API error: {response_data.get('message')}")
        
    results = response_data.get("data", {}).get("result", [])
    
    cash_transactions = []
    for entry in results:
        # Based on typical console ledger format, we look for Bank transfers
        # The exact structure usually has 'particulars' or 'voucher_type'
        voucher_type = entry.get("voucher_type", "").lower()
        particulars = entry.get("particulars", "").lower()
        
        # Withdrawals are typically 'Bank Receipt' or similar, deposits are 'Bank Payment'
        # Or look for keywords like 'Funds added' or 'Funds withdrawn'
        
        # A simpler robust way: check if it's a bank transfer
        if "bank" in voucher_type or "funds" in particulars or "net settlement" in particulars or "withdrawal" in particulars or "deposit" in particulars or "payment" in voucher_type or "receipt" in voucher_type:
            # Try to infer if it's an actual deposit/withdrawal rather than trade settlement
            if "bill" in particulars or "settlement" in particulars:
                continue # Skip trade settlements
                
            amount = entry.get("amount", 0.0)
            date_str = entry.get("date")
            if not date_str:
                continue
                
            # amount > 0 is deposit (credit), < 0 is withdrawal (debit) usually
            # But let's check standard ledger conventions: 
            # In trading ledger, deposit credits your account (positive amount or credit field)
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
                
            # Format date to match existing transactions: YYYY-MM-DD
            # Assuming Console returns YYYY-MM-DD or similar
            formatted_date = date_str.split("T")[0] if "T" in date_str else date_str
            
            cash_transactions.append({
                "date": formatted_date,
                "amount": val,
                "type": tx_type,
                "particulars": particulars
            })
            
    return cash_transactions
