import json

with open("ledger_debug.json", "r") as f:
    response_data = json.load(f)

cash_transactions = []
data_field = response_data.get("data", {})

pagination = data_field.get("pagination", {})
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
        continue
    voucher_type = entry.get("voucher_type", "").lower()
    particulars = entry.get("particulars", entry.get("remarks", "")).lower()

    if "bank" in voucher_type or "funds" in particulars or "net settlement" in particulars or "withdrawal" in particulars or "deposit" in particulars or "payment" in voucher_type or "receipt" in voucher_type:
        if "bill" in particulars or "settlement" in particulars:
            continue
            
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
        
        cash_transactions.append({
            "date": formatted_date,
            "amount": val,
            "type": tx_type,
            "particulars": particulars
        })

print(cash_transactions)
